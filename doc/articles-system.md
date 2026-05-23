# Système de publication d'articles — Référence technique

> **Périmètre** : Ce document définit l'architecture, les conventions et le catalogue exhaustif
> des blocs de contenu pour la publication d'articles sur le site LaunchPad Épiceries.
> Il sert de source de vérité pour le script de compilation *et* de prompt de cadrage pour tout LLM
> chargé de rédiger ou mettre en forme un article.

---

## 1. Vue d'ensemble

### Workflow de publication

```
Rédaction            Compilation           Déploiement
──────────────       ─────────────         ───────────────
content/
  articles/
    mon-article.md   →  build.sh  →  epiceries/articles/mon-article.html
                         (Node.js        │
                          script)         └── inclus dans `public/` par
                                              `cp -r epiceries/ public/epiceries/`
                                              puis `npx wrangler deploy`
```

### Principe fondamental

Le fichier `.md` **ne contient que du contenu** — jamais de structure HTML, jamais de classes CSS.
Le script de compilation est le seul responsable de la traduction bloc → HTML.
Si un bloc n'existe pas dans le catalogue, il ne peut pas être utilisé.

---

## 2. Structure d'un fichier article

Chaque article est un unique fichier `.md` dans `content/articles/`.

```
content/
  articles/
    traceo.md
    guide-fromages.md
    _template-blank.md    ← copier ce fichier pour un nouvel article
```

Un fichier article est divisé en **deux zones** séparées par `---` :

```
┌─────────────────────────────────────────────┐
│  FRONT MATTER YAML  (entre les deux ---)    │
│  Métadonnées de l'article (titre, date…)    │
├─────────────────────────────────────────────┤
│  CORPS DE L'ARTICLE                         │
│  Succession de blocs de contenu             │
└─────────────────────────────────────────────┘
```

---

## 3. Spécification du front matter YAML

Le front matter est délimité par `---` en début et fin. **Tous les champs marqués `[requis]`
doivent être présents.** Un champ absent ou mal typé fait échouer la compilation.

```yaml
---
# ── Identification ──────────────────────────────────────────────────────────
slug: guide-fromages-affineur          # [requis] Identifiant URL, kebab-case, ASCII uniquement
                                       #          → génère /epiceries/articles/guide-fromages-affineur.html

# ── SEO & metadata HTML ─────────────────────────────────────────────────────
title: "Comment choisir ses fromages d'affineur"
                                       # [requis] Balise <title> + og:title. Max 70 caractères.
description: "Trois critères que vos clients ignorent et qui font toute la différence en fromagerie."
                                       # [requis] Meta description. 120–160 caractères.
canonical: "/epiceries/articles/guide-fromages-affineur.html"
                                       # [optionnel] Si absent, calculé depuis slug.

# ── En-tête visible (cover) ─────────────────────────────────────────────────
kicker: "Guide produit · Fromagerie"   # [requis] Ligne courte au-dessus du titre. Max 60 caractères.
headline: "Comment choisir ses fromages d'affineur"
                                       # [requis] H1 affiché. Peut contenir **gras** et _italique_.
                                       #          Une seule ligne (pas de saut de ligne forcé).
deck: "Trois critères que vos clients ignorent et qui font toute la différence."
                                       # [requis] Sous-titre introductif. 1–2 phrases. Max 200 caractères.

# ── Méta-données affichées dans la cover ────────────────────────────────────
meta:                                  # [requis] Entre 2 et 5 entrées.
  - label: "Type"
    value: "Guide achat"
  - label: "Lecture"
    value: "6 min"
  - label: "Publié le"
    value: "Juin 2026"

# ── CSS utilisé par l'article ───────────────────────────────────────────────
stylesheet: "article.css"             # [requis] Nom du fichier CSS dans epiceries/articles/.
                                      #          Par défaut "article.css" pour tous les articles standard.

# ── Navigation & footer ─────────────────────────────────────────────────────
topbar_label: "LaunchPad"             # [optionnel] Texte du lien retour topbar. Défaut : "LaunchPad"
topbar_href: "../index.html"          # [optionnel] Destination du lien retour. Défaut : "../index.html"
topbar_meta: "Étude produit · 2026"  # [optionnel] Label droit de la topbar.
footer_copyright: "© 2026 LaunchPad" # [optionnel] Texte copyright dans le colophon.
footer_links:                         # [optionnel] Liens du footer. Si absent, liens par défaut.
  - label: "Épiceries fines"
    href: "../index.html"
  - label: "Site agence"
    href: "https://launchpadfactory.webflow.io/"
    external: true

# ── Open Graph ──────────────────────────────────────────────────────────────
og_image: "https://images.unsplash.com/photo-xxx?w=1200&q=80"
                                      # [optionnel] URL absolue, ratio 1.91:1 recommandé.
og_type: "article"                    # [optionnel] Défaut : "article".
---
```

