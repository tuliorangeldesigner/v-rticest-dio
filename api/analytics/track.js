import { callSupabaseRpc, parseBody, sameOrigin, sendJson } from './_shared.js';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const EVENTS = new Set(['assistant_open', 'heartbeat', 'assistant_close', 'message_sent', 'assistant_reply']);
const MESSAGE_ROLES = new Set(['user', 'assistant']);

export default async function handler(request, response) {
  if (request.method !== 'POST') return sendJson(response, 405, { error: 'method_not_allowed' });
  if (!sameOrigin(request)) return sendJson(response, 403, { error: 'forbidden' });

  try {
    const body = parseBody(request);
    if (!UUID.test(body.visitorId) || !UUID.test(body.sessionId) || !EVENTS.has(body.event)) {
      return sendJson(response, 400, { error: 'invalid_event' });
    }

    const commonPayload = {
      p_visitor_id: body.visitorId,
      p_session_id: body.sessionId,
      p_path: typeof body.path === 'string' ? body.path.slice(0, 300) : null,
      p_referrer: typeof body.referrer === 'string' ? body.referrer.slice(0, 500) : null,
      p_device_type: typeof body.device === 'string' ? body.device.slice(0, 40) : null,
      p_browser: typeof body.browser === 'string' ? body.browser.slice(0, 80) : null,
    };

    if (body.event !== 'assistant_reply') {
      await callSupabaseRpc('record_assistant_event', {
        ...commonPayload,
        p_event_name: body.event,
      });
    }

    if (
      MESSAGE_ROLES.has(body.messageRole) &&
      typeof body.messageContent === 'string' &&
      body.messageContent.trim().length > 0
    ) {
      try {
        await callSupabaseRpc('record_assistant_message', {
          ...commonPayload,
          p_role: body.messageRole,
          p_content: body.messageContent.trim().slice(0, 4000),
        });
      } catch {
        // O site continua funcionando caso o SQL novo ainda nao tenha sido aplicado.
      }
    }

    return sendJson(response, 204, null);
  } catch {
    return sendJson(response, 500, { error: 'analytics_unavailable' });
  }
}
