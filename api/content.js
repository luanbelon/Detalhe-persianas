import { handleGetContent, handlePutContent } from '../server/apiHandlers.js';

export const config = {
  maxDuration: 30,
};

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export default async function handler(req, res) {
  req.body = parseBody(req);
  if (req.method === 'GET') return handleGetContent(req, res);
  if (req.method === 'PUT') return handlePutContent(req, res);
  return res.status(405).json({ error: 'Method not allowed' });
}
