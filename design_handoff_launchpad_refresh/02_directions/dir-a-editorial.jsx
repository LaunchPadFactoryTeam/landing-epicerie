// Direction A — Éditorial Soigné
// Refinement of current épicerie: navy + crème + or, Playfair + DM Sans.
// The "safe" magazine premium direction.

const A_PALETTE = {
  navy: '#162235',
  navy90: '#1d2c43',
  cream: '#F7F3EE',
  creamAlt: '#EEE6DD',
  gold: '#B78A3D',
  goldSoft: '#d8b878',
  brown: '#8A6A57',
  ink: '#1C1C1C',
  textSoft: '#5F5A55',
  line: 'rgba(22, 34, 53, 0.10)',
  white: '#ffffff',
};

const A_FONTS = {
  serif: '"Playfair Display", Georgia, serif',
  sans: '"DM Sans", -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── Identity Card (palette + type + identity samples) ───────────
function DirA_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: A_PALETTE.cream, color: A_PALETTE.ink, fontFamily: A_FONTS.sans,
      padding: '48px',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: A_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: A_PALETTE.gold, marginBottom: 14 }}>
            DIRECTION A
          </div>
          <h1 style={{
            fontFamily: A_FONTS.serif, fontSize: 56, fontWeight: 700,
            color: A_PALETTE.navy, margin: 0, lineHeight: 1.05, letterSpacing: '-0.015em',
          }}>
            Éditorial <em style={{ fontWeight: 500, color: A_PALETTE.gold }}>Soigné</em>
          </h1>
          <p style={{ fontSize: 16, color: A_PALETTE.textSoft, marginTop: 16, maxWidth: 480, lineHeight: 1.55 }}>
            Le raffinement du site épiceries, poussé d'un cran. Pose, mesure, sérénité. Un magazine d'épicerie fine qui se serait infiltré dans une agence.
          </p>
        </div>
        <div style={{
          width: 64, height: 64, borderRadius: '50%', background: A_PALETTE.navy,
          position: 'relative', flexShrink: 0,
        }}>
          <div style={{ position: 'absolute', inset: 18, background: A_PALETTE.gold, borderRadius: '50%' }} />
        </div>
      </div>

      {/* Palette */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: A_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: A_PALETTE.textSoft, marginBottom: 14 }}>
          Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { name: 'Navy', hex: '#162235', bg: A_PALETTE.navy, fg: '#fff' },
            { name: 'Brown', hex: '#8A6A57', bg: A_PALETTE.brown, fg: '#fff' },
            { name: 'Or', hex: '#B78A3D', bg: A_PALETTE.gold, fg: '#fff' },
            { name: 'Or doux', hex: '#d8b878', bg: A_PALETTE.goldSoft, fg: 'rgba(0,0,0,0.65)' },
            { name: 'Crème alt', hex: '#EEE6DD', bg: A_PALETTE.creamAlt, fg: 'rgba(0,0,0,0.5)' },
          ].map((c) => (
            <div key={c.name} style={{
              height: 96, borderRadius: 8, background: c.bg, color: c.fg,
              padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              fontFamily: A_FONTS.mono, fontSize: 10,
            }}>
              <div style={{ fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 12, letterSpacing: '0.04em' }}>{c.name}</div>
              <div>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: A_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: A_PALETTE.textSoft, marginBottom: 14 }}>
          Typographie
        </div>
        <div style={{ background: A_PALETTE.white, borderRadius: 12, padding: '24px 28px', border: `1px solid ${A_PALETTE.line}`, marginBottom: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: A_FONTS.mono, fontSize: 10, color: A_PALETTE.textSoft, marginBottom: 12 }}>
            <span>Playfair Display · Display</span><span>600 / 700 · italique disponible</span>
          </div>
          <div style={{ fontFamily: A_FONTS.serif, fontSize: 36, fontWeight: 700, color: A_PALETTE.navy, lineHeight: 1.1, letterSpacing: '-0.012em' }}>
            Faire grandir <em style={{ fontWeight: 500, color: A_PALETTE.gold }}>votre épicerie.</em>
          </div>
        </div>
        <div style={{ background: A_PALETTE.white, borderRadius: 12, padding: '20px 28px', border: `1px solid ${A_PALETTE.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: A_FONTS.mono, fontSize: 10, color: A_PALETTE.textSoft, marginBottom: 10 }}>
            <span>DM Sans · Body</span><span>400 / 500 / 600</span>
          </div>
          <div style={{ fontFamily: A_FONTS.sans, fontSize: 15, color: A_PALETTE.ink, lineHeight: 1.55 }}>
            On s'occupe de tout le digital pour accompagner votre croissance, afin que vous vous concentriez sur l'essentiel : conseiller, vendre, et faire grandir votre épicerie.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <div style={{ fontFamily: A_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: A_PALETTE.textSoft, marginBottom: 14 }}>
          Boutons
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={{
            padding: '13px 24px', borderRadius: 999, background: A_PALETTE.navy, color: '#fff',
            border: 'none', fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>Démarrer un projet →</button>
          <button style={{
            padding: '13px 24px', borderRadius: 999, background: A_PALETTE.gold, color: '#fff',
            border: 'none', fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>Télécharger le guide</button>
          <button style={{
            padding: '13px 24px', borderRadius: 999, background: 'transparent', color: A_PALETTE.navy,
            border: `1.5px solid ${A_PALETTE.navy}`, fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>Voir nos travaux</button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function DirA_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: A_FONTS.sans,
    }}>
      {/* Photo background placeholder — striped warm-toned */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 6px, transparent 6px 24px),
          linear-gradient(135deg, #1a1108 0%, #3b2618 35%, #5c3a1f 70%, #1a1108 100%)
        `,
      }} />
      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(90deg, rgba(15,23,38,0.88) 0%, rgba(15,23,38,0.65) 50%, rgba(15,23,38,0.30) 100%)`,
      }} />
      {/* Imagery label */}
      <div style={{
        position: 'absolute', right: 32, top: 32, fontFamily: A_FONTS.mono,
        fontSize: 10, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase',
      }}>
        [ photo · rayonnage d'épicerie ]
      </div>

      {/* Top nav */}
      <div style={{
        position: 'relative', zIndex: 2,
        padding: '32px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff' }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: A_PALETTE.cream, position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 8, background: A_PALETTE.gold, borderRadius: '50%' }} />
          </div>
          <span style={{ fontFamily: A_FONTS.serif, fontWeight: 700, fontSize: 20 }}>LaunchPad</span>
        </div>
        <div style={{ display: 'flex', gap: 32, color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
          <span>Services</span><span>Travaux</span><span>Approche</span><span>Ressources</span>
          <button style={{
            padding: '10px 20px', borderRadius: 999, background: A_PALETTE.gold,
            color: '#fff', border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer',
          }}>Démarrer →</button>
        </div>
      </div>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '64px 56px 80px', maxWidth: 880 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '6px 14px', borderRadius: 999,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
          fontFamily: A_FONTS.mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
          color: A_PALETTE.goldSoft, marginBottom: 32,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: A_PALETTE.goldSoft }} />
          Agence digitale · Épiceries fines
        </div>
        <h1 style={{
          fontFamily: A_FONTS.serif, fontSize: 72, fontWeight: 700, color: '#fff',
          lineHeight: 1.08, letterSpacing: '-0.018em', margin: '0 0 24px',
          textShadow: '0 2px 24px rgba(0,0,0,0.35)',
        }}>
          L'agence qui parle le <em style={{ fontWeight: 500, color: A_PALETTE.goldSoft }}>langage</em><br />de votre boutique.
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.92)', fontSize: 19, lineHeight: 1.55, maxWidth: 620,
          margin: '0 0 40px',
        }}>
          Site, application, automatisations, marketing. On s'occupe du digital pendant que vous conseillez, vendez et faites grandir votre épicerie.
        </p>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button style={{
            padding: '16px 28px', borderRadius: 999, background: A_PALETTE.gold,
            color: '#fff', border: 'none', fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 16, cursor: 'pointer',
            boxShadow: '0 12px 30px rgba(183,138,61,0.3)',
          }}>Réserver un appel découverte</button>
          <button style={{
            padding: '16px 28px', borderRadius: 999, background: 'transparent',
            color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)',
            fontFamily: A_FONTS.sans, fontWeight: 600, fontSize: 16, cursor: 'pointer',
          }}>Voir nos travaux</button>
          <span style={{
            marginLeft: 8, padding: '8px 16px', borderRadius: 999,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.16)',
            color: 'rgba(255,255,255,0.9)', fontSize: 13,
          }}>+50 épiceries accompagnées</span>
        </div>
      </div>
    </div>
  );
}

// ─── Service Cards ────────────────────────────────────────────────
function DirA_Cards() {
  const services = [
    { tag: 'WEB', title: 'Sites & e-commerce sur-mesure', body: 'Vitrine ou boutique en ligne. Code maison, performance native, autonomie d\'édition.', glyph: '✦' },
    { tag: 'APP', title: 'Applications mobiles & métier', body: 'Outils pensés pour votre quotidien : DLC, stocks, fidélité. Conçus avec vous, maintenus par nous.', glyph: '◆' },
    { tag: 'OPS', title: 'Automatisations & intégrations', body: 'Caisse, e-commerce, comptabilité : on relie vos outils pour que les données circulent toutes seules.', glyph: '◐' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: A_PALETTE.creamAlt, fontFamily: A_FONTS.sans,
      padding: '64px 56px',
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontFamily: A_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: A_PALETTE.gold, marginBottom: 16, textTransform: 'uppercase' }}>
          ── NOS SERVICES ──
        </div>
        <h2 style={{
          fontFamily: A_FONTS.serif, fontSize: 42, fontWeight: 700, color: A_PALETTE.navy,
          margin: 0, lineHeight: 1.1, letterSpacing: '-0.012em',
        }}>
          Trois métiers, <em style={{ fontWeight: 500, color: A_PALETTE.gold }}>une promesse.</em>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {services.map((s) => (
          <div key={s.tag} style={{
            background: A_PALETTE.white, borderRadius: 20, padding: '36px 30px',
            border: `1px solid ${A_PALETTE.line}`,
            display: 'flex', flexDirection: 'column',
            boxShadow: '0 1px 2px rgba(22,34,53,0.04)',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14, background: A_PALETTE.navy,
              color: A_PALETTE.goldSoft, display: 'grid', placeItems: 'center',
              fontFamily: A_FONTS.serif, fontSize: 26, fontWeight: 700, marginBottom: 22,
            }}>{s.glyph}</div>
            <div style={{ fontFamily: A_FONTS.mono, fontSize: 10, letterSpacing: '0.14em', color: A_PALETTE.brown, marginBottom: 10 }}>
              {s.tag}
            </div>
            <h3 style={{
              fontFamily: A_FONTS.serif, fontSize: 22, fontWeight: 600, color: A_PALETTE.navy,
              margin: '0 0 12px', lineHeight: 1.2, letterSpacing: '-0.01em',
            }}>{s.title}</h3>
            <p style={{
              color: A_PALETTE.textSoft, fontSize: 15, lineHeight: 1.6, margin: 0, flex: 1,
            }}>{s.body}</p>
            <div style={{
              marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6,
              color: A_PALETTE.gold, fontSize: 13, fontWeight: 600, alignSelf: 'flex-start',
            }}>
              Voir en détail →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pattern section (problems) ───────────────────────────────────
function DirA_Pattern() {
  const problems = [
    { n: '01', title: 'Invisible en ligne', body: 'Vos clients premium achètent en ligne. Si on ne vous trouve pas sur Internet, on va ailleurs.' },
    { n: '02', title: 'Outils dispersés', body: 'Caisse, e-commerce, blog, comptabilité. Vous jonglez entre des outils qui ne se parlent pas.' },
    { n: '03', title: 'Tâches chronophages', body: 'Des heures perdues à mettre à jour, copier-coller, ressaisir. Du temps loin du comptoir.' },
    { n: '04', title: 'Ventes dormantes', body: 'Une base client qu\'on n\'arrive pas à réveiller. Et un Google My Business sans avis récents.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', background: A_PALETTE.cream, fontFamily: A_FONTS.sans,
      padding: '56px 56px',
      display: 'grid', gridTemplateColumns: '4fr 5.5fr', gap: 80,
    }}>
      {/* Sticky-intro side */}
      <div>
        <div style={{ fontFamily: A_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: A_PALETTE.gold, marginBottom: 16, textTransform: 'uppercase' }}>
          Le constat
        </div>
        <h2 style={{
          fontFamily: A_FONTS.serif, fontSize: 38, fontWeight: 700, color: A_PALETTE.navy,
          margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.012em',
        }}>
          Vous vous <em style={{ fontWeight: 500, color: A_PALETTE.gold }}>reconnaissez ?</em>
        </h2>
        <p style={{ fontSize: 16, color: A_PALETTE.textSoft, lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
          Ces quatre symptômes reviennent dans 9 épiceries fines sur 10. Ils n'ont pas grand-chose à voir avec votre produit — ils sont juste là où le digital n'a pas suivi.
        </p>
      </div>
      {/* List */}
      <div>
        {problems.map((p, i) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '64px 1fr', gap: 24,
            padding: '24px 0', borderTop: i === 0 ? 'none' : `1px solid ${A_PALETTE.line}`,
          }}>
            <div style={{
              fontFamily: A_FONTS.serif, fontSize: 32, fontWeight: 500, fontStyle: 'italic',
              color: A_PALETTE.goldSoft, lineHeight: 1,
            }}>{p.n}</div>
            <div>
              <h3 style={{
                fontFamily: A_FONTS.serif, fontSize: 22, fontWeight: 600, color: A_PALETTE.navy,
                margin: '0 0 8px', lineHeight: 1.2, letterSpacing: '-0.008em',
              }}>{p.title}</h3>
              <p style={{ color: A_PALETTE.textSoft, fontSize: 15, lineHeight: 1.6, margin: 0 }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DirA_Identity, DirA_Hero, DirA_Cards, DirA_Pattern });
