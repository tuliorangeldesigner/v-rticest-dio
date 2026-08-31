import { createSessionCookie, parseBody, passwordIsValid, sameOrigin, sendJson } from './_shared.js';
import { createHmac } from 'node:crypto';

const attempts = globalThis.__trAnalyticsLoginAttempts || new Map();
globalThis.__trAnalyticsLoginAttempts = attempts;

export default function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'method_not_allowed' });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: 'forbidden' });

  const clientAddress = String(request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown').split(',')[0];
  const key = createHmac('sha256', process.env.ANALYTICS_SESSION_SECRET || 'unconfigured')
    .update(clientAddress)
    .digest('hex');
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < 15 * 60 * 1000);
  if (recent.length >= 5) return sendJson(response, 429, { error: 'too_many_attempts' });

  try {
    const { password } = parseBody(request);
    if (!passwordIsValid(password)) {
      attempts.set(key, [...recent, now]);
      return sendJson(response, 401, { error: 'invalid_credentials' });
    }
    attempts.delete(key);
    response.setHeader('Set-Cookie', createSessionCookie());
    return sendJson(response, 200, { ok: true });
  } catch {
    return sendJson(response, 400, { error: 'invalid_request' });
  }
}
