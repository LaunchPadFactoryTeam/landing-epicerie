/**
 * Projection des réponses de bilan vers Notion.
 *
 * D1 reste la source de vérité : cet envoi est best-effort, exactement comme la
 * notification Brevo. S'il échoue, la réponse du client est déjà enregistrée et
 * l'email est déjà parti — on log et on passe.
 *
 * Variables d'environnement :
 *   - NOTION_TOKEN        (secret — token d'intégration interne, ntn_…)   [optionnel]
 *   - NOTION_DATABASE_ID  (id de la base « Bilans clients »)              [optionnel]
 * Les deux absents = fonctionnalité désactivée (cas du dev local).
 */

const NOTION_API = 'https://api.notion.com/v1';
// Version stable de l'API. À ne changer qu'en vérifiant la forme du parent :
// les versions >= 2025-09-03 attendent un data_source_id, pas un database_id.
const NOTION_VERSION = '2022-06-28';

/* Correspondances clé technique → libellé de l'option Notion.
   ⚠ Ces libellés doivent exister à l'identique dans la base, sinon Notion
   rejette la page entière. Toute option ajoutée ici doit l'être des deux côtés. */
const ASK_LABELS = {
  linkedin: 'LinkedIn',
  reference: 'Référence publique',
  mise_en_relation: 'Mise en relation',
};
const LINKEDIN_LABELS = { self: 'Le client gère', assisted: 'Texte à proposer' };
const VALUE_LABELS = {
  moins: 'Vaut moins',
  equilibre: 'Équilibré',
  plus: 'Vaut plus',
  sans_reponse: 'Sans réponse',
};
const NEED_LABELS = {
  maintenance: 'Maintenance',
  google: 'Visibilité Google',
  contenus: 'Contenus',
  reseaux: 'Réseaux sociaux',
  evolutions: 'Nouvelles fonctionnalités',
  vente_rdv: 'Vente ou RDV en ligne',
  autre: 'Autre',
  rien: 'Rien pour le moment',
};

const STEP_LABELS = {
  contact: 'Premier contact',
  cadrage: 'Cadrage du besoin',
  design: 'Propositions de design',
  suivi: 'Suivi pendant la réalisation',
  livraison: 'Livraison / mise en ligne',
};
const COMM_LABELS = {
  reactivite: 'Réactivité',
  clarte: 'Clarté des explications',
  delais: 'Respect des délais',
};

/** Notion refuse un rich_text de plus de 2000 caractères : on tronque. */
function richText(value) {
  const text = String(value ?? '').slice(0, 2000);
  return text ? [{ type: 'text', text: { content: text } }] : [];
}

function multiSelect(keys, labels) {
  return keys
    .map((key) => labels[key])
    .filter(Boolean)
    .map((name) => ({ name }));
}

/** Date seule (AAAA-MM-JJ) ou null si la valeur n'est pas exploitable. */
function dateProp(iso) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(iso || '')) ? { start: iso } : null;
}

/**
 * Propriétés de la ligne Notion.
 * `tone.label` vient de npsTone() côté bilan.js et correspond déjà, mot pour
 * mot, aux options du select « Ressenti ».
 */
function buildProperties(r, tone, rowId) {
  const asks = multiSelect(r.q13Asks, ASK_LABELS);
  // Le rappel demandé n'est pas une case de q13_asks mais reste une action à
  // déclencher : on le fait remonter dans la même colonne.
  if (r.q13terCallback === 1) asks.push({ name: 'Rappel demandé' });

  const props = {
    'Client': { title: richText(r.company || 'Client inconnu') },
    'Statut': { select: { name: 'À traiter' } },
    'Recommandation': { number: r.q12Nps },
    'Satisfaction': { number: r.q1Satisfaction },
    'Ressenti': { select: { name: tone.label } },
    'Actions à déclencher': { multi_select: asks },
    'Publication autorisée': { checkbox: !!r.publishConsent },
    'Verbatim': { rich_text: richText(r.q14Verbatim) },
    'Besoins 6 mois': { multi_select: multiSelect(r.q10Needs, NEED_LABELS) },
    'Reçu le': { date: { start: new Date().toISOString() } },
  };

  if (rowId) props['ID D1'] = { number: rowId };
  if (r.email) props['Email'] = { email: r.email };
  if (r.linkedinMode) props['LinkedIn'] = { select: { name: LINKEDIN_LABELS[r.linkedinMode] } };
  if (r.q8Value) props['Valeur perçue'] = { select: { name: VALUE_LABELS[r.q8Value] } };

  const delivered = dateProp(r.deliveredAt);
  if (delivered) props['Livré le'] = { date: delivered };

  return props;
}