### Règles strictes sur le front matter

| Règle | Détail |
|---|---|
| Encodage | UTF-8, sans BOM |
| `slug` | Kebab-case, lettres ASCII + tirets uniquement. Pas d'accents, pas d'espaces. |
| `title` | Ne pas terminer par un point. Pas de HTML à l'intérieur. |
| `description` | Toujours entre guillemets doubles dans le YAML. Pas de HTML à l'intérieur. |
| `headline` | Gras `**mot**` et italique `_mot_` autorisés. Une seule ligne. Pas de `<br>`. |
| `meta[].value` | Texte brut uniquement. Max 40 caractères par valeur. |
| Champs inconnus | Ignorés par le script de compilation. |

---

## 4. Catalogue des blocs de contenu

Le corps de l'article est une succession de blocs. Chaque bloc a une syntaxe Markdown précise.

### 4.1 Conventions syntaxiques

**Blocs simples** — syntaxe Markdown standard directement reconnue par le compilateur.

**Blocs structurés** — délimités par des balises `:::` avec un identifiant de type :

```
:::[type-de-bloc]
champ: valeur
champ: valeur
:::
```

Les blocs structurés contiennent des champs clé/valeur. Chaque champ suit la syntaxe `clé: valeur`.
Pour les valeurs sur plusieurs lignes, utiliser le repli YAML `|` (voir exemples).

Un bloc structuré **multi-entrées** (liste de cartes, timeline…) sépare chaque item par `---` :

```
:::[type-de-bloc]
champ: valeur A
champ: valeur B
---
champ: valeur C
champ: valeur D
:::
```

---

### 4.2 Blocs simples

#### `paragraph` — Paragraphe courant

Tout paragraphe Markdown standard devient un `<p class="col">`.

```markdown
L'épicerie fine indépendante doit gérer ses DLC avec une rigueur absolue.
La moindre négligence expose à un contrôle sanitaire, voire à une fermeture.
```

**Balises Markdown autorisées à l'intérieur** : `**gras**`, `_italique_`, `[lien](url)`, `~~barré~~`.

**HTML généré :**
```html
<p class="col">L'épicerie fine indépendante...</p>
```

---

#### `lede` — Paragraphe d'accroche

Premier paragraphe de l'article, mis en valeur typographiquement. **Un seul par article, obligatoirement en premier bloc du corps.**

```markdown
:::lede
En France, toute épicerie fine doit pouvoir attester d'une traçabilité
impeccable des dates limites de consommation de ses produits en rayon.
:::
```

**HTML généré :**
```html
<p class="lede col">En France, toute épicerie fine...</p>
```

---

#### `chapter` — Titre de chapitre

Chaque grande section de l'article. Correspond aux `<h2>` dans le document.

```markdown
## Chapitre I — Le constat
```

**Règle** : le numéro (`Chapitre I`, `Chapitre II`…) est extrait automatiquement si le titre
suit le format `## Chapitre [Numéro] — [Titre]`. Sinon, le titre entier est utilisé comme `chapter-title`
et `chapter-num` est omis.

