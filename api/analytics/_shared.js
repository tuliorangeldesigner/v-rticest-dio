import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'tr_analytics_admin';
const SESSION_SECONDS = 8 * 60 * 60;

export const sendJson = (response, status, body) => {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  return response.end(JSON.stringify(body));
};

export const parseBody = (request) => {
  const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
  if (Buffer.byteLength(JSON.stringify(body || {}), 'utf8') > 12000) throw new Error('payload_too_large');
  return body || {};
};

const safeEqual = (left, right) => {
  const a = Buffer.from(String(left));
  const b = Buffer.from(String(right));
  return a.length === b.length && timingSafeEqual(a, b);
};

const signature = (expires) => createHmac('sha256', process.env.ANALYTICS_SESSION_SECRET || '')
  .update(String(expires))
  .digest('hex');

export const passwordIsValid = (password) => {
  const configured = process.env.ANALYTICS_ADMIN_PASSWORD || '';
  return configured.length >= 16 && safeEqual(password, configured);
};

export const createSessionCookie = () => {
  const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
  return `${COOKIE_NAME}=${expires}.${signature(expires)}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_SECONDS}`;
};

export const clearSessionCookie = () => `${COOKIE_NAME}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;

export const isAdmin = (request) => {
  const secret = process.env.ANALYTICS_SESSION_SECRET || '';
  if (secret.length < 32) return false;
  const cookies = String(request.headers.cookie || '').split(';').map((item) => item.trim());
  const value = cookies.find((item) => item.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  const [expiresText, suppliedSignature] = String(value || '').split('.');
  const expires = Number(expiresText);
  return Number.isFinite(expires) && expires > Date.now() / 1000 && safeEqual(suppliedSignature || '', signature(expires));
};

export const sameOrigin = (request) => {
  const origin = request.headers.origin;
  const host = request.headers['x-forwarded-host'] || request.headers.host;
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
};

export const callSupabaseRpc = async (name, body = {}) => {
  const url = (process.env.SUPABASE_ANALYTICS_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_ANALYTICS_SERVICE_ROLE_KEY || '';
  if (!url || !key) throw new Error('analytics_not_configured');

  const headers = { apikey: key, 'Content-Type': 'application/json' };
  if (!key.startsWith('sb_secret_')) headers.Authorization = `Bearer ${key}`;

  const result = await fetch(`${url}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });
  if (!result.ok) throw new Error('analytics_storage_error');
  const text = await result.text();
  return text ? JSON.parse(text) : null;
};
