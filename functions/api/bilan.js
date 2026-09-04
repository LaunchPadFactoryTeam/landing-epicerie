/**
 * POST /api/bilan
 * Réception du questionnaire de bilan de fin de mission (offboarding).
 * Cf. doc/offboarding-satisfaction.md — la numérotation Q* suit le document.
 *
 * - Honeypot (pas de Turnstile : le lien est nominatif et signé, cf. doc §8)
 * - Identité issue du token signé, ou du corps de requête en fallback (F3)
 * - Validation server-side stricte + whitelists (_shared/bilan.js)
 * - Upsert D1 sur token_ref : une seule réponse par lien (F11)
 * - Notification email actionnable via Brevo (F7)
 *
 * Variables d'environnement :
 *   - SIGNING_KEY        (secret — vérification du token)                 [requis]
 *   - BREVO_API_KEY      (clé API transactional Brevo)                    [optionnel]
 *   - NOTIFY_TO_EMAIL / NOTIFY_FROM_EMAIL / NOTIFY_FROM_NAME              [cf. wrangler.jsonc]
 */

import { verifyToken } from '../_shared/token.js';
import {
  EXPECTATION, STEPS, COMMUNICATION, DECISION, VALUE, NEEDS, ASKS,
  LINKEDIN_MODE, PROMOTER_THRESHOLD,
} from '../_shared/bilan.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Entier dans [min, max], ou null si absent / hors bornes. */
function intInRange(value, min, max) {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  if (!Number.isInteger(n) || n < min || n > max) return null;
  return n;
}

/** Une clé du dictionnaire, ou null. */
function pickKey(value, dict) {
  const v = clean(value, 40);
  return Object.hasOwn(dict, v) ? v : null;
}

/** Les clés valides d'un tableau de cases cochées, dédoublonnées. */
function pickKeys(value, dict) {
  if (!Array.isArray(value)) return [];
  const keys = value.map((v) => clean(v, 40)).filter((v) => Object.hasOwn(dict, v));
  return Array.from(new Set(keys));
}

