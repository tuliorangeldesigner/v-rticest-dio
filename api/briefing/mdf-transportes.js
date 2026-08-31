import { get, put, del } from '@vercel/blob';
import { parseJsonBody, rejectUnsafeMutation, writeServerError } from './_security.js';

const BRIEFING_PATHNAME = 'briefings/mdf-transportes/latest.json';
const CLIENT_NAME = 'MDF Transportes';
const SOURCE_PATH = '/briefing/mdf-transportes';
const SUPABASE_URL = process.env.SUPABASE_BRIEFINGS_URL || 'https://rleculctxhrhmboalime.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_BRIEFINGS_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsZWN1bGN0eGhyaG1ib2FsaW1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDA4MDgsImV4cCI6MjA5NzExNjgwOH0.PqgwW27mjPs0NNOdDpL23Xd7sC-S23t39moEa2R4jTk';
const FIELD_NAMES = [
  'nomeEmpresa',
  'contatosOficiais',
  'secoesSite',
  'secoesSiteOutro',
  'ajustesSiteAtual',
  'reaproveitarSiteAntigo',
  'mensagemPrincipal',
  'sobreEmpresa',
  'textosSite',
  'textosProntos',
  'servicosSite',
  'servicosSiteOutros',
  'servicosDestaque',
  'regioesAtendidas',
  'veiculosFrota',
  'destaquesFrota',
  'diferenciais',
  'diferenciaisOutro',
  'fotosMateriais',
  'depoimentos',
  'objetivoSite',
  'destinoBotaoPrincipal',
  'observacaoFinal',
];

const withNoStore = (response) => {
  response.setHeader('Cache-Control', 'no-store');
};

const hasBlobToken = () => typeof process.env.BLOB_READ_WRITE_TOKEN === 'string' && process.env.BLOB_READ_WRITE_TOKEN.length > 0;

const isValidValues = (value) => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return FIELD_NAMES.every((fieldName) => typeof value[fieldName] === 'string');
};

const normalizePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    return null;
  }

  const values = payload.values;
  if (!isValidValues(values)) {
    return null;
  }

  return {
    version: 1,
    client: 'mdf-transportes',
    savedAt: typeof payload.savedAt === 'string' ? payload.savedAt : new Date().toISOString(),
    values,
  };
};

const readBlobJson = async () => {
  const result = await get(BRIEFING_PATHNAME, {
    access: 'private',
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const raw = await new Response(result.stream).text();
  return JSON.parse(raw);
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
        contact_name: payload.values.nomeEmpresa || null,
        responses: payload.values,
        source_path: SOURCE_PATH,
        user_agent: request.headers['user-agent'] || null,
      }),
    });

    return result.ok;
  } catch {
    return false;
  }
};

export default async function handler(request, response) {
  withNoStore(response);

  if (!hasBlobToken()) {
    return response.status(500).json({ error: 'blob_not_configured' });
  }

  if (rejectUnsafeMutation(request, response)) {
    return;
  }

  if (request.method === 'GET') {
    try {
      const payload = await readBlobJson();

      if (!payload) {
        return response.status(404).json({ error: 'not_found' });
      }

      return response.status(200).json(payload);
    } catch (error) {
      return writeServerError(response, error);
    }
  }

  if (request.method === 'POST') {
    try {
      const body = parseJsonBody(request);
      const payload = normalizePayload(body);

      if (!payload) {
        return response.status(400).json({ error: 'invalid_payload' });
      }

      await put(BRIEFING_PATHNAME, JSON.stringify(payload), {
        access: 'private',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json; charset=utf-8',
      });

      const supabaseSaved = await saveToSupabase(payload, request);

      return response.status(200).json({ ...payload, supabaseSaved });
    } catch (error) {
      return writeServerError(response, error);
    }
  }

  if (request.method === 'DELETE') {
    try {
      await del(BRIEFING_PATHNAME);
      return response.status(200).json({ ok: true });
    } catch (error) {
      if (error instanceof Error && /not found/i.test(error.message)) {
        return response.status(200).json({ ok: true });
      }

      return writeServerError(response, error);
    }
  }

  response.setHeader('Allow', 'GET, POST, DELETE');
  return response.status(405).json({ error: 'method_not_allowed' });
}
