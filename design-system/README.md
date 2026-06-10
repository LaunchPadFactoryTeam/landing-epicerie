# Handoff — LaunchPad Factory · Refonte du site vitrine

> Passation du chantier de refonte de **launchpadfactory.fr** (page agence + verticale épiceries fines) vers Claude Code.

---

## TL;DR pour Claude Code

Tu reprends un chantier de **refonte de design** d'un site vitrine, conduit en amont dans un environnement de design. **Deux livrables finaux sont prêts** :

- `05 Home agence.html` — nouvelle home de l'agence (orange signature)
- `06 Home epiceries.html` — verticale épiceries fines (accent olive)

Ces fichiers sont du **HTML/CSS vanilla auto-suffisant** (un seul `<style>` embedded par page, 3 mini-scripts vanilla). Ils sont **pixel-perfect** et **prêts à être intégrés directement** dans le repo existant (`landing-epicerie` sur GitHub, stack Cloudflare Workers + vanilla HTML/CSS). Il n'y a pas de framework à transposer ni de design system à reconstruire — la stack actuelle du client est elle-même vanilla.

**Ce qu'on attend de toi :**
1. Cloner / rebrancher ces fichiers sur la **structure existante du repo** (Cloudflare Workers + worker.js + routing)
2. Conserver les **fonctionnalités backend déjà en place** (formulaire de contact, Turnstile, redirections)
3. Adapter les chemins (`/epiceries`, `/traceo`, `/guides/*`, etc.) à la structure de routing déjà en place
4. **Tester en local + déployer** sur Cloudflare Pages / Workers

---

## À propos des fichiers de design

Les `.html` livrés sont **des références de design** créées en amont — des prototypes haute-fidélité montrant l'apparence finale et les comportements attendus.

**Cas particulier** : la stack cible (`landing-epicerie` sur GitHub) est elle-même vanilla HTML/CSS/JS servi par un Cloudflare Worker. Les fichiers livrés peuvent donc être **utilisés directement** (avec quelques ajustements de routing). Ce n'est pas du React à transposer, c'est de la prod prête à mettre en ligne.

Si tu identifies des écarts entre les fichiers livrés et les conventions du repo existant (naming, structure de dossiers, conventions CSS), **suis les conventions du repo**.

---

## Fidélité

**Haute fidélité (hifi)** — pixel-perfect.
- Toutes les couleurs sont en hex/oklch finaux (pas de placeholder)
- Toute la typographie est définie (Google Fonts spécifiques, poids, échelles)
- Tous les composants ont leurs états (default, hover, focus, scrolled, open…)
- Le responsive est défini (3 breakpoints : 700/900/1024/1200)
- Les transitions et animations sont définies (durations, easings)

**Ce qui reste à compléter côté contenu (et qui est marqué comme placeholder)** :
- **Image hero** de la page épiceries — actuellement un placeholder rayé sombre. Le client doit fournir une photo de rayonnage d'épicerie fine, ou tu peux choisir une image libre de droits cohérente avec le ton.
- **Liens sociaux** (LinkedIn / Instagram du footer) — URLs à demander au client
- **Pages internes** (`/traceo`, `/guides/linkedin`, `/guides/email`, `/carnet`, `/mentions-legales`, `/confidentialite`) — les liens existent mais les pages elles-mêmes sont hors-périmètre de ce chantier

---

## Pages livrées

### Page 01 — Home agence (`05 Home agence.html`)

**Objectif** : Page d'accueil principale de l'agence. Cible : prospects génériques (PME, marques, indépendants) qui cherchent une équipe digitale française pour concevoir un outil sur-mesure.

**URL cible** : `/` (racine du domaine)

