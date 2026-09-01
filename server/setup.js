import 'dotenv/config';
import { ensureSchema, sql } from './db.js';
import { serverDefaultContent } from './defaultContent.js';

async function setup() {
  if (!process.env.DATABASE_URL) {
    console.error('Erro: DATABASE_URL não definida no .env');
    process.exit(1);
  }

  await ensureSchema();

  const existing = await sql`SELECT id FROM site_content WHERE id = 1`;

  if (existing.length === 0) {
    await sql`
      INSERT INTO site_content (id, content)
      VALUES (1, ${serverDefaultContent})
    `;
    console.log('✓ Tabela criada e conteúdo inicial inserido.');
  } else {
    console.log('✓ Tabela já existe. Nenhum dado foi sobrescrito.');
  }
}

setup().catch((err) => {
  console.error('Falha no setup:', err);
  process.exit(1);
});
