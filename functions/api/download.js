import { verifyToken } from '../_shared/token.js';
import { GUIDES } from '../_shared/guides.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = url.searchParams.get('t');
  if (!token) return new Response('Missing token', { status: 400 });

  const payload = await verifyToken(token, env.SIGNING_KEY);
  if (!payload) return new Response('Lien expiré ou invalide', { status: 403 });

  const guide = GUIDES[payload.g];
  if (!guide) return new Response('Guide introuvable', { status: 404 });

  const obj = await env.PDFS.get(guide.r2Key);
  if (!obj) return new Response('Fichier indisponible', { status: 404 });

  // Log download (best-effort)
  try {
    const ip = request.headers.get('cf-connecting-ip') || '';
    await env.DB.prepare(
      'INSERT INTO downloads (guide, email, ip) VALUES (?, ?, ?)'
    )
      .bind(payload.g, payload.e || '', ip)
      .run();
  } catch (err) {
    console.error('D1 download log failed', err);
  }

  return new Response(obj.body, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${guide.downloadName}"`,
      'cache-control': 'private, no-store',
    },
  });
}