**HTML généré :**
```html
<header class="chapter">
  <span class="chapter-num">Chapitre I</span>
  <h2 class="chapter-title">Le constat</h2>
</header>
```

---

#### `section` — Sous-titre de section

Titre de niveau inférieur au chapitre, sans numérotation. Correspond aux `<h3>`.

```markdown
### Les trois AOP incontournables
```

**HTML généré :**
```html
<h3 class="section-title col">Les trois AOP incontournables</h3>
```

---

#### `blockquote` — Citation mise en valeur (pull quote)

```markdown
> J'aimerais un outil léger, très intuitif et efficace pour renseigner mes produits.
> — Le gérant d'une épicerie fine indépendante
```

La ligne commençant par `— ` (tiret cadratin + espace) est l'attribution. Si absente, `<cite>` est omis.

**HTML généré :**
```html
<blockquote class="pullquote">
  <p>J'aimerais un outil léger, très intuitif et efficace pour renseigner mes produits.</p>
  <cite>— Le gérant d'une épicerie fine indépendante</cite>
</blockquote>
```

---

### 4.3 Blocs structurés — images & médias

#### `figure` — Image avec légende

```
:::figure
src: https://images.unsplash.com/photo-xxx?w=1200&q=80
alt: Plateau de fromages affinés sur ardoise noire, épicerie fine de Lyon.
caption: **Le plateau signature** — mise en avant saisonnière, printemps 2026.
wide: false
tablet: false
cover: false
:::
```

| Champ | Type | Valeur par défaut | Description |
|---|---|---|---|
| `src` | URL absolue | — | **[requis]** Image. Unsplash : ajouter `?w=1200&q=80`. |
| `alt` | texte | — | **[requis]** Description précise pour l'accessibilité. |
| `caption` | texte Markdown | — | [optionnel] Légende. `**gras**` autorisé. |
| `wide` | `true` / `false` | `false` | Étend la figure à `col-wide` (64rem). |
| `tablet` | `true` / `false` | `false` | Affiche en style "tablette posée" (ombre portée). |
| `cover` | `true` / `false` | `false` | Image pleine largeur, en tête de corps d'article. |

**HTML généré (défaut) :**
```html
<figure class="figure">
  <img src="…" alt="…" loading="lazy" />
  <figcaption><strong>Le plateau signature</strong> — mise en avant saisonnière, printemps 2026.</figcaption>
</figure>
```

**HTML généré (`wide: true`, `tablet: true`) :**
```html
<figure class="figure figure-wide figure-tablet">…</figure>
```

**HTML généré (`cover: true`) :**
```html
<figure class="cover-figure">…</figure>
```

---

### 4.4 Blocs structurés — listes éditoriales

#### `sequence` — Liste ordonnée numérotée (étapes)

```
:::sequence
title: Scanner
text: À la réception, on scanne le code-barres et on renseigne la DLC.
      Le produit est référencé en quelques secondes.
---
title: Être alerté
text: Chaque catégorie a son seuil. L'application notifie au bon moment.
---
title: Valoriser
text: D'un coup d'œil, on identifie les sur-stocks et les lots à écouler.
:::
```

| Champ par item | Type | Description |
|---|---|---|
| `title` | texte | **[requis]** Titre de l'étape (`<h3>`). |
| `text` | texte | **[requis]** Description. Retour à la ligne possible avec indentation. |

**HTML généré :**
```html
<ol class="sequence">
  <li>
    <div>
      <h3>Scanner</h3>
      <p>À la réception, on scanne…</p>
    </div>
  </li>
  …
</ol>
```

---

#### `features` — Grille de fonctionnalités

Liste de fonctionnalités ou avantages sans ordre imposé (grille).

```
:::features
title: Scan code-barres
text: Lecture rapide depuis le mobile, sans matériel additionnel.
---
title: Inventaire centralisé
text: Une fiche par produit — nom, lot, fournisseur, photo, DLC.
---
title: Alertes paramétrables
text: Seuils de notification définis par catégorie de produit.
:::
```

Même structure que `sequence`, **minimum 2 items, maximum 8 items.**

