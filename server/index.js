import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { ensureSchema, sql } from './db.js';
import { serverDefaultContent } from './defaultContent.js';

const app = express();
const PORT = process.env.PORT || 3001;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'detalhe2024';
const JWT_SECRET = process.env.JWT_SECRET || 'detalhe-jwt-secret-change-me';

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '15mb' }));

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  try {
    jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

app.post('/api/auth/login', (req, res) => {
  const { password } = req.body || {};
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Senha incorreta' });
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.get('/api/health', async (_req, res) => {
  try {
    await sql`SELECT 1`;
    res.json({ ok: true, database: true });
  } catch {
    res.status(503).json({ ok: false, database: false });
  }
});

app.get('/api/content', async (_req, res) => {
  try {
    await ensureSchema();
    const rows = await sql`SELECT content, updated_at FROM site_content WHERE id = 1`;

    if (rows.length === 0) {
      await sql`
        INSERT INTO site_content (id, content)
        VALUES (1, ${serverDefaultContent})
        ON CONFLICT (id) DO NOTHING
      `;
      return res.json({ content: serverDefaultContent, updatedAt: new Date().toISOString() });
    }

    res.json({ content: rows[0].content, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('GET /api/content', err);
    res.status(500).json({ error: 'Erro ao carregar conteúdo' });
  }
});

app.put('/api/content', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body || {};
    if (!content || typeof content !== 'object') {
      return res.status(400).json({ error: 'Conteúdo inválido' });
    }

    await ensureSchema();
    const rows = await sql`
      INSERT INTO site_content (id, content, updated_at)
      VALUES (1, ${content}, NOW())
      ON CONFLICT (id)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      RETURNING updated_at
    `;

    res.json({ ok: true, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('PUT /api/content', err);
    res.status(500).json({ error: 'Erro ao salvar conteúdo' });
  }
});

app.post('/api/content/reset', authMiddleware, async (_req, res) => {
  try {
    await ensureSchema();
    const rows = await sql`
      INSERT INTO site_content (id, content, updated_at)
      VALUES (1, ${serverDefaultContent}, NOW())
      ON CONFLICT (id)
      DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
      RETURNING content, updated_at
    `;
    res.json({ content: rows[0].content, updatedAt: rows[0].updated_at });
  } catch (err) {
    console.error('POST /api/content/reset', err);
    res.status(500).json({ error: 'Erro ao resetar conteúdo' });
  }
});

app.listen(PORT, async () => {
  try {
    await ensureSchema();
    console.log(`API rodando em http://localhost:${PORT}`);
  } catch (err) {
    console.error('Erro ao iniciar:', err.message);
  }
});
