// Direction B — Terroir Vivant
// Olive sage + terracotta + warm cream, Cormorant Garamond + Manrope.
// Warmer, more confident, more tactile — leans into the artisanal world.

const B_PALETTE = {
  ink: '#1f1d1a',
  inkSoft: '#5b554d',
  olive: '#5d6b3f',
  oliveDeep: '#3f4a2b',
  oliveSoft: '#a9b285',
  terracotta: '#c45c3e',
  terracottaSoft: '#e8a18a',
  cream: '#f2e9d8',
  creamDeep: '#e8dcc4',
  paper: '#fbf6ea',
  line: 'rgba(31, 29, 26, 0.12)',
  white: '#ffffff',
};

const B_FONTS = {
  serif: '"Cormorant Garamond", Georgia, serif',
  sans: '"Manrope", -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── Identity Card ────────────────────────────────────────────────
function DirB_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: B_PALETTE.cream, color: B_PALETTE.ink, fontFamily: B_FONTS.sans,
      padding: '48px',
      // subtle grain via repeating linear gradient
      backgroundImage: `
        radial-gradient(circle at 20% 30%, rgba(196,92,62,0.04) 0, transparent 40%),
        radial-gradient(circle at 80% 70%, rgba(93,107,63,0.05) 0, transparent 40%)
      `,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: B_PALETTE.terracotta, marginBottom: 14 }}>
            DIRECTION B
          </div>
          <h1 style={{
            fontFamily: B_FONTS.serif, fontSize: 64, fontWeight: 500,
            color: B_PALETTE.ink, margin: 0, lineHeight: 1.0, letterSpacing: '-0.018em',
          }}>
            Terroir<br />
            <em style={{ fontWeight: 500, color: B_PALETTE.terracotta, fontStyle: 'italic' }}>Vivant</em>
          </h1>
          <p style={{ fontSize: 15, color: B_PALETTE.inkSoft, marginTop: 18, maxWidth: 480, lineHeight: 1.55 }}>
            Plus chaud, plus confiant, plus tactile. Une palette végétale et minérale qui sent le terroir, sans tomber dans le cliché du « marché du dimanche ».
          </p>
        </div>
        {/* Stamp-style mark */}
        <div style={{
          width: 76, height: 76, borderRadius: 8, background: B_PALETTE.terracotta,
          color: B_PALETTE.paper, display: 'grid', placeItems: 'center', flexShrink: 0,
          transform: 'rotate(-6deg)',
          boxShadow: '0 4px 0 ' + B_PALETTE.olive,
        }}>
          <span style={{ fontFamily: B_FONTS.serif, fontStyle: 'italic', fontSize: 28, fontWeight: 600, lineHeight: 1 }}>LP</span>
        </div>
      </div>

      {/* Palette */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: B_FONTS.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: B_PALETTE.inkSoft, marginBottom: 14 }}>
          Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { name: 'Encre', hex: '#1f1d1a', bg: B_PALETTE.ink, fg: '#fff' },
            { name: 'Olive', hex: '#5d6b3f', bg: B_PALETTE.olive, fg: '#fff' },
            { name: 'Terracotta', hex: '#c45c3e', bg: B_PALETTE.terracotta, fg: '#fff' },
            { name: 'Olive doux', hex: '#a9b285', bg: B_PALETTE.oliveSoft, fg: 'rgba(0,0,0,0.6)' },
            { name: 'Crème prof.', hex: '#e8dcc4', bg: B_PALETTE.creamDeep, fg: 'rgba(0,0,0,0.5)' },
          ].map((c) => (
            <div key={c.name} style={{
              height: 96, borderRadius: 4, background: c.bg, color: c.fg,
              padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              fontFamily: B_FONTS.mono, fontSize: 10,
            }}>
              <div style={{ fontFamily: B_FONTS.serif, fontStyle: 'italic', fontWeight: 600, fontSize: 14 }}>{c.name}</div>
              <div>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: B_FONTS.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: B_PALETTE.inkSoft, marginBottom: 14 }}>
          Typographie
        </div>
        <div style={{ background: B_PALETTE.paper, borderRadius: 4, padding: '24px 28px', border: `1px solid ${B_PALETTE.line}`, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: B_FONTS.mono, fontSize: 10, color: B_PALETTE.inkSoft, marginBottom: 12 }}>
            <span>Cormorant Garamond · Display</span><span>500 / 600 · italique très expressif</span>
          </div>
          <div style={{ fontFamily: B_FONTS.serif, fontSize: 44, fontWeight: 500, color: B_PALETTE.ink, lineHeight: 1.0, letterSpacing: '-0.015em' }}>
            Le digital, <em style={{ fontWeight: 500, color: B_PALETTE.terracotta, fontStyle: 'italic' }}>au service du goût.</em>
          </div>
        </div>
        <div style={{ background: B_PALETTE.paper, borderRadius: 4, padding: '20px 28px', border: `1px solid ${B_PALETTE.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: B_FONTS.mono, fontSize: 10, color: B_PALETTE.inkSoft, marginBottom: 10 }}>
            <span>Manrope · Body</span><span>400 / 500 / 700</span>
          </div>
          <div style={{ fontFamily: B_FONTS.sans, fontSize: 15, color: B_PALETTE.ink, lineHeight: 1.55 }}>
            On bâtit pour vous les outils digitaux qui font la différence : un site qui vend, une app qui suit vos stocks, des automatisations qui libèrent vos soirées.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <div style={{ fontFamily: B_FONTS.sans, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: B_PALETTE.inkSoft, marginBottom: 14 }}>
          Boutons
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={{
            padding: '14px 26px', borderRadius: 4, background: B_PALETTE.ink, color: B_PALETTE.paper,
            border: 'none', fontFamily: B_FONTS.sans, fontWeight: 700, fontSize: 14, cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>Lancer le projet</button>
          <button style={{
            padding: '14px 26px', borderRadius: 4, background: B_PALETTE.terracotta, color: B_PALETTE.paper,
            border: 'none', fontFamily: B_FONTS.sans, fontWeight: 700, fontSize: 14, cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>Télécharger le guide</button>
          <button style={{
            padding: '14px 26px', borderRadius: 4, background: 'transparent', color: B_PALETTE.olive,
            border: `1.5px solid ${B_PALETTE.olive}`, fontFamily: B_FONTS.sans, fontWeight: 700, fontSize: 14, cursor: 'pointer',
            letterSpacing: '0.02em',
          }}>Notre approche</button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function DirB_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: B_FONTS.sans,
      background: B_PALETTE.cream,
    }}>
      {/* Top nav */}
      <div style={{
        padding: '28px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${B_PALETTE.line}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: B_PALETTE.ink }}>
          <div style={{
            width: 32, height: 32, borderRadius: 4, background: B_PALETTE.terracotta,
            display: 'grid', placeItems: 'center', color: B_PALETTE.paper,
          }}>
            <span style={{ fontFamily: B_FONTS.serif, fontStyle: 'italic', fontWeight: 700, fontSize: 15, lineHeight: 1 }}>LP</span>
          </div>
          <span style={{ fontFamily: B_FONTS.serif, fontWeight: 600, fontSize: 22, fontStyle: 'italic' }}>LaunchPad Factory</span>
        </div>
        <div style={{ display: 'flex', gap: 32, color: B_PALETTE.ink, fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
          <span>Métier</span><span>Travaux</span><span>Histoire</span><span>Carnet</span>
          <button style={{
            padding: '11px 22px', borderRadius: 4, background: B_PALETTE.ink,
            color: B_PALETTE.paper, border: 'none', fontWeight: 700, fontSize: 13, cursor: 'pointer',
            letterSpacing: '0.04em', textTransform: 'uppercase',
          }}>Échangeons</button>
        </div>
      </div>

      {/* Hero content */}
      <div style={{
        padding: '64px 56px 48px',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center',
      }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            padding: '8px 14px', borderRadius: 4,
            background: B_PALETTE.paper, border: `1px solid ${B_PALETTE.terracotta}`,
            fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: '0.14em',
            color: B_PALETTE.terracotta, marginBottom: 32, textTransform: 'uppercase',
          }}>
            <span>★</span>
            Agence dédiée aux épiceries fines
          </div>
          <h1 style={{
            fontFamily: B_FONTS.serif, fontSize: 88, fontWeight: 500, color: B_PALETTE.ink,
            lineHeight: 0.95, letterSpacing: '-0.025em', margin: '0 0 24px',
          }}>
            Le <em style={{ fontWeight: 500, color: B_PALETTE.terracotta, fontStyle: 'italic' }}>digital</em>,<br />
            au service<br />
            du <em style={{ fontWeight: 500, color: B_PALETTE.olive, fontStyle: 'italic' }}>goût.</em>
          </h1>
          <p style={{
            color: B_PALETTE.inkSoft, fontSize: 18, lineHeight: 1.55, maxWidth: 500, margin: '0 0 36px',
          }}>
            Site, application, automatisations, marketing. On s'occupe du digital pendant que vous conseillez, vendez et faites grandir votre épicerie.
          </p>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '15px 28px', borderRadius: 4, background: B_PALETTE.ink,
              color: B_PALETTE.paper, border: 'none', fontFamily: B_FONTS.sans, fontWeight: 700,
              fontSize: 14, cursor: 'pointer', letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Réserver un appel</button>
            <button style={{
              padding: '15px 28px', borderRadius: 4, background: 'transparent',
              color: B_PALETTE.ink, border: `1.5px solid ${B_PALETTE.ink}`,
              fontFamily: B_FONTS.sans, fontWeight: 700, fontSize: 14, cursor: 'pointer',
              letterSpacing: '0.04em', textTransform: 'uppercase',
            }}>Voir le carnet</button>
          </div>
        </div>

        {/* Visual side: stacked photo + "stamps" */}
        <div style={{ position: 'relative', minHeight: 460 }}>
          {/* Main photo placeholder */}
          <div style={{
            position: 'absolute', inset: '0 40px 60px 0',
            background: `
              repeating-linear-gradient(135deg, rgba(0,0,0,0.06) 0 8px, transparent 8px 24px),
              linear-gradient(160deg, ${B_PALETTE.olive} 0%, ${B_PALETTE.oliveDeep} 100%)
            `,
            borderRadius: 4,
          }}>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, fontFamily: B_FONTS.mono,
              fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase',
            }}>
              [ photo · épicerie · cadrage serré ]
            </div>
          </div>
          {/* Stamp 1 */}
          <div style={{
            position: 'absolute', bottom: 0, right: 0, width: 200, padding: '20px 22px',
            background: B_PALETTE.paper, border: `1px solid ${B_PALETTE.line}`,
            transform: 'rotate(3deg)', boxShadow: '0 12px 30px rgba(31,29,26,0.12)',
          }}>
            <div style={{ fontFamily: B_FONTS.mono, fontSize: 10, color: B_PALETTE.terracotta, letterSpacing: '0.14em', marginBottom: 8, textTransform: 'uppercase' }}>
              ★ + 50
            </div>
            <div style={{ fontFamily: B_FONTS.serif, fontStyle: 'italic', fontSize: 18, color: B_PALETTE.ink, lineHeight: 1.2 }}>
              Épiceries déjà accompagnées sur la DLC
            </div>
          </div>
          {/* Stamp 2 */}
          <div style={{
            position: 'absolute', top: 30, right: -16, padding: '8px 14px',
            background: B_PALETTE.terracotta, color: B_PALETTE.paper,
            fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
            transform: 'rotate(8deg)', borderRadius: 4,
          }}>
            Nouveau · Guide LinkedIn
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Service Cards ────────────────────────────────────────────────
function DirB_Cards() {
  const services = [
    { tag: 'I.', title: 'Site & e-commerce', body: 'Vitrine ou boutique. Sur-mesure, performant, autonome. Photos mises en valeur, parcours d\'achat court.', accent: B_PALETTE.terracotta },
    { tag: 'II.', title: 'Application métier', body: 'L\'outil que vous attendiez : DLC, stocks, fidélité. Conçu avec vous, maintenu par nous.', accent: B_PALETTE.olive },
    { tag: 'III.', title: 'Automatisations', body: 'Caisse, e-commerce, comptabilité, newsletter : on relie vos outils pour que tout circule seul.', accent: B_PALETTE.ink },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: B_PALETTE.paper, fontFamily: B_FONTS.sans,
      padding: '64px 56px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 32 }}>
        <div>
          <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: B_PALETTE.terracotta, marginBottom: 16, textTransform: 'uppercase' }}>
            Notre métier · §03
          </div>
          <h2 style={{
            fontFamily: B_FONTS.serif, fontSize: 56, fontWeight: 500, color: B_PALETTE.ink,
            margin: 0, lineHeight: 1.0, letterSpacing: '-0.018em', maxWidth: 720,
          }}>
            Trois outils, <em style={{ fontWeight: 500, color: B_PALETTE.terracotta, fontStyle: 'italic' }}>un seul artisan.</em>
          </h2>
        </div>
        <p style={{ color: B_PALETTE.inkSoft, fontSize: 15, lineHeight: 1.5, maxWidth: 300, margin: 0 }}>
          Pas de sous-traitance, pas de no-code générique, pas d'agence parisienne hors-sol. Chaque projet est fait à la main, en France, par la même équipe.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {services.map((s) => (
          <div key={s.tag} style={{
            background: B_PALETTE.cream, borderRadius: 4, padding: '36px 30px',
            border: `1px solid ${B_PALETTE.line}`,
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}>
            {/* Big stamp tag */}
            <div style={{
              fontFamily: B_FONTS.serif, fontStyle: 'italic', fontSize: 64, fontWeight: 500,
              color: s.accent, lineHeight: 0.9, marginBottom: 20, letterSpacing: '-0.02em',
            }}>
              {s.tag}
            </div>
            <h3 style={{
              fontFamily: B_FONTS.serif, fontSize: 28, fontWeight: 500, color: B_PALETTE.ink,
              margin: '0 0 14px', lineHeight: 1.1, letterSpacing: '-0.015em',
            }}>{s.title}</h3>
            <p style={{
              color: B_PALETTE.inkSoft, fontSize: 14.5, lineHeight: 1.6, margin: 0, flex: 1,
            }}>{s.body}</p>
            <div style={{
              marginTop: 24, paddingTop: 16, borderTop: `1px solid ${B_PALETTE.line}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontFamily: B_FONTS.mono, fontSize: 10, color: B_PALETTE.inkSoft, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                Voir en détail
              </span>
              <span style={{ color: s.accent, fontWeight: 700, fontSize: 18 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pattern section ──────────────────────────────────────────────
function DirB_Pattern() {
  const problems = [
    { n: '§01', title: 'Invisible en ligne', body: 'Vos clients premium achètent en ligne. Si on ne vous trouve pas sur Internet, on va ailleurs.' },
    { n: '§02', title: 'Outils dispersés', body: 'Caisse, e-commerce, blog, compta. Vous jonglez entre des outils qui ne se parlent pas.' },
    { n: '§03', title: 'Tâches chronophages', body: 'Des heures à mettre à jour, copier-coller, ressaisir. Du temps loin du comptoir.' },
    { n: '§04', title: 'Ventes dormantes', body: 'Une base client qu\'on n\'arrive pas à réveiller. Et un Google My Business sans avis.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: B_PALETTE.olive, color: B_PALETTE.paper,
      fontFamily: B_FONTS.sans, padding: '56px 56px',
      backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 12px)`,
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '4fr 5.5fr', gap: 80 }}>
        <div>
          <div style={{ fontFamily: B_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: B_PALETTE.terracottaSoft, marginBottom: 16, textTransform: 'uppercase' }}>
            Le constat · §02
          </div>
          <h2 style={{
            fontFamily: B_FONTS.serif, fontSize: 56, fontWeight: 500, color: B_PALETTE.paper,
            margin: '0 0 20px', lineHeight: 0.98, letterSpacing: '-0.02em',
          }}>
            Vous vous<br /><em style={{ fontWeight: 500, color: B_PALETTE.terracottaSoft, fontStyle: 'italic' }}>reconnaissez ?</em>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(251,246,234,0.78)', lineHeight: 1.6, maxWidth: 340, margin: 0 }}>
            Ces quatre symptômes reviennent dans 9 épiceries fines sur 10. Ils n'ont pas grand-chose à voir avec votre produit — ils sont juste là où le digital n'a pas suivi.
          </p>
        </div>
        <div>
          {problems.map((p, i) => (
            <div key={p.n} style={{
              display: 'grid', gridTemplateColumns: '80px 1fr', gap: 24,
              padding: '22px 0', borderTop: `1px solid rgba(251,246,234,0.12)`,
            }}>
              <div style={{
                fontFamily: B_FONTS.serif, fontStyle: 'italic', fontSize: 26, fontWeight: 500,
                color: B_PALETTE.terracottaSoft, lineHeight: 1,
              }}>{p.n}</div>
              <div>
                <h3 style={{
                  fontFamily: B_FONTS.serif, fontSize: 26, fontWeight: 500, color: B_PALETTE.paper,
                  margin: '0 0 6px', lineHeight: 1.1, letterSpacing: '-0.012em',
                }}>{p.title}</h3>
                <p style={{ color: 'rgba(251,246,234,0.72)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirB_Identity, DirB_Hero, DirB_Cards, DirB_Pattern });