**HTML généré :**
```html
<ul class="feature-list">
  <li>
    <h3>Scan code-barres</h3>
    <p>Lecture rapide…</p>
  </li>
  …
</ul>
```

---

#### `strategy` — Grille stratégique (cartes horizontales)

Trois colonnes présentant un angle stratégique, un bénéfice clé ou trois points de vue.

```
:::strategy
title: Opérations commerciales
text: Identifier les sur-stocks ou les DLC approchantes pour lancer des promotions ciblées.
---
title: Animation vitrine
text: Mettre en avant les bons produits au bon moment, transformer une perte en vente.
---
title: Réduction des pertes
text: Quantifier la valeur des invendus pour ajuster les achats et maximiser la marge.
:::
```

**Contrainte : exactement 3 items.**

**HTML généré :**
```html
<div class="strategy">
  <article>
    <h3>Opérations commerciales</h3>
    <p>Identifier les sur-stocks…</p>
  </article>
  …
</div>
```

---

### 4.5 Blocs structurés — données & indicateurs

#### `stats` — Ligne de statistiques clés

```
:::stats
value: −15 min
text: par jour gagnées sur la gestion des relevés DLC, à boutique équivalente.
---
value: −30%
text: jusqu'à, sur les pertes liées aux invendus, en anticipant les dates critiques.
---
value: 100%
text: de traçabilité conforme, prête à être présentée en cas de contrôle.
disclaimer: Estimations sur la base des retours utilisateurs et de l'analyse de cas types.
:::
```

| Champ | Portée | Description |
|---|---|---|
| `value` | par item | **[requis]** Chiffre ou indicateur court. Max 10 caractères. |
| `text` | par item | **[requis]** Explication. Max 120 caractères. |
| `disclaimer` | bloc global | [optionnel] Note de bas de bloc en petits caractères. |

**HTML généré :**
```html
<dl class="stat-row">
  <div><dt>−15 min</dt><dd>par jour gagnées…</dd></div>
  …
</dl>
<p class="stat-disclaimer">Estimations sur la base…</p>
```

---

#### `timeline` — Chronologie narrative

```
:::timeline
label: Le contexte
title: Plusieurs heures par semaine, sur du papier.
text: Le gérant suivait ses DLC sur un classeur papier. Entre les livraisons hebdomadaires
      et la pression réglementaire, le suivi prenait du temps et restait fragile.
---
label: La demande
title: Trois verbes, aucune fonctionnalité.
text: "Renseigner, automatiser, quantifier." Le brief n'imposait rien, ni écran, ni techno.
---
label: La démarche
title: Cadrer en boutique, pas en réunion.
text: Observation sur place, à la réception et en rayon. Premier prototype testé dès la troisième semaine.
---
label: Le résultat
title: Un outil né d'un besoin, devenu un produit.
text: Quelques semaines plus tard, l'application était en boutique. D'un client unique,
      Traceo est devenu l'outil quotidien de plus de cinquante épiceries fines.
:::
```

| Champ par item | Description |
|---|---|
| `label` | **[requis]** Étiquette courte (ex. "Le contexte"). Max 30 caractères. |
| `title` | **[requis]** Titre de l'étape (`<h3>`). |
| `text` | **[requis]** Corps narratif. Retour à la ligne avec indentation. |

**HTML généré :**
```html
<div class="timeline">
  <div class="timeline-item">
    <span class="timeline-label">Le contexte</span>
    <h3>Plusieurs heures par semaine, sur du papier.</h3>
    <p>Le gérant suivait ses DLC…</p>
  </div>
  …
</div>
```

---

### 4.6 Blocs de fin d'article

#### `endplate` — Plaque de fin (call-to-action principal)

Bloc de conclusion avec appel à l'action fort. **Un seul par article, en dernier bloc avant `coda`.**

