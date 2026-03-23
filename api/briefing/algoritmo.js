import { get, put, del } from '@vercel/blob';

const BRIEFING_PATHNAME = 'briefings/algoritmo/latest.json';
const FIELD_NAMES = [
  'home_order',
  'navbar_items',
  'architecture_notes',
  'partners_list',
  'partners_assets',
  'hero_photo',
  'hero_title',
  'hero_subtitle',
  'hero_keep_notes',
  'programs_catalog',
  'programs_details',
  'programs_assets',
  'mentoring_details',
  'mentors_details',
  'mentors_assets',
  'testimonials_details',
  'cases_details',
  'social_proof_notes',
  'content_details',
  'communities_details',
  'about_numbers_ecosystem',
  'official_images',
  'final_notes',
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
    client: 'algoritmo',
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

export default async function handler(request, response) {
  withNoStore(response);

  if (!hasBlobToken()) {
    return response.status(500).json({ error: 'blob_not_configured' });
  }

  if (request.method === 'GET') {
    try {
      const payload = await readBlobJson();

      if (!payload) {
        return response.status(404).json({ error: 'not_found' });
      }

      return response.status(200).json(payload);
    } catch (error) {
      return response.status(500).json({
        error: 'read_failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  if (request.method === 'POST') {
    try {
      const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
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

      return response.status(200).json(payload);
    } catch (error) {
      return response.status(500).json({
        error: 'write_failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
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

      return response.status(500).json({
        error: 'delete_failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  response.setHeader('Allow', 'GET, POST, DELETE');
  return response.status(405).json({ error: 'method_not_allowed' });
}
