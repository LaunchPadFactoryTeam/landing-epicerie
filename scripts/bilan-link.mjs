#!/usr/bin/env node
/**
 * Génère le lien nominatif de bilan de fin de mission (F9).
 * Cf. doc/offboarding-satisfaction.md §8 — une commande, zéro étape manuelle.
 *
 *   node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" --livre 2026-05-12
 *
 * Options :
 *   --prenom      (requis)  prénom affiché en en-tête de la page
 *   --entreprise  (requis)  nom de la structure
 *   --livre                 date de mise en ligne, AAAA-MM-JJ
 *   --projet                identifiant court du projet (défaut : slug de --entreprise)
 *   --email                 email du client — active le bouton « Répondre » de la notif
 *   --jours                 validité du lien en jours (défaut : 60)
 *   --base                  origine du site (défaut : https://launchpadfactory.fr)
 *
 * La clé de signature est lue dans SIGNING_KEY (variable d'environnement), sinon
 * dans le fichier .dev.vars à la racine du projet.
 *
 * Aucune dépendance : Web Crypto et base64 sont natifs depuis Node 18.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { signToken } from '../functions/_shared/token.js';
import { TOKEN_TTL_DAYS } from '../functions/_shared/bilan.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (!argv[i].startsWith('--')) continue;
    const key = argv[i].slice(2);
    const next = argv[i + 1];
    // Un flag sans valeur vaut true ; sinon on consomme l'argument suivant.
    args[key] = next && !next.startsWith('--') ? (i++, next) : true;
  }
  return args;
}

/** SIGNING_KEY : environnement d'abord, puis .dev.vars (format KEY=value). */
function readSigningKey() {
  if (process.env.SIGNING_KEY) return process.env.SIGNING_KEY;
  try {
    const content = readFileSync(join(ROOT, '.dev.vars'), 'utf8');
    for (const line of content.split(/\r?\n/)) {
      const match = /^\s*SIGNING_KEY\s*=\s*(.*)$/.exec(line);
      if (match) return match[1].trim().replace(/^["']|["']$/g, '');
    }
  } catch {
    // .dev.vars absent : on tombe dans l'erreur explicite ci-dessous.
  }
  return null;
}

function slugify(value) {
  return value
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

const args = parseArgs(process.argv.slice(2));

const firstname = typeof args.prenom === 'string' ? args.prenom.trim() : '';
const company = typeof args.entreprise === 'string' ? args.entreprise.trim() : '';
if (!firstname || !company) {
  fail('Usage : node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" [--livre 2026-05-12] [--email sophie@…]');
}

const delivered = typeof args.livre === 'string' ? args.livre.trim() : '';
if (delivered && !/^\d{4}-\d{2}-\d{2}$/.test(delivered)) {
  fail('--livre attend une date au format AAAA-MM-JJ (ex. 2026-05-12)');
}

const signingKey = readSigningKey();
if (!signingKey) {
  fail('SIGNING_KEY introuvable. Définissez la variable d’environnement, ou ajoutez SIGNING_KEY=… dans .dev.vars');
}

const days = Number(args.jours ?? TOKEN_TTL_DAYS);
if (!Number.isFinite(days) || days <= 0) fail('--jours attend un nombre de jours positif');

const base = (typeof args.base === 'string' ? args.base : 'https://launchpadfactory.fr').replace(/\/+$/, '');

const payload = {
  c: firstname,
  co: company,
  p: typeof args.projet === 'string' ? args.projet.trim() : slugify(company),
  d: delivered,
  exp: Date.now() + days * 24 * 60 * 60 * 1000,
};
// L'email n'est embarqué que s'il est fourni : il n'est utile qu'au bouton
// « Répondre » de la notification interne.
if (typeof args.email === 'string') payload.e = args.email.trim().toLowerCase();

const token = await signToken(payload, signingKey);
const url = `${base}/bilan?t=${encodeURIComponent(token)}`;
const expires = new Date(payload.exp).toLocaleDateString('fr-FR', { dateStyle: 'long' });

console.log(`
  Bilan de fin de mission — ${firstname} · ${company}

  ${url}

  Valide jusqu'au ${expires} (${days} jours).
  ⚠ Lien nominatif : à envoyer à ce client uniquement.
`);
