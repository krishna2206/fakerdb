// FakerDB landing: serves ./public as static assets, plus one endpoint.
// POST /api/waitlist stores an early access email in D1. It accepts JSON
// (fetch from the page) or a plain form POST (no JavaScript), answering
// JSON or a redirect back to the page respectively.

const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/waitlist') {
      if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
      return waitlist(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

async function waitlist(request, env) {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');

  let data;
  try {
    data = isJson ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return reply(request, isJson, 400, 'invalid_email');
  }

  // Honeypot: bots fill every field. Pretend it worked and store nothing.
  if (data.company_site) return reply(request, isJson, 200, 'ok');

  const email = String(data.email || '').trim().toLowerCase();
  if (email.length > 254 || !EMAIL.test(email)) return reply(request, isJson, 400, 'invalid_email');

  const source = String(data.source || '').slice(0, 32) || null;
  const country = request.cf?.country || null;

  try {
    await env.DB
      .prepare('INSERT INTO waitlist (email, source, country) VALUES (?1, ?2, ?3) ON CONFLICT(email) DO NOTHING')
      .bind(email, source, country)
      .run();
  } catch (err) {
    console.error('waitlist insert failed', err);
    return reply(request, isJson, 500, 'server');
  }

  return reply(request, isJson, 200, 'ok');
}

function reply(request, isJson, status, code) {
  if (isJson) return Response.json({ ok: status === 200, code }, { status });
  const back = new URL(code === 'ok' ? '/#joined' : '/#join-error', request.url);
  return Response.redirect(back.toString(), 303);
}
