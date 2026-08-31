type AssistantEvent = 'assistant_open' | 'heartbeat' | 'assistant_close' | 'message_sent' | 'assistant_reply';

type AssistantMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const VISITOR_KEY = 'tr_assistant_visitor';
const SESSION_KEY = 'tr_assistant_session';

const createId = () => crypto.randomUUID();

const storedId = (storage: Storage, key: string) => {
  const current = storage.getItem(key);
  if (current) return current;
  const value = createId();
  storage.setItem(key, value);
  return value;
};

const getDevice = () => /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : /Tablet|iPad/i.test(navigator.userAgent) ? 'tablet' : 'desktop';
const getBrowser = () => {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Edge';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari';
  if (/Firefox\//.test(ua)) return 'Firefox';
  return 'Outro';
};

export const trackAssistant = (event: AssistantEvent, message?: AssistantMessage) => {
  try {
    const payload = JSON.stringify({
      event,
      visitorId: storedId(localStorage, VISITOR_KEY),
      sessionId: storedId(sessionStorage, SESSION_KEY),
      path: window.location.pathname,
      referrer: document.referrer || null,
      device: getDevice(),
      browser: getBrowser(),
      messageRole: message?.role,
      messageContent: message?.content,
    });

    if (event === 'assistant_close' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics/track', new Blob([payload], { type: 'application/json' }));
      return;
    }
    void fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: event === 'assistant_close',
    }).catch(() => undefined);
  } catch {
    // Analytics nunca deve interferir no funcionamento do assistente.
  }
};
