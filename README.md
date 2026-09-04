# landing-epicerie

Landing pages **LaunchPad** déployées sur **Cloudflare Workers** (Static Assets + D1 + R2).

- `/` → landing agence LaunchPad (HTML/CSS/JS vanilla)
- `/epiceries/` → landing commerciale épiceries fines (HTML/CSS/JS vanilla)
- `/bilan` → questionnaire de bilan de fin de mission (page privée, accès par lien signé)

---

## Structure du projet

```
landing-epicerie/
├── landings/              # Sources des pages (HTML/CSS/JS vanilla) — miroir des URLs
│   ├── index.html         # Landing agence  →  /
│   ├── style.css
│   ├── script.js          # nav, reveal, modale contact (POST /api/contact)
│   ├── bilan/             # Bilan de fin de mission  →  /bilan
│   │   ├── index.html     # 6 écrans, branchement sur le score de recommandation
│   │   ├── style.css
│   │   └── script.js
│   ├── articles/          # Articles agence  →  /articles (à venir)
│   └── epiceries/         # Landing épicerie fine  →  /epiceries
│       ├── index.html
│       ├── style.css
│       ├── script.js
│       ├── assets/
│       ├── traceo/        # Page produit Traceo  →  /epiceries/traceo
│       │   ├── index.html
│       │   ├── traceo.css
│       │   └── traceo-base.css
│       └── articles/      # Articles épicerie  →  /epiceries/articles
│           └── traceo.html / traceo.css
│
├── functions/             # Cloudflare Workers handlers
│   ├── api/
│   │   ├── lead.js        # POST /api/lead → token HMAC + D1
│   │   ├── download.js    # GET /api/download → stream PDF R2
│   │   ├── contact.js     # POST /api/contact → D1 + Brevo
│   │   ├── bilan.js       # POST /api/bilan → D1 + Brevo
│   │   └── bilan-context.js # GET /api/bilan-context → identité depuis le token
│   └── _shared/
│       ├── guides.js      # Mapping guides PDF (source de vérité)
│       ├── bilan.js       # Référentiel du questionnaire de bilan (whitelists + libellés)
│       └── token.js       # Signature/vérification HMAC-SHA256
│
├── src/
│   └── worker.js          # Worker unique, routage manuel /api/* + ASSETS
│
├── public/                # ⚠️ Généré par build.ps1, ne pas éditer
│
├── scripts/
│   └── bilan-link.mjs     # Génère le lien nominatif de bilan (une commande)
│
├── build.ps1              # Script de build (landings/ → public/)
├── schema.sql             # Schéma D1
├── wrangler.jsonc         # Config Cloudflare Workers (bindings, assets)
└── doc/                   # Documentation détaillée (brief, lead-magnet, contact, analytics)
```

---

## Build & développement local

```powershell
# 1. Assembler public/ depuis les sources
.\build.ps1

# 2. Tester en local (Cloudflare Workers dev)
npx wrangler dev

# La page est accessible sur http://127.0.0.1:8788/
```

> ⚠️ Ne pas ouvrir `public/index.html` directement via `file://` : les chemins CSS/JS sont relatifs à la racine du serveur et ne fonctionnent pas sans serveur HTTP.

---

## Déploiement

```powershell
# Build + deploy en une fois
.\build.ps1 ; npx wrangler deploy

# Appliquer le schéma D1 (première fois ou migration)
npx wrangler d1 execute launchpad-leads --remote --file=schema.sql

# Logs temps réel
npx wrangler tail
```

---

## Bindings Cloudflare

| Binding  | Type            | Usage                                |
|----------|-----------------|--------------------------------------|
| `DB`     | D1              | Tables `leads`, `downloads`, `contact_requests`, `satisfaction_responses` |
| `PDFS`   | R2              | Guides PDF privés                    |
| `ASSETS` | Static Assets   | Sert `public/`                       |

Secrets (`wrangler secret put`) : `SIGNING_KEY`, `BREVO_API_KEY`, `TURNSTILE_SECRET`

---

## Bilan de fin de mission (`/bilan`)

Questionnaire de satisfaction envoyé au client ~7 jours après la mise en ligne.
Spécification complète : [`doc/offboarding-satisfaction.md`](doc/offboarding-satisfaction.md).

### Envoyer un bilan à un client

```powershell
# 1. Générer le lien — avec la clé de PRODUCTION, pas celle de .dev.vars
$env:SIGNING_KEY = "<cle-prod>"
node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" --livre 2026-05-12 --email "sophie@exemple.fr"

# 2. Coller le lien dans un mail écrit à la main (Gmail). Pas d'envoi automatisé :
#    sans domaine email vérifié, un mail auto finirait en spam (cf. doc/contact-modal.md §4).
```

| Option | Rôle |
|---|---|
| `--prenom` | requis — prénom affiché en en-tête |
| `--entreprise` | requis — nom de la structure, sert aussi de titre de page |
| `--livre` | date de mise en ligne (AAAA-MM-JJ), affichée sous le titre |
| `--email` | active le bouton « Répondre » dans la notification interne |
| `--projet` | identifiant court (défaut : slug de `--entreprise`) |
| `--jours` | validité du lien (défaut : 60) |
| `--base` | origine du site (défaut : `https://launchpadfactory.fr`) |

> ⚠ Le lien est **nominatif** : il porte l'identité du client en clair (base64 non chiffré).
> Il n'ouvre l'accès à aucune donnée existante — il ne fait que pré-remplir l'en-tête.

### Lire les réponses

```powershell
# Vue de synthèse
npx wrangler d1 execute launchpad-leads --remote --command `
  "SELECT id, firstname, company, q1_satisfaction, q12_nps, q13_asks, publish_consent, status, created_at FROM satisfaction_responses ORDER BY id DESC;"

# Le verbatim publiable et l'autorisation qui va avec
npx wrangler d1 execute launchpad-leads --remote --command `
  "SELECT company, q14_verbatim FROM satisfaction_responses WHERE publish_consent = 1 AND q14_verbatim IS NOT NULL;"

# Marquer une réponse comme traitée
npx wrangler d1 execute launchpad-leads --remote --command `
  "UPDATE satisfaction_responses SET status='processed' WHERE id=1;"
```

### Tester en local

```powershell
cp .dev.vars.example .dev.vars           # SIGNING_KEY locale
npx wrangler d1 execute launchpad-leads --local --file=schema.sql
.\build.ps1 ; npx wrangler dev

# Générer un lien pointant vers le serveur local
node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" --base "http://127.0.0.1:8788"
```

Sans `BREVO_API_KEY` en local, la notification n'est pas envoyée : l'insertion en base
fonctionne et l'API répond `{ ok: true }`. C'est le comportement attendu.
