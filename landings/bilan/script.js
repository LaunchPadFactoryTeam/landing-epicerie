/* =============================================================
   LaunchPad Factory — Bilan de fin de mission (/bilan)
   Cf. doc/offboarding-satisfaction.md — navigation 6 écrans,
   branchement sur le score de recommandation, reprise localStorage.
   ============================================================= */

(() => {
  'use strict';

  const TOTAL_SCREENS = 6;
  const PROMOTER_THRESHOLD = 8; // doit rester aligné sur functions/_shared/bilan.js

  const form = document.getElementById('bilanForm');
  if (!form) return;

  const screens = Array.from(form.querySelectorAll('.bilan-screen'));
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnSubmit = document.getElementById('btnSubmit');
  const errorBox = document.getElementById('formError');
  const progressFill = document.getElementById('progressFill');
  const stepNow = document.getElementById('stepNow');
  const stepTotal = document.getElementById('stepTotal');
  const progress = document.getElementById('bilanProgress');
  const identityFallback = document.getElementById('identityFallback');
  const thanks = document.getElementById('bilanThanks');

  const token = new URLSearchParams(location.search).get('t') || '';
  /** Identité connue (token valide) ou saisie par le client (repli). */
  let context = null;
  let current = 1;
  let submitting = false;
  const startedAt = Date.now();

  /* ---------------------------------------------------------- */
  /* Échelles notées — générées ici pour ne pas alourdir le HTML  */
  /* (les libellés de questions, eux, restent dans index.html)    */
  /* ---------------------------------------------------------- */

  function buildScales() {
    form.querySelectorAll('.scale-field').forEach((field) => {
      const [min, max] = field.dataset.scale.split('-').map(Number);
      const name = field.dataset.name;

      const scale = document.createElement('div');
      scale.className = 'scale-scale';

      for (let value = min; value <= max; value++) {
        const label = document.createElement('label');
        label.className = 'scale-opt';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.value = String(value);
        // La légende du fieldset décrit déjà le groupe ; on nomme chaque option
        // pour que le lecteur d'écran annonce autre chose qu'un nombre isolé.
        input.setAttribute('aria-label', `${value} sur ${max}`);

        const span = document.createElement('span');
        span.textContent = String(value);

        label.append(input, span);
        scale.append(label);
      }
      field.append(scale);

      if (field.dataset.low || field.dataset.high) {
        const ends = document.createElement('div');
        ends.className = 'scale-ends';
        const low = document.createElement('span');
        low.textContent = field.dataset.low || '';
        const high = document.createElement('span');
        high.textContent = field.dataset.high || '';
        ends.append(low, high);
        field.append(ends);
      }
    });
  }

  /* ---------------------------------------------------------- */
  /* Révélations conditionnelles                                  */
  /* ---------------------------------------------------------- */

  /** Vide tous les champs d'un conteneur qu'on vient de masquer. */
  function clearInputs(container) {
    container.querySelectorAll('input, textarea').forEach((el) => {
      if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
      else el.value = '';
    });
  }

  function syncReveal(input) {
    const target = document.getElementById(input.dataset.reveal);
    if (!target) return;
    const show = input.checked;
    if (!show && !target.hidden) clearInputs(target);
    target.hidden = !show;
  }

  function wireReveals() {
    form.querySelectorAll('[data-reveal]').forEach((input) => {
      input.addEventListener('change', () => syncReveal(input));
    });
  }

  /**
   * « Rien pour l'instant » ne peut pas cohabiter avec un besoin coché :
   * cocher l'un décoche l'autre, dans les deux sens.
   */
  function wireExclusive() {
    form.querySelectorAll('input[data-exclusive]').forEach((exclusive) => {
      const siblings = Array.from(form.querySelectorAll(`input[name="${exclusive.name}"]`))
        .filter((el) => el !== exclusive);

      exclusive.addEventListener('change', () => {
        if (!exclusive.checked) return;
        siblings.forEach((el) => {
          if (!el.checked) return;
          el.checked = false;
          if (el.dataset.reveal) syncReveal(el);
        });
      });

      siblings.forEach((el) => {
        el.addEventListener('change', () => {
          if (el.checked) exclusive.checked = false;
        });
      });
    });
  }

  /* ---------------------------------------------------------- */
  /* Branchement recommandation                                   */
  /* ---------------------------------------------------------- */

  const branchPromoter = document.getElementById('branchPromoter');
  const branchDetractor = document.getElementById('branchDetractor');

  function currentNps() {
    const checked = form.querySelector('input[name="q12_nps"]:checked');
    return checked ? Number(checked.value) : null;
  }

  function syncBranch() {
    const nps = currentNps();
    if (nps === null) {
      branchPromoter.hidden = true;
      branchDetractor.hidden = true;
      return;
    }
    const promoter = nps >= PROMOTER_THRESHOLD;

    // On vide la branche abandonnée : sans ça, un client qui corrige son score
    // de 9 à 5 enverrait encore ses demandes de recommandation.
    if (promoter && !branchDetractor.hidden) clearInputs(branchDetractor);
    if (!promoter && !branchPromoter.hidden) {
      clearInputs(branchPromoter);
      document.getElementById('linkedinMode').hidden = true;
    }

    branchPromoter.hidden = !promoter;
    branchDetractor.hidden = promoter;
  }

  function wireBranch() {
    form.querySelectorAll('input[name="q12_nps"]').forEach((input) => {
      input.addEventListener('change', syncBranch);
    });
  }

  /* ---------------------------------------------------------- */
  /* Navigation                                                   */
  /* ---------------------------------------------------------- */

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }
  function clearError() {
    errorBox.hidden = true;
    errorBox.textContent = '';
  }

  function markInvalid(el) {
    el.classList.add('invalid');
    el.addEventListener('input', () => el.classList.remove('invalid'), { once: true });
  }

  /** Seuls Q1, Q12 et le consentement bloquent la progression (doc §4). */
  function validateScreen(screen) {
    if (screen === 1) {
      if (identityFallback && !identityFallback.hidden) {
        const firstname = document.getElementById('fbFirstname');
        const company = document.getElementById('fbCompany');
        if (!firstname.value.trim()) { markInvalid(firstname); firstname.focus(); return 'Merci d’indiquer votre prénom.'; }
        if (!company.value.trim()) { markInvalid(company); company.focus(); return 'Merci d’indiquer le nom de votre structure.'; }
      }
      if (!form.querySelector('input[name="q1_satisfaction"]:checked')) {
        return 'Merci de répondre à la première question — c’est la seule vraiment indispensable.';
      }
    }
    if (screen === 5 && currentNps() === null) {
      return 'Merci de choisir une note entre 0 et 10.';
    }
    if (screen === 6 && !document.getElementById('consent').checked) {
      return 'Merci de cocher la case d’accord sur l’enregistrement de vos réponses.';
    }
    return null;
  }

  function setScreen(next) {
    current = next;
    screens.forEach((section) => {
      section.hidden = Number(section.dataset.screen) !== current;
    });

    btnPrev.hidden = current === 1;
    btnNext.hidden = current === TOTAL_SCREENS;
    btnSubmit.hidden = current !== TOTAL_SCREENS;

    stepNow.textContent = String(current);
    progressFill.style.width = `${(current / TOTAL_SCREENS) * 100}%`;
    clearError();

    // Remonter en haut, puis donner le focus au titre de l'écran pour que la
    // navigation au clavier et les lecteurs d'écran suivent le changement.
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const title = screens[current - 1].querySelector('.bilan-screen-title');
    if (title) {
      title.setAttribute('tabindex', '-1');
      title.focus({ preventScroll: true });
    }
  }

  btnNext.addEventListener('click', () => {
    const error = validateScreen(current);
    if (error) { showError(error); return; }
    if (current < TOTAL_SCREENS) setScreen(current + 1);
  });

  btnPrev.addEventListener('click', () => {
    if (current > 1) setScreen(current - 1);
  });

  /* ---------------------------------------------------------- */
  /* Reprise de saisie (localStorage)                             */
  /* ---------------------------------------------------------- */

  // Clé liée au lien : deux clients sur le même navigateur ne se marchent pas dessus.
  const storageKey = `lpf-bilan:${token ? token.slice(0, 24) : 'anon'}`;

  function saveState() {
    try {
      const state = {};
      form.querySelectorAll('input[name], textarea[name]').forEach((el) => {
        if (el.name === 'website') return; // honeypot : jamais persisté
        if (el.type === 'checkbox') {
          if (el.checked) (state[el.name] ||= []).push(el.value || 'on');
        } else if (el.type === 'radio') {
          if (el.checked) state[el.name] = el.value;
        } else if (el.value) {
          state[el.name] = el.value;
        }
      });
      localStorage.setItem(storageKey, JSON.stringify({ screen: current, values: state }));
    } catch {
      // Navigation privée ou quota plein : la reprise est un confort, pas une exigence.
    }
  }

  function restoreState() {
    let saved;
    try {
      saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
    } catch {
      return;
    }
    if (!saved || !saved.values) return;

    for (const [name, value] of Object.entries(saved.values)) {
      const fields = form.querySelectorAll(`[name="${CSS.escape(name)}"]`);
      if (fields.length === 0) continue;
      const first = fields[0];

      if (first.type === 'checkbox') {
        const values = Array.isArray(value) ? value : [value];
        fields.forEach((el) => { el.checked = values.includes(el.value || 'on'); });
      } else if (first.type === 'radio') {
        fields.forEach((el) => { el.checked = el.value === value; });
      } else {
        first.value = value;
      }
    }

    // Rejouer les dépendances pour que l'affichage colle aux valeurs restaurées.
    form.querySelectorAll('[data-reveal]').forEach(syncReveal);
    syncBranch();

    if (Number.isInteger(saved.screen) && saved.screen >= 1 && saved.screen <= TOTAL_SCREENS) {
      setScreen(saved.screen);
    }
  }

  form.addEventListener('input', saveState);
  form.addEventListener('change', saveState);

  /* ---------------------------------------------------------- */
  /* Contexte client (token)                                      */
  /* ---------------------------------------------------------- */

  function formatDate(iso) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return '';
    const date = new Date(`${iso}T12:00:00Z`);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function applyContext(data) {
    context = data;
    document.getElementById('bilanTitle').textContent = data.company || 'Votre projet';

    const delivered = formatDate(data.delivered);
    if (delivered) {
      const meta = document.getElementById('bilanMeta');
      meta.textContent = `Mis en ligne le ${delivered}`;
      meta.hidden = false;
    }
    document.title = `Bilan — ${data.company || 'votre projet'} · LaunchPad Factory`;
  }

  function enableFallback() {
    // Lien absent, altéré ou expiré : on ne bloque pas, on demande l'identité (F3).
    identityFallback.hidden = false;
    if (token) document.getElementById('tokenAlert').hidden = false;
  }

  async function loadContext() {
    if (!token) { enableFallback(); return; }
    try {
      const res = await fetch(`/api/bilan-context?t=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (data && data.ok) applyContext(data);
      else enableFallback();
    } catch {
      enableFallback();
    }
  }

  /* ---------------------------------------------------------- */
  /* Envoi                                                        */
  /* ---------------------------------------------------------- */

  function radioValue(name) {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  }

  function checkedValues(name) {
    return Array.from(form.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
  }

  function textValue(name) {
    const el = form.querySelector(`[name="${name}"]`);
    return el ? el.value.trim() : '';
  }

  /** Reconstitue une matrice { clé: note } à partir des champs `prefix_clé`. */
  function scaleGroup(prefix, keys) {
    const out = {};
    for (const key of keys) {
      const value = radioValue(`${prefix}_${key}`);
      if (value !== null) out[key] = Number(value);
    }
    return out;
  }

  function collectPayload() {
    const nps = currentNps();
    const promoter = nps !== null && nps >= PROMOTER_THRESHOLD;

    const payload = {
      token,
      website: textValue('website'), // honeypot
      duration_seconds: Math.round((Date.now() - startedAt) / 1000),

      q1_satisfaction: Number(radioValue('q1_satisfaction')),
      q2_expectation: radioValue('q2_expectation'),
      q3_steps: scaleGroup('q3', ['contact', 'cadrage', 'design', 'suivi', 'livraison']),
      q4_communication: scaleGroup('q4', ['reactivite', 'clarte', 'delais']),
      q5_friction: textValue('q5_friction'),
      q6_decision: checkedValues('q6_decision'),
      q6_decision_other: textValue('q6_decision_other'),
      q8_value: radioValue('q8_value'),
      q9_benefit: textValue('q9_benefit'),
      q10_needs: checkedValues('q10_needs'),
      q10_needs_other: textValue('q10_needs_other'),
      q12_nps: nps,
      q15_extra: textValue('q15_extra'),
      consent: document.getElementById('consent').checked,
      publish_consent: document.getElementById('publishConsent').checked,
    };

    // Le serveur revalide le branchement ; on n'envoie tout de même que la
    // branche pertinente, pour ne pas transporter des réponses abandonnées.
    if (promoter) {
      payload.q13_asks = checkedValues('q13_asks');
      payload.q13_linkedin_mode = radioValue('q13_linkedin_mode');
      payload.q14_verbatim = textValue('q14_verbatim');
    } else {
      payload.q13bis_missing = textValue('q13bis_missing');
      payload.q13ter_callback = radioValue('q13ter_callback') === 'oui';
    }

    // Identité : seulement en repli, sinon le token fait foi côté serveur.
    if (!context) {
      payload.firstname = textValue('firstname');
      payload.company = textValue('company');
    }

    return payload;
  }

  /** Écran de remerciement : on rappelle exactement ce qui va se passer (doc §5). */
  function showThanks(payload) {
    const firstname = (context && context.firstname) || payload.firstname || '';
    document.getElementById('thanksTitle').textContent = firstname ? `Merci ${firstname} !` : 'Merci !';

    const promoter = payload.q12_nps >= PROMOTER_THRESHOLD;
    document.getElementById('thanksLead').textContent = promoter
      ? 'Vos réponses sont bien arrivées. Voilà ce qu’on fait maintenant :'
      : 'Vos réponses sont bien arrivées — et elles vont nous servir. Voilà la suite :';

    const steps = [];
    const asks = payload.q13_asks || [];

    if (asks.includes('linkedin')) {
      steps.push(payload.q13_linkedin_mode === 'assisted'
        ? 'On vous envoie une proposition de texte et les visuels du site d’ici 48 h.'
        : 'On vous envoie les visuels du site d’ici 48 h.');
    }
    if (asks.includes('avis_google')) steps.push('On vous envoie le lien direct vers notre fiche Google d’ici 48 h.');
    if (asks.includes('mise_en_relation')) steps.push('On vous appelle dans la semaine pour la mise en relation.');
    if (asks.includes('reference')) steps.push('On vous montrera la page projet avant toute publication.');
    if (payload.q13ter_callback) steps.push('On vous appelle sous 24 h pour en parler de vive voix.');

    const needs = (payload.q10_needs || []).filter((n) => n !== 'rien' && n !== 'autre');
    if (needs.length || payload.q10_needs_other) {
      steps.push('On revient vers vous dans la semaine sur les sujets que vous avez cochés.');
    }
    if (steps.length === 0) {
      steps.push('On lit chaque réponse — si un point mérite un échange, on vous écrit dans la semaine.');
    }

    const list = document.getElementById('thanksList');
    list.innerHTML = '';
    for (const step of steps) {
      const li = document.createElement('li');
      li.textContent = step;
      list.append(li);
    }

    form.hidden = true;
    progress.hidden = true;
    thanks.hidden = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitting) return;

    const error = validateScreen(TOTAL_SCREENS);
    if (error) { showError(error); return; }

    submitting = true;
    btnSubmit.disabled = true;
    const originalLabel = btnSubmit.textContent;
    btnSubmit.textContent = 'Envoi…';
    clearError();

    const payload = collectPayload();

    try {
      const res = await fetch('/api/bilan', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);

      if (!res.ok || !data || !data.ok) {
        throw new Error((data && data.error) || 'request_failed');
      }

      try { localStorage.removeItem(storageKey); } catch { /* sans importance */ }
      showThanks(payload);
    } catch {
      showError('L’envoi a échoué. Vérifiez votre connexion et réessayez — vos réponses sont conservées.');
      btnSubmit.disabled = false;
      btnSubmit.textContent = originalLabel;
      submitting = false;
    }
  });

  /* ---------------------------------------------------------- */
  /* Init                                                         */
  /* ---------------------------------------------------------- */

  stepTotal.textContent = String(TOTAL_SCREENS);
  buildScales();
  wireReveals();
  wireExclusive();
  wireBranch();
  setScreen(1);
  restoreState();
  loadContext();
})();
