const API_BASE = import.meta.env.VITE_API_URL || '';

const TOKEN_KEY = 'detalhe-admin-token';

export function getAuthToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setAuthToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAuthToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getAuthToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `Erro ${res.status}`);
  }
  return data;
}

export const api = {
  login: (password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
  fetchContent: () => request('/api/content'),
  saveContent: (content) => request('/api/content', { method: 'PUT', body: JSON.stringify({ content }) }),
  resetContent: () => request('/api/content/reset', { method: 'POST' }),
  health: () => request('/api/health'),
};
