# SEO — indexation et technique (pilier 1)

Source : doc « Stratégie SEO & GEO — Traceo » (Claude Docs), pilier 1.
Objectif : rendre `/epiceries/traceo` trouvable, indexée et lisible par Google, Bing et les IA.

---

## Ce qui est dans le code

| Élément | Fichier | Notes |
|---|---|---|
| Sitemap | [`landings/sitemap.xml`](../landings/sitemap.xml) | Statique. Ajouter chaque nouvelle page, mettre à jour `<lastmod>`. `/bilan` exclu. |
| Robots | [`landings/robots.txt`](../landings/robots.txt) | Tout autorisé (y compris robots IA), `/bilan` et `/api/` exclus, ligne `Sitemap:`. |
| JSON-LD Traceo | [`landings/epiceries/traceo/index.html`](../landings/epiceries/traceo/index.html) | `@graph` : Organization, WebPage, MobileApplication, BreadcrumbList. Ajouter les futurs profils (LinkedIn, Wikidata…) dans `sameAs`. |
| og:image | `landings/epiceries/assets/img/traceo-og.jpg` | 1200×630, utilisée par la page Traceo et l'article. |
| Images | `landings/epiceries/assets/img/*.webp` | WebP redimensionnés, `width`/`height` explicites. Les PNG d'origine restent comme sources. |

### URLs canoniques

Cloudflare (`html_handling: drop-trailing-slash`) sert les pages **sans slash final ni `.html`** :
`/epiceries`, `/epiceries/traceo`, `/epiceries/articles/traceo`. Les variantes redirigent (307).
Les liens internes, canonicals et le sitemap utilisent toujours la forme courte.

### Règles

- Pas d'`aggregateRating` dans le JSON-LD tant que des notes réelles ne sont pas affichées sur la page.
- Nouvelle image : convertir en WebP (≤ 2× la taille d'affichage), poser `width`/`height`, `loading="lazy"` hors écran initial, alt descriptif contenant « Traceo » quand c'est pertinent.

---

## À faire hors du code (une fois)

1. **Google Search Console** : créer la propriété *Domaine* `launchpadfactory.fr` (vérification DNS dans Cloudflare).
   Déclarer `https://launchpadfactory.fr/sitemap.xml`.
2. **Inspection d'URL** sur `/epiceries/traceo` : noter le statut exact, puis « Demander une indexation ».
   Idem pour `/epiceries` (son canonical pointait vers `/epiceries-fines`, une URL en 404, corrigé le 2026-11-02).
3. **Bing Webmaster Tools** : importer la propriété depuis Search Console (Bing alimente ChatGPT Search et Copilot).
4. **Cloudflare → IndexNow** : activer *Crawler Hints* (Caching → Configuration) pour notifier Bing à chaque déploiement.
5. **Cloudflare → robots IA** : dans *Security → Bots* (ou *AI Crawl Control*), désactiver « Block AI bots » et
   « Manage robots.txt » / « Instruct AI bot traffic with robots.txt », sinon Cloudflare bloque ou réécrit les règles
   de [`robots.txt`](../landings/robots.txt).
6. **Validation** : [test des résultats enrichis](https://search.google.com/test/rich-results) sur `/epiceries/traceo`,
   [PageSpeed Insights](https://pagespeed.web.dev/) mobile (cible LCP < 2,5 s),
   [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) pour l'og:image.
