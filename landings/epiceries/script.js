/* ============================================
   LaunchPad × Épiceries Fines — script.js
   ============================================ */

(function () {
  'use strict';

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 8) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const open = primaryNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });

    // Close on link click (mobile)
    primaryNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        if (primaryNav.classList.contains('open')) {
          primaryNav.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Ouvrir le menu');
        }
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('visible'));
  }

  /* ---------- Lead form ---------- */
  const form = document.getElementById('leadForm');
  const success = document.getElementById('leadFormSuccess');

  if (form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : '';

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const data = new FormData(form);
      const payload = {
        firstname: (data.get('firstname') || '').toString().trim(),
        email: (data.get('email') || '').toString().trim(),
        guide: (data.get('guide') || '').toString(),
      };

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours…';
      }

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('request_failed');
        const json = await res.json();
        if (!json.downloadUrl) throw new Error('no_url');

        // Déclenche le téléchargement du PDF
        window.location.href = json.downloadUrl;

        // Réinitialise et affiche le message de succès
        form.querySelectorAll('input').forEach((i) => {
          if (i.type !== 'radio') i.value = '';
        });
        if (success) {
          success.hidden = false;
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } catch (err) {
        alert("Une erreur est survenue. Merci de réessayer dans un instant.");
        console.error(err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    });
  }

  /* ---------- Contact modal ---------- */
  const contactModal = document.getElementById('contactModal');
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactFormSuccess');
  const contactError = document.getElementById('contactFormError');
  const successName = document.getElementById('contactSuccessName');

  if (contactModal) {
    let lastFocused = null;
    let turnstileWidgetId = null;

    const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      const focusables = contactModal.querySelectorAll(FOCUSABLE);
      const visible = Array.from(focusables).filter((el) => el.offsetParent !== null);
      if (!visible.length) return;
      const first = visible[0];
      const last = visible[visible.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function openContact(source) {
      lastFocused = document.activeElement;
      contactModal.classList.add('is-open');
      contactModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      // reset states
      if (contactSuccess) contactSuccess.hidden = true;
      if (contactForm) contactForm.hidden = false;
      if (contactError) { contactError.hidden = true; contactError.textContent = ''; }
      if (source && contactForm) contactForm.dataset.source = source;
      // focus the first input shortly after the open transition
      setTimeout(() => {
        const firstInput = contactModal.querySelector('#contact_firstname');
        if (firstInput) firstInput.focus();
      }, 120);
      document.addEventListener('keydown', onKeydown);
      // render Turnstile if loaded and not yet rendered
      renderTurnstile();
    }

    function closeContact() {
      contactModal.classList.remove('is-open');
      contactModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') {
        try { lastFocused.focus(); } catch (_) {}
      }
    }

    function onKeydown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeContact();
      } else {
        trapFocus(e);
      }
    }

    function renderTurnstile() {
      const el = contactModal.querySelector('.cf-turnstile');
      if (!el) return;
      const sitekey = el.getAttribute('data-sitekey');
      if (!sitekey) { el.style.display = 'none'; return; }
      if (turnstileWidgetId !== null) return;
      if (typeof window.turnstile === 'undefined') return;
      turnstileWidgetId = window.turnstile.render(el, { sitekey });
    }

    // Open triggers
    document.querySelectorAll('.js-open-contact').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const source = trigger.getAttribute('data-cta-source') || '';
        openContact(source);
      });
    });

    // Close triggers
    contactModal.querySelectorAll('[data-close-contact]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeContact();
      });
    });

    // Open via hash (#contact) on page load or hashchange
    function handleHash() {
      if (window.location.hash === '#contact') {
        openContact('hash');
      }
    }
    window.addEventListener('hashchange', handleHash);
    handleHash();

    // Submit
    if (contactForm) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalLabel = submitBtn ? submitBtn.textContent : '';

      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (contactError) { contactError.hidden = true; contactError.textContent = ''; }

        // Native validation
        if (!contactForm.checkValidity()) {
          contactForm.reportValidity();
          return;
        }

        // Availability : at least one selection required
        const availChecks = contactForm.querySelectorAll('input[name="availability"]:checked');
        if (availChecks.length === 0) {
          if (contactError) {
            contactError.textContent = 'Merci d’indiquer au moins une disponibilité.';
            contactError.hidden = false;
          }
          return;
        }

        const data = new FormData(contactForm);
        const payload = {
          firstname: (data.get('firstname') || '').toString().trim(),
          lastname: (data.get('lastname') || '').toString().trim(),
          email: (data.get('email') || '').toString().trim(),
          phone: (data.get('phone') || '').toString().trim(),
          company: (data.get('company') || '').toString().trim(),
          city: (data.get('city') || '').toString().trim(),
          message: (data.get('message') || '').toString().trim(),
          availability: data.getAll('availability').map(String),
          availability_notes: (data.get('availability_notes') || '').toString().trim(),
          consent: data.get('consent') === 'on',
          // Honeypot — must remain empty
          website: (data.get('website') || '').toString(),
          // Turnstile token if present
          turnstile_token: (data.get('cf-turnstile-response') || '').toString(),
          source: contactForm.dataset.source || '',
        };

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Envoi en cours…';
        }

        try {
          const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            let msg = 'Une erreur est survenue. Merci de réessayer dans un instant.';
            try {
              const errJson = await res.json();
              if (errJson && errJson.error === 'invalid_email') msg = 'Adresse email invalide.';
              else if (errJson && errJson.error === 'spam_detected') msg = 'Votre demande a été bloquée par le filtre anti-spam. Merci de réessayer.';
              else if (errJson && errJson.error === 'rate_limited') msg = 'Trop de demandes. Merci de réessayer dans quelques minutes.';
            } catch (_) {}
            throw new Error(msg);
          }

          // Success
          if (successName) successName.textContent = (payload.firstname || '') + ' !';
          contactForm.reset();
          contactForm.hidden = true;
          if (contactSuccess) contactSuccess.hidden = false;
          // Reset Turnstile widget if any
          if (turnstileWidgetId !== null && typeof window.turnstile !== 'undefined') {
            try { window.turnstile.reset(turnstileWidgetId); } catch (_) {}
          }
        } catch (err) {
          if (contactError) {
            contactError.textContent = err.message || 'Une erreur est survenue.';
            contactError.hidden = false;
          }
          console.error(err);
        } finally {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = originalLabel;
          }
        }
      });
    }

    // Expose Turnstile callback for async script load
    window.onTurnstileReady = renderTurnstile;
  }
})();
