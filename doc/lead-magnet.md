# Lead magnet — Capture d'emails & téléchargement de PDF

Documentation technique du système de lead magnet : capture d'email, livraison de PDF protégés et statistiques, 100 % hébergé sur Cloudflare.

---

## 1. Vue d'ensemble

### Objectif

- Proposer aux visiteurs de télécharger un **guide PDF gratuit** en échange de leur prénom + email.
- **Qualifier les leads** en stockant le guide choisi (intérêt = signal commercial).
- **Mesurer les téléchargements** (taux de finalisation, guide le plus demandé).
- **Protéger les PDF** : pas d'URL publique → toute personne ayant le fichier est passée par le formulaire.

### Architecture

```
┌──────────────────────────┐
│  Visiteur (navigateur)   │
└────────────┬─────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│  Cloudflare Worker  (src/worker.js)         │
│  Routeur :                                  │
│   - /api/lead     → handler lead.js         │
│   - /api/download → handler download.js     │
│   - /*            → ASSETS (epiceries/)     │
└────────────┬────────────────────────────────┘
             │ 1. POST /api/lead { firstname, email, guide }
             ▼
┌──────────────────────────┐
│  lead.js                 │
│   - valide les champs    │
│   - INSERT dans D1       │──────► D1 (table `leads`)
│   - signe un token HMAC  │
│   - renvoie downloadUrl  │
└────────────┬─────────────┘
             │ 2. redirect window.location → /api/download?t=…
             ▼
┌──────────────────────────┐
│  download.js             │
│   - vérifie token (HMAC) │
│   - lit le PDF dans R2   │──────► R2 (bucket `launchpad-guides`)
│   - log dans D1          │──────► D1 (table `downloads`)
│   - stream le PDF        │
└──────────────────────────┘
```

> **Note d'architecture** : on utilise un **Worker unique avec Static Assets** (et non Cloudflare Pages + Pages Functions). Le Worker route les chemins `/api/*` vers du code et délègue tout le reste au binding `ASSETS` qui sert le dossier `epiceries/`. C'est l'approche actuellement recommandée par Cloudflare pour les sites statiques + API.

### Stack & limites gratuites

| Service                      | Usage                          | Quota gratuit                    |
| ---------------------------- | ------------------------------ | -------------------------------- |
| Cloudflare Workers           | Routeur + handlers `/api/*`    | 100 000 requêtes/jour            |
| Cloudflare Workers Assets    | Hébergement statique           | Inclus, illimité                 |
| Cloudflare D1                | Base SQLite (leads + downloads)| 5 GB stockage, 5M lectures/jour  |
| Cloudflare R2                | Stockage des PDF               | 10 GB stockage, 1M lectures/mois |

Aucun service tiers, aucune carte bancaire requise pour ce périmètre.

---

## 2. Structure des fichiers

```
landing-epicerie/
├── epiceries/                       # Site statique (servi via binding ASSETS)
│   ├── index.html                   # Formulaire #leadForm dans la section #ressources
│   └── script.js                    # Submit branché sur /api/lead
├── src/
│   └── worker.js                    # Entrypoint Worker : routeur /api/* + fallback ASSETS
├── functions/                       # Handlers métier (importés par src/worker.js)
│   ├── _shared/
│   │   ├── guides.js                # Mapping clé form → fichier R2 + nom de download
│   │   └── token.js                 # Signature/vérification HMAC-SHA256
│   └── api/
│       ├── lead.js                  # POST  /api/lead     (capture + génère token)
│       └── download.js              # GET   /api/download (vérifie token + sert PDF)
├── schema.sql                       # Schéma D1 (leads, downloads)
└── wrangler.jsonc                   # Configuration Worker (bindings DB, PDFS, ASSETS)
```

> Le dossier `functions/` n'a plus rien à voir avec la convention Pages Functions : c'est juste là où on range les handlers, importés explicitement depuis `src/worker.js`.

---

## 3. Flux utilisateur détaillé

