# Analytics & mesure d'audience

Documentation du système de tracking de la landing page épiceries fines : ce qui est en place aujourd'hui, comment l'activer, et les évolutions possibles selon les besoins futurs.

---

## 1. Vue d'ensemble

### Objectifs de mesure

| Question business | Type de donnée | Outil cible |
|---|---|---|
| Combien de visiteurs ? D'où viennent-ils ? | Quantitatif (trafic) | Cloudflare Web Analytics |
| Quelles pages sont vues ? Quel taux de rebond ? | Quantitatif (engagement) | Cloudflare Web Analytics |
| Combien de leads capturés ? Quel guide est le plus demandé ? | Quantitatif (conversion) | D1 (déjà en place via lead-magnet) |
| Où les visiteurs hésitent / décrochent dans la page ? | Qualitatif (comportement) | Microsoft Clarity (futur, optionnel) |
| Qu'est-ce qui motive / freine les épiciers ? | Qualitatif (verbatim) | Sondage on-site (futur, optionnel) |

### Principes directeurs

- **RGPD-first** : aucun cookie de tracking, aucune donnée personnelle envoyée à un tiers tant qu'on peut l'éviter.
- **Performance** : pas de script tiers lourd qui plombe le PageSpeed (important pour le SEO de la landing).
- **Cloudflare-native** : on reste dans l'écosystème déjà utilisé (Workers + D1 + R2) pour limiter les dépendances et les coûts.
- **Mesure côté serveur** prioritaire pour les conversions (insensible à AdBlock et au consentement).

---

## 2. Setup actuel — Étape 1 : Cloudflare Web Analytics (auto-injecté)

### Ce qui est en place

Le domaine `launchpadfactory.fr` est **proxifié par Cloudflare** (orange cloud activé dans le DNS). Quand Web Analytics est activé dans le dashboard, Cloudflare **injecte automatiquement le beacon JavaScript** à la volée dans toutes les réponses HTML servies via son edge.

> **Aucun snippet à ajouter dans le code source.** Le HTML du repo reste propre, l'injection est faite par Cloudflare entre l'origin (Worker) et le navigateur.

### Ce que ça mesure

- **Pages vues** par URL
- **Visites** (estimation basée sur fingerprint anonyme, pas de cookie)
- **Sources de trafic** (referer : Google, LinkedIn, direct, etc.)
- **Pays** des visiteurs
- **Navigateur / OS / type d'appareil**
- **Core Web Vitals** (LCP, INP, CLS) — utile pour suivre la perf SEO
- **Page load time**
- **Filtre bots** appliqué par défaut

### Ce que ça **ne mesure pas**

- Aucun parcours utilisateur (pas de session replay)
- Aucune heatmap
- Aucun event personnalisé (clics CTA, scroll depth) — voir évolutions §4
- Aucune donnée sur les conversions formulaire (gérées par D1 — voir §3)

### Pourquoi ce choix ?

| Critère | Cloudflare Web Analytics | Google Analytics 4 | Plausible |
|---|---|---|---|
| Prix | **Gratuit illimité** | Gratuit | 9 €/mois |
| Cookies / bandeau | **Aucun** | Obligatoire | Aucun |
| RGPD (transfert UE) | **OK natif** | Compliqué (USA) | OK (UE) |
| Poids du script | ~5 kB | ~50 kB | ~1 kB |
| Déjà dans la stack | **Oui** | Non | Non |
| Goals / funnels | Non | Oui | Oui |

→ Cloudflare Web Analytics couvre 80 % du besoin sans friction. Les 20 % restants (goals, funnels, events) sont mieux mesurés côté serveur dans D1, voir §3.

---

## 3. Activation — procédure réalisée

### Étape réalisée — Activer Web Analytics dans Cloudflare

1. Dashboard Cloudflare → **Analytics & Logs** → **Web Analytics**.
2. Ajouter le site `launchpadfactory.fr`.
3. Comme le domaine est déjà proxifié par Cloudflare (orange cloud), choisir l'option **Automatic setup** → Cloudflare injecte le beacon à la volée, **aucune modification de code n'est requise**.
4. Activer **Core Web Vitals**.

