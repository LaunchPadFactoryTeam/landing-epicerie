# landing-epicerie

Landing pages **LaunchPad** déployées sur **Cloudflare Workers** (Static Assets + D1 + R2).

- `/` → landing agence LaunchPad (export Webflow, 100 % assets locaux)
- `/epiceries/` → landing commerciale épiceries fines (HTML/CSS/JS vanilla)

---

## Structure du projet

```
landing-epicerie/
├── webflow-export/        # Sources landing agence (export Webflow localisé)
│   ├── index.html
│   ├── css/
│   │   ├── webflow.shared.css   # CSS Webflow fusionné + assets localisés
│   │   ├── normalize.css
│   │   └── launchpadfactory.webflow.css
│   ├── js/
│   │   └── jquery-3.5.1.min.js  # jQuery hébergé localement
│   ├── fonts/
│   │   ├── Satoshi-Variable.ttf
│   │   └── Kalam-Bold.ttf
│   └── images/            # 60+ images localisées (plus aucune dépendance CDN)
│
├── epiceries/             # Sources landing épicerie fine (vanilla)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── traceo.html / traceo.css
│   └── assets/
│
├── functions/             # Cloudflare Workers handlers
│   ├── api/
│   │   ├── lead.js        # POST /api/lead → token HMAC + D1
│   │   ├── download.js    # GET /api/download → stream PDF R2
│   │   └── contact.js     # POST /api/contact → D1 + Brevo
│   └── _shared/
│       ├── guides.js      # Mapping guides PDF (source de vérité)
│       └── token.js       # Signature/vérification HMAC-SHA256
│
├── src/
│   └── worker.js          # Worker unique, routage manuel /api/* + ASSETS
│
├── public/                # ⚠️ Généré par build.ps1, ne pas éditer
│
├── build.ps1              # Script de build (webflow-export + epiceries → public/)
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
| `DB`     | D1              | Tables `leads`, `downloads`, `contact_requests` |
| `PDFS`   | R2              | Guides PDF privés                    |
| `ASSETS` | Static Assets   | Sert `public/`                       |

Secrets (`wrangler secret put`) : `SIGNING_KEY`, `BREVO_API_KEY`, `TURNSTILE_SECRET`