```
:::endplate
id: telecharger
kicker: Disponible maintenant
title: Prêt à arrêter de jeter vos marges ?
deck: Téléchargez Traceo gratuitement et testez l'application sur vos rayons dès aujourd'hui.
secondary_text: Vous préférez en discuter avant ?
secondary_link_label: Réservez une démo de trente minutes
secondary_link_href: "#contact"
:::
```

Pour un endplate avec des boutons store (Apple/Google Play), utiliser `endplate-stores` (voir §4.7).

**HTML généré :**
```html
<aside class="endplate" id="telecharger">
  <p class="endplate-kicker">Disponible maintenant</p>
  <h2>Prêt à arrêter de jeter vos marges ?</h2>
  <p class="endplate-deck">Téléchargez Traceo…</p>
  <p class="endplate-secondary">
    Vous préférez en discuter avant ? <a href="#contact">Réservez une démo de trente minutes</a>.
  </p>
</aside>
```

---

#### `coda` — Pont LaunchPad

Section de transition vers le site agence. Toujours identique dans sa structure, seul le texte change.

```
:::coda
kicker: LaunchPad
title: Un outil métier qui vous manque ?
text: Traceo est né d'une conversation. Si vous portez vous aussi une idée d'outil,
      d'application ou de site sur mesure, on aimerait en entendre parler.
link_label: Découvrir nos services
link_href: "../index.html#services"
:::
```

**HTML généré :**
```html
<section class="coda">
  <hr class="coda-rule" aria-hidden="true" />
  <p class="coda-kicker">LaunchPad</p>
  <h2>Un outil métier qui vous manque ?</h2>
  <p>Traceo est né d'une conversation…</p>
  <a class="coda-link" href="../index.html#services">
    Découvrir nos services
    <svg>…</svg>
  </a>
</section>
```

---

### 4.7 Blocs étendus (usage spécifique)

Ces blocs existent dans `traceo.html` mais n'ont pas vocation à être utilisés dans tous les articles.
Ils doivent être ajoutés au compilateur avant d'être utilisables (voir §7).

#### `endplate-stores` — Endplate avec liens stores mobile

```
:::endplate-stores
id: telecharger
kicker: Disponible maintenant
title: Prêt à arrêter de jeter vos marges ?
deck: Téléchargez Traceo gratuitement et testez l'application dès aujourd'hui.
secondary_text: Vous préférez en discuter avant ?
secondary_link_label: Réservez une démo de trente minutes
secondary_link_href: "#contact"
stores:
  - name: Google Play
    os: Pour Android
    cta: Ouvrir le store
    href: https://play.google.com/store/apps/details?id=com.launchpadfactory.traceo
  - name: App Store
    os: Pour iPhone & iPad
    cta: Ouvrir le store
    href: https://apps.apple.com/fr/app/traceo/id6754067857
:::
```

#### `results-inline` — Résultats synthétiques (bullets)

```
:::results-inline
label: En chiffres
items:
  - mark: heures → minutes
    text: le relevé DLC, passé d'un travail hebdomadaire à un geste quotidien.
  - mark: visibilité
    text: claire sur les lots à écouler et la répartition des pertes par catégorie.
  - mark: +50 épiceries
    text: utilisent aujourd'hui Traceo en France, à partir de ce premier déploiement.
:::
```

---

## 5. Règles anti-hallucination pour le LLM

Ces règles doivent être incluses dans tout prompt de rédaction ou de mise en forme d'article.

### 5.1 Règles générales

