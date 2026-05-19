# Copilot instructions — landing-epicerie

Landing page commerciale **LaunchPad × Épiceries fines** (FR), déployée sur **Cloudflare Workers** avec Static Assets + D1 + R2. Ces instructions cadrent les conventions à respecter pour toute modification.

## Architecture (à ne pas casser)

- **Worker unique** (`src/worker.js`) avec routage manuel, **PAS** de Cloudflare Pages Functions auto-routées. Le Worker route `/api/*` vers les handlers de `functions/api/*` puis délègue tout le reste au binding `ASSETS` (qui sert le dossier `epiceries/`).
- Toute nouvelle route API doit être ajoutée explicitement dans `src/worker.js` (ne jamais s'appuyer sur la convention de nommage de fichiers Pages Functions).
- Les handlers exportent `onRequestPost` / `onRequestGet` (signature `{ request, env, ctx }`) — conserver cette convention.
- Pas de framework, pas de bundler côté front : **HTML/CSS/JS vanilla** uniquement, 3 fichiers par page max (`index.html`, `style.css`, `script.js`). Seule dépendance externe autorisée : Google Fonts.
- Pages secondaires (ex. `traceo.html`) suivent la même règle (peuvent avoir leur propre CSS dédié, ex. `traceo.css`).

## Bindings & secrets Cloudflare

Source de vérité = [`wrangler.jsonc`](../wrangler.jsonc). Toute variable non sensible doit y être déclarée, **sinon elle sera effacée au prochain `wrangler deploy`** (même si ajoutée via dashboard).

| Binding | Type | Usage |
|---|---|---|
| `DB` | D1 (`launchpad-leads`) | tables `leads`, `downloads`, `contact_requests` |
| `PDFS` | R2 (`launchpad-guides`) | guides PDF privés |
| `ASSETS` | Static Assets | sert `epiceries/` |

Secrets (jamais commités, gérés via `wrangler secret put` / `wrangler pages secret put`) :
- `SIGNING_KEY` — HMAC pour signer les URLs de download (rotation invalide tous les tokens en circulation, durée 10 min, donc OK).
- `BREVO_API_KEY` — notifs email modal contact (Brevo, free tier 300/jour).
- `TURNSTILE_SECRET` — anti-bot optionnel sur `/api/contact`.

## Stack & contraintes produit

- **Langue : français.** Tous les textes UI, alt d'images, messages d'erreur visibles, libellés DB lisibles → en français.
- **RGPD-first** : aucun cookie de tracking, pas de tiers déposant cookie sans consentement. Cloudflare Web Analytics est **auto-injecté** par l'edge → ne **jamais** ajouter de snippet analytics dans le HTML.
- **Mobile-first**, breakpoints `< 768px` / `768–1024px` / `> 1024px`. Toutes les grilles passent en colonne sur mobile.
- **Performance** : images Unsplash avec `?w=…&q=80`, fonts en `font-display: swap`, JS en fin de body / `defer`.
- **Accessibilité** : un seul `<h1>` par page, hiérarchie H2/H3 cohérente, focus visible, `aria-label` sur boutons icônes, contraste WCAG AA.
- **SEO** : conserver `<html lang="fr">`, balises Open Graph, `<link rel="canonical">`, JSON-LD `ProfessionalService`. Mot-clé principal : `agence digitale épicerie fine`.

## Identité visuelle (à respecter strictement)

Variables CSS à utiliser (ne pas inventer de couleurs ad hoc) :

- Primaire : `#162235` (bleu nuit) · Secondaire : `#8A6A57` (taupe) · Accent : `#B78A3D` (or ambré)
- Fond : `#F7F3EE` / alt `#EEE6DD` · Texte : `#1C1C1C` / `#5F5A55` · Succès : `#7D9B76`
- **Interdits** : bleus vifs, dégradés flashy, violet SaaS, noirs trop durs, oranges saturés.

Typo : titres `Playfair Display` (medium/semibold), texte `DM Sans`. Pas de police script/manuscrite.

Style : `premium accessible`, `expert mais humain`, `soigné mais concret`. Cards arrondies 12–18px, ombres douces, **pas de glassmorphism**, animations légères (IntersectionObserver pour fade-in au scroll, hover sobre). Pas de scroll-jacking, pas de librairie d'animation.

## Lead magnet (`/api/lead` → `/api/download`)

Flux : POST `/api/lead` valide + insère en D1 + signe un **token HMAC** (`{g, e, exp}`, 10 min) → renvoie `{ ok, downloadUrl }` → le front redirige vers `/api/download?t=…` qui vérifie le token, log dans `downloads` et stream le PDF depuis R2.

- **Mapping des guides** = unique source de vérité [`functions/_shared/guides.js`](../functions/_shared/guides.js). Pour ajouter un guide : entrée `r2Key` + `downloadName`, upload R2 sous la même clé, ajouter le `<input type="radio" name="guide" value="…">` dans `index.html`, redéployer.
- **Insert D1 best-effort** : un échec ne doit jamais bloquer le téléchargement (UX > log). Tracer via `console.error`.
- Validation serveur obligatoire (email regex + longueur ≤ 254, prénom non vide, guide whitelisté contre `GUIDES`).
- Réponse PDF : `Content-Disposition: attachment` + `Cache-Control: private, no-store`.

## Modal contact (`/api/contact`)

Flux : POST `/api/contact` → validation + honeypot (`name="website"`) + Turnstile (si configuré) + INSERT `contact_requests` + email Brevo vers `NOTIFY_TO_EMAIL`.

- **Pas d'email automatique au prospect** tant qu'on n'a pas de domaine email vérifié (DKIM/SPF/DMARC). Le Gmail expéditeur partirait en spam. La modal affiche un état de succès clair à la place.
- `availability` est whitelisté : `matin | midi | apres-midi | soir | semaine | weekend` (valeurs séparées par `,` en DB).
- Champ `source` (`hero`, `nav`, `problems`, `processus`, `final`, `footer`, `hash`) injecté via `data-cta-source` sur chaque bouton — **conserver ce tracking** lors d'ajouts de CTA.
- Tous les CTA "Réserver un appel" pointent vers `#contact` avec la classe `.js-open-contact` (l'URL `?#contact` ouvre la modal au load).
- Statut DB libre : `new | replied | converted | archived`.
- Échappement HTML obligatoire dans le mail Brevo (anti-injection).

## Sécurité (récap)

- Validation server-side stricte sur **tous** les endpoints, pas de confiance dans le client.
- Limites de longueur sur chaque champ texte (anti-payload).
- Aucun secret côté client. Les tokens sont signés HMAC-SHA256, jamais des UUID devinables.
- IP via `request.headers.get('cf-connecting-ip')` (anti-spoofing géré par CF), user-agent tronqué à 300 car.
- Pas de log d'email/IP au-delà du nécessaire (preuve de consentement + anti-abus).

## Conventions de code

- **JS Worker = ESM** (`import` / `export`), compatibilité `nodejs_compat` activée mais éviter les modules Node si une API Web standard existe.
- Helpers réutilisables → `functions/_shared/` (ex. `token.js`, `guides.js`).
- Réponses JSON via un petit helper `json(data, status)` local au handler (pattern déjà utilisé) — pas besoin d'abstraction transverse.
- Front : un IIFE par page dans `script.js`, pas de globales. `IntersectionObserver` pour les fade-in.
- Quand on touche au formulaire lead : valider HTML5 natif **+** revalider serveur. Le succès est un message JS dans la page (pas de redirection).

## Commandes courantes (PowerShell, Windows)

```powershell
# Déploiement (uploade aussi les assets statiques)
npx wrangler deploy

# Appliquer le schéma D1
npx wrangler d1 execute launchpad-leads --remote --file=schema.sql

# Logs temps réel
npx wrangler tail

# Dev local
npx wrangler dev

# Upload d'un PDF (clé R2 = celle déclarée dans guides.js)
npx wrangler r2 object put "launchpad-guides/<clé>.pdf" `
  --file=".\chemin.pdf" --remote --content-type="application/pdf"

# Secret (ex. rotation SIGNING_KEY)
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes) | npx wrangler secret put SIGNING_KEY
```

## Pièges à éviter

- ❌ Ajouter un script analytics tiers dans le HTML (Cloudflare l'injecte déjà à l'edge).
- ❌ Créer un fichier `functions/api/foo.js` en pensant qu'il sera routé automatiquement → **il faut éditer `src/worker.js`**.
- ❌ Ajouter une variable au dashboard Cloudflare sans la mettre dans `wrangler.jsonc` (effacée au prochain deploy).
- ❌ Utiliser un framework CSS / un bundler / npm packages côté front.
- ❌ Exposer une URL R2 publique vers les PDF (ils doivent rester privés derrière `/api/download` + token HMAC).
- ❌ Envoyer un email automatique au prospect depuis le Gmail non vérifié (spam garanti).
- ❌ Ajouter des couleurs hors palette ou un design "SaaS générique" — le ton est `premium / sobre / mature / chaleureux`.
- ❌ Dupliquer la liste des guides ailleurs que dans [`functions/_shared/guides.js`](../functions/_shared/guides.js).

## Documentation détaillée

Avant une refonte fonctionnelle, lire la doc concernée :

- [doc/brief-landing-page-epiceries-fines.md](../doc/brief-landing-page-epiceries-fines.md) — brief produit / contenu / DA
- [doc/lead-magnet.md](../doc/lead-magnet.md) — flux PDF + tokens + D1
- [doc/contact-modal.md](../doc/contact-modal.md) — modal contact + Brevo + Turnstile
- [doc/analytics.md](../doc/analytics.md) — tracking & RGPD