**Structure (10 sections)** :
1. **Announcement bar** — marquee animée (38s linéaire), texte « ★ Disponibles pour 2 nouveaux projets · Été 2026 · Web · Mobile · Auto · Marketing · Code 100% France · Réponse sous 24h ouvrées ». Animation pausée si `prefers-reduced-motion`.
2. **Header** — sticky en haut, blur backdrop, nav avec : Showroom · Pratiques · Approche · Épiceries fines · CTA « Démarrer →ʳ ». Menu hamburger en mobile.
3. **Hero** — gros disque orange en haut-droite, eyebrow pilule, headline XXL « Le digital, fait main. » (où « fait main » est en italique Instrument Serif crème par-dessus le disque orange). 3 stats compactes (+7 / 04 / 24h).
4. **Constat** — section dark (`--ink`) avec disque orange en bas-gauche. Titre + lead à gauche, liste de 4 problèmes numérotés à droite.
5. **Showroom** — fond crème. 3 case studies : Traceo (orange), Autodan (ink), Aeternam (forest). Hover : transform translateY(-6px) + ombre forte + bordure orange. Liens externes vers les articles existants sur launchpadfactory.webflow.io.
6. **Pratiques** — 4 cartes (Web · Mobile · Auto · Marketing) sur grille crème. Hover : translateY + change de cream → cream-deep.
7. **Approche** — section dark avec disque orange. 4 étapes en cartes horizontales (num, contenu, badge durée). Hover : translateX(6px).
8. **Verticale épiceries** — bridge vers `/epiceries`. Card crème avec disque olive, stamp décoratif rotaté.
9. **Final CTA** — section dark avec gros disque orange centré au-dessus. Headline « Un projet en tête ? Parlons-en. ». CTA mailto.
10. **Footer** — fond ink (`#0a0908`). 4 colonnes : marque, pratiques, ressources, contact (adresse + email + socials). Mentions légales en bas.

### Page 02 — Home épiceries (`06 Home epiceries.html`)

**Objectif** : Verticale dédiée aux épiciers fins. Cible : commerçants indépendants. Tonalité plus chaude, plus posée. Accent **olive sauge** en place de l'orange.

**URL cible** : `/epiceries` (sous-route du domaine)