```
RÈGLE 1 — Types de blocs : utiliser UNIQUEMENT les types listés dans le catalogue.
  Jamais inventer un type. Si un besoin ne correspond à aucun type, utiliser `paragraph`.

RÈGLE 2 — Syntaxe des blocs structurés : toujours ouvrir avec :::type et fermer avec :::.
  Ne jamais omettre la ligne de fermeture. Ne jamais imbriquer des blocs structurés.

RÈGLE 3 — Champs requis : tous les champs marqués [requis] dans le catalogue doivent
  être présents. Un champ manquant casse la compilation.

RÈGLE 4 — Séparateurs : dans un bloc multi-items, toujours utiliser --- seul sur sa ligne
  pour séparer les items. Ne jamais utiliser d'autre séparateur.

RÈGLE 5 — HTML interdit : jamais de balise HTML dans le corps de l'article.
  Les seules balises autorisées sont dans le front matter (aucune en réalité).

RÈGLE 6 — Front matter : toujours commencer par --- et terminer le front matter par ---.
  Jamais de caractères tabulation dans le YAML (utiliser des espaces).

RÈGLE 7 — URLs : utiliser uniquement des URLs absolues (https://…) pour les images.
  Pour les liens internes, utiliser des chemins relatifs (../index.html).

RÈGLE 8 — Longueurs : respecter les limites de caractères indiquées dans le catalogue.
  Un champ trop long ne casse pas la compilation mais dégrade le rendu.

RÈGLE 9 — Markdown inline : seuls **gras**, _italique_, [lien](url) sont autorisés dans
  les paragraphes. Pas de HTML, pas de ~barré~, pas d'images Markdown ![].

RÈGLE 10 — Blocs `stats` : les `value` sont des indicateurs chiffrés courts (−15 min, +50%…).
  Ne jamais y mettre une phrase complète.
```

### 5.2 Template de prompt pour la rédaction d'un article

```
Tu vas rédiger un article en Markdown pour le site LaunchPad Épiceries.
Suis STRICTEMENT les règles et le catalogue de blocs définis dans articles-system.md.

Contraintes absolues :
- Utilise uniquement les types de blocs du catalogue (paragraph, lede, chapter, section,
  blockquote, figure, sequence, features, strategy, stats, timeline, endplate, coda).
- N'invente aucun type de bloc.
- Tous les champs [requis] doivent être présents.
- Aucun HTML dans le corps de l'article.
- Front matter complet avec tous les champs requis.

Sujet de l'article : [DÉCRIRE LE SUJET ICI]
Ton : expert mais accessible, sobre, premium. Langue : français.
Structure suggérée : [DÉCRIRE LA STRUCTURE ICI]
```

---

## 6. Architecture du script de compilation

### 6.1 Fichiers concernés

```
scripts/
  build-articles.js     ← script principal (appelé par build.sh)
  lib/
    parse-frontmatter.js  ← lecture et validation du front matter YAML
    parse-blocks.js       ← découpage du corps en blocs
    render-blocks.js      ← rendu HTML de chaque bloc (un renderer par type)
    render-page.js        ← assemblage final de la page HTML complète

content/
  articles/
    *.md                  ← sources des articles
    _template-blank.md    ← template vierge à copier

epiceries/
  articles/
    *.html                ← fichiers générés (ne pas éditer à la main)
    article.css           ← CSS partagé par tous les articles standard
```

### 6.2 Appel depuis `build.sh`

Ajouter cette étape avant la copie `epiceries/ → public/epiceries/` :

```bash
echo "[0/3] Compilation des articles Markdown → HTML..."
node scripts/build-articles.js
echo "  OK"
```

### 6.3 Interface du renderer de blocs

Chaque type de bloc est un module indépendant dans `render-blocks.js`.
Pour ajouter un nouveau type, implémenter cette interface :

```js
// Interface attendue par le compilateur
export function render_[nomDuType](fields) {
  // `fields` : objet avec les champs du bloc (strings)
  // Pour les blocs multi-items : `fields.items` est un tableau d'objets
  // Retourne : une string HTML
  return `<div class="…">…</div>`;
}
```

La table de dispatch dans `render-blocks.js` :

```js
const RENDERERS = {
  lede:             render_lede,
  chapter:          render_chapter,    // aussi déclenché par ## Chapitre
  section:          render_section,    // aussi déclenché par ###
  blockquote:       render_blockquote, // aussi déclenché par >
  figure:           render_figure,
  sequence:         render_sequence,
  features:         render_features,
  strategy:         render_strategy,
  stats:            render_stats,
  timeline:         render_timeline,
  endplate:         render_endplate,
  'endplate-stores': render_endplate_stores,
  'results-inline': render_results_inline,
  coda:             render_coda,
  // ← ajouter ici les nouveaux types
};
```

