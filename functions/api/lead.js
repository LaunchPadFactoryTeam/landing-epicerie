import { signToken } from '../_shared/token.js';
import { GUIDES } from '../_shared/guides.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const email = String(body.email || '').trim().toLowerCase();
  const firstname = String(body.firstname || '').trim().slice(0, 80);
  const guide = String(body.guide || '').trim();

  if (!EMAIL_RE.test(email) || email.length > 254) return json({ error: 'invalid_email' }, 400);
  if (!firstname) return json({ error: 'missing_firstname' }, 400);
  if (!GUIDES[guide]) return json({ error: 'invalid_guide' }, 400);

  const ip = request.headers.get('cf-connecting-ip') || '';
  const ua = (request.headers.get('user-agent') || '').slice(0, 300);

  // Stockage du lead (best-effort : on ne bloque pas le téléchargement si D1 fail)
  try {
    await env.DB.prepare(
      'INSERT INTO leads (email, firstname, guide, ip, user_agent) VALUES (?, ?, ?, ?, ?)'
    )
      .bind(email, firstname, guide, ip, ua)
      .run();
  } catch (err) {
    console.error('D1 insert failed', err);
  }

  // Token court (10 min, usage immédiat côté front)
  const token = await signToken(
    { g: guide, e: email, exp: Date.now() + 10 * 60 * 1000 },
    env.SIGNING_KEY
  );

  return json({ ok: true, downloadUrl: `/api/download?t=${encodeURIComponent(token)}` });
}
