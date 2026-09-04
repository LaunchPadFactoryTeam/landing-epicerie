# ✅ Plan de test — Bilan de fin de mission (`/bilan`)

> Procédure séquentielle, **un environnement à la fois**. Ne pas mélanger : chaque environnement a sa clé de signature, sa base et ses effets de bord.
> Commandes pour **PowerShell** (shell du projet). Feature spécifiée dans [`offboarding-satisfaction.md`](./offboarding-satisfaction.md).

| Env | Base D1 | Emails envoyés | Risque |
|---|---|---|---|
| **1. Local** | locale (fichier) | aucun par défaut | nul |
| **2. Preview de branche** | ⚠️ **celle de production** | ⚠️ **réels** | écrit des lignes de test en prod |
| **3. Production** | production | réels | — |

---

## 🔑 Préalable — la clé de signature

Un lien de bilan n'est valide que sur l'environnement dont il porte la clé.

| Environnement | Clé utilisée | D'où elle vient |
|---|---|---|
| Local | `SIGNING_KEY` de `.dev.vars` | n'importe quelle valeur |
| Preview **et** production | `SIGNING_KEY` secret Cloudflare | **doit être connue de vous** |

> ⚠️ **Un secret Cloudflare ne se relit pas.** Si personne n'a gardé la valeur de `SIGNING_KEY` (gestionnaire de mots de passe, notes), vous ne pourrez pas générer de lien valide pour les environnements 2 et 3.
>
> **Solution si la clé est perdue** — la redéfinir :
> ```powershell
> npx wrangler secret put SIGNING_KEY
> # coller une nouvelle valeur aléatoire, et LA CONSERVER
> ```
> Conséquence : les liens de téléchargement du lead magnet déjà émis cessent de fonctionner. Ils ont une durée de vie de 10 minutes, donc l'impact réel est nul sauf si quelqu'un est en train de télécharger à cet instant.

**Règle d'hygiène entre les environnements :** ouvrez un **terminal neuf** en changeant d'environnement, ou videz la variable :

```powershell
Remove-Item Env:SIGNING_KEY -ErrorAction SilentlyContinue
```

Sans ça, le script réutilise la clé encore en mémoire dans la session et génère un lien pour le mauvais environnement.

---

# ENV 1 — LOCAL

**Ce que ça teste :** le parcours complet, les 6 écrans, le branchement, l'écriture en base, toutes les validations.
**Ce que ça ne teste pas :** l'envoi d'email (sauf étape 1.9 optionnelle), le déploiement, les vrais secrets.

### 1.1 — Terminal neuf, à la racine du projet

```powershell
cd c:\Users\User\Documents\Dev\Projets\LaunchPad\landing-epicerie
Remove-Item Env:SIGNING_KEY -ErrorAction SilentlyContinue
```

### 1.2 — Créer le fichier de variables locales

```powershell
Copy-Item .dev.vars.example .dev.vars
```

> ✔️ Attendu : le fichier `.dev.vars` existe. Il est gitignoré.
> Si vous l'avez déjà, ne l'écrasez pas — vérifiez juste qu'il contient une ligne `SIGNING_KEY=`.

### 1.3 — Créer la table en base locale

```powershell
npx wrangler d1 execute launchpad-leads --local --file=schema.sql
```

> ✔️ Attendu : une suite de blocs `"success": true`.

### 1.4 — Construire `public/`

```powershell
.\build.ps1
```

> ✔️ Attendu : `Build terminé → ./public/` et `Pages index.html : 4` ou plus.
> Contrôle rapide : `Get-ChildItem public\bilan` doit lister `index.html`, `script.js`, `style.css`.

### 1.5 — Démarrer le serveur (laisser ce terminal ouvert)

```powershell
npx wrangler dev --port 8788
```

> ✔️ Attendu : `Ready on http://127.0.0.1:8788`.
> **Laissez tourner.** Toutes les étapes suivantes se font dans un **second terminal**.

### 1.6 — Générer un lien de test local

Dans un **second terminal** :

```powershell
cd c:\Users\User\Documents\Dev\Projets\LaunchPad\landing-epicerie
node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" --livre 2026-05-12 --email "sophie@exemple.fr" --base "http://127.0.0.1:8788"
```

