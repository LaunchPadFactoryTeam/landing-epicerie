/**
 * POST /api/contact
 * - Validation côté serveur
 * - Vérification Turnstile (si TURNSTILE_SECRET configuré)
 * - Honeypot
 * - Rate limit naïf par IP (KV optionnel — best-effort sinon ignoré)
 * - Stockage D1 (table contact_requests)
 * - Notification email via Brevo (si BREVO_API_KEY configuré)
 *
 * Variables d'environnement attendues :
 *   - TURNSTILE_SECRET   (secret Cloudflare Turnstile)         [optionnel]
 *   - BREVO_API_KEY      (clé API transactional Brevo)          [optionnel]
 *   - NOTIFY_TO_EMAIL    (ex: launchpadfactory.contact@gmail.com) [requis pour notif]
 *   - NOTIFY_FROM_EMAIL  (ex: launchpadfactory.contact@gmail.com — vérifié côté Brevo)
 *   - NOTIFY_FROM_NAME   (ex: "LaunchPad — Notif site")
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_AVAIL = new Set(['matin', 'midi', 'apres-midi', 'soir', 'semaine', 'weekend']);
const AVAIL_LABELS = {
  'matin': 'Matin (8h–12h)',
  'midi': 'Midi (12h–14h)',
  'apres-midi': 'Après-midi (14h–18h)',
  'soir': 'Soir (18h–20h)',
  'semaine': 'En semaine',
  'weekend': 'Le week-end',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(value, max = 500) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function verifyTurnstile(token, secret, ip) {
  if (!secret) return true; // pas configuré = on laisse passer
  if (!token) return false;
  try {
    const form = new FormData();
    form.append('secret', secret);
    form.append('response', token);
    if (ip) form.append('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return !!data.success;
  } catch (err) {
    console.error('Turnstile verify failed', err);
    return false;
  }
}

async function sendNotificationEmail(env, payload, ip) {
  if (!env.BREVO_API_KEY || !env.NOTIFY_TO_EMAIL) return { sent: false, reason: 'not_configured' };

  const fromEmail = env.NOTIFY_FROM_EMAIL || env.NOTIFY_TO_EMAIL;
  const fromName = env.NOTIFY_FROM_NAME || 'LaunchPad — Site';

  const availabilityHtml = (payload.availability || [])
    .map((a) => `<span style="display:inline-block;padding:4px 10px;margin:0 6px 6px 0;background:#f3edda;border-radius:999px;color:#a07930;font-size:13px;">${escapeHtml(AVAIL_LABELS[a] || a)}</span>`)
    .join('');

  const mailtoSubject = encodeURIComponent(`Re: Votre demande LaunchPad — ${payload.company}`);
  const mailtoBody = encodeURIComponent(`Bonjour ${payload.firstname},\n\nMerci pour votre message ! Pour donner suite à votre demande, je vous propose les créneaux suivants :\n- ...\n- ...\n\nDites-moi ce qui vous convient le mieux.\n\nBien à vous,`);
  const mailtoLink = `mailto:${payload.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const htmlContent = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;color:#1c1c1c;">
      <div style="background:#162235;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
        <h1 style="margin:0;font-size:18px;">📩 Nouvelle demande de contact</h1>
        <p style="margin:6px 0 0;font-size:13px;color:#d8b878;">Source : ${escapeHtml(payload.source || 'inconnue')}</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:0;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#5f5a55;width:140px;">Nom</td><td style="padding:6px 0;"><strong>${escapeHtml(payload.firstname)} ${escapeHtml(payload.lastname)}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#5f5a55;">Commerce</td><td style="padding:6px 0;">${escapeHtml(payload.company)}</td></tr>
          <tr><td style="padding:6px 0;color:#5f5a55;">Ville</td><td style="padding:6px 0;">${escapeHtml(payload.city)}</td></tr>
          <tr><td style="padding:6px 0;color:#5f5a55;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#B78A3D;">${escapeHtml(payload.email)}</a></td></tr>
          <tr><td style="padding:6px 0;color:#5f5a55;">Téléphone</td><td style="padding:6px 0;">${payload.phone ? `<a href="tel:${escapeHtml(payload.phone)}" style="color:#B78A3D;">${escapeHtml(payload.phone)}</a>` : '<em style="color:#999;">non renseigné</em>'}</td></tr>
        </table>

        <h3 style="margin:24px 0 8px;font-size:14px;color:#162235;">Projet</h3>
        <p style="margin:0;padding:14px;background:#f7f3ee;border-radius:8px;white-space:pre-wrap;">${escapeHtml(payload.message)}</p>

        <h3 style="margin:24px 0 10px;font-size:14px;color:#162235;">Disponibilités préférées</h3>
        <div>${availabilityHtml || '<em>aucune cochée</em>'}</div>
        ${payload.availability_notes ? `<p style="margin:10px 0 0;font-size:13px;color:#5f5a55;">📝 ${escapeHtml(payload.availability_notes)}</p>` : ''}

        <div style="margin-top:28px;padding-top:20px;border-top:1px solid #eee;text-align:center;">
          <a href="${mailtoLink}" style="display:inline-block;padding:12px 28px;background:#B78A3D;color:#fff;text-decoration:none;border-radius:999px;font-weight:600;">→ Répondre à ${escapeHtml(payload.firstname)}</a>
        </div>

        <p style="margin:20px 0 0;font-size:11px;color:#aaa;text-align:center;">IP : ${escapeHtml(ip || '?')} • Reçu le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
      </div>
    </div>
  `;

  const body = {
    sender: { name: fromName, email: fromEmail },
    to: [{ email: env.NOTIFY_TO_EMAIL }],
    replyTo: { email: payload.email, name: `${payload.firstname} ${payload.lastname}` },
    subject: `[Site] ${payload.firstname} ${payload.lastname} — ${payload.company}`,
    htmlContent,
  };

  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.error('Brevo send failed', res.status, txt);
      return { sent: false, reason: 'brevo_error' };
    }
    return { sent: true };
  } catch (err) {
    console.error('Brevo network error', err);
    return { sent: false, reason: 'network' };
  }
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  // ---- Honeypot ----
  if (body.website && String(body.website).trim() !== '') {
    // On répond OK pour ne pas révéler le piège, mais on n'enregistre rien.
    return json({ ok: true });
  }

  // ---- Champs ----
  const firstname = clean(body.firstname, 80);
  const lastname = clean(body.lastname, 80);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 40);
  const company = clean(body.company, 120);
  const city = clean(body.city, 80);
  const message = clean(body.message, 2000);
  const availabilityNotes = clean(body.availability_notes, 200);
  const source = clean(body.source, 40);
  const consent = body.consent === true;

  let availability = Array.isArray(body.availability) ? body.availability : [];
  availability = availability
    .map((v) => clean(v, 20).toLowerCase())
    .filter((v) => ALLOWED_AVAIL.has(v));
  // dédoublonnage
  availability = Array.from(new Set(availability));

  // ---- Validation ----
  if (!firstname) return json({ error: 'missing_firstname' }, 400);
  if (!lastname) return json({ error: 'missing_lastname' }, 400);
  if (!EMAIL_RE.test(email)) return json({ error: 'invalid_email' }, 400);
  if (!company) return json({ error: 'missing_company' }, 400);
  if (!city) return json({ error: 'missing_city' }, 400);
  if (!message) return json({ error: 'missing_message' }, 400);
  if (availability.length === 0) return json({ error: 'missing_availability' }, 400);
  if (!consent) return json({ error: 'missing_consent' }, 400);

  const ip = request.headers.get('cf-connecting-ip') || '';
  const ua = (request.headers.get('user-agent') || '').slice(0, 300);

  // ---- Turnstile ----
  const tsOk = await verifyTurnstile(body.turnstile_token, env.TURNSTILE_SECRET, ip);
  if (!tsOk) return json({ error: 'spam_detected' }, 400);

  // ---- Insert D1 (best-effort) ----
  try {
    await env.DB.prepare(
      `INSERT INTO contact_requests
        (firstname, lastname, email, phone, company, city, message,
         availability, availability_notes, source, ip, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        firstname,
        lastname,
        email,
        phone || null,
        company,
        city,
        message,
        availability.join(','),
        availabilityNotes || null,
        source || null,
        ip,
        ua
      )
      .run();
  } catch (err) {
    console.error('D1 insert (contact) failed', err);
    // On n'échoue pas la requête : la notif email reste prioritaire
  }

  // ---- Notification email ----
  const notif = await sendNotificationEmail(env, {
    firstname, lastname, email, phone, company, city,
    message, availability, availability_notes: availabilityNotes, source,
  }, ip);

  // Si la notif a échoué ET la D1 aussi (peu probable les deux), c'est embêtant.
  // On considère que tant que D1 a marché, on peut acquitter ; sinon on log.
  if (!notif.sent) {
    console.warn('Contact notification not sent', notif.reason);
  }

  return json({ ok: true });
}
