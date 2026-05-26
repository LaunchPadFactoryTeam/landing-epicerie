// Direction C — Atelier Moderne
// Almost-black + warm cream + one vivid rust accent.
// Instrument Serif (display) + Space Grotesk (body).
// Contemporary indie magazine — bold typography, big numbers, graphic.

const C_PALETTE = {
  ink: '#15140f',
  inkSoft: '#5a564e',
  cream: '#f5efe2',
  paper: '#fbf7ec',
  rust: '#c44a1a',
  rustDeep: '#9a3812',
  rustSoft: '#e89a78',
  forest: '#2d3b30',
  forestSoft: '#7a8a7c',
  line: 'rgba(21, 20, 15, 0.10)',
  white: '#ffffff',
};

const C_FONTS = {
  serif: '"Instrument Serif", "Times New Roman", serif',
  sans: '"Space Grotesk", -apple-system, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ─── Identity Card ────────────────────────────────────────────────
function DirC_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: C_PALETTE.paper, color: C_PALETTE.ink, fontFamily: C_FONTS.sans,
      padding: '48px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: C_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: C_PALETTE.rust, marginBottom: 14 }}>
            DIRECTION C / 03
          </div>
          <h1 style={{
            fontFamily: C_FONTS.serif, fontSize: 88, fontWeight: 400,
            color: C_PALETTE.ink, margin: 0, lineHeight: 0.88, letterSpacing: '-0.025em',
          }}>
            Atelier <em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>Moderne.</em>
          </h1>
          <p style={{ fontSize: 15, color: C_PALETTE.inkSoft, marginTop: 20, maxWidth: 480, lineHeight: 1.55 }}>
            La direction la plus contemporaine. Typographie qui prend toute la place, palette minimale resserrée autour d'un seul accent vif, beaucoup d'air. Inspiration : indie mag, studio créatif moderne.
          </p>
        </div>
        <div style={{
          fontFamily: C_FONTS.serif, fontSize: 56, fontWeight: 400, color: C_PALETTE.ink,
          lineHeight: 0.9, letterSpacing: '-0.04em',
          borderLeft: `2px solid ${C_PALETTE.rust}`, paddingLeft: 16,
        }}>
          LP<br /><em style={{ fontStyle: 'italic', color: C_PALETTE.rust, fontSize: 32 }}>—F</em>
        </div>
      </div>

      {/* Palette */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ fontFamily: C_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C_PALETTE.inkSoft, marginBottom: 14 }}>
          01 / Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: C_PALETTE.ink, padding: 1 }}>
          {[
            { name: 'Encre', hex: '#15140f', bg: C_PALETTE.ink, fg: C_PALETTE.cream },
            { name: 'Crème', hex: '#f5efe2', bg: C_PALETTE.cream, fg: C_PALETTE.ink },
            { name: 'Rouille', hex: '#c44a1a', bg: C_PALETTE.rust, fg: '#fff' },
            { name: 'Forêt', hex: '#2d3b30', bg: C_PALETTE.forest, fg: '#fff' },
            { name: 'Rouille profonde', hex: '#9a3812', bg: C_PALETTE.rustDeep, fg: '#fff' },
          ].map((c) => (
            <div key={c.name} style={{
              height: 100, background: c.bg, color: c.fg,
              padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 18, lineHeight: 1 }}>{c.name}</div>
              <div style={{ fontFamily: C_FONTS.mono, fontSize: 10 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: C_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C_PALETTE.inkSoft, marginBottom: 14 }}>
          02 / Typographie
        </div>
        <div style={{ background: C_PALETTE.cream, padding: '24px 28px', marginBottom: 6, border: `1px solid ${C_PALETTE.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: C_FONTS.mono, fontSize: 10, color: C_PALETTE.inkSoft, marginBottom: 12 }}>
            <span>Instrument Serif · Display</span><span>400 · italique</span>
          </div>
          <div style={{ fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 56, color: C_PALETTE.ink, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
            Le digital, <em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>fait main.</em>
          </div>
        </div>
        <div style={{ background: C_PALETTE.cream, padding: '20px 28px', border: `1px solid ${C_PALETTE.line}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: C_FONTS.mono, fontSize: 10, color: C_PALETTE.inkSoft, marginBottom: 10 }}>
            <span>Space Grotesk · Body</span><span>400 / 500 / 700</span>
          </div>
          <div style={{ fontFamily: C_FONTS.sans, fontSize: 15, color: C_PALETTE.ink, lineHeight: 1.55 }}>
            On bâtit pour vous les outils digitaux qui font la différence : un site qui vend, une app qui suit vos stocks, des automatisations qui libèrent vos soirées.
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div>
        <div style={{ fontFamily: C_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C_PALETTE.inkSoft, marginBottom: 14 }}>
          03 / Boutons
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button style={{
            padding: '14px 24px', background: C_PALETTE.ink, color: C_PALETTE.cream,
            border: 'none', fontFamily: C_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>Démarrer <span style={{ color: C_PALETTE.rust }}>→</span></button>
          <button style={{
            padding: '14px 24px', background: C_PALETTE.rust, color: '#fff',
            border: 'none', fontFamily: C_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
          }}>Télécharger le guide</button>
          <button style={{
            padding: '14px 24px', background: 'transparent', color: C_PALETTE.ink,
            border: `1px solid ${C_PALETTE.ink}`, fontFamily: C_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
          }}>Voir nos travaux</button>
        </div>
      </div>
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────
function DirC_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: C_FONTS.sans, background: C_PALETTE.paper,
    }}>
      {/* Top nav */}
      <div style={{
        padding: '28px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${C_PALETTE.ink}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, color: C_PALETTE.ink }}>
          <span style={{ fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 24, letterSpacing: '-0.02em' }}>
            LaunchPad<em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>—F</em>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 28, color: C_PALETTE.ink, fontSize: 13, fontWeight: 500, alignItems: 'center', fontFamily: C_FONTS.sans }}>
          <span>01 / Pratique</span><span>02 / Travaux</span><span>03 / Approche</span><span>04 / Carnet</span>
          <button style={{
            padding: '9px 18px', background: C_PALETTE.ink,
            color: C_PALETTE.cream, border: 'none', fontWeight: 500, fontSize: 13, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>Échangeons <span style={{ color: C_PALETTE.rust }}>→</span></button>
        </div>
      </div>

      {/* Hero — typography first */}
      <div style={{ padding: '24px 56px 0', position: 'relative' }}>
        {/* Section index */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: C_FONTS.mono, fontSize: 11, color: C_PALETTE.inkSoft, letterSpacing: '0.12em',
          padding: '12px 0 20px', textTransform: 'uppercase',
          borderBottom: `1px solid ${C_PALETTE.line}`,
        }}>
          <span>—</span>
          <span>§ Hero · Édition №01 · Mai 2026</span>
          <span>—</span>
        </div>

        {/* Huge title */}
        <h1 style={{
          fontFamily: C_FONTS.serif, fontWeight: 400, color: C_PALETTE.ink,
          fontSize: 168, lineHeight: 0.85, letterSpacing: '-0.04em', margin: '32px 0 24px',
        }}>
          Le digital,<br />
          <em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>fait main</em>
          <span style={{ color: C_PALETTE.rust }}>.</span>
        </h1>

        {/* Bottom row: subhead + tags + CTAs */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end',
          paddingBottom: 32,
        }}>
          <div>
            <p style={{
              fontFamily: C_FONTS.sans, fontSize: 19, lineHeight: 1.5, color: C_PALETTE.ink,
              maxWidth: 520, margin: '0 0 28px', fontWeight: 500,
            }}>
              Site, app, automatisations, marketing.<br />
              <span style={{ color: C_PALETTE.inkSoft, fontWeight: 400 }}>
                Une seule agence, française, dédiée aux épiceries fines.
              </span>
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '14px 24px', background: C_PALETTE.ink, color: C_PALETTE.cream,
                border: 'none', fontFamily: C_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>Réserver un appel <span style={{ color: C_PALETTE.rust }}>→</span></button>
              <button style={{
                padding: '14px 24px', background: 'transparent', color: C_PALETTE.ink,
                border: `1px solid ${C_PALETTE.ink}`, fontFamily: C_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>Voir les travaux</button>
            </div>
          </div>
          <div>
            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: `1px solid ${C_PALETTE.ink}`, borderBottom: `1px solid ${C_PALETTE.ink}`,
            }}>
              {[
                { n: '+50', l: 'épiceries' },
                { n: '03', l: 'apps livrées' },
                { n: '30′', l: 'écon. / jour' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '20px 18px',
                  borderLeft: i > 0 ? `1px solid ${C_PALETTE.line}` : 'none',
                }}>
                  <div style={{ fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 44, color: C_PALETTE.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {s.n}
                  </div>
                  <div style={{ fontFamily: C_FONTS.mono, fontSize: 10, color: C_PALETTE.inkSoft, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Service Cards ────────────────────────────────────────────────
function DirC_Cards() {
  const services = [
    { tag: '№01', title: 'Site & e-commerce', body: 'Vitrine ou boutique. Sur-mesure, performant. Pensé pour mettre vos produits en lumière et raccourcir le parcours d\'achat.' },
    { tag: '№02', title: 'Application métier', body: 'L\'outil qui vous manquait : DLC, stocks, fidélité. Conçu avec vous, maintenu par nous, intégré à vos outils existants.' },
    { tag: '№03', title: 'Automatisations', body: 'Caisse, e-commerce, comptabilité, newsletter. Vos données circulent toutes seules. Vous récupérez vos soirées.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: C_PALETTE.cream, fontFamily: C_FONTS.sans,
      padding: '56px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: C_FONTS.mono, fontSize: 11, color: C_PALETTE.inkSoft, letterSpacing: '0.12em',
        padding: '0 0 18px', textTransform: 'uppercase',
        borderBottom: `1px solid ${C_PALETTE.ink}`, marginBottom: 24,
      }}>
        <span>§ Services</span>
        <span>03 / 04</span>
      </div>

      <h2 style={{
        fontFamily: C_FONTS.serif, fontSize: 88, fontWeight: 400, color: C_PALETTE.ink,
        margin: '0 0 40px', lineHeight: 0.9, letterSpacing: '-0.03em',
      }}>
        Trois <em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>métiers,</em><br />
        un seul artisan.
      </h2>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: `1px solid ${C_PALETTE.ink}`,
      }}>
        {services.map((s, i) => (
          <div key={s.tag} style={{
            padding: '32px 24px 24px',
            borderLeft: i > 0 ? `1px solid ${C_PALETTE.line}` : 'none',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{
              fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 48, color: C_PALETTE.rust,
              lineHeight: 0.9, marginBottom: 24, letterSpacing: '-0.02em',
              fontStyle: 'italic',
            }}>{s.tag}</div>
            <h3 style={{
              fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 30, color: C_PALETTE.ink,
              margin: '0 0 14px', lineHeight: 1.0, letterSpacing: '-0.02em',
            }}>{s.title}</h3>
            <p style={{
              color: C_PALETTE.inkSoft, fontSize: 14.5, lineHeight: 1.6, margin: 0, flex: 1,
              fontFamily: C_FONTS.sans,
            }}>{s.body}</p>
            <div style={{
              marginTop: 24, fontFamily: C_FONTS.mono, fontSize: 11, color: C_PALETTE.ink,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
            }}>
              Voir <span style={{ color: C_PALETTE.rust, fontSize: 16, marginLeft: 2 }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pattern section ──────────────────────────────────────────────
function DirC_Pattern() {
  const problems = [
    { n: '01', title: 'Invisible en ligne', body: 'Vos clients premium achètent en ligne. Si on ne vous trouve pas sur Internet, on va ailleurs.' },
    { n: '02', title: 'Outils dispersés', body: 'Caisse, e-commerce, blog, compta. Vous jonglez entre des outils qui ne se parlent pas.' },
    { n: '03', title: 'Tâches chronophages', body: 'Des heures à mettre à jour, copier-coller, ressaisir. Du temps loin du comptoir.' },
    { n: '04', title: 'Ventes dormantes', body: 'Une base client qu\'on n\'arrive pas à réveiller. Un Google sans avis récents.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: C_PALETTE.ink, color: C_PALETTE.cream,
      fontFamily: C_FONTS.sans, padding: '56px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
    }}>
      {/* Left — title */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: C_FONTS.mono, fontSize: 11, color: C_PALETTE.rustSoft, letterSpacing: '0.12em', textTransform: 'uppercase', paddingBottom: 18, borderBottom: `1px solid rgba(245,239,226,0.16)`, marginBottom: 32 }}>
          <span>§ Le constat</span>
          <span>02 / 04</span>
        </div>
        <h2 style={{
          fontFamily: C_FONTS.serif, fontSize: 104, fontWeight: 400, color: C_PALETTE.cream,
          margin: '0 0 24px', lineHeight: 0.86, letterSpacing: '-0.035em',
        }}>
          Vous vous<br />
          <em style={{ fontStyle: 'italic', color: C_PALETTE.rust }}>reconnaissez ?</em>
        </h2>
        <p style={{
          color: 'rgba(245,239,226,0.7)', fontSize: 16, lineHeight: 1.55,
          maxWidth: 380, margin: 'auto 0 0',
        }}>
          Quatre symptômes qui reviennent dans 9 épiceries fines sur 10. Pas un problème de produit — un problème de digital qui n'a pas suivi.
        </p>
      </div>
      {/* Right — problems list */}
      <div>
        {problems.map((p, i) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '64px 1fr',
            padding: '20px 0', borderTop: `1px solid rgba(245,239,226,0.16)`,
            borderBottom: i === problems.length - 1 ? `1px solid rgba(245,239,226,0.16)` : 'none',
            alignItems: 'baseline', gap: 20,
          }}>
            <div style={{
              fontFamily: C_FONTS.mono, fontSize: 13, color: C_PALETTE.rust,
              letterSpacing: '0.06em',
            }}>{p.n} /</div>
            <div>
              <h3 style={{
                fontFamily: C_FONTS.serif, fontWeight: 400, fontSize: 32, color: C_PALETTE.cream,
                margin: '0 0 6px', lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{p.title}</h3>
              <p style={{
                color: 'rgba(245,239,226,0.68)', fontSize: 14.5, lineHeight: 1.55, margin: 0,
                fontFamily: C_FONTS.sans,
              }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DirC_Identity, DirC_Hero, DirC_Cards, DirC_Pattern });
