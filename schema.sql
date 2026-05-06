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
