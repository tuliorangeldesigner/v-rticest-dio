import { clearSessionCookie, sameOrigin, sendJson } from './_shared.js';

export default function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'method_not_allowed' });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: 'forbidden' });
  response.setHeader('Set-Cookie', clearSessionCookie());
  return sendJson(response, 200, { ok: true });
}