**Structure (12 sections)** :
1. **Cross-link bar** — bandeau olive en haut avec lien retour vers `/`
2. **Header** — identique à la page agence mais : brand-mark olive, hover olive, nav différente (Services · Traceo · Ressources · Méthode · CTA « Réserver un appel → »)
3. **Hero** — fond photo (placeholder rayé warm-toned) + overlay sombre. Headline « L'agence digitale qui parle votre langage » avec « langage » en italique olive-soft (`#a9b285`). Pas de gros disque ici (ambiance plus posée).
4. **Constat** — fond paper, layout sticky-intro/list (intro à gauche colle au scroll sur desktop, liste à droite défile). 4 problèmes spécifiques aux épiciers.
5. **Services** — 3 cartes (Site sur mesure · Application sur mesure · Automatisations & intégrations). Chacune avec icône carrée ink + accent olive-soft.
6. **Traceo (app maison)** — section hero produit : texte à gauche avec benefit-list + CTA, mockup phone décoratif à droite (vraie mise en page UI épicerie · fromages · DLC). 2 badges flottants (« 3 produits à surveiller », « −18% de pertes ») avec animation floaty 6s.
7. **Testimonial** — section olive (`#5d6b3f`) avec gros guillemet décoratif Instrument Serif en arrière-plan. Citation Dominique Ferrero (Épicerie L'F), avatar « DF » placeholder, citation en Bricolage 500 italic-mix.
8. **Agence (trust block)** — fond crème. Texte à gauche, 4 stat-cards à droite (+50, 04, 24h, 100%).
9. **Lead magnets** — 2 guides PDF (LinkedIn / Email marketing) en cartes liens à gauche, 2 mockups PDF décoratifs (légèrement rotatés) à droite.
10. **Approche** — réutilise le même bloc que la page agence, mais avec disque olive en place de l'orange.
11. **Final CTA** — section dark avec gros disque olive centré. Headline « Votre épicerie mérite une présence à la hauteur de vos produits. ».
12. **Footer** — identique structure que page agence, avec h4 olive-soft.

---

## Design tokens (source de vérité)

### Couleurs

```css
/* Neutrals — communs aux deux pages */
--ink:        #161210;   /* Texte principal · headlines · CTA primary · backgrounds dark */
--ink-soft:   #5a4f49;   /* Corps de texte secondaire */
--ink-mute:   #8a807a;   /* Métadonnées, labels muets */
--paper:      #fbf6ef;   /* Background principal (clair) */
--cream:      #f1ead9;   /* Background secondaire (sections alternées) */
--cream-deep: #e8dfc8;   /* Hover state cream + accents */
--line:       rgba(22, 18, 16, 0.12);  /* Bordures par défaut */

/* Surfaces dark */
--ink-lift:   #211d1a;   /* Cards sur fond dark */
--ink-line:   rgba(251, 246, 239, 0.16);

/* Brand — page agence (orange signature) */
--orange:      #ff5c2c;   /* Accent signature */
--orange-deep: #cc4218;   /* Hover state */
--orange-soft: #ffb398;   /* Accents secondaires */
--orange-tint: rgba(255, 92, 44, 0.10);

/* Brand — verticale épicerie (olive sauge) */
--olive:       #5d6b3f;
--olive-deep:  #3f4a2b;
--olive-soft:  #a9b285;
--olive-tint:  rgba(93, 107, 63, 0.10);
```

### Typographie

3 familles Google Fonts. Toutes chargées via un seul `<link>` dans `<head>` :

```html
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

| Variable | Famille | Usage |
|---|---|---|
| `--display` | Bricolage Grotesque (variable, opsz 12-96) | Headlines, titres, brand name. Poids 500-800. |
| `--serif` | Instrument Serif (ital 0/1) | **Accents italiques uniquement** (mots-clés dans les headlines). Poids 400. |
| `--sans` | Geist | Body, navigation, boutons. Poids 400-700. |
| `--mono` | Geist Mono | Métadonnées, eyebrows (§), tags, durées, chiffres précis. Poids 400-600. |

**Échelle des titres** (responsive avec `clamp()`):
- `h1` : `clamp(2.8rem, 7vw, 7rem)`, line-height 0.88, letter-spacing -0.045em (épicerie) / `clamp(3.2rem, 8.4vw, 8.4rem)` letter-spacing -0.05em (agence)
- `h2` : `clamp(2.2rem, 5vw, 4.4rem)`, line-height 0.95, letter-spacing -0.035em
- `h3` : `clamp(1.4rem, 2vw, 1.8rem)`, font-weight 600, letter-spacing -0.018em
- `body` : 16px base, line-height 1.55

### Spacing & layout

```css
--container: 1240px;
--section-y: clamp(80px, 9vw, 128px);  /* Padding vertical d'une section */

/* Wrap padding (responsive) */
24px mobile → 40px @ 800px → 56px @ 1200px

/* Radii */
--r-sm:   8px;
--r-md:   14px;
--r-lg:   20px;
--r-xl:   28px;
--r-pill: 999px;

/* Shadows */
--sh-xs: 0 1px 2px rgba(22,18,16,0.04);
--sh-sm: 0 4px 14px rgba(22,18,16,0.06);
--sh-md: 0 12px 30px rgba(22,18,16,0.10);
--sh-lg: 0 24px 60px rgba(22,18,16,0.14);

/* Motion */
--t-fast: 160ms cubic-bezier(0.2, 0.7, 0.3, 1);
--t-base: 260ms cubic-bezier(0.2, 0.7, 0.3, 1);
--t-slow: 480ms cubic-bezier(0.2, 0.7, 0.3, 1);
```

---

## Composants & patterns clés

### Boutons

5 variants. Tous en `border-radius: var(--r-pill)`, padding `14px 24px` (md) / `16px 28px` (lg) / `10px 18px` (sm).

| Variant | Use case |
|---|---|
| `.btn-primary` | CTA principal — fond ink, texte paper, arrow orange/olive |
| `.btn-accent` | CTA d'action — fond orange (ou olive sur epicerie) |
| `.btn-outline` | CTA secondaire sur fond clair — paper bg, ink border |
| `.btn-outline-dark` | CTA secondaire sur fond clair (alt) |
| `.btn-ghost` | CTA tertiaire sur fond dark |

Hover : `transform: translateY(-1px)` + ombre passe de `--sh-sm` à `--sh-md` + background s'assombrit vers `--orange-deep` / `--olive-deep`.

### Eyebrow

```html
<span class="eyebrow">Showroom · §03</span>
```
Style : Geist Mono 0.72rem, letter-spacing 0.18em, uppercase, couleur accent (orange ou olive). Préfixé par `§` via `::before`.

### Headlines avec italique accent

Pattern systémique sur les `<h1>` / `<h2>` :
```html
<h2>Trois preuves <em class="it">récentes</em>.</h2>
```
`em.it` est défini par section/page :
- Page agence : `color: var(--orange)`
- Page épicerie : `color: var(--olive)` (via redéfinition de `em.it`)
- Sur fond dark, devient `var(--paper)` ou `var(--olive-soft)` selon contexte

### Disque coloré décoratif

Pattern récurrent (présent dans hero, constat, approche, final CTA) : un disque coloré 280-480px en pseudo-`::before` positionné absolu, opacity 0.95, sans interaction. Le contenu passe par-dessus en z-index 2.

```css
.section::before {
  content: '';
  position: absolute;
  top: -80px; right: -60px;
  width: 360px; height: 360px;
  border-radius: 50%;
  background: var(--orange);  /* ou olive */
  z-index: 1;
}
```

### Cards (showroom, services, stats)

- Background : `var(--paper)` (sur cream) ou `var(--cream)` (sur paper)
- Border : `1px solid var(--line)`
- Border-radius : `var(--r-lg)` (20px)
- Padding : `28-36px` selon densité
- Hover : `transform: translateY(-4 to -6px)`, ombre `var(--sh-md)` → `var(--sh-lg)`, border passe à `rgba(<accent>, 0.35)`

### Marquee announcement bar (page agence uniquement)

CSS-only marquee, double texte side-by-side, animation `transform: translateX(0 → -50%)` sur 38s linéaire infini. Désactivée si `prefers-reduced-motion: reduce`.

### Sticky header

```js
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });
```
Sur `.scrolled`, ajoute une bordure en bas. Backdrop-filter blur(14px) en permanence.

### Reveal on scroll

IntersectionObserver, classe `.reveal` (opacity 0 + translateY 20px) → `.visible` (opacity 1 + 0). Désactivé si `prefers-reduced-motion`. Sinon graceful fallback : tous les éléments deviennent visibles immédiatement.

### Mobile menu

`<button class="nav-toggle">` qui toggle `aria-expanded` et la classe `.open` sur `.primary-nav`. Animation 3-bar → croix avec rotations 45°.

---

## Interactions & comportement

| Élément | Comportement |
|---|---|
| **Header** | Sticky, devient bordé au scroll (>8px). Backdrop-blur permanent. |
| **Mobile menu** | Toggle hamburger, ouvre overlay full-width, ferme au clic d'un lien. |
| **Cards (showroom, prat, service)** | Hover : translate + shadow + border accent. |
| **Cards approche/steps** | Hover : `translateX(6px)`. |
| **Buttons** | Hover : `translateY(-1px)`, background plus foncé, shadow renforcée. |
| **CTAs avec arrow** | L'arrow `→` change de couleur au hover du parent. |
| **Marquee** | Auto-defile 38s, pause si `prefers-reduced-motion`. |
| **Floating badges (Traceo section)** | Animation `floaty` 6s sinusoïdale (translateY ±8px), pause si reduce-motion. |
| **Reveal on scroll** | Fade-in + translateY au franchissement du viewport (10% du bas). Une seule fois. |
| **Form submit** | Aucun (les CTAs principaux sont des `mailto:` vers `launchpadfactoryteam@gmail.com`). À reconnecter au formulaire de contact existant du repo si besoin. |

---

## Comportement responsive

3 breakpoints principaux dans les deux pages :

- **< 700px** : mobile. Grilles 1 colonne, menu hamburger, padding `24px`.
- **700-1023px** : tablette. Grilles 2 colonnes, menu hamburger encore.
- **1024-1199px** : desktop early. Menu desktop, grilles 3-4 colonnes.
- **≥ 1200px** : desktop large. Padding 56px, container max-width 1240px.

Tester chaque page sur ces 4 tailles avant de merger.

---

## Intégration dans le repo existant

Le repo cible est **`LaunchPadFactoryTeam/landing-epicerie`** sur GitHub :

```
landing-epicerie/
├── epiceries/               ← page épicerie actuelle (à remplacer)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── traceo.html
│   ├── articles/
│   └── assets/
├── webflow-export/          ← page agence actuelle (à remplacer)
├── functions/               ← Cloudflare Worker functions
├── src/worker.js
└── wrangler.jsonc
```

**Plan d'intégration suggéré** :

1. **Sauvegarder une branche** de l'état actuel (`backup/pre-redesign`).
2. **Créer une branche** `feature/design-v2` depuis `develop`.
3. **Remplacer `epiceries/index.html`** par le contenu de `06 Home epiceries.html`. Pour garder le CSS séparé (cohérence avec le repo qui a `epiceries/style.css`), extraire le bloc `<style>` du fichier livré et le mettre dans un nouveau `epiceries/style.css` (en remplaçant l'ancien). Idem pour le `<script>` final → `epiceries/script.js`.
4. **Remplacer la home agence** dans `webflow-export/index.html` (ou créer un nouveau `index.html` à la racine selon la structure du worker — voir `src/worker.js` pour la logique de routing actuelle).
5. **Adapter les chemins** :
   - `/` → home agence
   - `/epiceries` → home épicerie
   - `/traceo` → vers la page traceo existante (`epiceries/traceo.html`)
   - `/guides/linkedin`, `/guides/email` → vers les guides PDF existants
6. **Reconnecter le formulaire de contact** existant (Turnstile + worker function `functions/`) aux CTAs si le client le souhaite. Actuellement les CTAs principaux sont des `mailto:` simples.
7. **Tester en local** avec `wrangler dev` (le repo a `wrangler.jsonc` configuré).
8. **Tester sur les 4 breakpoints** (375, 768, 1024, 1440).
9. **Déployer** sur Cloudflare Pages.

---

## Contenu & copy

Les copies finales sont **validées avec le client** (cf. `04 Wording et contenu.html` joint pour le brief complet et les variantes alternatives). Quelques points-clés :

- **Tagline pivot** : « Le digital, fait main. » (à ne pas modifier)
- **Stats à utiliser** :
  - +7 projets livrés (agence) / +50 épiceries (épicerie)
  - 04 apps publiées
  - 24h de premier retour
  - 100% code en France
- **Cas clients du showroom (agence)** :
  - **Traceo** — app DLC maison, +50 épiceries
  - **Autodan** — concession auto Nice, vitrine + e-commerce, autonomie d'édition Webflow CMS. Lien : `https://launchpadfactory.webflow.io/work/site-web-de-concession-automobile`
  - **Aeternam** — app de gestion maîtres d'hôtels événementiel, web + mobile en production. Lien : `https://launchpadfactory.webflow.io/work/app-gestion-maitre-hotel`
