# 📞 Modal de contact / Réservation d'appel

> Documentation complète de la feature « Réserver un appel » : démarche, mise en place, utilisation au quotidien et pistes d'amélioration.

---

## 🧭 Sommaire

1. [Le besoin & les contraintes](#1-le-besoin--les-contraintes)
2. [La démarche & les arbitrages](#2-la-démarche--les-arbitrages)
3. [Architecture mise en place](#3-architecture-mise-en-place)
4. [Setup pas-à-pas (production)](#4-setup-pas-à-pas-production)
5. [Utilisation au quotidien](#5-utilisation-au-quotidien)
6. [Sécurité & RGPD](#6-sécurité--rgpd)
7. [Tests & vérifications](#7-tests--vérifications)
8. [Limites assumées de la v1](#8-limites-assumées-de-la-v1)
9. [Alternatives écartées (et pourquoi)](#9-alternatives-écartées-et-pourquoi)
10. [Roadmap & ouvertures v2+](#10-roadmap--ouvertures-v2)

---

## 1. Le besoin & les contraintes

### Besoin
Tous les CTA "Réserver un appel" de la landing étaient des `href="#"` morts. Il fallait une vraie capture de demandes de RDV.

### Contraintes
| # | Contrainte | Conséquence |
|---|---|---|
| 1 | **Agence en lancement**, peu de leads attendus à court terme | Pas de Calendly visible (vide = perte de crédibilité) |
| 2 | **2 collaborateurs avec un job à côté** | Indisponibilité sur les créneaux de bureau classiques |
| 3 | **Setup gratuit** primordial | Pas de SaaS payant, pas d'infra dédiée |
| 4 | **Stack existante** : HTML/CSS/JS vanilla + Cloudflare Pages + Pages Functions + D1 + R2 | Réutiliser ce qu'on a déjà (cf. `lead.js`) |
| 5 | **Pas de domaine email pro** vérifié — uniquement `launchpadfactory.contact@gmail.com` | Risque spam si on envoie un mail au prospect depuis le serveur |

---

## 2. La démarche & les arbitrages

### Idée initiale du client
> Formulaire dédié → champ "dispo préférentielle" → mail auto de confirmation au prospect → on revient vers lui pour caler une date.

### Ce qui a été retenu
- ✅ **Formulaire dédié, pas de Calendly** (contrainte #1 et #2)
- ✅ **Champ "dispo préférentielle" structuré** (cases à cocher : matin/midi/après-midi/soir/semaine/weekend) + champ texte libre optionnel — plus rapide qu'un date picker, qualifie sans alourdir
- ✅ **Modal** (vs page dédiée) : moins de friction, contexte conservé
- ✅ **Notification email instantanée pour vous** via Brevo (free tier 300/jour)

### Ce qui a été modifié vs idée initiale
- ❌ **Pas d'email automatique de confirmation au prospect** dans cette v1
  - Raison : sans domaine email vérifié (DKIM/SPF), un mail auto finit en spam dans 70 % des cas + look non pro ("via brevo.com")
  - Compensation : un **état de succès très rassurant** dans la modal qui annonce une réponse humaine sous 24h ouvrées depuis votre Gmail
  - **Avantage caché** : c'est même *plus* engageant — "réponse personnalisée" colle au positionnement "on ne disparaît pas après la livraison"

---

## 3. Architecture mise en place

```
┌──────────────────────┐  POST /api/contact  ┌─────────────────────┐
│ Modal #contactModal  │ ──────────────────► │ functions/api/      │
│ (HTML/CSS/JS vanilla)│                     │   contact.js        │
│  • Honeypot          │                     │                     │
│  • Turnstile (opt.)  │                     │  ┌───────────────┐  │
│  • Validation native │                     │  │ Validation    │  │
└──────────────────────┘                     │  │ + Honeypot    │  │
                                             │  │ + Turnstile   │  │
                                             │  └───────┬───────┘  │
                                             │          │          │
                                             │  ┌───────▼───────┐  │
                                             │  │ INSERT D1     │  │
                                             │  │ contact_      │  │
                                             │  │   requests    │  │
                                             │  └───────┬───────┘  │
                                             │          │          │
                                             │  ┌───────▼───────┐  │   email HTML
                                             │  │ Brevo API     │──┼──────────────►  📩 launchpadfactory.contact@gmail.com
                                             │  │ /v3/smtp/email│  │
                                             │  └───────────────┘  │
                                             └─────────────────────┘
```

### Fichiers ajoutés / modifiés

| Fichier | Type | Rôle |
|---|---|---|
| `epiceries/index.html` | modifié | Tous les CTA "Réserver un appel" pointent vers `#contact` avec la classe `js-open-contact`. Bloc `<div id="contactModal">…</div>` ajouté en fin de `<body>` |
| `epiceries/style.css` | modifié | Section `CONTACT MODAL` ajoutée en fin de fichier |
| `epiceries/script.js` | modifié | IIFE étendu avec gestion ouverture/fermeture, focus trap, ESC, soumission AJAX |
| `functions/api/contact.js` | nouveau | Endpoint POST : validation, Turnstile, D1, Brevo |
| `schema.sql` | modifié | Table `contact_requests` ajoutée |
| `wrangler.jsonc` | modifié | Commentaires sur les secrets attendus |

### Stack tierce
| Service | Usage | Coût | Limite free |
|---|---|---|---|
| **Cloudflare D1** | Stockage des demandes | Free | 5M lectures/jour, 100k écritures/jour |
| **Cloudflare Pages Functions** | Endpoint `/api/contact` | Free | 100k req/jour |
| **Cloudflare Turnstile** | Anti-spam (CAPTCHA invisible) | **Free illimité** | — |
| **Brevo** (ex-Sendinblue) | Envoi de la notif email | Free | 300 emails/jour |

> Largement au-dessus des besoins d'une agence en lancement.

---

## 4. Setup pas-à-pas (production)

### Étape 1 — Appliquer le schéma D1

La table `contact_requests` doit être créée dans la base D1 existante (`launchpad-leads`).

```powershell
# Local (pour dev)
wrangler d1 execute launchpad-leads --local --file=schema.sql

# Remote (prod)
wrangler d1 execute launchpad-leads --remote --file=schema.sql
```

Vérifier la création :
```powershell
wrangler d1 execute launchpad-leads --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
```

### Étape 2 — Créer un compte Brevo (gratuit)

1. Aller sur https://www.brevo.com → "Inscription gratuite"
2. Remplir avec votre Gmail `launchpadfactory.contact@gmail.com`
3. **Vérifier l'expéditeur** :
   - Menu **Senders, Domains & Dedicated IPs** → **Senders** → **Add a sender**
   - Email : `launchpadfactory.contact@gmail.com`
   - Brevo envoie un lien de validation à votre Gmail → cliquer dessus
4. **Récupérer la clé API** :
   - En haut à droite, cliquer sur votre **avatar/nom** → **SMTP & API**
   - Lien direct : https://app.brevo.com/settings/keys/api
   - Onglet **API Keys** → bouton **Generate a new API key**
   - Nommer : `landing-epicerie-prod`
   - Copier la valeur (commence par `xkeysib-…`) — **ne sera plus affichée**

> ⚠ **Avertissement important — Domaine Freemail (Gmail)**
>
> Brevo affiche un avertissement *"Le domaine Freemail n'est pas recommandé"* sur l'expéditeur Gmail. Conséquences concrètes :
>
> - ✅ **OK pour les notifs internes (vous → vous)** : votre propre Gmail accepte les emails reçus depuis votre Gmail via Brevo.
> - ❌ **PAS OK pour envoyer aux prospects** : depuis 2024, Gmail/Yahoo/Outlook appliquent des règles DMARC strictes qui bloquent ou classent en spam les emails envoyés *"from gmail.com via brevo.com"*. Un mail auto au prospect finirait quasi systématiquement en spam.
>
> ➜ Cela **renforce le choix de la v1** : pas d'email auto au prospect, juste l'écran de succès dans la modal.
> ➜ Pour passer à la phase 2 (mail auto au prospect), il faudra **acheter un domaine pro** (~10€/an) et le vérifier dans Brevo (section **Domains**) pour authentifier SPF + DKIM + DMARC.

### Étape 3 — Configurer Cloudflare Turnstile (recommandé, optionnel)

1. Dashboard Cloudflare → **Turnstile** → **Add site**
2. Site name : `LaunchPad — Épiceries`
3. Hostnames : votre domaine de prod (ex. `launchpadfactory.fr`) — pour tester en local, ajouter aussi `localhost`
4. Widget mode : **Managed** (recommandé)
5. Récupérer **Site Key** (publique) et **Secret Key** (privée)
6. Dans `epiceries/index.html`, remplacer `data-sitekey=""` par votre Site Key :
   ```html
   <div class="cf-turnstile" data-sitekey="0xVOTRE_SITE_KEY" data-theme="light" data-size="flexible"></div>
   ```
7. Ajouter le script Turnstile dans le `<head>` de `index.html` (juste avant la fermeture de `</head>`) :
   ```html
   <script src="https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onTurnstileReady" async defer></script>
   ```

> Si vous laissez `data-sitekey=""`, le widget ne s'affiche pas et le serveur ne vérifie pas Turnstile (c'est le mode "désactivé"). Le honeypot continue de fonctionner.

### Étape 4 — Définir les variables sur Cloudflare Pages

Via le dashboard CF Pages → projet `landing-epicerie` → **Settings → Environment variables** :

**Variables (non chiffrées, OK pour dashboard) :**
| Nom | Valeur |
|---|---|
| `NOTIFY_TO_EMAIL` | `launchpadfactory.contact@gmail.com` |
| `NOTIFY_FROM_EMAIL` | `launchpadfactory.contact@gmail.com` |
| `NOTIFY_FROM_NAME` | `LaunchPad — Site` |

**Secrets (chiffrés) — via CLI ou dashboard "Encrypt" :**
```powershell
wrangler pages secret put BREVO_API_KEY    --project-name landing-epicerie
# Coller la clé xkeysib-... quand demandé

wrangler pages secret put TURNSTILE_SECRET --project-name landing-epicerie
# Coller la Secret Key Turnstile (optionnel)
```

### Étape 5 — Déployer & tester

```powershell
# Si vous déployez via push Git, c'est automatique
git add .
git commit -m "feat(contact): modal de réservation d'appel"
git push

# Sinon, déploiement direct
wrangler pages deploy epiceries --project-name landing-epicerie
```

Tester :
1. Aller sur la landing en prod
2. Cliquer un CTA "Réserver un appel"
3. Remplir + envoyer
4. Vérifier l'arrivée du mail dans `launchpadfactory.contact@gmail.com` (≤ 30 s)
5. Vérifier dans D1 :
   ```powershell
   wrangler d1 execute launchpad-leads --remote --command "SELECT id, firstname, lastname, company, created_at FROM contact_requests ORDER BY id DESC LIMIT 5;"
   ```

---

## 5. Utilisation au quotidien

### Workflow type d'une demande

1. **Ping email instantané** dans `launchpadfactory.contact@gmail.com` :
   - Sujet : `[Site] Sophie M. — Épicerie Bellevue`
   - Corps formaté avec toutes les infos + bouton **→ Répondre à Sophie**
2. **Cliquer le bouton "Répondre"** : ouvre votre Gmail avec :
   - Destinataire pré-rempli (le prospect)
   - Sujet : `Re: Votre demande LaunchPad — Épicerie Bellevue`
   - Corps avec un template proposant 2-3 créneaux à compléter
3. **Adapter et envoyer** sous 24h ouvrées (engagement pris dans la modal)

> Astuce : le `Reply-To` du mail Brevo pointe directement vers le prospect, donc même un "Répondre" classique dans Gmail suffit (pas besoin de cliquer le bouton CTA).

### Consulter l'historique

Toutes les demandes sont en base D1 :

```powershell
# Les 20 dernières
wrangler d1 execute launchpad-leads --remote --command `
  "SELECT id, firstname, lastname, company, city, availability, source, created_at FROM contact_requests ORDER BY id DESC LIMIT 20;"

# Filtrer par statut
wrangler d1 execute launchpad-leads --remote --command `
  "SELECT id, firstname, company, status FROM contact_requests WHERE status='new';"

# Marquer une demande comme répondue
wrangler d1 execute launchpad-leads --remote --command `
  "UPDATE contact_requests SET status='replied' WHERE id=12;"
```

> Le champ `status` est volontairement libre (`new` / `replied` / `converted` / `archived`) pour pouvoir évoluer.

### Tracking source des CTA

Chaque CTA a un `data-cta-source` (hero, nav, problems, processus, final, footer, hash). Permet d'analyser quel CTA performe le mieux :

```sql
SELECT source, COUNT(*) FROM contact_requests GROUP BY source ORDER BY 2 DESC;
```

---

## 6. Sécurité & RGPD

### Sécurité
- ✅ Validation server-side stricte (`functions/api/contact.js`)
- ✅ Limites de longueur sur tous les champs (anti-payload abusif)
- ✅ Whitelist sur les valeurs de `availability`
- ✅ Honeypot invisible (`name="website"`) — bloque les bots simples
- ✅ Cloudflare Turnstile (si activé) — bloque les bots avancés
- ✅ Échappement HTML dans le mail (anti-injection HTML/XSS dans la notif)
- ✅ Pas de secret client-side : la `BREVO_API_KEY` reste sur le Worker
- ✅ Headers CF natifs : `cf-connecting-ip` (anti-spoofing géré par CF)

### RGPD
- ✅ Consentement explicite (checkbox obligatoire)
- ✅ Donnée minimale (pas de tracking, pas de cookies)
- ✅ IP et user-agent loggués pour preuve de consentement et anti-abus
- ✅ Mention claire : "Mes données ne sont ni revendues, ni utilisées pour du démarchage"
- ⚠ **À faire** : créer une vraie page **Politique de confidentialité** et lier le `<a href="#" target="_blank">En savoir plus</a>` dessus
- ⚠ **À faire** : prévoir une procédure de suppression sur demande (`DELETE FROM contact_requests WHERE email=?`)

---

## 7. Tests & vérifications

### Tests manuels à faire avant de mettre en ligne

| # | Action | Attendu |
|---|---|---|
| 1 | Cliquer chaque CTA "Réserver un appel" (nav, hero, problems, processus, final, footer) | Modal s'ouvre |
| 2 | Touche `Escape` | Modal se ferme |
| 3 | Clic sur le backdrop (zone sombre) | Modal se ferme |
| 4 | Clic sur la croix | Modal se ferme |
| 5 | Tab dans la modal | Focus reste piégé dans la modal |
| 6 | Soumettre vide | Erreurs natives HTML5 |
| 7 | Soumettre sans cocher de dispo | Message "Merci d'indiquer au moins une disponibilité" |
| 8 | Soumettre valide | Écran de succès avec le prénom |
| 9 | URL avec `#contact` | Modal s'ouvre au load |
| 10 | Mobile (< 600px) | Modal s'affiche en bottom sheet plein écran |
| 11 | Lighthouse / a11y | Pas de régression de score |

### Tester en local

```powershell
# Démarrer le projet en local (Pages + Functions)
wrangler pages dev epiceries --d1 DB=launchpad-leads
```

Le `BREVO_API_KEY` n'étant probablement pas défini en local, la notif n'est pas envoyée — c'est OK, l'insertion D1 fonctionne et la réponse `{ ok: true }` est renvoyée.

Pour tester l'envoi de mail en local, créer un fichier `.dev.vars` (à ajouter au `.gitignore`) :
```
BREVO_API_KEY=xkeysib-VOTRE_CLE_TEST
NOTIFY_TO_EMAIL=launchpadfactory.contact@gmail.com
NOTIFY_FROM_EMAIL=launchpadfactory.contact@gmail.com
NOTIFY_FROM_NAME=LaunchPad — DEV
```

---

## 8. Limites assumées de la v1

| Limite | Pourquoi assumée | Impact | Mitigation prévue |
|---|---|---|---|
| Pas d'email auto au prospect | Risque spam sans domaine vérifié | Le prospect attend la réponse humaine | Phase 2 (cf. ci-dessous) |
| Notif uniquement par email (pas de Telegram/SMS) | Choix du client (2 collab) | Latence selon vos notifs Gmail | Activer notifs push Gmail mobile |
| Pas de rate limit serveur strict | Turnstile + honeypot suffisent au volume attendu | Risque théorique de flood | Ajouter KV + counter par IP si abus constaté |
| Pas d'admin UI | KISS — `wrangler d1 execute` suffit pour 1-5 leads/semaine | Lourd au-delà de 20 leads/semaine | Phase 3 (cf. ci-dessous) |
| Modal et pas de page dédiée | Choix UX (moins de friction) | Pas d'URL dédiée pour SEO ("contact") | Possible d'ajouter `/contact.html` qui ouvre la modal au load |

---

## 9. Alternatives écartées (et pourquoi)

### Calendly (free tier)
- ❌ Calendly vide = perte de crédibilité immédiate
- ❌ Vos disponibilités réelles sont étroites/atypiques
- ❌ Le prospect choisit un créneau sur lequel vous n'êtes pas dispo → annulation/report = pire que pas de Calendly

### Cal.com self-hosted
- ❌ Pas gratuit à héberger sérieusement (besoin Postgres, etc.)
- ❌ Overkill pour 0-5 leads/semaine

### Formspree / Tally / Typeform
- ❌ Free tier limité (50 soumissions/mois sur Formspree)
- ❌ Branding tiers visible
- ❌ Aucun contrôle sur la stack
- ❌ Coupe la cohérence avec votre infra existante (D1 + Functions)

### Web3Forms / FormSubmit
- ❌ Pas de stockage en base
- ❌ Branding tiers
- ❌ Limites strictes en free

### MailChannels (anciennement gratuit pour Workers CF)
- ❌ Devenu payant en 2024
- ❌ Plus une option viable

### Resend
- ⚠ Bonne alternative à Brevo (meilleure DX), mais 100 mails/jour vs 300 chez Brevo
- ⚠ Demande un domaine vérifié plus rapidement
- ✅ Peut remplacer Brevo en 1h si on veut plus tard

### Email auto au prospect dans la v1
- ❌ Sans domaine vérifié = spam
- ❌ Look non pro
- ✅ Compensé par un état de succès clair dans la modal

---

## 10. Roadmap & ouvertures v2+

### Phase 2 — Quand vous aurez un domaine email pro (ex: `contact@launchpadfactory.fr`)

- [ ] Configurer SPF/DKIM/DMARC sur le domaine via Brevo (10 min)
- [ ] Vérifier le domaine dans Brevo (à la place de l'email seul)
- [ ] Activer **un email de confirmation auto au prospect** : ajouter un 2e appel `sendNotificationEmail` dans `contact.js` avec un template "votre demande a bien été reçue"
- [ ] Mettre à jour `NOTIFY_FROM_EMAIL` vers `contact@launchpadfactory.fr`

### Phase 3 — Si le volume grimpe (> 10 leads/semaine)

- [ ] **Mini admin protégée** (`/admin/leads.html`) avec basic auth Cloudflare Access (free pour 50 users) — liste, marquage `replied`/`converted`, export CSV
- [ ] **Notif Telegram** en bonus de l'email (instantané + sur mobile sans avoir à ouvrir Gmail) :
  - Créer un bot via `@BotFather`, ajouter `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` en secrets, ajouter un POST sur `https://api.telegram.org/bot{token}/sendMessage` dans `contact.js`
- [ ] **Rate limit** par IP via Cloudflare KV (compteur sur 10 min)
- [ ] **Workflow** : ajouter un statut `qualified` et un champ `next_action_at` (DATE) pour rappel auto

### Phase 4 — Quand vous aurez des créneaux fiables

- [ ] **Hybride Calendly + formulaire** : afficher un widget Calendly avec créneaux réels + lien "aucun créneau ne convient ? formulaire"
- [ ] Garder le formulaire actuel comme fallback (les épiciers qui veulent appeler à 14h du mardi continueront de l'utiliser)

### Phase 5 — Marketing/CRM

- [ ] Synchro leads → un vrai CRM (HubSpot free, Pipedrive, Notion, Airtable…)
- [ ] Tracking conversion : ajouter un `gtag` ou `plausible` event sur le success
- [ ] A/B testing : tester "demande de RDV" vs "discutons de votre projet" comme libellé du CTA

### Améliorations UX possibles

- [ ] Pré-remplir le `source` dans la modal (badge visible : "Vous venez de la section Processus")
- [ ] Animation Lottie/SVG sur l'écran de succès
- [ ] Sauvegarde automatique du formulaire dans `localStorage` (anti-perte si fermeture accidentelle)
- [ ] Multi-step (form en 2-3 écrans) si on étoffe les champs (taille équipe, site existant, budget…)

---

## 📎 Annexes

### Variables / secrets — récap

| Nom | Type | Obligatoire | Où |
|---|---|---|---|
| `BREVO_API_KEY` | Secret | Oui (sinon pas de notif) | `wrangler pages secret put` |
| `NOTIFY_TO_EMAIL` | Var | Oui | Pages dashboard |
| `NOTIFY_FROM_EMAIL` | Var | Recommandé | Pages dashboard |
| `NOTIFY_FROM_NAME` | Var | Recommandé | Pages dashboard |
| `TURNSTILE_SECRET` | Secret | Optionnel | `wrangler pages secret put` |
| `SIGNING_KEY` | Secret | Hérité (lead magnet) | déjà configuré |

### Schéma D1 ajouté

Voir `schema.sql` — table `contact_requests` avec index sur `email`, `created_at`, `status`.

### Endpoints

| Méthode | URL | Rôle |
|---|---|---|
| POST | `/api/contact` | Réception du formulaire |

### Format de la requête `/api/contact`

```json
{
  "firstname": "Sophie",
  "lastname": "Martin",
  "email": "sophie@epicerie-bellevue.fr",
  "phone": "06 12 34 56 78",
  "company": "Épicerie Bellevue",
  "city": "Lyon",
  "message": "Je voudrais refondre mon site et ajouter un click & collect.",
  "availability": ["matin", "weekend"],
  "availability_notes": "plutôt avant 10h",
  "consent": true,
  "website": "",
  "turnstile_token": "...",
  "source": "hero"
}
```

### Réponses possibles

| Status | Body | Cas |
|---|---|---|
| 200 | `{ "ok": true }` | Demande prise en compte (ou bot piégé sur honeypot) |
| 400 | `{ "error": "invalid_email" }` | Email mal formé |
| 400 | `{ "error": "missing_<champ>" }` | Champ requis vide |
| 400 | `{ "error": "spam_detected" }` | Turnstile invalide |
| 400 | `{ "error": "message_too_short" }` | Message < 10 caractères |
