/**
 * GET /api/bilan-context?t=<token>
 *
 * Décode le lien nominatif signé et renvoie de quoi personnaliser la page /bilan
 * (F2). Le token est un HMAC-SHA256 émis par scripts/bilan-link.mjs ; il ne porte
 * aucune donnée sensible, uniquement l'identité affichée en en-tête.
 *
 * Un token absent, altéré ou expiré n'est PAS bloquant : le front bascule sur la
 * saisie manuelle (F3, F12). D'où le 200 avec `ok: false` plutôt qu'un 4xx — le
 * cas nominal du fallback n'est pas une erreur.
 *
 * Variables d'environnement :
 *   - SIGNING_KEY (secret, déjà en place pour le lead magnet)
 */

import { verifyToken } from '../_shared/token.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Lien nominatif : jamais mis en cache par un intermédiaire.
      'cache-control': 'no-store',
    },
  });
}

export async function onRequestGet({ request, env }) {
  const token = new URL(request.url).searchParams.get('t');
  if (!token) return json({ ok: false, reason: 'missing_token' });

  if (!env.SIGNING_KEY) {
    console.error('SIGNING_KEY absente — impossible de vérifier le token de bilan');
    return json({ ok: false, reason: 'not_configured' });
  }

  // verifyToken renvoie null aussi bien pour une signature invalide que pour un
  // token expiré : on ne distingue pas les deux côté client, le message et le
  // repli sont identiques.
  const payload = await verifyToken(token, env.SIGNING_KEY);
  if (!payload) return json({ ok: false, reason: 'invalid_token' });

  return json({
    ok: true,
    firstname: String(payload.c || ''),
    company: String(payload.co || ''),
    project: String(payload.p || ''),
    delivered: String(payload.d || ''),
  });
}
