import jwt from 'jsonwebtoken';
import { ensureSchema, sql } from './db.js';
import { serverDefaultContent } from './defaultContent.js';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'detalhe2024';
const JWT_SECRET = process.env.JWT_SECRET || 'detalhe-jwt-secret-change-me';

export function verifyAuth(req) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header?.startsWith('Bearer ')) return false;
  try {
    jwt.verify(header.slice(7), JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function handleLogin(req, res) {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ token });
}

export async function handleHealth(_req, res) {
  try {
    await sql`SELECT 1`;
    return res.json({ ok: true, database: true });
  } catch {
    return res.status(503).json({ ok: false, database: false });
  }
}

export async function handleGetContent(_req, res) {
  try {
    await ensureSchema();
    const rows = await sql`SELECT content, updated_at FROM site_content WHERE id = 1`;

    if (rows.length === 0) {
      await sql`
        INSERT INTO site_content (id, content)
        VALUES (1, ${JSON.stringify(serverDefaultContent)}::jsonb)
        ON CONFLICT (id) DO NOTHING
      `;
      return res.json({ content: serverDefaultContent, updatedAt: new Date().toISOString() });
    }

    return res.json({ content: rows[0].content, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('GET /api/content', err);
    return res.status(500).json({ error: 'Erro ao carregar conteúdo' });
  }
}

export async function handlePutContent(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    const { content } = req.body || {};
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ error: 'Conteúdo inválido' });
    }

    await ensureSchema();
    const rows = await sql`
      INSERT INTO site_content (id, content, updated_at)
      VALUES (1, ${JSON.stringify(content)}::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      RETURNING updated_at
    `;

    return res.json({ ok: true, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('PUT /api/content', err);
    return res.status(500).json({ error: 'Erro ao salvar conteúdo' });
  }
}

export async function handleResetContent(req, res) {
  if (!verifyAuth(req)) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    await ensureSchema();
    const rows = await sql`
      INSERT INTO site_content (id, content, updated_at)
      VALUES (1, ${JSON.stringify(serverDefaultContent)}::jsonb, NOW())
      ON CONFLICT (id)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      RETURNING content, updated_at
    `;
    return res.json({ content: rows[0].content, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('POST /api/content/reset', err);
    return res.status(500).json({ error: 'Erro ao resetar conteúdo' });
  }
}