/** Matrice { clé: note 1-5 } réduite aux lignes connues et aux notes valides. */
function pickScale(value, dict) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const out = {};
  for (const key of Object.keys(dict)) {
    const n = intInRange(value[key], 1, 5);
    if (n !== null) out[key] = n;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Notification email                                                  */
/* ------------------------------------------------------------------ */

/** Vert / orange / rouge selon le score de recommandation (doc §6). */
function npsTone(nps) {
  if (nps >= PROMOTER_THRESHOLD) return { bg: '#2f6b4f', label: 'Promoteur' };
  if (nps === 7) return { bg: '#b3722a', label: 'Passif' };
  return { bg: '#a33325', label: 'Détracteur' };
}

function scaleRowsHtml(scale, dict) {
  const entries = Object.entries(scale);
  if (entries.length === 0) return '<em style="color:#999;">non renseigné</em>';
  return `<table style="width:100%;border-collapse:collapse;font-size:14px;">${entries
    .map(([key, note]) => {
      // Barre pleine/vide : lisible même quand le client d'email bloque les styles.
      const bar = '●'.repeat(note) + '○'.repeat(5 - note);
      const color = note <= 2 ? '#a33325' : note === 3 ? '#b3722a' : '#2f6b4f';
      return `<tr>
        <td style="padding:4px 0;color:#5a4f49;">${escapeHtml(dict[key])}</td>
        <td style="padding:4px 0;text-align:right;color:${color};font-weight:600;letter-spacing:2px;">${bar} ${note}/5</td>
      </tr>`;
    })
    .join('')}</table>`;
}

function freeTextHtml(label, value) {
  if (!value) return '';
  return `<h3 style="margin:22px 0 6px;font-size:13px;color:#161210;">${escapeHtml(label)}</h3>
    <p style="margin:0;padding:12px 14px;background:#f7f3ee;border-radius:8px;white-space:pre-wrap;font-size:14px;">${escapeHtml(value)}</p>`;
}

function buildActionsHtml(r) {
  const actions = [];

  if (r.q13Asks.includes('linkedin')) {
    const mode = r.linkedinMode === 'assisted'
      ? 'veut une proposition de texte → texte + visuels sous 48 h'
      : r.linkedinMode === 'self'
        ? 'garde la plume → envoyer les visuels sous 48 h'
        : 'mode non précisé → envoyer les visuels sous 48 h';
    actions.push(`LinkedIn : ${mode}`);
  }
  if (r.q13Asks.includes('avis_google')) actions.push('Avis Google → envoyer le lien de la fiche sous 48 h');
  if (r.q13Asks.includes('reference')) actions.push('Autorise nom + logo + captures → page projet');
  if (r.q13Asks.includes('mise_en_relation')) actions.push('Propose une mise en relation → appeler sous 1 semaine');
  if (r.q13terCallback === 1) actions.push('⚠ DEMANDE À ÊTRE RAPPELÉ → appel sous 24 h');

  const needs = r.q10Needs.filter((n) => n !== 'rien').map((n) => NEEDS[n]);
  if (r.q10NeedsOther) needs.push(r.q10NeedsOther);
  if (needs.length) actions.push(`Besoins à 6 mois : ${needs.join(', ')} → devis sous 1 semaine`);

  if (r.publishConsent) actions.push('Autorise la publication de son témoignage');

  if (actions.length === 0) {
    return '<p style="margin:0;font-size:14px;color:#8a807a;"><em>Aucune action à déclencher.</em></p>';
  }
  return `<ul style="margin:0;padding-left:18px;font-size:14px;line-height:1.9;">${actions
    .map((a) => `<li>${escapeHtml(a)}</li>`)
    .join('')}</ul>`;
}

async function sendNotificationEmail(env, r, ip) {
  if (!env.BREVO_API_KEY || !env.NOTIFY_TO_EMAIL) return { sent: false, reason: 'not_configured' };

  const fromEmail = env.NOTIFY_FROM_EMAIL || env.NOTIFY_TO_EMAIL;
  const fromName = env.NOTIFY_FROM_NAME || 'LaunchPad — Site';
  const tone = npsTone(r.q12Nps);

  // Le bouton « Répondre » n'existe que si le lien portait l'email du client
  // (option --email de scripts/bilan-link.mjs). Sinon on l'omet plutôt que
  // d'afficher un mailto vide.
  const replyButton = r.email
    ? `<div style="margin-top:26px;padding-top:20px;border-top:1px solid #eee;text-align:center;">
         <a href="mailto:${encodeURIComponent(r.email)}?subject=${encodeURIComponent(`Re: Votre bilan — ${r.company}`)}&body=${encodeURIComponent(`Bonjour ${r.firstname},\n\nMerci beaucoup d'avoir pris le temps de remplir ce bilan.\n\n`)}"
            style="display:inline-block;padding:12px 28px;background:#ff5c2c;color:#fff;text-decoration:none;border-radius:999px;font-weight:600;">→ Répondre à ${escapeHtml(r.firstname)}</a>
       </div>`
    : '';

  const verbatimHtml = r.q14Verbatim
    ? `<h3 style="margin:24px 0 8px;font-size:13px;color:#161210;">💬 Verbatim ${r.publishConsent ? 'publiable' : '(publication NON autorisée)'}</h3>
       <blockquote style="margin:0;padding:14px 16px;background:#fff4ef;border-left:3px solid #ff5c2c;border-radius:0 8px 8px 0;font-size:15px;font-style:italic;white-space:pre-wrap;">${escapeHtml(r.q14Verbatim)}</blockquote>`
    : '';

  const decisions = r.q6Decision.map((k) => DECISION[k]);
  if (r.q6DecisionOther) decisions.push(r.q6DecisionOther);

  const htmlContent = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;color:#161210;">
      <div style="background:${tone.bg};color:#fff;padding:22px 24px;border-radius:12px 12px 0 0;">
        <p style="margin:0 0 10px;font-size:13px;opacity:.85;">Bilan de fin de mission — ${escapeHtml(r.company)}</p>
        <div style="font-size:30px;font-weight:700;line-height:1.1;">${r.q12Nps}/10 &nbsp;<span style="font-size:15px;font-weight:400;opacity:.9;">${tone.label}</span></div>
        <div style="margin-top:6px;font-size:15px;opacity:.9;">Satisfaction globale : ${r.q1Satisfaction}/5${r.q2Expectation ? ` · ${escapeHtml(EXPECTATION[r.q2Expectation])}` : ''}</div>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;">

        <h3 style="margin:0 0 10px;font-size:13px;color:#161210;">⚡ Actions à déclencher</h3>
        ${buildActionsHtml(r)}

        ${verbatimHtml}

        <h3 style="margin:24px 0 8px;font-size:13px;color:#161210;">📊 Étapes du projet</h3>
        ${scaleRowsHtml(r.q3Steps, STEPS)}

        <h3 style="margin:20px 0 8px;font-size:13px;color:#161210;">📊 Communication</h3>
        ${scaleRowsHtml(r.q4Communication, COMMUNICATION)}

        ${r.q8Value ? `<h3 style="margin:22px 0 6px;font-size:13px;color:#161210;">Valeur perçue</h3><p style="margin:0;font-size:14px;">${escapeHtml(VALUE[r.q8Value])}</p>` : ''}
        ${decisions.length ? `<h3 style="margin:22px 0 6px;font-size:13px;color:#161210;">Ce qui l'a décidé</h3><p style="margin:0;font-size:14px;">${escapeHtml(decisions.join(' · '))}</p>` : ''}

        ${freeTextHtml('😕 Moment de flottement (Q5)', r.q5Friction)}
        ${freeTextHtml('🎯 Bénéfice attendu (Q9)', r.q9Benefit)}
        ${freeTextHtml('🔧 Ce qui manquait pour gagner les points (Q13-bis)', r.q13bisMissing)}
        ${freeTextHtml('📝 Mot de la fin (Q15)', r.q15Extra)}

        ${replyButton}

        <p style="margin:22px 0 0;font-size:11px;color:#aaa;text-align:center;">
          ${escapeHtml(r.project || 'projet non identifié')}${r.deliveredAt ? ` · livré le ${escapeHtml(r.deliveredAt)}` : ''}
          ${r.durationSeconds ? ` · rempli en ${Math.round(r.durationSeconds / 60)} min` : ''}
          · IP ${escapeHtml(ip || '?')} · ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
        </p>
      </div>
    </div>
  `;

  const body = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: env.NOTIFY_TO_EMAIL }],
    subject: `[Bilan] ${r.firstname} — ${r.company} — ${r.q12Nps}/10`,
    htmlContent,
  };
  if (r.email) body.replyTo = { email: r.email, name: r.firstname };

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error('Brevo send failed', res.status, await res.text());
      return { sent: false, reason: 'brevo_error' };
    }
    return { sent: true };
  } catch (err) {
    console.error('Brevo network error', err);
    return { sent: false, reason: 'network' };
  }
}

/* ------------------------------------------------------------------ */
/* Handler                                                             */
/* ------------------------------------------------------------------ */

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // ---- Honeypot : on acquitte sans rien enregistrer, pour ne pas révéler le piège.
  if (clean(body.website, 10)) return json({ ok: true });

  // ---- Identité : le token fait foi ; le corps de requête n'est lu qu'en fallback (F3).
  let firstname = '';
  let company = '';
  let project = '';
  let deliveredAt = '';
  let email = '';
  let tokenRef = null;

  const rawToken = clean(body.token, 800);
  if (rawToken && env.SIGNING_KEY) {
    const payload = await verifyToken(rawToken, env.SIGNING_KEY);
    if (payload) {
      firstname = clean(payload.c, 80);
      company = clean(payload.co, 120);
      project = clean(payload.p, 120);
      deliveredAt = clean(payload.d, 20);
      email = clean(payload.e, 254).toLowerCase();
      // Partie payload du token : stable pour un lien donné, sert de clé d'upsert (F11).
      tokenRef = rawToken.split('.')[0] || null;
    }
  }
  if (!firstname) firstname = clean(body.firstname, 80);
  if (!company) company = clean(body.company, 120);

  // ---- Champs & whitelists ----
  const q1Satisfaction = intInRange(body.q1_satisfaction, 1, 5);
  const q2Expectation = pickKey(body.q2_expectation, EXPECTATION);
  const q3Steps = pickScale(body.q3_steps, STEPS);
  const q4Communication = pickScale(body.q4_communication, COMMUNICATION);
  const q5Friction = clean(body.q5_friction, 2000);
  const q6Decision = pickKeys(body.q6_decision, DECISION);
  const q6DecisionOther = q6Decision.includes('autre') ? clean(body.q6_decision_other, 200) : '';
  const q8Value = pickKey(body.q8_value, VALUE);
  const q9Benefit = clean(body.q9_benefit, 2000);
  const q10Needs = pickKeys(body.q10_needs, NEEDS);
  const q10NeedsOther = q10Needs.includes('autre') ? clean(body.q10_needs_other, 200) : '';
  const q12Nps = intInRange(body.q12_nps, 0, 10);
  const q15Extra = clean(body.q15_extra, 2000);
  const consent = body.consent === true;
  const publishConsent = body.publish_consent === true;
  const durationSeconds = intInRange(body.duration_seconds, 0, 86400);

  // ---- Validation : seuls Q1, Q12 et le consentement sont requis (doc §4) ----
  if (!firstname) return json({ error: 'missing_firstname' }, 400);
  if (!company) return json({ error: 'missing_company' }, 400);
  if (q1Satisfaction === null) return json({ error: 'missing_q1_satisfaction' }, 400);
  if (q12Nps === null) return json({ error: 'missing_q12_nps' }, 400);
  if (!consent) return json({ error: 'missing_consent' }, 400);

  // ---- Branchement : le score décide de la branche, pas le client (doc §5).
  // On ignore côté serveur tout champ appartenant à l'autre branche, pour qu'un
  // POST forgé ne puisse pas mélanger « détracteur » et demandes de recommandation.
  const isPromoter = q12Nps >= PROMOTER_THRESHOLD;

  const q13Asks = isPromoter ? pickKeys(body.q13_asks, ASKS) : [];
  const linkedinMode = isPromoter && q13Asks.includes('linkedin')
    ? pickKey(body.q13_linkedin_mode, LINKEDIN_MODE)
    : null;
  const q14Verbatim = isPromoter ? clean(body.q14_verbatim, 1000) : '';

  const q13bisMissing = isPromoter ? '' : clean(body.q13bis_missing, 2000);
  const q13terCallback = isPromoter ? null : (body.q13ter_callback === true ? 1 : 0);

  const ip = request.headers.get('cf-connecting-ip') || '';
  const ua = (request.headers.get('user-agent') || '').slice(0, 300);

  const record = {
    firstname, company, project, deliveredAt, email,
    q1Satisfaction, q2Expectation, q3Steps, q4Communication, q5Friction,
    q6Decision, q6DecisionOther, q8Value, q9Benefit,
    q10Needs, q10NeedsOther,
    q12Nps, q13Asks, linkedinMode, q14Verbatim, q13bisMissing, q13terCallback,
    q15Extra, consent, publishConsent, durationSeconds,
  };

  // ---- Insert / update D1 ----
  // ON CONFLICT sur token_ref : re-soumettre le même lien met la réponse à jour
  // au lieu de créer un doublon (F11). Les soumissions sans token (token_ref NULL)
  // ne déclenchent jamais le conflit et s'empilent normalement.
  try {
    await env.DB.prepare(
      `INSERT INTO satisfaction_responses (
         token_ref, variant, firstname, company, project, delivered_at,
         q1_satisfaction, q2_expectation, q3_steps, q4_communication, q5_friction,
         q6_decision, q6_decision_other, q8_value, q9_benefit,
         q10_needs, q10_needs_other,
         q12_nps, q13_asks, q13_linkedin_mode, q14_verbatim, q13bis_missing, q13ter_callback,
         q15_extra, consent, publish_consent, duration_seconds, ip, user_agent
       ) VALUES (?, 'agence', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(token_ref) DO UPDATE SET
         firstname = excluded.firstname,
         company = excluded.company,
         project = excluded.project,
         delivered_at = excluded.delivered_at,
         q1_satisfaction = excluded.q1_satisfaction,
         q2_expectation = excluded.q2_expectation,
         q3_steps = excluded.q3_steps,
         q4_communication = excluded.q4_communication,
         q5_friction = excluded.q5_friction,
         q6_decision = excluded.q6_decision,
         q6_decision_other = excluded.q6_decision_other,
         q8_value = excluded.q8_value,
         q9_benefit = excluded.q9_benefit,
         q10_needs = excluded.q10_needs,
         q10_needs_other = excluded.q10_needs_other,
         q12_nps = excluded.q12_nps,
         q13_asks = excluded.q13_asks,
         q13_linkedin_mode = excluded.q13_linkedin_mode,
         q14_verbatim = excluded.q14_verbatim,
         q13bis_missing = excluded.q13bis_missing,
         q13ter_callback = excluded.q13ter_callback,
         q15_extra = excluded.q15_extra,
         consent = excluded.consent,
         publish_consent = excluded.publish_consent,
         duration_seconds = excluded.duration_seconds,
         ip = excluded.ip,
         user_agent = excluded.user_agent,
         updated_at = datetime('now')`
    )
      .bind(
        tokenRef,
        firstname, company, project || null, deliveredAt || null,
        q1Satisfaction, q2Expectation,
        Object.keys(q3Steps).length ? JSON.stringify(q3Steps) : null,
        Object.keys(q4Communication).length ? JSON.stringify(q4Communication) : null,
        q5Friction || null,
        q6Decision.length ? q6Decision.join(',') : null,
        q6DecisionOther || null,
        q8Value,
        q9Benefit || null,
        q10Needs.length ? q10Needs.join(',') : null,
        q10NeedsOther || null,
        q12Nps,
        q13Asks.length ? q13Asks.join(',') : null,
        linkedinMode,
        q14Verbatim || null,
        q13bisMissing || null,
        q13terCallback,
        q15Extra || null,
        consent ? 1 : 0,
        publishConsent ? 1 : 0,
        durationSeconds,
        ip, ua
      )
      .run();
  } catch (err) {
    // Même arbitrage que /api/contact : la notif email prime, on n'échoue pas la requête.
    console.error('D1 insert (bilan) failed', err);
  }

  // ---- Notification email ----
  const notif = await sendNotificationEmail(env, record, ip);
  if (!notif.sent) console.warn('Bilan notification not sent', notif.reason);

  return json({ ok: true });
}