### Vérification

1. Visiter une page du site en navigation privée.
2. DevTools → onglet **Elements** → chercher `cloudflareinsights` : le script doit apparaître dans le HTML rendu (mais **pas** dans le source du repo).
3. DevTools → onglet **Network** → vérifier une requête vers `cloudflareinsights.com/cdn-cgi/rum` (status 204).
4. Dashboard Web Analytics → les visites apparaissent en quelques minutes.

### Mode manuel (pour référence)

Si un jour le domaine n'est plus proxifié par Cloudflare (ex : migration DNS chez un autre registrar avec proxy désactivé), il faudra basculer en **Manual setup** et coller le snippet suivant avant `</body>` dans chaque page HTML :

```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'></script>
```

Le token est récupérable dans Web Analytics → Settings → Snippet. Il est public (pas un secret).

---

## 4. Conversions — mesure côté serveur (déjà en place)

Le tracking des **conversions** (le KPI le plus important pour cette landing) est **déjà géré côté Worker** par le système de lead-magnet, indépendamment de Web Analytics.

| Event | Fichier | Stockage |
|---|---|---|
| Soumission formulaire | [functions/api/lead.js](../functions/api/lead.js) | D1 table `leads` |
| Téléchargement effectif du PDF | [functions/api/download.js](../functions/api/download.js) | D1 table `downloads` |

### Requêtes utiles (D1)

```sql
-- Nombre de leads par jour
SELECT date(created_at) AS jour, COUNT(*) AS leads
FROM leads
GROUP BY jour
ORDER BY jour DESC;

-- Guide le plus demandé
SELECT guide, COUNT(*) AS demandes
FROM leads
GROUP BY guide
ORDER BY demandes DESC;

-- Taux de finalisation (lead → download)
SELECT
  (SELECT COUNT(*) FROM downloads) * 100.0 / (SELECT COUNT(*) FROM leads) AS taux_pct;
```

Lancer une requête :

```bash
npx wrangler d1 execute launchpad-leads --remote --command "SELECT COUNT(*) FROM leads;"
```

> **Avantage clé** : ce tracking n'est **pas bloqué par AdBlock** ni soumis au consentement cookies, car il s'agit d'un traitement nécessaire à l'exécution du service demandé (envoi du guide).

---

## 5. Évolutions possibles

Listées par ordre de priorité / valeur ajoutée. Aucune n'est urgente — à activer en fonction des besoins.

### Évolution 1 — Events custom dans Web Analytics

**Pourquoi** : suivre les clics sur les CTA principaux (« Demander un devis », « Télécharger le guide ») pour calculer un vrai funnel.

**Prérequis** : en mode auto-inject, l'objet `window.cfBeacon` n'est pas exposé directement. Pour envoyer des events custom, il faut soit :
- basculer en **Manual setup** (snippet dans le HTML), soit
- utiliser l'API `sendBeacon` vers l'endpoint `/cdn-cgi/rum` (non documenté, fragile).

→ Si on a besoin d'events, le plus propre est de migrer vers Manual setup. Sinon, mieux vaut tracker les conversions côté serveur (déjà fait via D1).

### Évolution 2 — Microsoft Clarity (qualitatif)