1. Le visiteur remplit le formulaire dans la section **Ressources** (`index.html`, `#leadForm`) :
   - prénom, email, choix du guide (`linkedin` ou `email`).
2. `script.js` intercepte le submit, valide via HTML5, puis fait `POST /api/lead`.
3. La Function `lead.js` :
   - revalide email + guide côté serveur,
   - insère une ligne dans la table `leads` (best-effort, n'empêche pas le téléchargement si D1 est en panne),
   - génère un **token HMAC** signé valable **10 minutes**, contenant `{ guide, email, exp }`,
   - renvoie `{ ok: true, downloadUrl: "/api/download?t=…" }`.
4. Le navigateur est redirigé vers `downloadUrl`.
5. La Function `download.js` :
   - vérifie la signature et l'expiration du token,
   - récupère l'objet PDF dans R2,
   - log un téléchargement dans la table `downloads`,
   - renvoie le PDF avec `Content-Disposition: attachment` (déclenche le téléchargement direct).

---

## 4. Configuration & déploiement initial

### Pré-requis

- Compte Cloudflare avec un Worker `landing-epicerie` créé (déjà fait).
- R2 activé sur le compte (`Dashboard → R2 Object Storage → Enable R2`).
- Wrangler disponible via `npx wrangler …` (aucune install globale requise).
- Authentifié : `npx wrangler login` (OAuth navigateur).

### Étapes (one-shot)

```powershell
# 1. Créer la base D1 (note bien le database_id retourné)
npx wrangler d1 create launchpad-leads
# → Coller le database_id dans wrangler.jsonc, champ d1_databases[0].database_id
```

```powershell
# 2. Appliquer le schéma sur la base distante
npx wrangler d1 execute launchpad-leads --remote --file=schema.sql
```

```powershell
# 3. Créer le bucket R2
npx wrangler r2 bucket create launchpad-guides
```

```powershell
# 4. Uploader les PDF (les clés doivent matcher functions/_shared/guides.js)
npx wrangler r2 object put "launchpad-guides/linkedin-paniers-gourmands.pdf" `
  --file=".\chemin\linkedin.pdf" --remote --content-type="application/pdf"

npx wrangler r2 object put "launchpad-guides/email-marketing-epicerie-fine.pdf" `
  --file=".\chemin\email.pdf" --remote --content-type="application/pdf"
```

```powershell
# 5. Générer puis pousser le secret de signature HMAC
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
$key = [Convert]::ToBase64String($bytes)
$key | npx wrangler secret put SIGNING_KEY
```

```powershell
# 6. Déployer le Worker (uploade aussi tous les assets statiques)
npx wrangler deploy
```

Après cette étape, le site est servi sur :
- l'URL Workers : `https://landing-epicerie.<account>.workers.dev`
- ton domaine custom (ex. `https://launchpadfactory.fr`) si la route est attachée au Worker dans le dashboard.

### Bindings actifs

Définis dans `wrangler.jsonc` (et donc redéployés à chaque `wrangler deploy`) :

| Binding   | Type   | Resource              |
| --------- | ------ | --------------------- |
| `DB`      | D1     | `launchpad-leads`     |
| `PDFS`    | R2     | `launchpad-guides`    |
| `ASSETS` | Assets | `epiceries/` (local)  |

`SIGNING_KEY` est un **secret** stocké côté Cloudflare, pas dans le repo.

---

## 5. Schéma de base de données

Fichier : [schema.sql](schema.sql)

### Table `leads`

| Colonne     | Type    | Notes                                 |
| ----------- | ------- | ------------------------------------- |
| id          | INTEGER | PK auto-incrément                     |
| email       | TEXT    | normalisé en minuscules               |
| firstname   | TEXT    | tronqué à 80 caractères               |
| guide       | TEXT    | `linkedin` ou `email`                 |
| ip          | TEXT    | `cf-connecting-ip` (anti-spam)        |
| user_agent  | TEXT    | tronqué à 300 caractères              |
| created_at  | TEXT    | ISO 8601 UTC, défaut `datetime('now')`|

Index : `email`, `guide`, `created_at`.

### Table `downloads`

| Colonne     | Type    | Notes                                  |
| ----------- | ------- | -------------------------------------- |
| id          | INTEGER | PK auto-incrément                      |
| guide       | TEXT    | `linkedin` ou `email`                  |
| email       | TEXT    | extrait du token (peut être vide)      |
| ip          | TEXT    | `cf-connecting-ip`                     |
| created_at  | TEXT    | ISO 8601 UTC                           |

Index : `guide`, `created_at`.

---

## 6. Référence API

### `POST /api/lead`

**Body JSON**

```json
{
  "firstname": "Sophie",
  "email": "sophie@example.com",
  "guide": "linkedin"
}
```

**Réponses**

| Code | Body                                         | Quand                                |
| ---- | -------------------------------------------- | ------------------------------------ |
| 200  | `{ "ok": true, "downloadUrl": "/api/..." }`  | Succès                               |
| 400  | `{ "error": "invalid_email" }`               | Email mal formé ou trop long (>254) |
| 400  | `{ "error": "missing_firstname" }`           | Prénom vide                          |
| 400  | `{ "error": "invalid_guide" }`               | Guide inconnu                        |
| 400  | `{ "error": "invalid_json" }`                | Body non parsable                    |

### `GET /api/download?t=<token>`

**Réponses**

| Code | Body                              | Quand                                  |
| ---- | --------------------------------- | -------------------------------------- |
| 200  | binaire PDF + `Content-Disposition` | Token valide, fichier trouvé        |
| 400  | `Missing token`                   | Paramètre `t` absent                   |
| 403  | `Lien expiré ou invalide`         | Signature invalide ou `exp` dépassé    |
| 404  | `Guide introuvable` / `Fichier indisponible` | Guide inconnu ou objet R2 absent |

### Format du token

```
base64url(JSON.stringify({ g, e, exp })) . base64url(HMAC-SHA256(payload, SIGNING_KEY))
```

- `g` : clé du guide (`linkedin`, `email`)
- `e` : email du lead (pour log)
- `exp` : timestamp ms d'expiration (10 min après émission)

---

## 7. Stats & exploitation

Toutes les requêtes se lancent depuis **Dashboard → D1 → launchpad-leads → Console**.

```sql
-- Leads des 7 derniers jours par guide
SELECT guide, COUNT(*) AS nb
FROM leads
WHERE created_at >= datetime('now', '-7 days')
GROUP BY guide;

-- Derniers leads
SELECT created_at, guide, firstname, email
FROM leads
ORDER BY id DESC
LIMIT 50;

-- Taux de finalisation (download / lead) par guide
SELECT
  l.guide,
  COUNT(DISTINCT l.id) AS leads,
  COUNT(DISTINCT d.id) AS downloads
FROM leads l
LEFT JOIN downloads d ON d.guide = l.guide AND d.email = l.email
GROUP BY l.guide;

-- Détection de spam : même IP avec plusieurs emails
SELECT ip, COUNT(DISTINCT email) AS emails, COUNT(*) AS submits
FROM leads
GROUP BY ip
HAVING emails > 3
ORDER BY emails DESC;
```

Export CSV : icône **Download** en haut de la console D1.

---

## 8. Maintenance courante

### Ajouter un nouveau guide

1. Ajouter une entrée dans [functions/_shared/guides.js](../functions/_shared/guides.js) :
   ```js
   nouveauGuide: {
     r2Key: 'mon-nouveau-guide.pdf',
     downloadName: 'LaunchPad - Mon nouveau guide.pdf',
   },
   ```
2. Uploader le PDF :
   ```powershell
   npx wrangler r2 object put "launchpad-guides/mon-nouveau-guide.pdf" `
     --file=".\pdf\nouveau.pdf" --remote --content-type="application/pdf"
   ```
3. Ajouter une option `<input type="radio" name="guide" value="nouveauGuide" …>` dans `index.html`.
4. Redéployer : `npx wrangler deploy`.

### Mettre à jour un PDF existant

```powershell
npx wrangler r2 object put "launchpad-guides/<même-clé>.pdf" `
  --file=".\pdf\version-2.pdf" --remote --content-type="application/pdf"
```

Le fichier est immédiatement servi à la prochaine requête. Pas besoin de redéployer le Worker.

### Faire tourner la `SIGNING_KEY`

```powershell
$bytes = New-Object byte[] 32
[Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
[Convert]::ToBase64String($bytes) | npx wrangler secret put SIGNING_KEY
```

⚠️ Tous les tokens en circulation deviennent invalides (effet acceptable : ils duraient 10 min).

### Sauvegarder les leads

```powershell
npx wrangler d1 export launchpad-leads --remote --output-file=backup-YYYYMMDD.sql
```

À planifier manuellement (mensuel) ou via une GitHub Action si volume important.

---

## 9. Sécurité

- **Validation côté serveur** : email regex + longueur, prénom non vide, guide whitelisté.
- **Tokens HMAC** : signés avec un secret jamais exposé au client, expiration courte (10 min).
- **PDF privés** : aucun lien direct vers R2 ; l'URL `/api/download` est la seule porte d'entrée.
- **Pas de cache** : `Cache-Control: private, no-store` sur la réponse PDF.
- **Logs IP/UA** : permettent de détecter et bannir manuellement des abus (via règles WAF Cloudflare).
- **Best-effort sur D1** : un échec d'insertion n'empêche pas le téléchargement (UX > log), mais est tracé via `console.error` (visible dans **Dashboard → Pages → Functions → Logs**).

### Limites connues / améliorations possibles

- Pas de rate limiting natif → ajouter une règle **Cloudflare WAF** sur `/api/lead` (ex: 5 req / minute / IP).
- Pas de double opt-in RGPD → suffisant pour un lead magnet, à renforcer si tu envoies du marketing automatisé.
- Pas de notification email à l'admin → consultable uniquement via D1. Voir section 10 si besoin.

---

## 10. Évolutions envisagées

- **Notification email à chaque lead** : ajouter une intégration Resend dans `lead.js` (3 lignes, clé API à mettre en secret).
- **Newsletter / nurturing** : exporter les leads vers Brevo/MailerLite via cron (Workers Cron Triggers) ou manuellement.
- **Dashboard custom** : page admin protégée listant les leads (lecture D1 dans une nouvelle Function `/admin/leads` derrière Cloudflare Access).
- **Variantes A/B** : ajouter une colonne `variant` dans `leads` et passer la valeur depuis le front.

---

## 11. Dépannage

| Symptôme                                    | Cause probable                                            | Solution                                                       |
| ------------------------------------------- | --------------------------------------------------------- | -------------------------------------------------------------- |
| `500` sur `/api/lead`                       | Binding `DB` ou secret `SIGNING_KEY` manquant             | `npx wrangler deploy` pour réappliquer la conf, ou vérifier dans Dashboard → Workers → landing-epicerie → Settings |
| `Lien expiré ou invalide` immédiat          | Mauvais `SIGNING_KEY` ou clock skew                       | Régénérer le secret, vérifier l'heure du client                |
| `Fichier indisponible` (404)                | Clé R2 ne correspond pas à `guides.js`                    | `npx wrangler r2 object list launchpad-guides` pour vérifier   |
| Téléchargement ne se déclenche pas          | Bloqueur de pop-up navigateur                             | `window.location.href = downloadUrl` est déjà utilisé (OK)     |
| Leads non insérés mais PDF servi            | D1 indisponible (best-effort)                             | Voir logs, retenter ; pas critique                             |
| Test depuis `file:///…` ne marche pas       | `fetch('/api/lead')` ne sort pas du disque local          | Tester depuis l'URL HTTPS publique uniquement                  |

Logs en temps réel :

```powershell
npx wrangler tail
```

Observabilité (déjà activée via `"observability": { "enabled": true }`) : Dashboard → Workers → `landing-epicerie` → Logs / Metrics.
