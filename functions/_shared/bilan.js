// Référentiel du questionnaire de bilan (offboarding) — source de vérité côté serveur.
// Sert à la fois de whitelist de validation (functions/api/bilan.js) et de table de
// libellés pour la notification email. La numérotation Q* suit doc/offboarding-satisfaction.md.
//
// ⚠ Les libellés affichés au client vivent dans landings/bilan/index.html. Toute
// valeur ajoutée ici doit l'être des deux côtés, sinon la réponse est rejetée.

/** Q2 — conformité du résultat aux attentes initiales. */
export const EXPECTATION = {
  below: 'En dessous de ce que j’imaginais',
  match: 'Conforme à ce que j’imaginais',
  above: 'Au-delà de ce que j’imaginais',
};

/** Q3 — étapes du cycle, notées de 1 à 5. */
export const STEPS = {
  contact:  'Premier contact',
  cadrage:  'Cadrage du besoin',
  design:   'Propositions de design',
  suivi:    'Suivi pendant la réalisation',
  livraison:'Livraison / mise en ligne',
};

/** Q4 — axes de communication, notés de 1 à 5. */
export const COMMUNICATION = {
  reactivite: 'Réactivité',
  clarte:     'Clarté des explications',
  delais:     'Respect des délais',
};

/** Q6 — critères de décision (choix multiple). */
export const DECISION = {
  prix:           'Le prix',
  humain:         'Le contact humain',
  exemples:       'Les exemples montrés',
  metier:         'La compréhension de mon métier',
  rapidite:       'La rapidité',
  recommandation: 'Une recommandation',
  autre:          'Autre',
};

/**
 * Q8 — rapport entre la valeur retirée et l'investissement consenti.
 * Terrain volontairement distinct de Q2 (conformité au cadrage) : ici on veut un
 * signal de pricing, sans poser frontalement « était-ce trop cher ? », question
 * qui rouvrirait la négociation.
 */
export const VALUE = {
  moins:        'Ça vaut moins que ce que j’y ai mis',
  equilibre:    'C’est équilibré',
  plus:         'Ça vaut plus que ce que j’y ai mis',
  sans_reponse: 'Préfère ne pas répondre',
};

/** Q10 — besoins à 6 mois (choix multiple). Libellés transverses, sans jargon sectoriel. */
export const NEEDS = {
  maintenance: 'Maintenance & mises à jour',
  google:      'Être mieux visible sur Google',
  contenus:    'Contenus, textes ou photos',
  reseaux:     'Réseaux sociaux',
  evolutions:  'De nouvelles pages ou fonctionnalités',
  vente_rdv:   'Vendre ou prendre rendez-vous en ligne',
  autre:       'Autre',
  rien:        'Rien pour l’instant',
};

/** Q13 — demandes de recommandation (branche promoteur uniquement). */
export const ASKS = {
  linkedin:        'Parler du site sur LinkedIn',
  avis_google:     'Laisser un avis Google',
  reference:       'Autoriser nom + logo + captures',
  mise_en_relation:'Nous présenter quelqu’un',
};

/** Sous-choix LinkedIn — qui tient la plume. */
export const LINKEDIN_MODE = {
  self:     'Je m’en occupe — envoyez-moi juste les visuels',
  assisted: 'Proposez-moi un texte, je l’adapterai',
};

/** Seuil promoteur : au-dessus, on demande ; en dessous, on répare. Cf. doc §5. */
export const PROMOTER_THRESHOLD = 8;

/** Durée de validité d'un lien de bilan (F12). */
export const TOKEN_TTL_DAYS = 60;