**Pourquoi** : comprendre **pourquoi** les visiteurs ne convertissent pas (où ils s'arrêtent, sur quoi ils cliquent par erreur, etc.). Indispensable pour une phase d'optimisation conversion.

**Pourquoi Clarity plutôt que Hotjar** :

| Critère | Microsoft Clarity | Hotjar (Free) |
|---|---|---|
| Prix | **Gratuit illimité** | Gratuit jusqu'à 35 sessions/jour |
| Heatmaps | Oui | Oui |
| Session recordings | Oui, illimitées | Oui, plafonnées |
| Filtres IA (rage clicks, dead clicks) | **Oui** | Limités |
| Poids du script | ~30 kB | ~50 kB |

**Prérequis avant activation** :
- Mettre en place un **bandeau de consentement** (CMP) basique : Clarity enregistre des sessions → consentement obligatoire (CNIL, RGPD art. 82).
- Charger le script Clarity **uniquement après acceptation**.

**Recommandation** : activer Clarity pendant 2-4 semaines lors d'une phase d'optimisation, puis désactiver une fois les enseignements tirés (limite la collecte au strict nécessaire).

### Évolution 3 — Bandeau de consentement cookies

**Pourquoi** : prérequis pour Clarity, Hotjar, GA4, et tout outil tiers déposant cookies ou enregistrant des sessions.

**Reco minimaliste** : un mini-CMP maison (~30 lignes JS) avec 2 boutons « Accepter » / « Refuser », stockage du choix dans `localStorage`. Pas besoin d'une solution payante (Axeptio, Didomi…) tant qu'on a 1-2 trackers seulement.

### Évolution 4 — UTM tracking & attribution

**Pourquoi** : si on lance des campagnes (LinkedIn Ads, Google Ads, newsletter), savoir lesquelles convertissent.

**Comment** :
1. Ajouter `?utm_source=…&utm_campaign=…` dans les URLs partagées.
2. Côté `lead.js`, lire les paramètres UTM (renvoyés par le formulaire) et les stocker dans la table `leads` (ajouter colonnes `utm_source`, `utm_campaign`, `utm_medium`).
3. Faire un join SQL pour calculer le coût d'acquisition par canal.

### Évolution 5 — Plausible ou Umami (si besoin de plus que CF Web Analytics)

**Quand** : si on veut des vrais **funnels** (étape 1 → étape 2 → conversion), des **goals** définis dans une UI, ou **exporter** facilement les données.

- **Plausible** : ~9 €/mois, hébergé en UE, RGPD natif, UI excellente.
- **Umami** : open-source, auto-hébergeable (sur Cloudflare Workers d'ailleurs), gratuit.

→ Cumulable avec Cloudflare Web Analytics, mais probablement redondant. Ne migrer que si CF Web Analytics atteint ses limites.

### Évolution 6 — Logging serveur des vues de page

**Pourquoi** : mesure 100 % insensible à AdBlock et au consentement (exécution serveur d'un service demandé).

**Comment** : ajouter un middleware dans [src/worker.js](../src/worker.js) qui log dans D1 chaque requête HTML servie (URL, country via header CF, referer, user-agent). Attention : volumétrie potentiellement élevée — prévoir une rétention courte (30 jours) ou un échantillonnage.

---

## 6. Checklist RGPD

État actuel (étape 1 uniquement) :

- [x] Aucun cookie déposé par Cloudflare Web Analytics
- [x] Aucune donnée personnelle envoyée à un tiers hors UE (Cloudflare a des datacenters UE et un DPA conforme)
- [x] Le formulaire lead-magnet collecte prénom + email avec consentement explicite (case + texte clair)
- [x] Mention de la finalité (recevoir le guide + être recontacté) sur le formulaire
- [ ] Page « Mentions légales / Politique de confidentialité » à compléter (lien présent dans le footer mais vide)
- [ ] Procédure de suppression sur demande (à documenter quand un cas se présentera)

À ajouter **uniquement si on active Clarity / Hotjar / GA4** (évolutions 2 & 3) :
- [ ] Bandeau de consentement cookies
- [ ] Mise à jour de la politique de confidentialité (mention du tracking)
- [ ] Chargement conditionnel des scripts tiers après consentement

---

## 7. Récapitulatif

| Couche | Outil | Statut | Effort restant |
|---|---|---|---|
| Trafic & audience | Cloudflare Web Analytics (auto-inject) | ✅ Actif sur `launchpadfactory.fr` | — |
| Conversions | D1 (tables `leads`, `downloads`) | ✅ En place | — |
| Comportement (heatmaps) | Microsoft Clarity | ⏳ Évolution 2 | Bandeau consentement requis |
| Funnels avancés | Events custom CF / Plausible | ⏳ Évolutions 1 & 5 | Selon besoin |
| Attribution campagnes | UTM dans D1 | ⏳ Évolution 4 | Quand on lance des campagnes |

Documentation associée : [lead-magnet.md](lead-magnet.md) pour le détail du tracking conversions côté serveur.
