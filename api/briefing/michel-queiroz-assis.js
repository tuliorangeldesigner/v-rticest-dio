import { put } from '@vercel/blob';
import { parseJsonBody, rejectUnsafeMutation, writeServerError } from './_security.js';

const CLIENT_SLUG = 'michel-queiroz-assis';
const CLIENT_NAME = 'MICHEL QUEIROZ DE ASSIS ADVOGADOS ASSOCIADOS';
const BRIEFING_PATHNAME = 'briefings/michel-queiroz-assis/latest.json';
const TARGET_EMAIL = 'tuliorangeldesigner@gmail.com';
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/077155c39ad40c69289f867d6e161917';
const SUPABASE_URL = process.env.SUPABASE_BRIEFINGS_URL || 'https://rleculctxhrhmboalime.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_BRIEFINGS_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZWN1bGN0eGhyaG1ib2FsaW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDA4MDgsImV4cCI6MjA5NzExNjgwOH0.PqgwW27mjPs0NNOdDpL23Xd7sC-S23t39moEa2R4jTk';
const FIELD_NAMES = [
  'objetivoSite',
  'publicoAlvo',
  'secoesSite',
  'areasAtuacao',
  'areaDestaque',
  'estiloVisual',
  'coresPreferidas',
  'logotipoMateriais',
  'textosSite',
  'fraseDestaque',
  'funcionalidades',
  'redesSociais',
  'referencias',
  'imagensMateriais',
  'tomComunicacao',
  'informacoesObrigatorias',
  'evitarNoSite',
  'prazo',
];

const withNoStore = (response) => {
  response.setHeader('Cache-Control', 'no-store');
};

const isValidValues = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return FIELD_NAMES.every((fieldName) => typeof value[fieldName] === 'string');
};

const normalizePayload = (payload) => {
  if (!payload || typeof payload !== 'object' || !isValidValues(payload.values)) {
    return null;
  }

  return {
    version: 1,
    client: CLIENT_SLUG,
    savedAt: typeof payload.savedAt === 'string' ? payload.savedAt : new Date().toISOString(),
    summary: typeof payload.summary === 'string' ? payload.summary : '',
    values: payload.values,
  };
};

const saveToSupabase = async (payload, request) => {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return false;
  }

  try {
    const result = await fetch(`${SUPABASE_URL}/rest/v1/briefing_submissions`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        client_slug: payload.client,
        client_name: CLIENT_NAME,
        contact_name: CLIENT_NAME,
        responses: payload.values,
        source_path: '/briefing/michel-queiroz-assis',
        user_agent: request.headers['user-agent'] || null,
      }),
    });

    return result.ok;
  } catch {
    return false;
  }
};

const saveToBlob = async (payload) => {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return false;
  }

  try {
    await put(BRIEFING_PATHNAME, JSON.stringify(payload), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json; charset=utf-8',
    });

    return true;
  } catch {
    return false;
  }
};

const sendEmail = async (payload) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  const result = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    signal: controller.signal,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `[Michel Queiroz de Assis] Briefing do site`,
      'Cliente do briefing': CLIENT_NAME,
      'E-mail de destino': TARGET_EMAIL,
      'Data do envio': new Date(payload.savedAt).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      Respostas: payload.summary,
      ...payload.values,
    }),
  }).finally(() => clearTimeout(timeout));

  if (!result.ok) {
    const text = await result.text().catch(() => '');
    const error = new Error('email_send_failed');
    error.status = result.status;
    error.details = text.slice(0, 500);
    throw error;
  }

  return true;
};

export default async function handler(request, response) {
  withNoStore(response);

  if (rejectUnsafeMutation(request, response)) {
    return;
  }

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'method_not_allowed' });
  }

  try {
    const body = parseJsonBody(request);
    const payload = normalizePayload(body);

    if (!payload) {
      return response.status(400).json({ error: 'invalid_payload' });
    }

    const [blobSaved, supabaseSaved] = await Promise.all([saveToBlob(payload), saveToSupabase(payload, request)]);
    let emailSent = false;
    let emailError = null;

    try {
      emailSent = await sendEmail(payload);
    } catch (error) {
      emailError =
        error instanceof Error
          ? {
              message: error.message,
              status: error.status || null,
              details: error.details || null,
            }
          : { message: 'unknown_email_error' };
    }

    if (!blobSaved && !supabaseSaved && !emailSent) {
      return response.status(502).json({
        error: 'briefing_delivery_failed',
        blobSaved,
        supabaseSaved,
        emailError,
      });
    }

    return response.status(200).json({
      ok: true,
      client: payload.client,
      savedAt: payload.savedAt,
      blobSaved,
      supabaseSaved,
      emailSent,
      emailError,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'email_send_failed') {
      return response.status(502).json({
        error: 'email_send_failed',
        status: error.status,
        details: error.details,
      });
    }

    return writeServerError(response, error);
  }
}
