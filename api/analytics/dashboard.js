import { callSupabaseRpc, isAdmin, sendJson } from './_shared.js';

export default async function handler(request, response) {
  if (request.method !== 'GET') return sendJson(response, 405, { error: 'method_not_allowed' });
  if (!isAdmin(request)) return sendJson(response, 401, { error: 'unauthorized' });
  try {
    const assistant = await callSupabaseRpc('get_assistant_dashboard');
    let site = null;
    let assistantMessages = [];
    const requestedDays = Number(request.query?.days || 30);
    const days = [1, 7, 30, 90].includes(requestedDays) ? requestedDays : 30;
    try { site = await callSupabaseRpc('get_site_dashboard', { p_days: days }); } catch { /* SQL ainda não executado */ }
    try { assistantMessages = await callSupabaseRpc('get_assistant_messages', { p_days: days }); } catch { /* SQL de mensagens ainda nao executado */ }
    return sendJson(response, 200, { ...assistant, site, assistantMessages });
  } catch {
    return sendJson(response, 500, { error: 'analytics_unavailable' });
  }
}
