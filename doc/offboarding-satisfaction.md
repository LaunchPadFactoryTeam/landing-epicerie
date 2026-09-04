# 🎯 Offboarding client — Questionnaire de satisfaction & bilan de mission

> **Statut : v0.3 — besoin validé, v1 implémentée et en attente de relecture.**
> Objet : formaliser le besoin d'un dispositif de fin de cycle client (« out-boarding ») matérialisé par une page dédiée sur notre site.
> Reste ouvert : la longueur définitive du questionnaire (D2, §14). Le code de la v1 vit sur la branche `doc/offboarding-satisfaction` — voir « État d’implémentation » en §8.

---

## 🧭 Sommaire

1. [Le besoin & le contexte](#1-le-besoin--le-contexte)
2. [Objectifs & critères de succès](#2-objectifs--critères-de-succès)
3. [Le parcours cible (end-to-end)](#3-le-parcours-cible-end-to-end)
4. [Contenu du questionnaire](#4-contenu-du-questionnaire)
5. [Le branchement recommandation (cœur du dispositif)](#5-le-branchement-recommandation-cœur-du-dispositif)
6. [Exigences fonctionnelles](#6-exigences-fonctionnelles)
7. [Exigences non fonctionnelles & design](#7-exigences-non-fonctionnelles--design)
8. [Architecture technique pressentie](#8-architecture-technique-pressentie)
9. [Ce qu'on fait de la donnée (exploitation)](#9-ce-quon-fait-de-la-donnée-exploitation)
10. [Budget temps par client](#10-budget-temps-par-client)
11. [RGPD, droit & éthique](#11-rgpd-droit--éthique)
12. [Périmètre v1 / hors périmètre](#12-périmètre-v1--hors-périmètre)
13. [Alternatives écartées](#13-alternatives-écartées)
14. [Décisions arrêtées & points restants](#14-décisions-arrêtées--points-restants)
15. [Roadmap v2+](#15-roadmap-v2)

---

## 1. Le besoin & le contexte

### Situation

Un premier client a été livré (**un architecte d'intérieur**). Le cycle se termine aujourd'hui **sans rituel de clôture** : le site part en ligne, l'échange s'éteint, et on perd trois choses d'un coup.

| Ce qu'on perd | Coût réel |
|---|---|
| Le **feedback à chaud** sur notre process | On répète les mêmes frictions au client suivant |
| Les **actifs marketing** (témoignage, logo, verbatim, post LinkedIn) | On repart de zéro en prospection, sans preuve sociale |
| Le **fil commercial** (besoins suivants, maintenance, mise en relation) | Un client acquis retombe au niveau d'un prospect froid |

### Le déclencheur

L'agence est en lancement : **aucune preuve sociale publique**, aucune référence citable, aucun avis. Le premier client livré est notre unique source d'actifs à court terme. Il faut un dispositif qui capte tout ça **au moment exact où la satisfaction est maximale** — c'est-à-dire juste après la livraison, pas trois mois plus tard.

### Les contraintes

| # | Contrainte | Conséquence sur la solution |
|---|---|---|
| 1 | **Volume très faible** (1 à 5 clients / an à court terme) | Pas de SaaS à l'abonnement. Zéro statistique — chaque réponse est un cas qualitatif, pas un point de données |
| 2 | **Setup gratuit** | Réutiliser la stack Cloudflare existante (Worker + D1 + Brevo free tier) |
| 3 | **Positionnement premium / artisanal** | Un Google Forms tue le message. La page doit être *nôtre*, sur notre domaine, à notre charte |
| 4 | **Pas de domaine email pro vérifié** (Gmail uniquement) | Pas de mail automatique **vers le client** — cf. [`contact-modal.md`](./contact-modal.md) §4, DMARC bloque. Le lien s'envoie **à la main**, depuis notre Gmail |
| 5 | **2 collaborateurs, temps limité** | ⚠️ Contrainte forte : le dispositif complet doit tenir en **moins de 45 min par client** (§10). Pas d'admin UI, pas d'assets à produire à la main, pas de kit sur-mesure |
| 6 | **Clientèle hétérogène** : architecte d'intérieur, épicerie fine, artisans, indépendants | Le questionnaire est **générique niveau agence**, pas segmenté métier. Aucun jargon sectoriel, aucune option type « click & collect » |
| 7 | **Cible = dirigeants de petites structures** | Pas de jargon, mobile-first, 3 minutes maximum |

---

## 2. Objectifs & critères de succès

### Objectif 1 — Poser un acte professionnel de clôture *(qualitatif)*

Le questionnaire n'est pas qu'un outil de collecte : c'est **le dernier point de contact du cycle**, donc celui qui reste en mémoire. Il doit produire l'effet « ces gens sont sérieux, ils bouclent proprement, ils ne disparaissent pas après la facture ».

> C'est cohérent avec le positionnement déjà tenu sur la landing (« on ne disparaît pas après la livraison »). Le dispositif d'offboarding en est la **preuve opérationnelle**.

### Objectif 2 — Améliorer notre process *(interne)*

Identifier les frictions vécues (moments d'inquiétude, incompréhensions, attentes non couvertes) pour corriger le cycle suivant.

### Objectif 3 — Générer des actifs commerciaux *(business)*

C'est l'objectif à plus fort ROI. Sortir de chaque mission avec :

- un **verbatim publiable** (témoignage site + réseaux),
- une **autorisation d'usage** du nom / logo / captures,
- idéalement un **post LinkedIn publié par le client**,
- éventuellement une **mise en relation**.

### Objectif 4 — Ouvrir la suite commerciale *(business)*

Détecter les besoins des 6 prochains mois (maintenance, visibilité, contenus, évolutions) sans faire de vente frontale : la question posée dans un cadre « bilan » passe naturellement.

### Critères de succès v1

| Indicateur | Cible | Mesure |
|---|---|---|
| Taux de réponse | **> 70 %** (lien nominatif envoyé à la main) | réponses / liens envoyés |
| Complétion du formulaire ouvert | > 80 % | soumissions / ouvertures de page |
| Temps de remplissage réel | < 4 min | horodatage début/fin |
| Actifs marketing obtenus par client | **≥ 2** (verbatim + autorisation) | comptage manuel |
| Post LinkedIn client obtenu | ≥ 1 sur les 3 premiers clients | comptage manuel |
| Piste commerciale identifiée | ≥ 1 par client | champ « besoins 6 mois » non vide |
| **Temps passé par client** | **< 45 min** | §10 |

> ⚠️ Avec 1 à 5 réponses, **aucun de ces chiffres n'a de valeur statistique**. Ce sont des repères de pilotage, pas des KPI. La vraie unité de mesure v1 est : « est-ce qu'on est sorti de la mission avec un témoignage utilisable, sans y passer une demi-journée ? ».

---

## 3. Le parcours cible (end-to-end)

```
   NOUS                          LE CLIENT                        LE SYSTÈME
    │                                │                                │
 ┌──┴──────────────┐                 │                                │
 │ Mise en ligne   │                 │                                │
 │ du site (J0)    │                 │                                │
 └──┬──────────────┘                 │                                │
    │                                │                                │
 ┌──┴──────────────┐                 │                                │
 │ node bilan-link │  lien nominatif │                                │
 │ + email Gmail   ├────────────────►│                                │
 │ manuel   (J+7)  │                 │                                │
 │      ~5 min     │◄────────────────┼────── token HMAC signé ────────┤
 └─────────────────┘                 │       {client, exp}            │
                                     │                                │
                          ┌──────────┴─────────┐                      │
                          │ Ouvre /bilan?t=…   ├─────────────────────►│ GET  /api/bilan-context
                          │ Page à notre charte│◄─────────────────────┤ → {prénom, entreprise, projet}
                          │ « Bonjour Sophie » │                      │
                          └──────────┬─────────┘                      │
                                     │                                │
                          ┌──────────┴─────────┐                      │
                          │ 6 écrans, ~3 min   │                      │
                          │ barre de progression│                     │
                          └──────────┬─────────┘                      │
                                     │                                │
                              ┌──────┴──────┐                         │
                        NPS ≥ 8│           │NPS ≤ 7                   │
                          ┌────┴───┐   ┌───┴────────┐                 │
                          │ Ask    │   │ Question   │                 │
                          │ recos  │   │ de récup'  │                 │
                          └────┬───┘   └───┬────────┘                 │
                               └─────┬─────┘                          │
                                     │  POST /api/bilan               │
                                     ├───────────────────────────────►│ INSERT D1
                                     │                                │ + Brevo → notre Gmail
                          ┌──────────┴─────────┐                      │
                          │ Écran de merci     │                      │
                          │ personnalisé       │                      │
                          └────────────────────┘                      │
                                                                      │
 ┌───────────────────────────────────────────────────────────┐        │
 │ RELANCE HUMAINE (nous, sous 48 h) — ~30 min               │◄───────┘
 │ • promoteur → visuels ou proposition de texte selon choix │
 │ • détracteur → on appelle, on répare                      │
 │ • besoin détecté → on propose un devis                    │
 └───────────────────────────────────────────────────────────┘
```

### Points de vigilance sur le parcours

- **Timing d'envoi : J+7** *(fenêtre acceptable J+3 → J+7, on prend le haut de la fourchette)*. À J0 le client n'a rien à raconter ; à J+7 il a vu le site vivre et reçu les premiers retours de son entourage, tout en gardant l'élan de la livraison. À J+30 il est passé à autre chose.
- **L'envoi du lien reste humain.** Un mail rédigé à la main (« Sophie, votre site est en ligne depuis une semaine — j'aimerais votre retour, ça vous prendra 3 minutes ») convertit infiniment mieux qu'un envoi automatisé, et évite le problème DMARC de la contrainte #4.
- **Le formulaire ne fait pas le travail commercial.** Il *qualifie* et *obtient un accord de principe*. La demande réelle se conclut dans la relance humaine.
- **La relance sous 48 h est non négociable.** Un client qui coche « oui je veux bien poster » et qu'on relance 3 semaines plus tard ne postera pas.

---

## 4. Contenu du questionnaire

### Principes de rédaction

1. **Ton chaleureux, vouvoiement, phrases courtes, zéro jargon** — ni jargon web (« SLA », « UX »), ni jargon sectoriel.
2. **Vocabulaire générique agence.** La clientèle est hétérogène (architecte, épicier, artisan) : on dit « votre activité », « un confrère », « un professionnel » — jamais « votre commerce » ni « vos clients en boutique ».
3. **Ordre psychologique** : ouverture sur le positif, process au milieu, questions sensibles (prix) tard, recommandation en fin quand le client est déjà en état d'esprit positif.
4. **Une seule question obligatoire par bloc.** Tout le reste est optionnel.
5. **Chaque question a un usage identifié.** Si on ne sait pas ce qu'on ferait de la réponse, on la supprime.

### Format retenu

**Multi-écrans (6 écrans)** avec barre de progression et temps annoncé. Le multi-écrans augmente la complétion, rend le branchement conditionnel naturel, et fait paraître court un questionnaire qui ne l'est pas tout à fait.

### Bloc 0 — Identification *(pré-rempli, non saisi)*

Prénom, entreprise, projet, date de livraison — injectés depuis le token. Le client ne saisit rien. Affichage en en-tête : « Bilan du projet **Studio Bellevue** — livré le 12 mai 2026 ».

> Effet recherché : le client comprend en 2 secondes que c'est personnalisé, pas un sondage de masse. **Texte seul, pas de capture du site** — cf. contrainte #5, aucun asset à produire manuellement.

### Écran 1 — Satisfaction globale

| # | Question | Format | Ce qu'on en fait |
|---|---|---|---|
| Q1 | Globalement, êtes-vous satisfait du site livré ? | 1–5 (étoiles ou smileys) · **requis** | Baromètre principal |
| Q2 | Le résultat correspond-il à ce que vous aviez imaginé au départ ? | En dessous / Conforme / Au-delà | Mesure la qualité de notre **cadrage**, pas de notre exécution. Un clic, on la garde |

### Écran 2 — L'expérience de collaboration *(amélioration process)*

| # | Question | Format | Ce qu'on en fait |
|---|---|---|---|
| Q3 | Comment avez-vous vécu chaque étape ? · Premier contact · Cadrage du besoin · Propositions de design · Suivi pendant la réalisation · Livraison / mise en ligne | Matrice 1–5 (5 lignes) | Localise **où** ça coince dans le cycle |
| Q4 | Sur notre façon de communiquer : réactivité · clarté des explications · respect des délais | Matrice 1–5 (3 lignes) | Les 3 motifs n°1 d'insatisfaction en agence web |
| Q5 | Y a-t-il eu un moment où vous vous êtes senti perdu, inquiet, ou pas assez informé ? | Texte libre, optionnel | **La question la plus rentable du formulaire.** C'est là que sortent les vrais correctifs de process |

### Écran 3 — Valeur perçue & positionnement *(business)*

| # | Question | Format | Ce qu'on en fait |
|---|---|---|---|
| Q6 | Qu'est-ce qui vous a décidé à travailler avec nous plutôt qu'ailleurs ? | Cases multiples : le prix · le contact humain · les exemples montrés · la compréhension de mon métier · la rapidité · une recommandation · autre (texte) | **Nourrit directement l'argumentaire de vente et le wording de la landing** |
| Q8 | Par rapport à ce que vous attendiez, la prestation vous semble… | Bien en dessous / En dessous / Conforme / Au-dessus / Bien au-dessus de mes attentes · **optionnel** | Signal de **valeur perçue**. Formulation « attentes » et non « prix » : neutre, ne rouvre pas la négociation |
| Q9 | Concrètement, qu'est-ce que ce site doit vous apporter — ou vous apporte déjà ? | Texte libre | Matière brute pour une **étude de cas** et pour parler bénéfice plutôt que fonctionnalité |

> **Q7 supprimée** (« aviez-vous envisagé d'autres options ? »). La cartographie concurrentielle est précieuse mais se récolte mieux à l'oral, pendant l'appel de débrief — à l'écrit, la réponse est convenue.

### Écran 4 — La suite *(pipeline)*

| # | Question | Format | Ce qu'on en fait |
|---|---|---|---|
| Q10 | Sur quoi aimeriez-vous être accompagné dans les 6 prochains mois ? | Cases : maintenance & mises à jour · être mieux visible sur Google · contenus, textes ou photos · réseaux sociaux · de nouvelles pages ou fonctionnalités · vendre ou prendre rendez-vous en ligne · autre (texte) · rien pour l'instant | **Pipeline commercial direct.** Une case cochée = un devis à envoyer |

> **Q11 supprimée** (« une fonctionnalité vous manque ? ») : redondante avec la case « autre » de Q10 et avec Q5.
> Les libellés de Q10 sont volontairement **transverses**. Les options sectorielles (click & collect, fidélité, CSE) reviendront via le champ `variant` si on segmente un jour.

### Écran 5 — Recommandation

Voir §5 — c'est le cœur du dispositif, détaillé à part.

### Écran 6 — Le mot de la fin

| # | Question | Format |
|---|---|---|
| Q15 | Quelque chose à ajouter ? | Texte libre, optionnel |
| Q16 | Consentement traitement des données | Checkbox **requise** |
| Q17 | Autorisation de publication (nom, logo, verbatim, captures) | Checkbox **séparée**, optionnelle — voir §11 |

> **Total : 13 questions**, dont 3 requises, réparties sur 6 écrans. Estimation : 3 minutes.
> Voir §14 pour le seul arbitrage encore ouvert sur ce point.

---

## 5. Le branchement recommandation (cœur du dispositif)

### La question pivot

> **Q12 — Sur une échelle de 0 à 10, quelle est la probabilité que vous recommandiez LaunchPad à un confrère ou à un professionnel de votre entourage ?**

C'est la formulation NPS standard. Deux précisions honnêtes :

- Avec 1 à 5 réponses, **ce n'est pas un NPS** (aucune valeur statistique). On l'utilise comme **aiguillage conditionnel** et comme repère qualitatif.
- Son vrai rôle : **faire dire au client lui-même qu'il nous recommanderait**, juste avant de lui demander de le faire. Un client qui vient de cocher 9/10 accepte beaucoup plus facilement la demande qui suit — il serait en contradiction avec lui-même en refusant.

### Branche A — Promoteur (score ≥ 8)

Écran : *« Merci, ça compte beaucoup pour nous 🙏 On démarre, et le bouche-à-oreille est notre meilleur allié. »*

**Q13 — Cases à cocher, toutes optionnelles :**

| Option | Formulation client | Valeur pour nous |
|---|---|---|
| Post LinkedIn | Parler de votre nouveau site sur LinkedIn | ⭐⭐⭐ Portée + crédibilité |
| Avis Google | Laisser un avis sur notre fiche Google | ⭐⭐⭐ SEO local + preuve durable |
| Référence publique | Nous autoriser à citer votre nom, votre logo et des captures du site | ⭐⭐⭐ Débloque le portfolio |
| Mise en relation | Nous présenter à quelqu'un qui pourrait en avoir besoin | ⭐⭐⭐ Lead qualifié gratuit |

> Quatre options, pas six. Le témoignage vidéo et l'interview étude de cas passent en v2 : forte valeur, mais coût de production incompatible avec la contrainte #5.

#### Le sous-choix LinkedIn (point sensible)

Si la case LinkedIn est cochée, **une seule micro-question apparaît**, deux options, aucun paragraphe d'explication :

> **Comment préférez-vous procéder ?**
> ○ Je m'en occupe — envoyez-moi juste les visuels
> ○ Proposez-moi un texte, je l'adapterai

**Pourquoi cette forme.** Un « on prépare tout » unilatéral repousse le client qui tient à sa communication — et un dirigeant qui a une ligne éditoriale la défend. À l'inverse, ne rien proposer laisse sur le carreau celui qui n'a ni le temps ni l'envie de rédiger.

Les deux options règlent les deux cas en six mots chacune :

- « **Je m'en occupe** » respecte la maîtrise éditoriale et n'est pas un refus déguisé — le client garde la main, on l'outille quand même.
- « **je l'adapterai** » (et non « je le publierai ») désamorce le blocage de l'assisté : on propose une base, pas un texte à signer. Personne ne s'engage à publier nos mots.

**Dans les deux cas, on livre les visuels** — 2 captures du site, prises en 5 minutes une fois, réutilisables partout. C'est le dénominateur commun, et c'est ce qui coûte le moins cher à produire.

**Q14 — Verbatim publiable :**

> *« En une ou deux phrases, que diriez-vous à un professionnel qui hésite à se lancer ? »*
> Mention sous le champ : *« Cette réponse pourra être publiée sur notre site, avec votre nom et celui de votre structure — uniquement si vous cochez l'autorisation en fin de formulaire. »*

C'est **le seul champ dont la sortie est directement réutilisable telle quelle**. La formulation « à un professionnel qui hésite » produit un texte orienté bénéfice ; « donnez-nous votre avis » produit un texte descriptif inutilisable.

### Branche B — Passif / détracteur (score ≤ 7)

**Aucune demande de recommandation.** Insister ici est contre-productif et abîme la relation.

> *« Merci de votre franchise — c'est ce qui nous fait progresser. »*

**Q13-bis** — *« Qu'est-ce qui nous aurait fait gagner les points manquants ? »* (texte libre)
**Q13-ter** — *« Souhaitez-vous qu'on vous rappelle pour en parler ? »* (Oui / Non) → si oui, **appel sous 24 h, non négociable**.

> Un détracteur récupéré et traité vite devient souvent plus fidèle qu'un promoteur passif. C'est aussi la seule branche qui protège notre réputation naissante.

### Écran de remerciement

Personnalisé (« Merci Sophie ! »), rappelant **précisément ce qui va se passer ensuite** :

- Promoteur, LinkedIn / « je m'en occupe » → *« On vous envoie les visuels d'ici 48 h. »*
- Promoteur, LinkedIn / « proposez-moi un texte » → *« On vous envoie une proposition de texte et les visuels d'ici 48 h. »*
- Détracteur ayant demandé un rappel → *« On vous appelle sous 24 h. »*
- Besoin coché en Q10 → *« On revient vers vous sur [le sujet coché]. »*

Un écran de merci générique gâche l'unique moment où le client est le plus réceptif.

---

## 6. Exigences fonctionnelles

| Réf | Exigence | Priorité |
|---|---|---|
| F1 | Page dédiée sur notre domaine, accessible via lien nominatif signé (`/bilan?t=<token>`) | Must |
| F2 | Pré-remplissage prénom / entreprise / projet depuis le token, sans saisie client | Must |
| F3 | Formulaire fonctionnel **sans token** (fallback : saisie manuelle nom + entreprise) — sécurité si le lien casse | Should |
| F4 | Parcours multi-écrans (6) avec barre de progression et navigation avant/arrière | Must |
| F5 | Branchement conditionnel sur le score de recommandation (≥ 8 / ≤ 7) + sous-choix LinkedIn | Must |
| F6 | Stockage de la réponse en base D1 | Must |
| F7 | Notification email immédiate sur notre adresse pro, mise en forme et actionnable | Must |
| F8 | Écran de remerciement personnalisé et conditionnel | Must |
| F9 | **Génération du lien en une commande**, sans étape manuelle (§8) | Must |
| F10 | Sauvegarde locale de la saisie en cours (`localStorage`) — anti-perte si fermeture | Should |
| F11 | Une seule réponse par token (les suivantes remplacent la précédente, sans perte) | Should |
| F12 | Expiration du token (60 jours) avec message clair et non bloquant si dépassée | Could |
| F13 | Export CSV des réponses | Could (v2) |

### Contenu de la notification email

Le mail doit permettre de décider en 5 secondes. Structure proposée :

```
Objet : [Bilan] Sophie Martin — Studio Bellevue — 9/10 ⭐

┌──────────────────────────────────────────┐
│  9/10   Recommandation                   │  ← bandeau couleur (vert ≥8 / orange 7 / rouge ≤6)
│  4,5/5  Satisfaction globale             │
└──────────────────────────────────────────┘

⚡ ACTIONS À DÉCLENCHER
   ✅ LinkedIn — « je m'en occupe »  → envoyer les visuels sous 48 h
   ✅ Autorise nom + logo + captures
   ✅ Intéressée par : visibilité Google, nouvelles pages

💬 VERBATIM PUBLIABLE
   « ... »                                    ← mis en avant, prêt à copier

📊 DÉTAIL DES NOTES        (matrices Q3 / Q4)
📝 RÉPONSES LIBRES         (Q5, Q9, Q15)

[ → Répondre à Sophie ]                       ← bouton mailto pré-rempli
```

Reprend la mécanique déjà en place dans [`functions/api/contact.js`](../functions/api/contact.js) (`replyTo` vers le client, bouton mailto, échappement HTML).

---

## 7. Exigences non fonctionnelles & design

| Réf | Exigence | Justification |
|---|---|---|
| NF1 | **Mobile-first strict** | Le client ouvre ses mails sur son téléphone, entre deux rendez-vous |
| NF2 | Charte du design system agence (cf. [`design-system/`](../design-system/)) | Objectif 1 : la page *est* une preuve de professionnalisme |
| NF3 | Aucune dépendance externe visible (pas de branding tiers) | Un logo Typeform ruine le positionnement |
| NF4 | **Aucun asset à produire par client** | Contrainte #5. La page est 100 % générique + texte injecté par token |
| NF5 | Accessibilité : navigation clavier, labels explicites, contrastes AA | Cohérence avec le reste du site |
| NF6 | Chargement < 1 s | Vanilla HTML/CSS/JS, comme le reste du projet |
| NF7 | Pas de captcha visible | Le lien est nominatif et signé : friction inutile (voir §8) |
| NF8 | Aucun tracking, aucun cookie | Cohérent avec la politique actuelle du site |

### Parti pris de design

Le formulaire doit ressembler à **un bilan de fin de mission**, pas à un sondage :

- en-tête typographique avec le nom du projet et la date de livraison (**texte uniquement**),
- un mot d'introduction signé (2 lignes, ton humain),
- un écran = une idée, barre de progression visible, bouton unique,
- pas de barre de défilement dans les champs (cf. [`doc/todo.md`](./todo.md) ligne 4 — défaut déjà identifié sur la modale contact).

> ❌ **Écarté : la capture du site livré en en-tête.** Séduisant, mais c'est un asset à produire et à héberger **pour chaque client** — donc une étape manuelle avant chaque envoi. Incompatible avec la contrainte #5. Les captures servent aux visuels LinkedIn (§5), pas à la page.

---

## 8. Architecture technique pressentie

> Section indicative à la rédaction, **désormais implémentée** : l’arborescence ci-dessous correspond au code livré.

```
landings/bilan/index.html      →  /bilan          (page publique, token en query)
landings/bilan/style.css
landings/bilan/script.js       →  fetch context, navigation écrans, branchement, POST

functions/api/bilan.js         →  POST /api/bilan          (validation + D1 + Brevo)
functions/api/bilan-context.js →  GET  /api/bilan-context  (décodage token → prénom/entreprise)
functions/_shared/token.js     →  déjà en place (HMAC-SHA256, SIGNING_KEY)

scripts/bilan-link.mjs         →  génération du lien en une commande
src/worker.js                  →  2 routes à ajouter
schema.sql                     →  table satisfaction_responses
```

### Génération du lien — une commande, zéro étape manuelle

Script local Node réutilisant [`functions/_shared/token.js`](../functions/_shared/token.js) (déjà utilisé par le lead magnet) :

```bash
node scripts/bilan-link.mjs --prenom "Sophie" --entreprise "Studio Bellevue" --livre 2026-05-12
```

```
→ https://launchpadfactory.fr/bilan?t=eyJjIjoiU29waGllIi...
  (valide 60 jours — copier dans le mail)
```

Le script lit `SIGNING_KEY` depuis `.dev.vars`, signe le payload `{ c, co, p, d, exp }`, affiche l'URL. **~30 lignes, aucune dépendance.** Le seul travail humain restant est la rédaction du mail d'accompagnement, qui doit rester personnel.

> L'endpoint admin protégé par Cloudflare Access reste la bonne réponse **à 20 clients/an** — pas à 3. Voir §15.

### Table D1 pressentie

`satisfaction_responses` — un enregistrement par réponse, avec au minimum : identité client, scores (globale, conformité, matrices sérialisées), champs libres, score de recommandation, cases de recommandation cochées, **sous-choix LinkedIn** (`self` / `assisted` / `null`), consentements, `variant` (générique par défaut, cf. contrainte #6), `status` (`new` / `processed` / `assets_collected`), horodatages.

> Le champ `status` suit la même logique libre que `contact_requests` — voir [`schema.sql`](../schema.sql).
> Le champ `variant` est prévu dès la v1 **même s'il vaut toujours `agence`** : le rajouter plus tard coûte une migration.

### Sécurité

| Mesure | Décision |
|---|---|
| Token HMAC signé | ✅ Suffit — un lien nominatif non devinable est la barrière principale |
| Honeypot | ✅ Conservé (coût nul, cohérent avec `contact.js`) |
| Turnstile | ❌ Écarté — friction inutile sur un lien privé (réactivable si le fallback sans token est exposé) |
| Validation server-side stricte + limites de longueur | ✅ Comme `contact.js` |
| Échappement HTML dans le mail de notif | ✅ Obligatoire (le verbatim est du texte libre client) |

### État d’implémentation

| Exigence | État | Où |
|---|---|---|
| F1 page `/bilan` sur lien signé | ✅ | `landings/bilan/` |
| F2 pré-remplissage depuis le token | ✅ | `GET /api/bilan-context` |
| F3 fallback sans token | ✅ | bloc identité révélé si le lien est invalide ou expiré |
| F4 6 écrans + progression | ✅ | `landings/bilan/script.js` |
| F5 branchement ≥ 8 / ≤ 7 + sous-choix LinkedIn | ✅ | front **et** serveur : la branche est re-décidée côté API, un POST forgé ne peut pas mélanger les deux |
| F6 stockage D1 | ✅ | table `satisfaction_responses` |
| F7 notification email actionnable | ✅ | Brevo : bandeau coloré selon le score + bloc « actions à déclencher » |
| F8 remerciement personnalisé | ✅ | suites listées en fonction des cases cochées |
| F9 lien en une commande | ✅ | `node scripts/bilan-link.mjs` |
| F10 reprise `localStorage` | ✅ | clé dérivée du lien, purgée après envoi |
| F11 une réponse par lien | ✅ | `ON CONFLICT(token_ref) DO UPDATE` |
| F12 expiration 60 jours | ✅ | message non bloquant + repli sur la saisie manuelle |
| F13 export CSV | ⬜ | hors périmètre v1, comme prévu |

**Écarts assumés par rapport au document :**

- Le token peut porter l’email du client (option `--email`), non prévue en §8. Sans elle, le bouton « Répondre » de la notification (§6) n’aurait aucune adresse où pointer. L’option reste facultative : sans email, le bouton est simplement omis.
- L’API ne distingue pas un lien expiré d’un lien altéré (`verifyToken` renvoie `null` dans les deux cas). Le message affiché couvre les deux situations et le repli est identique — F12 était en priorité « Could ».

**Ce qui n’a pas été vérifié :** le rendu visuel et le parcours réel dans un navigateur — aucun navigateur headless n’est installé sur le poste. Les vérifications ont porté sur les endpoints, la base, le contrat front/API et la cohérence des sélecteurs. À valider sur l’URL de preview Cloudflare de la branche.

### Coût

**0 €.** D1, Workers, Brevo (300 mails/jour) : très largement dans les free tiers pour 1 à 5 réponses par an.

---

## 9. Ce qu'on fait de la donnée (exploitation)

Un questionnaire sans plan d'exploitation ne sert à rien. Chaque sortie doit avoir une destination.

| Donnée collectée | Destination | Délai |
|---|---|---|
| Verbatim Q14 + autorisation Q17 | Section « ils nous font confiance » sur la landing agence | Sous 1 semaine |
| Nom + logo + captures | Page projet / portfolio (cf. [`doc/todo.md`](./todo.md) — pages projets à créer) | Sous 1 semaine |
| LinkedIn — « je m'en occupe » | 2 captures du site envoyées par mail | **Sous 48 h** |
| LinkedIn — « proposez-moi un texte » | 2 captures + une proposition de texte courte (~8 lignes) | **Sous 48 h** |
| Case « avis Google » | Lien direct vers la fiche envoyé par mail | Sous 48 h |
| Case « mise en relation » | Appel pour identifier le contact | Sous 1 semaine |
| Q6 (critères de décision) | Réécriture du wording de la landing (cf. [`design-system/04 Wording et contenu.html`](../design-system/)) | Trimestriel |
| Q5 (moments d'inquiétude) | Correctif du process de suivi client | Immédiat |
| Q10 (besoins 6 mois) | Devis / proposition | Sous 1 semaine |
| Q8 (valeur perçue) | Ajustement de la grille tarifaire | Trimestriel |
| Q9 | Étude de cas | Selon |

> **Règle : une case cochée = une action datée.** Si on n'a pas le temps de traiter, on ne pose pas la question.

---

## 10. Budget temps par client

Contrainte #5 rendue explicite. Le dispositif n'a de sens que s'il reste sous ce budget :

| Étape | Temps | Fréquence |
|---|---|---|
| Générer le lien (`node scripts/bilan-link.mjs`) | **1 min** | par client |
| Rédiger et envoyer le mail d'accompagnement | **5 min** | par client |
| Lire la réponse (mail de notif déjà mis en forme) | **5 min** | par client |
| Prendre 2 captures du site | **5 min** | par client (si LinkedIn coché) |
| Rédiger une proposition de texte LinkedIn | **15 min** | seulement si « proposez-moi un texte » |
| Publier le verbatim sur la landing | **10 min** | si autorisation cochée |
| **Total pire cas** | **~40 min** | ✅ sous le budget |
| **Total cas courant** | **~20 min** | |

Coûts **non récurrents** (une seule fois, à la construction) : la page, les endpoints, le script, la table. Rien de tout cela ne se répète par client — c'est le critère de conception principal.

---

## 11. RGPD, droit & éthique

### RGPD

- ✅ **Consentement au traitement** : checkbox requise (Q16), distincte de l'autorisation de publication.
- ✅ **Autorisation de publication séparée** (Q17) : le RGPD et le droit à l'image interdisent de déduire un accord de publication d'un simple accord de traitement. Deux cases, deux finalités.
- ✅ **Minimisation** : aucune donnée non exploitée (cf. §9). Pas de tracking, pas de cookie.
- ⚠️ **À faire** : la page de politique de confidentialité est toujours en attente (cf. [`contact-modal.md`](./contact-modal.md) §6 et [`todo.md`](./todo.md) ligne 6). Elle devient **bloquante** ici : on demande une autorisation de publication, il faut pouvoir la documenter.
- ⚠️ **Droit de retrait** : le client doit pouvoir retirer son témoignage. À mentionner explicitement près de Q17 (« vous pouvez nous demander de le retirer à tout moment, sans justification »).

### Contrepartie : remerciement symbolique non annoncé

**Décision retenue** : pas d'incitation annoncée, mais un **remerciement symbolique a posteriori** possible (un mot manuscrit, un petit geste) pour un client qui a joué le jeu.

Le cadre juridique tient tant que trois conditions sont respectées :

| Condition | Pourquoi |
|---|---|
| **Non annoncé avant** la réponse | Une contrepartie annoncée devient une incitation : elle doit alors être divulguée publiquement (Code de la consommation, art. L111-7-2) et elle est interdite par les CGU Google sur les avis |
| **Non conditionné** au contenu de l'avis | On remercie la participation, jamais la note. Remercier « si c'est positif » est une pratique commerciale trompeuse |
| **Sans valeur marchande significative** | Un mot ou un geste symbolique ≠ une réduction sur la prestation suivante |

➜ Concrètement : **jamais « laissez-nous un avis et recevez X »**. Le geste vient après, spontanément, et ne se négocie pas.

### Éthique

- Aucune demande de recommandation à un client insatisfait (§5 branche B).
- Le verbatim est publié **tel quel** ou pas publié — pas de réécriture qui déforme le propos. Une correction orthographique reste acceptable.
- Le client est informé **avant** d'écrire que sa réponse est publiable (mention sous Q14), pas après.
- Le sous-choix LinkedIn laisse une vraie porte de sortie éditoriale : on n'impose jamais nos mots à quelqu'un qui parle en son nom.

---

## 12. Périmètre v1 / hors périmètre

### Dans la v1

- ✅ Page `/bilan` sur le domaine agence, à notre charte, multi-écrans
- ✅ Lien nominatif signé, généré par script local en une commande, envoyé manuellement par Gmail à J+7
- ✅ 13 questions génériques niveau agence, branchement conditionnel sur le score
- ✅ Sous-choix LinkedIn à deux voies
- ✅ Stockage D1 (avec champ `variant`) + notification email actionnable
- ✅ Écran de remerciement personnalisé
- ✅ Consultation des réponses via `wrangler d1 execute`

### Hors périmètre v1 (assumé)

| Exclusion | Pourquoi | Réintroduction envisagée |
|---|---|---|
| Email automatique **au client** | DMARC / pas de domaine vérifié (contrainte #4) | Phase 2, avec domaine pro |
| Capture du site en en-tête de page | Asset manuel par client (contrainte #5) | Non prévu |
| Témoignage vidéo / interview étude de cas | Coût de production trop élevé | v2 |
| Relance automatique si non-réponse | 1 client : une relance manuelle suffit | v2 si volume |
| Admin UI / dashboard | Le mail de notif suffit à ce volume | v2 (> 10 réponses/an) |
| Onboarding symétrique (début de mission) | Un chantier à la fois | v2 — mais c'est le vrai pendant logique |
| Statistiques / moyennes / évolution du score | Aucun sens statistique sous 20 réponses | Quand le volume le justifiera |
| Versions sectorielles du questionnaire | Clientèle hétérogène, un seul questionnaire agence | v2 via le champ `variant`, déjà en base |
| Multi-langue | Cible 100 % francophone | Non prévu |

---

## 13. Alternatives écartées

| Alternative | Pourquoi écartée |
|---|---|
| **Google Forms** | Gratuit et immédiat, mais branding Google visible, aucun contrôle du design, aucun branchement élégant, et surtout : **contradiction frontale avec l'objectif 1**. On vend des sites web soignés — envoyer un Google Form est un aveu |
| **Typeform / Tally** | UX excellente, branchement natif, mais branding tiers en free tier, quotas de réponses, et données hors de notre stack. Tally reste le **plan B crédible** si on veut valider le questionnaire avant de développer |
| **Un simple email avec 5 questions** | Zéro coût, mais taux de réponse faible, réponses non structurées, rien d'exploitable en base, et aucune mise en scène professionnelle |
| **Un appel téléphonique de débrief** | Excellent qualitativement — mais chronophage, non archivable, et le client n'ose pas dire ce qui a coincé à l'oral. ➜ **Complémentaire, pas alternatif** : à faire *en plus*, après lecture des réponses (c'est là que se récolte Q7, supprimée du formulaire) |
| **NPS via un outil dédié (Trustpilot, Avis Vérifiés)** | Payant, calibré pour du volume, absurde à 1-5 clients |
| **« On prépare tout » comme unique proposition LinkedIn** | Repousse les clients qui tiennent à leur communication. Remplacé par le sous-choix à deux voies (§5) |

---

## 14. Décisions arrêtées & points restants

### ✅ Arrêté

| Réf | Décision | Choix retenu |
|---|---|---|
| **D1** | Quand envoyer le lien | **J+7** (fenêtre acceptable J+3 → J+7, on prend le max ; ajustable après les premiers retours) |
| **D3** | Format de présentation | **Multi-écrans** (6 écrans, barre de progression) |
| **D4** | Question sur le prix | **Conservée**, reformulée en valeur perçue : « par rapport à ce que vous attendiez » |
| **D5** | Contrepartie | **Remerciement symbolique non annoncé à l'avance**, non conditionné au contenu (§11) |
| **D6** | Génération du lien | **Script local Node**, une commande, zéro étape manuelle (§8) |
| **D7** | URL publique | **`/bilan`** |
| **D8** | Générique ou segmenté | **Générique niveau agence** (le premier client est architecte d'intérieur, pas épicier). Champ `variant` prévu en base sans être utilisé |
| **D9** | Où vit le code | **`landing-epicerie`** — stack, design system et helpers déjà en place |
| **D10** | Transparence sur l'objectif LinkedIn | **Oui**, avec sous-choix à deux voies plutôt qu'un « on prépare tout » unilatéral (§5) |

### 🟡 Reste à confirmer

| Réf | Point | Où j'en suis |
|---|---|---|
| **D2** | **Longueur du questionnaire** | Non tranché lors de la relecture. J'ai appliqué la coupe médiane : **Q7 et Q11 supprimées, Q2 conservée → 13 questions sur 6 écrans**. Q2 coûte un clic et mesure la qualité de notre cadrage ; Q7 se récolte mieux à l'oral ; Q11 était redondante. Si tu veux descendre à ~9, les candidates suivantes sont Q2, Q8 et la matrice Q4 (fusionnable avec Q3) |

### Questions ouvertes (pas encore des décisions)

- Faut-il **un appel de débrief systématique** en plus du questionnaire ? Il devient le lieu naturel de Q7 (concurrence) — mais quel coût en temps ?
- Que fait-on si le client **ne répond pas** ? Une relance, deux, aucune ?
- Le dispositif doit-il être **annoncé dès la signature** (« en fin de mission on fait un bilan ensemble ») ? ➜ Probablement oui : ça valorise l'offre en amont *et* garantit le taux de réponse en aval, pour zéro coût.
- Y a-t-il un **livrable de clôture** qui accompagne le questionnaire (récapitulatif, accès, prise en main du site) ? Le questionnaire aurait plus de poids s'il arrivait avec quelque chose de valeur — mais attention au coût par client (§10).

---

## 15. Roadmap v2+

### Phase 2 — Avec un domaine email pro (cf. `contact-modal.md` §10)

- [ ] Email automatique de confirmation au client après soumission
- [ ] Envoi automatisé du lien de bilan (déclenché à J+7 après mise en ligne)
- [ ] Relance automatique à J+7 si non-réponse

### Phase 3 — Si le volume grimpe

- [ ] Mini-admin protégée par Cloudflare Access : liste des réponses, statuts, export CSV
- [ ] Génération du lien depuis l'admin (remplace le script local)
- [ ] Notification Telegram en plus de l'email
- [ ] Activation du champ `variant` : versions sectorielles du questionnaire

### Phase 4 — Symétrie du cycle

- [ ] **Questionnaire d'onboarding** en début de mission (brief structuré, attentes, références visuelles) — même stack, même charte. Boucle le cycle : on mesure l'écart entre l'attendu (onboarding) et le perçu (offboarding)
- [ ] Questionnaire de **suivi à J+6 mois** : le site a-t-il produit les effets attendus ? (relance commerciale naturelle)

### Phase 5 — Exploitation

- [ ] Composant « témoignages » sur la landing agence, alimenté depuis D1
- [ ] Réintroduction du témoignage vidéo et de l'interview étude de cas
- [ ] Page portfolio / études de cas alimentée par les réponses autorisées

---

## 📎 Annexes

### Documents liés

| Document | Lien |
|---|---|
| Modale de contact (mécanique D1 + Brevo réutilisée) | [`doc/contact-modal.md`](./contact-modal.md) |
| Lead magnet (mécanique du token HMAC) | [`doc/lead-magnet.md`](./lead-magnet.md) |
| Design system | [`design-system/`](../design-system/) |
| TODO projet | [`doc/todo.md`](./todo.md) |

### Historique du document

| Version | Date | Changements |
|---|---|---|
| v0.1 | 2026-09-03 | Rédaction initiale — définition du besoin |
| v0.3 | 2026-09-04 | Implémentation de la v1 (page 6 écrans, 2 endpoints, table D1, script de lien). Ajout de « État d’implémentation » en §8. D1 et D3–D10 appliquées telles quelles ; D2 tranché par défaut à 13 questions, toujours ouvert |
| v0.2 | 2026-09-03 | Décisions D1, D3–D10 arrêtées. Questionnaire rendu générique agence (1er client : architecte d'intérieur) : vocabulaire neutralisé, options Q10 transverses, Q7 et Q11 supprimées. Sous-choix LinkedIn à deux voies. Capture du site en en-tête écartée. Ajout §10 budget temps. §11 cadre juridique du remerciement symbolique |
