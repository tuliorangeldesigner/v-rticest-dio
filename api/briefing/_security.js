const DEFAULT_ALLOWED_ORIGINS = [
  'https://www.tuliorangeldesigner.com.br',
  'https://tuliorangeldesigner.com.br',
  'http://localhost:8080',
  'http://localhost:5173',
];

const MAX_BRIEFING_BODY_BYTES = 256 * 1024;

const getHeader = (request, name) => {
  const value = request.headers?.[name] ?? request.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
};

const toOrigin = (value) => {
  if (!value || typeof value !== 'string') {
    return null;
  }

  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const getAllowedOrigins = () => {
  const configuredOrigins = (process.env.BRIEFING_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  return new Set([...DEFAULT_ALLOWED_ORIGINS, ...configuredOrigins].map(toOrigin).filter(Boolean));
};

const isAllowedMutationOrigin = (request) => {
  const origin = toOrigin(getHeader(request, 'origin'));

  if (!origin) {
    return false;
  }

  const requestHost = getHeader(request, 'host');
  if (requestHost) {
    const protocol = getHeader(request, 'x-forwarded-proto') || 'https';
    if (origin === `${protocol}://${requestHost}`) {
      return true;
    }
  }

  return getAllowedOrigins().has(origin);
};

export const rejectUnsafeMutation = (request, response) => {
  if (request.method !== 'POST' && request.method !== 'DELETE') {
    return false;
  }

  if (!isAllowedMutationOrigin(request)) {
    response.status(403).json({ error: 'forbidden' });
    return true;
  }

  const contentLength = Number(getHeader(request, 'content-length') || 0);
  if (contentLength > MAX_BRIEFING_BODY_BYTES) {
    response.status(413).json({ error: 'payload_too_large' });
    return true;
  }

  return false;
};

export const parseJsonBody = (request) => {
  const rawBody = typeof request.body === 'string' ? request.body : JSON.stringify(request.body ?? {});

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BRIEFING_BODY_BYTES) {
    const error = new Error('payload_too_large');
    error.code = 'PAYLOAD_TOO_LARGE';
    throw error;
  }

  return typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
};

export const writeServerError = (response, error) => {
  if (error instanceof Error && error.code === 'PAYLOAD_TOO_LARGE') {
    return response.status(413).json({ error: 'payload_too_large' });
  }

  return response.status(500).json({ error: 'server_error' });
};