---

## 7. Extensibilité — Ajouter un nouveau type de bloc

Pour ajouter un type de bloc sans casser les articles existants :

### Étape 1 — Définir le bloc dans ce document

Ajouter une section dans §4 (ou §4.7 si usage spécifique) avec :
- La syntaxe `.md` exacte
- Le tableau des champs (nom, type, requis/optionnel, contraintes)
- L'HTML généré attendu

### Étape 2 — Implémenter le renderer

Dans `scripts/lib/render-blocks.js` :

```js
function render_monNouveauBloc(fields) {
  // Valider les champs requis
  if (!fields.title) throw new Error('[mon-nouveau-bloc] champ `title` requis');
  // Générer le HTML
  return `
<section class="mon-nouveau-bloc">
  <h2>${escapeHtml(fields.title)}</h2>
  <p>${renderInline(fields.text)}</p>
</section>`.trim();
}
```

Ajouter `'mon-nouveau-bloc': render_monNouveauBloc` dans `RENDERERS`.

### Étape 3 — Ajouter le CSS si nécessaire

Dans `epiceries/articles/article.css`, ajouter la règle `.mon-nouveau-bloc { … }`.
Ne jamais modifier le CSS d'un bloc existant si des articles l'utilisent déjà.

### Étape 4 — Mettre à jour `_template-blank.md`

Ajouter le nouveau bloc (commenté / exemple vide) dans le template vierge.

### Étape 5 — Tester avec un article de développement

Créer `content/articles/_test-mon-bloc.md`, vérifier le HTML généré, supprimer le fichier de test.

---

## 8. Tableau de correspondance complet

| Bloc Markdown | Classe(s) HTML | Élément racine | Multi-items |
|---|---|---|---|
| Paragraphe standard | `col` | `<p>` | Non |
| `:::lede` | `lede col` | `<p>` | Non |
| `## Chapitre N — Titre` | `chapter` | `<header>` | Non |
| `### Titre` | `section-title col` | `<h3>` | Non |
| `> citation` | `pullquote` | `<blockquote>` | Non |
| `:::figure` | `figure [figure-wide] [figure-tablet] [cover-figure]` | `<figure>` | Non |
| `:::sequence` | `sequence` | `<ol>` | Oui |
| `:::features` | `feature-list` | `<ul>` | Oui |
| `:::strategy` | `strategy` | `<div>` | Oui (3 fixes) |
| `:::stats` | `stat-row` + `stat-disclaimer` | `<dl>` | Oui |
| `:::timeline` | `timeline` | `<div>` | Oui |
| `:::results-inline` | `results-inline` | `<div>` | Oui |
| `:::endplate` | `endplate` | `<aside>` | Non |
| `:::endplate-stores` | `endplate` + `stores` | `<aside>` | Stores seulement |
| `:::coda` | `coda` | `<section>` | Non |

---

## 9. Exemple de fichier article complet