> ✔️ Attendu : une URL `http://127.0.0.1:8788/bilan?t=...` et une date de validité.
> ❌ `SIGNING_KEY introuvable` → l'étape 1.2 n'a pas été faite.

### 1.7 — Parcours navigateur : **le chemin promoteur**

Ouvrez l'URL de l'étape 1.6. Vérifiez dans cet ordre :

| # | Action | Attendu |
|---|---|---|
| 1 | Chargement | Le titre affiche **Studio Bellevue**, et dessous « Mis en ligne le 12 mai 2026 » |
| 2 | — | La barre de progression indique « Étape 1 sur 6 » |
| 3 | — | **Aucun** champ prénom/structure visible (le lien porte l'identité) |
| 4 | Cliquer « Continuer » sans rien remplir | Message d'erreur, on reste sur l'écran 1 |
| 5 | Choisir une note à la question 1, puis « Continuer » | Passage à l'écran 2, barre à 2/6 |
| 6 | Écran 2 | 8 lignes de notation (5 étapes + 3 sur la communication), chacune de 1 à 5 |
| 7 | Noter quelques lignes, « Continuer » | Écran 3 |
| 8 | Écran 3 : cocher **Autre** | Un champ texte « Précisez » apparaît |
| 9 | Décocher **Autre** | Le champ disparaît **et se vide** |
| 10 | « Continuer » | Écran 4 |
| 11 | Écran 4 : cocher 2 besoins, puis cocher **Rien pour l'instant** | Les 2 besoins se décochent tout seuls |
| 12 | Recocher un besoin | **Rien pour l'instant** se décoche |
| 13 | « Continuer » | Écran 5 |
| 14 | Choisir **9** | La zone « Accepteriez-vous un coup de pouce ? » apparaît |
| 15 | Cocher **Parler de votre nouveau site sur LinkedIn** | Le sous-choix à 2 options apparaît juste dessous |
| 16 | Choisir **Je m'en occupe** | Sélection visible |
| 17 | Écrire un verbatim | — |
| 18 | « Continuer » | Écran 6 |
| 19 | Cliquer « Envoyer » sans cocher le consentement | Message d'erreur, pas d'envoi |
| 20 | Cocher les **deux** cases, « Envoyer » | Écran de remerciement : « Merci Sophie ! » |
| 21 | Lire la liste des suites | Elle contient « On vous envoie les visuels du site d'ici 48 h. » |
| 22 | Ouvrir la console du navigateur (F12) | **Aucune erreur rouge** |

### 1.8 — Vérifier l'enregistrement

```powershell
npx wrangler d1 execute launchpad-leads --local --command "SELECT id, firstname, company, q1_satisfaction, q12_nps, q13_asks, q13_linkedin_mode, publish_consent, duration_seconds FROM satisfaction_responses ORDER BY id DESC LIMIT 1;"
```

> ✔️ Attendu : une ligne avec `q12_nps = 9`, `q13_asks` contenant `linkedin`, `q13_linkedin_mode = self`, `publish_consent = 1`.

### 1.9 *(optionnel)* — Tester le rendu de l'email

Uniquement si vous voulez voir la notification. **Envoie un vrai email.**

1. Ouvrir `.dev.vars` et décommenter les 4 lignes `BREVO_API_KEY`, `NOTIFY_TO_EMAIL`, `NOTIFY_FROM_EMAIL`, `NOTIFY_FROM_NAME`, en renseignant la vraie clé Brevo.
2. Redémarrer `wrangler dev` (Ctrl+C puis relancer l'étape 1.5).
3. Refaire un envoi.

> ✔️ Attendu dans `launchpadfactory.contact@gmail.com` : objet `[Bilan] Sophie — Studio Bellevue — 9/10`, bandeau **vert**, bloc « Actions à déclencher » mentionnant LinkedIn.

### 1.10 — Le chemin détracteur

Rechargez **le même lien** qu'à l'étape 1.6, refaites le parcours, et à l'écran 5 choisissez **4**.

| # | Attendu |
|---|---|
| 1 | La zone promoteur disparaît, remplacée par « Merci de votre franchise » |
| 2 | Deux champs : « Qu'est-ce qui nous aurait fait gagner les points manquants ? » et « Souhaitez-vous qu'on vous rappelle ? » |
| 3 | **Aucune** demande de recommandation nulle part |

Répondez « Oui » au rappel, envoyez, puis :

```powershell
npx wrangler d1 execute launchpad-leads --local --command "SELECT COUNT(*) AS lignes FROM satisfaction_responses;"
npx wrangler d1 execute launchpad-leads --local --command "SELECT id, q12_nps, q13_asks, q14_verbatim, q13bis_missing, q13ter_callback, created_at, updated_at FROM satisfaction_responses ORDER BY id DESC LIMIT 1;"
```

> ✔️ Attendu, et c'est **le test le plus important** :
> - le nombre de lignes **n'a pas augmenté** (le même lien met à jour, il ne duplique pas)
> - `q13_asks` et `q14_verbatim` sont `null` — les réponses promoteur de l'étape 1.7 ont été **effacées**
> - `q13bis_missing` est rempli, `q13ter_callback = 1`
> - `created_at` est inchangé, `updated_at` est plus récent

### 1.11 — Le repli sans lien valide

Ouvrez dans le navigateur :

```
http://127.0.0.1:8788/bilan?t=lienCasse
```

> ✔️ Attendu : bandeau orange « Ce lien n'est plus valide… », et **deux champs prénom + structure** apparaissent en haut de l'écran 1. Le reste du formulaire fonctionne normalement.

Testez aussi `http://127.0.0.1:8788/bilan` (sans paramètre) : mêmes champs, **sans** le bandeau orange.

### 1.12 — Rejets côté serveur

```powershell
curl.exe -s -X POST http://127.0.0.1:8788/api/bilan -H "content-type: application/json" -d '{\"firstname\":\"X\",\"company\":\"Y\",\"q1_satisfaction\":4,\"q12_nps\":9,\"consent\":false}'
curl.exe -s -X POST http://127.0.0.1:8788/api/bilan -H "content-type: application/json" -d '{\"firstname\":\"X\",\"company\":\"Y\",\"q12_nps\":9,\"consent\":true}'
curl.exe -s -X POST http://127.0.0.1:8788/api/bilan -H "content-type: application/json" -d '{\"website\":\"bot\",\"firstname\":\"Bot\",\"company\":\"Bot\",\"q1_satisfaction\":1,\"q12_nps\":0,\"consent\":true}'
```

> ✔️ Attendu, dans l'ordre :
> 1. `{"error":"missing_consent"}`
> 2. `{"error":"missing_q1_satisfaction"}`
> 3. `{"ok":true}` — mais **rien en base** (honeypot). Vérifiez :
> ```powershell
> npx wrangler d1 execute launchpad-leads --local --command "SELECT COUNT(*) AS bots FROM satisfaction_responses WHERE company='Bot';"
> ```
> doit renvoyer `0`.

### 1.13 — Mobile

Dans le navigateur, F12 → mode responsive, largeur **375 px**. Refaites l'écran 5.

> ✔️ Attendu : l'échelle 0–10 passe sur **2 lignes de 6 colonnes**, chaque case reste tapable, et **la page ne défile pas horizontalement**.

### 1.14 — Arrêt et remise à zéro

Ctrl+C dans le terminal du serveur, puis si vous voulez repartir d'une base propre :

```powershell
npx wrangler d1 execute launchpad-leads --local --command "DELETE FROM satisfaction_responses;"
```

---

# ENV 2 — PREVIEW DE BRANCHE

> ⚠️ **Deux effets de bord réels.** Le preview partage les bindings du Worker de production : il écrit dans **la vraie base D1** et envoie de **vrais emails**. Prévoyez le nettoyage de l'étape 2.7.

**Ce que ça teste :** le déploiement, les vrais secrets, l'envoi d'email réel, le rendu sur un vrai domaine.

### 2.1 — Terminal neuf

```powershell
cd c:\Users\User\Documents\Dev\Projets\LaunchPad\landing-epicerie
Remove-Item Env:SIGNING_KEY -ErrorAction SilentlyContinue
```

### 2.2 — Créer la table en base distante

**À faire une seule fois.** Sans ça, les réponses ne sont pas enregistrées (l'email part quand même, mais la ligne est perdue).

```powershell
npx wrangler d1 execute launchpad-leads --remote --file=schema.sql
```

> ✔️ Attendu : des blocs `"success": true`.
> Sans risque pour l'existant : le fichier n'utilise que `CREATE TABLE IF NOT EXISTS` et `CREATE INDEX IF NOT EXISTS`.

Contrôle :

```powershell
npx wrangler d1 execute launchpad-leads --remote --command "SELECT name FROM sqlite_master WHERE type='table';"
```

> ✔️ Attendu : `satisfaction_responses` figure dans la liste.

### 2.3 — Récupérer l'URL de preview

Elle est publiée par le bot Cloudflare en commentaire de la PR :

```powershell
gh pr view 2 --comments
```

> ✔️ Attendu : une ligne **Branch Preview URL**, du type
> `https://doc-offboarding-satisfaction-landing-epicerie.launchpadfactoryteam.workers.dev`
>
> Vérifiez que le commit cité est bien le dernier (`git log -1 --format=%h`). Si le déploiement est encore en cours, attendez et relancez la commande.

### 2.4 — Générer un lien de test pour le preview

```powershell
$env:SIGNING_KEY = "<la-cle-de-production>"
node scripts/bilan-link.mjs --prenom "TEST" --entreprise "ZZZ Test Preview" --livre 2026-09-01 --email "launchpadfactoryteam@gmail.com" --base "https://doc-offboarding-satisfaction-landing-epicerie.launchpadfactoryteam.workers.dev"
```

> 💡 Prénom `TEST` et entreprise préfixée `ZZZ` : ça rend les lignes de test évidentes à repérer et à supprimer à l'étape 2.7.

### 2.5 — Parcours navigateur

Ouvrez le lien. Vérifiez :

| # | Attendu |
|---|---|
| 1 | Le titre affiche **ZZZ Test Preview** |
| 2 | Les polices sont chargées (titre en Bricolage Grotesque, pas en Times) |
| 3 | Console (F12) : aucune erreur, aucun 404 |
| 4 | Parcours complet avec un score de **9**, LinkedIn coché, mode **Proposez-moi un texte** |
| 5 | Écran de remerciement affiché |

### 2.6 — Vérifier l'email et la base

**Email** — dans `launchpadfactory.contact@gmail.com`, sous 30 s :

> ✔️ Objet `[Bilan] TEST — ZZZ Test Preview — 9/10`
> ✔️ Bandeau **vert** en haut
> ✔️ « Actions à déclencher » mentionne *« LinkedIn : veut une proposition de texte »*
> ✔️ Le bouton **→ Répondre à TEST** ouvre un brouillon vers l'adresse passée en `--email`
> ✔️ Les blocs de notes affichent des ronds pleins/vides lisibles

**Base :**

```powershell
npx wrangler d1 execute launchpad-leads --remote --command "SELECT id, firstname, company, q12_nps, q13_linkedin_mode, created_at FROM satisfaction_responses ORDER BY id DESC LIMIT 3;"
```

> ✔️ Attendu : la ligne `ZZZ Test Preview` avec `q13_linkedin_mode = assisted`.

### 2.7 — Nettoyer les lignes de test *(à ne pas oublier)*

```powershell
npx wrangler d1 execute launchpad-leads --remote --command "SELECT id, company FROM satisfaction_responses WHERE company LIKE 'ZZZ%';"
```

Vérifiez que la liste ne contient **que** vos lignes de test, puis :

```powershell
npx wrangler d1 execute launchpad-leads --remote --command "DELETE FROM satisfaction_responses WHERE company LIKE 'ZZZ%';"
```

---

# ENV 3 — PRODUCTION

**Ce que ça teste :** que la mise en ligne s'est bien passée. Rien de fonctionnel n'est à re-tester ici — tout l'a été en 1 et 2.

### 3.1 — Fusionner la PR

```powershell
gh pr merge 2 --squash
```

Puis suivez votre flux habituel `develop` → `main` pour la mise en production.

### 3.2 — Vérifier que le déploiement est passé

```powershell
npx wrangler deployments list
```

> ✔️ Attendu : le déploiement le plus récent porte le hash du commit de merge.

### 3.3 — Contrôle de fumée

```powershell
curl.exe -s -o NUL -w 'page /bilan : %{http_code}\n' https://launchpadfactory.fr/bilan
curl.exe -s "https://launchpadfactory.fr/api/bilan-context?t=invalide"
```

> ✔️ Attendu :
> - `page /bilan : 200`
> - `{"ok":false,"reason":"invalid_token"}`

### 3.4 — Vérifier que la page n'est pas indexable

```powershell
curl.exe -s https://launchpadfactory.fr/bilan | Select-String "robots"
```

> ✔️ Attendu : `<meta name="robots" content="noindex, nofollow" />`

### 3.5 — Envoyer le bilan à un vrai client

```powershell
$env:SIGNING_KEY = "<la-cle-de-production>"
node scripts/bilan-link.mjs --prenom "<Prénom>" --entreprise "<Nom de la structure>" --livre <AAAA-MM-JJ> --email "<email du client>"
```

Collez l'URL obtenue dans un mail **écrit à la main** depuis Gmail. Pas d'envoi automatisé : sans domaine email vérifié, un envoi serveur vers le client finirait en spam ([`contact-modal.md`](./contact-modal.md) §4).

> ⏱ Rappel du process (doc §3) : envoi à **J+7** après la mise en ligne, puis **relance humaine sous 48 h** sur ce que le client a coché.

---

## 📋 Récapitulatif — l'ordre en une page

```
ENV 1 — LOCAL                     aucun risque, tout tester ici
  1.1  terminal neuf + Remove-Item Env:SIGNING_KEY
  1.2  Copy-Item .dev.vars.example .dev.vars
  1.3  wrangler d1 execute ... --local --file=schema.sql
  1.4  .\build.ps1
  1.5  npx wrangler dev --port 8788        (laisser tourner)
  1.6  node scripts/bilan-link.mjs ... --base http://127.0.0.1:8788
  1.7  parcours promoteur (22 points)
  1.8  vérifier la ligne en base locale
  1.9  (optionnel) rendu de l'email
  1.10 parcours détracteur → PAS de nouvelle ligne, promoteur effacé
  1.11 repli sans lien valide
  1.12 rejets serveur (3 curl)
  1.13 mobile 375 px
  1.14 Ctrl+C + purge locale

ENV 2 — PREVIEW                   écrit en base de prod, envoie de vrais mails
  2.1  terminal neuf + Remove-Item Env:SIGNING_KEY
  2.2  wrangler d1 execute ... --remote --file=schema.sql     ← une seule fois
  2.3  gh pr view 2 --comments  → Branch Preview URL
  2.4  $env:SIGNING_KEY = "<prod>" puis générer le lien "ZZZ Test Preview"
  2.5  parcours navigateur
  2.6  vérifier l'email + la base distante
  2.7  DELETE des lignes ZZZ                                  ← ne pas oublier

ENV 3 — PRODUCTION
  3.1  gh pr merge 2 --squash, puis develop → main
  3.2  npx wrangler deployments list
  3.3  contrôle de fumée (2 curl)
  3.4  vérifier le noindex
  3.5  générer et envoyer le lien du vrai client
```

---

## 🚨 Si ça casse

| Symptôme | Cause probable | Vérification |
|---|---|---|
| « Ce lien n'est plus valide » sur un lien tout neuf | Lien généré avec la clé d'un autre environnement | Comparez la clé utilisée avec celle du Worker visé |
| `SIGNING_KEY introuvable` | `.dev.vars` absent et variable non définie | Étape 1.2 |
| L'envoi affiche « L'envoi a échoué » | API en erreur | `npx wrangler tail` pendant l'envoi |
| Aucune ligne en base, mais l'email arrive | Table absente sur cet environnement | Étape 2.2 |
| Aucun email, mais la ligne est en base | `BREVO_API_KEY` absente ou expirée | `npx wrangler tail`, chercher `Brevo send failed` |
| La page s'affiche sans style | `.\build.ps1` non relancé après modification | Étape 1.4 |
| Le formulaire ne réagit à rien | Erreur JS | Console F12 |
