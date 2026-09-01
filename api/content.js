import { handleGetContent, handlePutContent } from '../../server/apiHandlers.js';

export default async function handler(req, res) {
  if (req.method === 'GET') return handleGetContent(req, res);
  if (req.method === 'PUT') return handlePutContent(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