function heading(text) {
  return { object: 'block', type: 'heading_3', heading_3: { rich_text: richText(text) } };
}
function paragraph(text) {
  return { object: 'block', type: 'paragraph', paragraph: { rich_text: richText(text) } };
}
function quote(text) {
  return { object: 'block', type: 'quote', quote: { rich_text: richText(text) } };
}
function bullet(text) {
  return { object: 'block', type: 'bulleted_list_item', bulleted_list_item: { rich_text: richText(text) } };
}

/** Corps de la page : ce qui ne tient pas dans une colonne de tableau. */
function buildChildren(r) {
  const blocks = [];

  if (r.q14Verbatim) {
    blocks.push(heading(r.publishConsent ? '💬 Verbatim publiable' : '💬 Verbatim (publication NON autorisée)'));
    blocks.push(quote(r.q14Verbatim));
  }

  const scale = (obj, labels) =>
    Object.entries(obj).map(([key, note]) => bullet(`${labels[key]} — ${note}/5`));

  if (Object.keys(r.q3Steps).length) {
    blocks.push(heading('📊 Étapes du projet'));
    blocks.push(...scale(r.q3Steps, STEP_LABELS));
  }
  if (Object.keys(r.q4Communication).length) {
    blocks.push(heading('📊 Communication'));
    blocks.push(...scale(r.q4Communication, COMM_LABELS));
  }

  const freeText = [
    ['😕 Moment de flottement', r.q5Friction],
    ['🎯 Bénéfice attendu', r.q9Benefit],
    ['🔧 Ce qui manquait pour gagner les points', r.q13bisMissing],
    ['📝 Mot de la fin', r.q15Extra],
    ['Autre critère de décision', r.q6DecisionOther],
    ['Autre besoin', r.q10NeedsOther],
  ];
  for (const [label, value] of freeText) {
    if (!value) continue;
    blocks.push(heading(label));
    blocks.push(paragraph(value));
  }

  // Notion limite à 100 blocs par requête de création.
  return blocks.slice(0, 100);
}

async function notionFetch(env, path, method, body) {
  const res = await fetch(`${NOTION_API}${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.NOTION_TOKEN}`,
      'notion-version': NOTION_VERSION,
      'content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`Notion ${method} ${path} → ${res.status} ${await res.text()}`);
  }
  return res.json();
}

/**
 * Crée la ligne Notion, ou met à jour celle déjà liée à cette réponse.
 * Renvoie l'id de page Notion (à conserver en base), ou null si rien n'a été fait.
 */
export async function pushToNotion(env, record, tone, rowId, existingPageId) {
  if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) return null;

  const properties = buildProperties(record, tone, rowId);

  // Re-soumission du même lien : on met la ligne existante à jour plutôt que
  // d'en créer une seconde, pour rester cohérent avec l'upsert D1 (F11).
  if (existingPageId) {
    await notionFetch(env, `/pages/${existingPageId}`, 'PATCH', { properties });
    // Les blocs déjà écrits ne sont pas réécrits (il faudrait les supprimer un
    // par un) : on signale la mise à jour à la suite du corps existant.
    await notionFetch(env, `/blocks/${existingPageId}/children`, 'PATCH', {
      children: [
        paragraph(`↻ Réponse mise à jour le ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`),
        ...buildChildren(record),
      ].slice(0, 100),
    });
    return existingPageId;
  }

  const page = await notionFetch(env, '/pages', 'POST', {
    parent: { database_id: env.NOTION_DATABASE_ID },
    icon: { type: 'emoji', emoji: '📝' },
    properties,
    children: buildChildren(record),
  });
  return page.id || null;
}