```markdown
---
slug: choisir-fromages-affineur
title: "Comment choisir ses fromages d'affineur"
description: "Trois critères que vos clients ignorent et qui font toute la différence en fromagerie."
kicker: "Guide produit · Fromagerie"
headline: "Comment choisir ses fromages d'affineur"
deck: "Trois critères que vos clients ignorent et qui font toute la différence."
meta:
  - label: "Type"
    value: "Guide achat"
  - label: "Lecture"
    value: "5 min"
  - label: "Publié le"
    value: "Juin 2026"
stylesheet: "article.css"
---

:::lede
En épicerie fine, la qualité du fromage commence avant la vitrine. Elle commence au choix
de l'affineur — et ce choix, beaucoup de gérants le font encore à l'instinct.
:::

Le problème n'est pas l'instinct lui-même : c'est qu'un instinct mal informé coûte cher.
Un lot sur-affiné en été, un fromage de chèvre frais livré trop tôt, une pâte pressée
achetée trop jeune — autant de marges qui fondent avant même d'atteindre le plateau.

## Chapitre I — Ce que cache le mot "affineur"

Le terme est protégé en France. Un affineur est un professionnel qui achète des fromages
en cours d'affinage, les sélectionne et les élève dans ses caves.

> L'affineur ne fabrique pas. Il écoute, il attend, il décide quand le fromage est prêt.
> — Jean-Paul Roux, fromager affineur à Lyon

### Les trois rôles de l'affineur

Derrière un seul mot se cachent trois métiers distincts, qu'il vaut mieux identifier avant
de signer un contrat.

:::sequence
title: Sélectionner
text: L'affineur choisit ses fromages jeunes auprès de producteurs. Son premier métier
      est celui d'acheteur — son flair commercial conditionne tout le reste.
---
title: Affiner
text: En cave, à température et humidité contrôlées, il soigne la croûte, retourne,
      brosse, et décide de la durée. C'est là que la personnalité du fromage se forge.
---
title: Distribuer
text: Il vend aux crémeries et épiceries fines à un stade précis de l'affinage.
      La logistique froide et le timing de livraison font partie de son savoir-faire.
:::

## Chapitre II — Les trois critères à évaluer

:::strategy
title: La cave de destination
text: Un fromage affiné dans une cave trop sèche ou trop froide développe des défauts
      invisibles à la livraison mais rapides à apparaître en rayon.
---
title: Le calendrier de livraison
text: Un bon affineur livre au bon stade — pas trop jeune, pas trop avancé.
      Demandez systématiquement la durée d'affinage au moment de la commande.
---
title: La traçabilité du lot
text: Chaque fromage devrait être traçable jusqu'au producteur. C'est une exigence
      réglementaire et un argument de vente auprès de votre clientèle.
:::

:::figure
src: https://images.unsplash.com/photo-1452195100486-9cc7a1b2c8e3?w=1200&q=80
alt: Cave d'affinage avec meules de fromage sur des étagères en bois, éclairage tamisé.
caption: **Cave d'affinage en Savoie** — humidité contrôlée à 95%, température à 12°C.
wide: true
:::

## Chapitre III — Ce que ça change en rayon

:::stats
value: +18%
text: de marge nette en moyenne sur les fromages bien sélectionnés vs achetés en grossiste.
---
value: −40%
text: de retours invendus chez les épiceries qui travaillent avec 2 affineurs max (source terrain).
---
value: 3 semaines
text: : c'est la fenêtre idéale entre livraison et date limite de vente pour une pâte molle.
disclaimer: Estimations basées sur des retours d'épiceries partenaires LaunchPad, 2025–2026.
:::

:::endplate
id: contact
kicker: Besoin d'un accompagnement
title: On peut vous aider à structurer vos achats fromagers.
deck: LaunchPad travaille avec des épiceries fines indépendantes pour optimiser leurs filières
      d'approvisionnement et leur rentabilité rayon.
secondary_text: Préférez-vous d'abord poser une question ?
secondary_link_label: Contactez-nous directement
secondary_link_href: "../index.html#contact"
:::

:::coda
kicker: LaunchPad
title: Un sujet qui vous parle ?
text: Nos guides sont nés de terrain, pas de théorie. Si vous voulez qu'on creuse un sujet
      spécifique à votre commerce, dites-le nous.
link_label: Voir nos services
link_href: "../index.html#services"
:::
```

---

## 10. Checklist de publication

Avant de pousser sur le dépôt :

- [ ] `slug` unique, absent des articles existants
- [ ] `title` et `description` relus (SEO)
- [ ] Tous les champs `[requis]` présents dans le front matter
- [ ] `build.sh` exécuté localement sans erreur
- [ ] HTML généré ouvert dans le navigateur et vérifié visuellement
- [ ] Images accessibles (URLs valides, `alt` descriptif)
- [ ] `:::` de fermeture présents sur tous les blocs structurés
- [ ] Aucune balise HTML dans le corps `.md`
- [ ] `npx wrangler deploy` effectué