- **Témoignage épicerie** : Dominique Ferrero (Épicerie L'F) — citation exacte dans le fichier
- **Coordonnées** :
  - Adresse : `8 bis boulevard de Montréal`
  - Email : `launchpadfactoryteam@gmail.com`
- **Liens sociaux** : à demander au client (placeholders `href="#"` actuellement)

---

## Assets & images

| Asset | Statut | Action |
|---|---|---|
| **Photos** (hero épicerie) | Placeholder rayé warm-toned | Le client doit fournir une vraie photo de rayonnage d'épicerie. Tu peux aussi proposer une banque d'images. |
| **Logo** | Pas de logo image — uniquement texte « LaunchPad *Factory* » avec un `.brand-mark` (cercle 28px orange ou olive) | Pas d'action |
| **Mockup phone Traceo** | Mockup HTML/CSS pur (UI fromages · DLC), fait main dans le fichier | Pas d'action — c'est du HTML, donc éditable |
| **Mockups PDF guides** | Mockups HTML/CSS (2 cards rotatées) | Pas d'action — remplace par de vrais aperçus PDF si dispo |
| **Icônes** | Aucune icône SVG complexe — uniquement caractères Unicode (★, →, ↗, ✓, etc.) et lettres dans les service-icons | Pas d'action |

---

## Fichiers de référence

Tous les fichiers de design sont dans ce dossier de handoff :

| Fichier | Rôle |
|---|---|
| **`05 Home agence.html`** | ⭐ **Livrable principal** — home agence à intégrer |
| **`06 Home epiceries.html`** | ⭐ **Livrable principal** — home épiceries à intégrer |
| `03 Design system.html` | Référence DS — tokens, composants, templates. Ouvre-le dans le navigateur pour voir le DS complet. |
| `04 Wording et contenu.html` | Référence — brief de copy, variantes, voix de marque |
| `01 Audit et methodologie.html` | Contexte — pourquoi cette refonte, ce qui a été gardé/abandonné |
| `02 Directions visuelles v2.html` | Contexte — exploration des 3 directions, validation sur « Vitrine Néo » |
| `03_ds/` | Sources React/JSX du DS (pour référence — pas à intégrer) |
| `02_directions/` | Sources React/JSX des 3 directions explorées |
| `assets/` | Screenshots des sites actuels (pré-refonte) |

---

## Checklist d'intégration

- [ ] Repo cloné, branche `feature/design-v2` créée
- [ ] HTML/CSS intégrés dans `epiceries/index.html` (et `style.css`, `script.js` si split)
- [ ] HTML/CSS intégrés dans la home agence
- [ ] Routing du worker.js vérifié et adapté
- [ ] Formulaire de contact reconnecté (si client le demande)
- [ ] Coordonnées sociales remplies (LinkedIn, Instagram)
- [ ] Photo hero épicerie remplacée par une vraie image
- [ ] Test responsive sur 4 breakpoints
- [ ] Test sur Chrome, Firefox, Safari
- [ ] Test avec `prefers-reduced-motion: reduce` (marquee + floaty doivent s'arrêter)
- [ ] Lighthouse audit (>90 sur Performance, Accessibility, Best Practices, SEO)
- [ ] Tests des liens externes vers les case studies (Autodan, Aeternam sur webflow.io)
- [ ] Tests des CTAs mailto
- [ ] Déployé sur Cloudflare Pages / preview
- [ ] Validation client
- [ ] Merge sur `main` + redirection des deux anciens sites

---

## Questions ouvertes pour le client

À te poser au début si pas déjà fait :

1. **Image hero épicerie** — photo dispo, ou je choisis une libre de droits ?
2. **Liens sociaux** — URLs LinkedIn / Instagram pour le footer ?
3. **Formulaire de contact** — on garde les CTAs mailto, ou on rebranche le formulaire Turnstile existant en modale ?
4. **Pages internes** (`/traceo`, `/guides/linkedin`, `/guides/email`, `/carnet`) — actuellement liées mais hors-périmètre de ce chantier ; à refondre dans un 2e temps ?
5. **Logo** — on garde le double cercle simple (brand-mark) ou tu veux qu'on en propose un vrai à terme ?

---

**Bonne intégration. Tout est prêt à mettre en prod.** ✦
