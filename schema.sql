-- Schéma D1 pour la capture de leads et le suivi des téléchargements.
-- Appliquer avec : wrangler d1 execute launchpad-leads --remote --file=schema.sql

CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  firstname TEXT,
  guide TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_leads_email   ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_guide   ON leads(guide);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);

CREATE TABLE IF NOT EXISTS downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  guide TEXT NOT NULL,
  email TEXT,
  ip TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_downloads_guide   ON downloads(guide);
CREATE INDEX IF NOT EXISTS idx_downloads_created ON downloads(created_at);

-- Demandes de contact / réservation d'appel envoyées via la modal
CREATE TABLE IF NOT EXISTS contact_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT NOT NULL,
  city TEXT NOT NULL,
  message TEXT NOT NULL,
  availability TEXT NOT NULL,           -- valeurs séparées par ',' (ex: "matin,semaine")
  availability_notes TEXT,
  source TEXT,                          -- d'où le CTA a été cliqué (hero, footer, etc.)
  ip TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',   -- new | replied | converted | archived
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_email   ON contact_requests(email);
CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_requests(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status  ON contact_requests(status);

-- Réponses au questionnaire de bilan de fin de mission (offboarding).
-- Cf. doc/offboarding-satisfaction.md — la numérotation Q* suit celle du document.
CREATE TABLE IF NOT EXISTS satisfaction_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,

  -- Partie payload du lien signé. UNIQUE => une seule réponse par lien (F11) :
  -- une nouvelle soumission écrase la précédente au lieu de créer un doublon.
  -- NULL pour les soumissions du fallback sans token (F3) ; SQLite autorise
  -- plusieurs NULL sur une colonne UNIQUE, donc le fallback n'entre jamais en conflit.
  token_ref TEXT UNIQUE,
  variant TEXT NOT NULL DEFAULT 'agence',   -- prévu pour de futures versions sectorielles

  -- Identité : injectée par le token, ou saisie à la main en fallback
  firstname TEXT NOT NULL,
  company TEXT NOT NULL,
  project TEXT,
  delivered_at TEXT,

  -- Écran 1 — satisfaction globale
  q1_satisfaction INTEGER NOT NULL,         -- 1..5
  q2_expectation TEXT,                      -- below | match | above

  -- Écran 2 — collaboration (matrices sérialisées en JSON)
  q3_steps TEXT,                            -- {"contact":4,"cadrage":5,...}
  q4_communication TEXT,                    -- {"reactivite":5,"clarte":4,"delais":4}
  q5_friction TEXT,

  -- Écran 3 — valeur perçue
  q6_decision TEXT,                         -- valeurs séparées par ',' (cf. contact_requests.availability)
  q6_decision_other TEXT,
  q8_value TEXT,                            -- bien_en_dessous | en_dessous | conforme | au_dessus | bien_au_dessus
  q9_benefit TEXT,

  -- Écran 4 — la suite
  q10_needs TEXT,                           -- valeurs séparées par ','
  q10_needs_other TEXT,

  -- Écran 5 — recommandation
  q12_nps INTEGER NOT NULL,                 -- 0..10
  q13_asks TEXT,                            -- branche promoteur (>= 8), séparées par ','
  q13_linkedin_mode TEXT,                   -- self | assisted
  q14_verbatim TEXT,
  q13bis_missing TEXT,                      -- branche passif/détracteur (<= 7)
  q13ter_callback INTEGER,                  -- 0 | 1

  -- Écran 6 — mot de la fin
  q15_extra TEXT,
  consent INTEGER NOT NULL DEFAULT 0,       -- traitement des données (requis)
  publish_consent INTEGER NOT NULL DEFAULT 0, -- publication nom/logo/verbatim (optionnel, distinct)

  duration_seconds INTEGER,                 -- temps de remplissage réel (critère de succès §2)
  ip TEXT,
  user_agent TEXT,
  status TEXT NOT NULL DEFAULT 'new',       -- new | processed | assets_collected
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_satisfaction_company ON satisfaction_responses(company);
CREATE INDEX IF NOT EXISTS idx_satisfaction_nps     ON satisfaction_responses(q12_nps);
CREATE INDEX IF NOT EXISTS idx_satisfaction_status  ON satisfaction_responses(status);
CREATE INDEX IF NOT EXISTS idx_satisfaction_created ON satisfaction_responses(created_at);
