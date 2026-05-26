// Direction A v2 — Atelier+ (evolved from previous C)
// Le digital, fait main. Instrument Serif italic + Space Grotesk.
// PUSHED: ajout d'un accent lime acide en seconde couleur, marquee ticker,
// hover states visibles, plus de graphisme. Garde la base éditoriale mais
// monte d'un cran l'énergie et l'interactivité.

const A2_PALETTE = {
  ink: '#0e0d0a',
  inkSoft: '#56524a',
  cream: '#f5efe2',
  paper: '#fbf7ec',
  rust: '#e44a1a',         // un cran plus saturé qu'avant
  rustDeep: '#a82e0a',
  lime: '#d4f04e',         // NOUVEAU — accent dopamine
  forest: '#1f2d22',
  line: 'rgba(14, 13, 10, 0.10)',
};

const A2_FONTS = {
  serif: '"Instrument Serif", "Times New Roman", serif',
  sans: '"Space Grotesk", -apple-system, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
};

// Reusable text
const A2_KEY = '— LE DIGITAL, FAIT MAIN —';

function DirA2_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: A2_PALETTE.paper, color: A2_PALETTE.ink, fontFamily: A2_FONTS.sans,
      padding: '48px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Marquee at top */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: 0,
        background: A2_PALETTE.ink, color: A2_PALETTE.cream,
        padding: '10px 0', fontFamily: A2_FONTS.mono, fontSize: 11, letterSpacing: '0.2em',
        whiteSpace: 'nowrap', overflow: 'hidden',
      }}>
        <div style={{ display: 'inline-flex', gap: 32 }}>
          {Array(6).fill(0).map((_, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 32 }}>
              <span>★ DISPONIBLES POUR 2 PROJETS · ÉTÉ 2026</span>
              <span style={{ color: A2_PALETTE.lime }}>★</span>
              <span>LAUNCHPAD FACTORY</span>
              <span style={{ color: A2_PALETTE.lime }}>★</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontFamily: A2_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: A2_PALETTE.rust, marginBottom: 14 }}>
            DIRECTION A · ATELIER+
          </div>
          <h1 style={{
            fontFamily: A2_FONTS.serif, fontSize: 96, fontWeight: 400, color: A2_PALETTE.ink,
            margin: 0, lineHeight: 0.85, letterSpacing: '-0.03em',
          }}>
            Atelier<em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>+</em>
          </h1>
          <p style={{ fontSize: 15, color: A2_PALETTE.inkSoft, marginTop: 16, maxWidth: 480, lineHeight: 1.55 }}>
            La direction C qui vous a plu, montée d'un cran. On garde Instrument Serif italic + Space Grotesk, on ajoute un accent <strong style={{ background: A2_PALETTE.lime, color: A2_PALETTE.ink, padding: '0 4px' }}>lime acide</strong> pour la dopamine, et on graphise plus.
          </p>
        </div>
        <div style={{
          fontFamily: A2_FONTS.serif, fontSize: 64, fontWeight: 400, color: A2_PALETTE.ink,
          lineHeight: 0.9, letterSpacing: '-0.04em',
          borderLeft: `2px solid ${A2_PALETTE.lime}`, paddingLeft: 16,
        }}>
          LP<br /><em style={{ fontStyle: 'italic', color: A2_PALETTE.rust, fontSize: 36 }}>—F</em>
        </div>
      </div>

      <div style={{ marginTop: 28, marginBottom: 28 }}>
        <div style={{ fontFamily: A2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: A2_PALETTE.inkSoft, marginBottom: 12 }}>
          01 / Palette · 4 + 1 accent
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: A2_PALETTE.ink, padding: 1 }}>
          {[
            { name: 'Encre', hex: '#0e0d0a', bg: A2_PALETTE.ink, fg: A2_PALETTE.cream },
            { name: 'Crème', hex: '#f5efe2', bg: A2_PALETTE.cream, fg: A2_PALETTE.ink },
            { name: 'Rouille', hex: '#e44a1a', bg: A2_PALETTE.rust, fg: '#fff' },
            { name: 'Lime ★', hex: '#d4f04e', bg: A2_PALETTE.lime, fg: A2_PALETTE.ink },
            { name: 'Forêt', hex: '#1f2d22', bg: A2_PALETTE.forest, fg: A2_PALETTE.cream },
          ].map((c) => (
            <div key={c.name} style={{
              height: 88, background: c.bg, color: c.fg,
              padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: A2_FONTS.serif, fontWeight: 400, fontSize: 18, lineHeight: 1 }}>{c.name}</div>
              <div style={{ fontFamily: A2_FONTS.mono, fontSize: 10 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: A2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: A2_PALETTE.inkSoft, marginBottom: 12 }}>
          02 / Type · headline / body / mono
        </div>
        <div style={{ background: A2_PALETTE.cream, padding: '22px 28px', border: `1px solid ${A2_PALETTE.line}` }}>
          <div style={{ fontFamily: A2_FONTS.serif, fontSize: 56, fontWeight: 400, color: A2_PALETTE.ink, lineHeight: 0.95, letterSpacing: '-0.025em' }}>
            Le digital, <em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>fait main.</em>
          </div>
          <div style={{ fontFamily: A2_FONTS.sans, fontSize: 14.5, color: A2_PALETTE.inkSoft, lineHeight: 1.55, marginTop: 14 }}>
            Une agence digitale française. On conçoit, on développe, on déploie. Web, mobile, automatisation.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
        <button style={{
          padding: '14px 24px', background: A2_PALETTE.ink, color: A2_PALETTE.cream,
          border: 'none', fontFamily: A2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>Démarrer <span style={{ color: A2_PALETTE.lime }}>→</span></button>
        <button style={{
          padding: '14px 24px', background: A2_PALETTE.lime, color: A2_PALETTE.ink,
          border: 'none', fontFamily: A2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>★ Voir le showroom</button>
        <button style={{
          padding: '14px 24px', background: 'transparent', color: A2_PALETTE.ink,
          border: `1px solid ${A2_PALETTE.ink}`, fontFamily: A2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
        }}>Notre approche</button>
      </div>
    </div>
  );
}

// ─── Hero — typography led, with motion hints ────────────────────
function DirA2_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: A2_FONTS.sans, background: A2_PALETTE.paper,
    }}>
      {/* Marquee */}
      <div style={{
        background: A2_PALETTE.ink, color: A2_PALETTE.cream,
        padding: '8px 0', fontFamily: A2_FONTS.mono, fontSize: 11, letterSpacing: '0.2em',
        whiteSpace: 'nowrap', overflow: 'hidden',
      }}>
        <div style={{ display: 'inline-flex', gap: 32, paddingLeft: 32 }}>
          {Array(4).fill(0).map((_, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 32 }}>
              <span>★ DISPONIBLES POUR 2 PROJETS — ÉTÉ 2026</span>
              <span style={{ color: A2_PALETTE.lime }}>·</span>
              <span>WEB · MOBILE · AUTOMATISATION · MARKETING</span>
              <span style={{ color: A2_PALETTE.lime }}>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Nav */}
      <div style={{
        padding: '24px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        borderBottom: `1px solid ${A2_PALETTE.ink}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, color: A2_PALETTE.ink }}>
          <span style={{ fontFamily: A2_FONTS.serif, fontWeight: 400, fontSize: 28, letterSpacing: '-0.02em' }}>
            LaunchPad<em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>—F</em>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 28, color: A2_PALETTE.ink, fontSize: 13, fontWeight: 500, alignItems: 'center' }}>
          <span>01 / Showroom</span><span>02 / Pratiques</span><span>03 / Carnet</span><span>04 / Contact</span>
          <button style={{
            padding: '9px 18px', background: A2_PALETTE.lime, color: A2_PALETTE.ink,
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>★ Démarrer</button>
        </div>
      </div>

      <div style={{ padding: '28px 56px 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          fontFamily: A2_FONTS.mono, fontSize: 11, color: A2_PALETTE.inkSoft, letterSpacing: '0.14em',
          padding: '0 0 22px', textTransform: 'uppercase',
          borderBottom: `1px solid ${A2_PALETTE.line}`,
        }}>
          <span>§ Hero · Édition №01</span>
          <span>21.05.2026</span>
        </div>

        <h1 style={{
          fontFamily: A2_FONTS.serif, fontWeight: 400, color: A2_PALETTE.ink,
          fontSize: 184, lineHeight: 0.82, letterSpacing: '-0.045em', margin: '36px 0 24px',
        }}>
          Le digital,<br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>fait main</em>
            <span style={{ color: A2_PALETTE.rust }}>.</span>
            {/* lime highlighter behind italic */}
            <span style={{
              position: 'absolute', left: -4, right: 60, bottom: 18, height: 18,
              background: A2_PALETTE.lime, zIndex: -1, opacity: 0.85,
            }} />
          </span>
        </h1>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end',
          paddingBottom: 28,
        }}>
          <div>
            <p style={{
              fontFamily: A2_FONTS.sans, fontSize: 20, lineHeight: 1.5, color: A2_PALETTE.ink,
              maxWidth: 540, margin: '0 0 28px', fontWeight: 500,
            }}>
              Agence digitale française.<br />
              <span style={{ color: A2_PALETTE.inkSoft, fontWeight: 400 }}>
                On conçoit, on développe, on déploie — pour les marques qui veulent reprendre la main sur leur outil.
              </span>
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '14px 24px', background: A2_PALETTE.ink, color: A2_PALETTE.cream,
                border: 'none', fontFamily: A2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>Réserver un appel <span style={{ color: A2_PALETTE.lime }}>→</span></button>
              <button style={{
                padding: '14px 24px', background: 'transparent', color: A2_PALETTE.ink,
                border: `1px solid ${A2_PALETTE.ink}`, fontFamily: A2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>Voir le showroom</button>
            </div>
          </div>
          <div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              borderTop: `1px solid ${A2_PALETTE.ink}`, borderBottom: `1px solid ${A2_PALETTE.ink}`,
            }}>
              {[
                { n: '+50', l: 'projets livrés' },
                { n: '03', l: 'apps publiées' },
                { n: '24h', l: '1er retour' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '20px 18px',
                  borderLeft: i > 0 ? `1px solid ${A2_PALETTE.line}` : 'none',
                  position: 'relative',
                }}>
                  <div style={{ fontFamily: A2_FONTS.serif, fontWeight: 400, fontSize: 52, color: A2_PALETTE.ink, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {s.n}
                  </div>
                  <div style={{ fontFamily: A2_FONTS.mono, fontSize: 10, color: A2_PALETTE.inkSoft, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {s.l}
                  </div>
                  {i === 0 && <span style={{ position: 'absolute', top: 14, right: 12, width: 8, height: 8, borderRadius: '50%', background: A2_PALETTE.lime }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Showroom-style portfolio cards ───────────────────────────────
function DirA2_Cards() {
  const works = [
    { tag: 'WEB · CASE №01', title: 'Traceo App', body: 'Application mobile DLC pour épiceries fines. Conception, dev, MAJ continue.', accent: A2_PALETTE.rust, swatch: A2_PALETTE.rust },
    { tag: 'WEB · CASE №02', title: 'E-commerce + ERP', body: 'Boutique en ligne raccordée au stock physique. Headless, performant, autonome.', accent: A2_PALETTE.lime, swatch: A2_PALETTE.forest },
    { tag: 'OPS · CASE №03', title: 'Pipeline marketing', body: 'Newsletter, GMB, social. Tout automatisé, mesurable, sans surplus d\'outils.', accent: A2_PALETTE.ink, swatch: A2_PALETTE.ink },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: A2_PALETTE.cream, fontFamily: A2_FONTS.sans,
      padding: '48px 56px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: A2_FONTS.mono, fontSize: 11, color: A2_PALETTE.inkSoft, letterSpacing: '0.12em',
        padding: '0 0 18px', textTransform: 'uppercase',
        borderBottom: `1px solid ${A2_PALETTE.ink}`, marginBottom: 24,
      }}>
        <span>§ Showroom</span>
        <span>03 / 04</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <h2 style={{
          fontFamily: A2_FONTS.serif, fontSize: 88, fontWeight: 400, color: A2_PALETTE.ink,
          margin: 0, lineHeight: 0.9, letterSpacing: '-0.03em',
        }}>
          Trois <em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>preuves</em><br />
          de ce qu'on fait.
        </h2>
        <span style={{
          padding: '8px 14px', background: A2_PALETTE.lime, color: A2_PALETTE.ink,
          fontFamily: A2_FONTS.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>★ 12 autres sur demande</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {works.map((w, i) => (
          <div key={w.tag} style={{
            background: A2_PALETTE.paper,
            border: `1px solid ${A2_PALETTE.ink}`,
            display: 'flex', flexDirection: 'column', position: 'relative',
            // simulate the "hover preview" state on the middle one
            transform: i === 1 ? 'translateY(-8px)' : 'none',
            boxShadow: i === 1 ? `4px 4px 0 ${A2_PALETTE.ink}` : 'none',
            transition: 'all 250ms ease',
          }}>
            {/* Image area */}
            <div style={{
              aspectRatio: '4 / 3',
              background: `
                repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 20px),
                linear-gradient(160deg, ${w.swatch} 0%, ${A2_PALETTE.ink} 120%)
              `,
              position: 'relative',
              borderBottom: `1px solid ${A2_PALETTE.ink}`,
            }}>
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: A2_PALETTE.paper, color: A2_PALETTE.ink,
                fontFamily: A2_FONTS.mono, fontSize: 10, letterSpacing: '0.12em',
                padding: '4px 10px', textTransform: 'uppercase',
              }}>{w.tag}</div>
              {i === 1 && (
                <div style={{
                  position: 'absolute', bottom: 14, right: 14,
                  background: A2_PALETTE.lime, color: A2_PALETTE.ink,
                  fontFamily: A2_FONTS.sans, fontWeight: 600, fontSize: 12,
                  padding: '6px 12px',
                }}>★ Voir le case study →</div>
              )}
            </div>
            <div style={{ padding: '20px 22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                fontFamily: A2_FONTS.serif, fontWeight: 400, fontSize: 30, color: A2_PALETTE.ink,
                margin: '0 0 10px', lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{w.title}</h3>
              <p style={{
                color: A2_PALETTE.inkSoft, fontSize: 14, lineHeight: 1.55, margin: 0, flex: 1,
              }}>{w.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Pattern: Le constat — same data but in light variant
function DirA2_Pattern() {
  const problems = [
    { n: '01', title: 'Un site qui n\'apporte rien', body: 'Vitrine figée, parcours qui ne convertit pas, contenu qui ne respire pas — un site qui occupe l\'URL sans jouer son rôle de commercial 24/7.' },
    { n: '02', title: 'Des outils dispersés', body: 'Une stack qui s\'est empilée. Caisse, e-commerce, CRM, comptabilité. Vous ressaisissez la même donnée trois fois par jour.' },
    { n: '03', title: 'Pas de visibilité data', body: 'Vous prenez des décisions au feeling. Vous ne savez pas ce qui marche, ce qui coince, où l\'effort doit aller.' },
    { n: '04', title: 'Une équipe digitale absente', body: 'Personne en interne pour bouger le site, lancer la campagne, déployer la feature. Tout passe par un prestataire qui met deux semaines.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: A2_PALETTE.ink, color: A2_PALETTE.cream,
      fontFamily: A2_FONTS.sans, padding: '48px 56px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: A2_FONTS.mono, fontSize: 11, color: A2_PALETTE.lime, letterSpacing: '0.12em', textTransform: 'uppercase', paddingBottom: 18, borderBottom: `1px solid rgba(245,239,226,0.16)`, marginBottom: 32 }}>
          <span>§ Le constat</span>
          <span>02 / 04</span>
        </div>
        <h2 style={{
          fontFamily: A2_FONTS.serif, fontSize: 112, fontWeight: 400, color: A2_PALETTE.cream,
          margin: '0 0 24px', lineHeight: 0.84, letterSpacing: '-0.04em',
        }}>
          Vous vous<br />
          <em style={{ fontStyle: 'italic', color: A2_PALETTE.rust }}>reconnaissez ?</em>
        </h2>
        <p style={{
          color: 'rgba(245,239,226,0.7)', fontSize: 16, lineHeight: 1.55,
          maxWidth: 400, margin: 'auto 0 0',
        }}>
          Quatre symptômes qui reviennent chez 9 PME sur 10. Le problème n'est jamais l'envie ou les compétences internes — c'est le digital qui n'a pas suivi le rythme du business.
        </p>
        <div style={{ marginTop: 24, display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 10, padding: '10px 18px', background: A2_PALETTE.lime, color: A2_PALETTE.ink, fontFamily: A2_FONTS.sans, fontSize: 14, fontWeight: 600 }}>
          ★ Diagnostic gratuit — 30 min →
        </div>
      </div>
      <div>
        {problems.map((p, i) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr',
            padding: '20px 0', borderTop: `1px solid rgba(245,239,226,0.16)`,
            borderBottom: i === problems.length - 1 ? `1px solid rgba(245,239,226,0.16)` : 'none',
            alignItems: 'baseline', gap: 20,
          }}>
            <div style={{
              fontFamily: A2_FONTS.mono, fontSize: 13, color: A2_PALETTE.lime,
              letterSpacing: '0.06em',
            }}>{p.n} /</div>
            <div>
              <h3 style={{
                fontFamily: A2_FONTS.serif, fontWeight: 400, fontSize: 32, color: A2_PALETTE.cream,
                margin: '0 0 6px', lineHeight: 1.0, letterSpacing: '-0.02em',
              }}>{p.title}</h3>
              <p style={{
                color: 'rgba(245,239,226,0.68)', fontSize: 14.5, lineHeight: 1.55, margin: 0,
              }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DirA2_Identity, DirA2_Hero, DirA2_Cards, DirA2_Pattern });
