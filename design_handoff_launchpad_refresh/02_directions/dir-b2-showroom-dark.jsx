// Direction B v2 — Showroom Dark
// Studio digital premium, dark-first. Hyperstack/Linear vibe.
// Bricolage Grotesque + Geist Mono. Off-black bg + cream + electric violet.
// Le digital, fait main. — version "tech atelier".

const B2_PALETTE = {
  ink: '#0a0a0c',
  inkLift: '#15151a',
  inkLine: 'rgba(255,255,255,0.10)',
  cream: '#f4ede0',
  paper: '#fbf7ec',
  violet: '#a585ff',       // electric, dopamine
  violetSoft: '#cfbfff',
  acid: '#caff4a',         // 2e accent rare
  textSoft: 'rgba(244,237,224,0.66)',
};

const B2_FONTS = {
  display: '"Bricolage Grotesque", -apple-system, sans-serif',
  sans: '"Inter Tight", -apple-system, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
};

function DirB2_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: B2_PALETTE.ink, color: B2_PALETTE.cream, fontFamily: B2_FONTS.sans,
      padding: '48px', position: 'relative', overflow: 'hidden',
      backgroundImage: `
        radial-gradient(ellipse at top right, rgba(165,133,255,0.10), transparent 50%),
        radial-gradient(ellipse at bottom left, rgba(202,255,74,0.04), transparent 40%)
      `,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: B2_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: B2_PALETTE.violet, marginBottom: 14 }}>
            DIRECTION B · SHOWROOM DARK
          </div>
          <h1 style={{
            fontFamily: B2_FONTS.display, fontSize: 76, fontWeight: 700, color: B2_PALETTE.cream,
            margin: 0, lineHeight: 0.95, letterSpacing: '-0.04em',
          }}>
            Studio<br />
            <span style={{
              background: `linear-gradient(120deg, ${B2_PALETTE.violet}, ${B2_PALETTE.violetSoft} 60%, ${B2_PALETTE.cream})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>numérique.</span>
          </h1>
          <p style={{ fontSize: 15, color: B2_PALETTE.textSoft, marginTop: 16, maxWidth: 480, lineHeight: 1.55 }}>
            Dark-first, tech-confident. Bricolage Grotesque + Inter Tight + Geist Mono. Accent violet électrique pour la dopamine. C'est le mode "Hyperstack / Linear" — pour transpirer la maîtrise technique.
          </p>
        </div>
        {/* Logo mark — pixel-like */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 14px)', gap: 3,
        }}>
          {[1,1,0,1,1,1,0,1,1].map((v, i) => (
            <div key={i} style={{
              width: 14, height: 14, background: v ? B2_PALETTE.violet : 'transparent',
              border: v ? 'none' : `1px solid rgba(255,255,255,0.2)`,
            }} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: B2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: B2_PALETTE.textSoft, marginBottom: 12 }}>
          01 / Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { name: 'Encre', hex: '#0a0a0c', bg: B2_PALETTE.ink, fg: B2_PALETTE.cream, border: true },
            { name: 'Encre+', hex: '#15151a', bg: B2_PALETTE.inkLift, fg: B2_PALETTE.cream, border: true },
            { name: 'Violet ★', hex: '#a585ff', bg: B2_PALETTE.violet, fg: B2_PALETTE.ink },
            { name: 'Acide', hex: '#caff4a', bg: B2_PALETTE.acid, fg: B2_PALETTE.ink },
            { name: 'Crème', hex: '#f4ede0', bg: B2_PALETTE.cream, fg: B2_PALETTE.ink },
          ].map((c) => (
            <div key={c.name} style={{
              height: 88, background: c.bg, color: c.fg, borderRadius: 6,
              border: c.border ? `1px solid ${B2_PALETTE.inkLine}` : 'none',
              padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: B2_FONTS.display, fontWeight: 600, fontSize: 14, lineHeight: 1 }}>{c.name}</div>
              <div style={{ fontFamily: B2_FONTS.mono, fontSize: 10 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: B2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: B2_PALETTE.textSoft, marginBottom: 12 }}>
          02 / Type
        </div>
        <div style={{ background: B2_PALETTE.inkLift, borderRadius: 12, padding: '24px 28px', border: `1px solid ${B2_PALETTE.inkLine}` }}>
          <div style={{ fontFamily: B2_FONTS.display, fontSize: 52, fontWeight: 700, color: B2_PALETTE.cream, lineHeight: 0.95, letterSpacing: '-0.035em' }}>
            Le digital,<br />
            <span style={{ color: B2_PALETTE.violet }}>fait main.</span>
          </div>
          <div style={{ fontFamily: B2_FONTS.sans, fontSize: 14.5, color: B2_PALETTE.textSoft, lineHeight: 1.55, marginTop: 14 }}>
            Une agence digitale française. Web, mobile, automatisation, marketing. Conception, build, déploiement.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
        <button style={{
          padding: '13px 22px', background: B2_PALETTE.cream, color: B2_PALETTE.ink,
          border: 'none', borderRadius: 999, fontFamily: B2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>Démarrer un projet <span>→</span></button>
        <button style={{
          padding: '13px 22px', background: B2_PALETTE.violet, color: B2_PALETTE.ink,
          border: 'none', borderRadius: 999, fontFamily: B2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>Voir le showroom</button>
        <button style={{
          padding: '13px 22px', background: 'transparent', color: B2_PALETTE.cream,
          border: `1px solid ${B2_PALETTE.inkLine}`, borderRadius: 999, fontFamily: B2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
        }}>Notre approche →</button>
      </div>
    </div>
  );
}

function DirB2_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: B2_FONTS.sans, background: B2_PALETTE.ink, color: B2_PALETTE.cream,
      backgroundImage: `
        radial-gradient(ellipse 800px 600px at 70% 30%, rgba(165,133,255,0.18), transparent 50%),
        radial-gradient(ellipse 600px 400px at 10% 80%, rgba(202,255,74,0.06), transparent 50%)
      `,
    }}>
      {/* Status bar */}
      <div style={{
        background: 'rgba(255,255,255,0.04)', borderBottom: `1px solid ${B2_PALETTE.inkLine}`,
        padding: '10px 32px',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: B2_FONTS.mono, fontSize: 11, color: B2_PALETTE.textSoft, letterSpacing: '0.06em',
      }}>
        <span><span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: B2_PALETTE.acid, marginRight: 8, verticalAlign: 'middle' }} />Disponibles · 2 slots restants · Été 2026</span>
        <span>SHOWROOM · v2.1 · Mai 2026</span>
      </div>

      {/* Nav */}
      <div style={{
        padding: '24px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 7px)', gap: 2 }}>
            {[1,1,0,1,1,1,0,1,1].map((v, i) => (
              <div key={i} style={{ width: 7, height: 7, background: v ? B2_PALETTE.violet : 'transparent' }} />
            ))}
          </div>
          <span style={{ fontFamily: B2_FONTS.display, fontWeight: 700, fontSize: 20, color: B2_PALETTE.cream, letterSpacing: '-0.02em' }}>LaunchPad Factory</span>
        </div>
        <div style={{ display: 'flex', gap: 28, color: B2_PALETTE.cream, fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
          <span>Showroom</span><span>Approche</span><span>Carnet</span><span>Contact</span>
          <button style={{
            padding: '10px 18px', background: B2_PALETTE.cream, color: B2_PALETTE.ink,
            border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>Démarrer →</button>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '40px 56px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, border: `1px solid ${B2_PALETTE.inkLine}`, background: 'rgba(255,255,255,0.03)', fontFamily: B2_FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: B2_PALETTE.violetSoft, marginBottom: 28, textTransform: 'uppercase' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: B2_PALETTE.violet }} />
          Agence digitale · France
        </div>

        <h1 style={{
          fontFamily: B2_FONTS.display, fontWeight: 700, color: B2_PALETTE.cream,
          fontSize: 156, lineHeight: 0.86, letterSpacing: '-0.05em', margin: '0 0 24px',
        }}>
          Le digital,<br />
          <span style={{
            background: `linear-gradient(100deg, ${B2_PALETTE.violet} 0%, ${B2_PALETTE.violetSoft} 35%, ${B2_PALETTE.cream} 80%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>fait main.</span>
        </h1>

        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end',
          paddingBottom: 32,
        }}>
          <div>
            <p style={{
              fontFamily: B2_FONTS.sans, fontSize: 19, lineHeight: 1.55, color: B2_PALETTE.cream,
              maxWidth: 540, margin: '0 0 28px', fontWeight: 500,
            }}>
              On conçoit, on développe, on déploie.<br />
              <span style={{ color: B2_PALETTE.textSoft, fontWeight: 400 }}>
                Web, mobile, automatisation, marketing — pour les marques qui veulent reprendre la main sur leur outil.
              </span>
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{
                padding: '14px 24px', background: B2_PALETTE.cream, color: B2_PALETTE.ink,
                border: 'none', borderRadius: 999, fontFamily: B2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>Réserver un appel →</button>
              <button style={{
                padding: '14px 24px', background: 'rgba(255,255,255,0.05)', color: B2_PALETTE.cream,
                border: `1px solid ${B2_PALETTE.inkLine}`, borderRadius: 999, fontFamily: B2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
              }}>Voir le showroom</button>
            </div>
          </div>
          {/* Live ticker */}
          <div style={{
            border: `1px solid ${B2_PALETTE.inkLine}`, borderRadius: 12,
            background: 'rgba(255,255,255,0.03)',
            padding: 18, fontFamily: B2_FONTS.mono, fontSize: 11.5, color: B2_PALETTE.textSoft,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, color: B2_PALETTE.cream, fontWeight: 500 }}>
              <span>● ATELIER · LIVE</span><span>21.05.2026</span>
            </div>
            {[
              { t: '11:42', txt: 'PUSH · traceo-app · feature/dlc-warning', c: B2_PALETTE.violet },
              { t: '10:18', txt: 'SHIP · épicerie Lebon · prod', c: B2_PALETTE.acid },
              { t: '09:03', txt: 'CALL · discovery · pâtisserie Niel', c: B2_PALETTE.violetSoft },
              { t: '08:30', txt: 'DEPLOY · 4 sites · clearflare', c: B2_PALETTE.textSoft },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '50px 1fr', gap: 10, padding: '6px 0' }}>
                <span style={{ color: row.c }}>{row.t}</span>
                <span>{row.txt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DirB2_Cards() {
  const works = [
    { tag: '№01 · MOBILE', title: 'Traceo', body: 'App native iOS/Android. Suivi DLC pour épiceries fines.', accent: B2_PALETTE.violet },
    { tag: '№02 · WEB', title: 'Boutique headless', body: 'E-commerce sur-mesure pour marque française. Stack maison.', accent: B2_PALETTE.acid },
    { tag: '№03 · OPS', title: 'Pipeline marketing', body: 'Newsletter + GMB + social, entièrement automatisé.', accent: B2_PALETTE.violetSoft },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: B2_PALETTE.ink, color: B2_PALETTE.cream,
      fontFamily: B2_FONTS.sans, padding: '48px 56px',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontFamily: B2_FONTS.mono, fontSize: 11, color: B2_PALETTE.textSoft, letterSpacing: '0.12em',
        padding: '0 0 18px', textTransform: 'uppercase',
        borderBottom: `1px solid ${B2_PALETTE.inkLine}`, marginBottom: 28,
      }}>
        <span>§ Showroom · des projets livrés, pas des promesses</span>
        <span>03 / 04</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
        <h2 style={{
          fontFamily: B2_FONTS.display, fontSize: 84, fontWeight: 700, color: B2_PALETTE.cream,
          margin: 0, lineHeight: 0.92, letterSpacing: '-0.04em',
        }}>
          Trois preuves <span style={{ color: B2_PALETTE.violet }}>récentes.</span>
        </h2>
        <button style={{
          padding: '10px 16px', background: 'transparent', color: B2_PALETTE.cream,
          border: `1px solid ${B2_PALETTE.inkLine}`, borderRadius: 999, fontFamily: B2_FONTS.mono, fontSize: 11, letterSpacing: '0.14em', cursor: 'pointer', textTransform: 'uppercase',
        }}>+12 projets →</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {works.map((w, i) => (
          <div key={w.tag} style={{
            background: B2_PALETTE.inkLift,
            border: `1px solid ${B2_PALETTE.inkLine}`,
            borderRadius: 16,
            display: 'flex', flexDirection: 'column', position: 'relative',
            overflow: 'hidden',
            transform: i === 1 ? 'translateY(-6px)' : 'none',
            boxShadow: i === 1 ? `0 30px 60px rgba(165,133,255,0.16), 0 0 0 1px ${B2_PALETTE.violet}` : 'none',
          }}>
            <div style={{
              aspectRatio: '4 / 3',
              background: `
                radial-gradient(ellipse at 70% 30%, ${w.accent}55, transparent 60%),
                linear-gradient(160deg, ${B2_PALETTE.inkLift} 0%, ${B2_PALETTE.ink} 100%)
              `,
              position: 'relative', borderBottom: `1px solid ${B2_PALETTE.inkLine}`,
            }}>
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                color: B2_PALETTE.cream, fontFamily: B2_FONTS.mono, fontSize: 10, letterSpacing: '0.12em',
                padding: '4px 10px', borderRadius: 999,
                border: `1px solid ${B2_PALETTE.inkLine}`,
              }}>{w.tag}</div>
              {i === 1 && (
                <div style={{
                  position: 'absolute', bottom: 12, right: 12,
                  background: B2_PALETTE.violet, color: B2_PALETTE.ink,
                  fontFamily: B2_FONTS.sans, fontWeight: 600, fontSize: 12,
                  padding: '6px 12px', borderRadius: 999,
                }}>Case study →</div>
              )}
            </div>
            <div style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                fontFamily: B2_FONTS.display, fontWeight: 700, fontSize: 28, color: B2_PALETTE.cream,
                margin: '0 0 10px', lineHeight: 1.0, letterSpacing: '-0.025em',
              }}>{w.title}</h3>
              <p style={{
                color: B2_PALETTE.textSoft, fontSize: 14, lineHeight: 1.55, margin: 0, flex: 1,
              }}>{w.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirB2_Pattern() {
  const problems = [
    { n: '01', title: 'Un site qui n\'apporte rien', body: 'Vitrine figée, parcours qui ne convertit pas — un site qui occupe l\'URL sans jouer son rôle.' },
    { n: '02', title: 'Des outils dispersés', body: 'Caisse, e-commerce, CRM, compta. La même donnée saisie trois fois par jour.' },
    { n: '03', title: 'Pas de visibilité data', body: 'Vous décidez au feeling. Vous ne savez pas ce qui marche, où mettre l\'effort.' },
    { n: '04', title: 'Pas d\'équipe digitale', body: 'Personne en interne pour bouger vite. Tout passe par un prestataire à deux semaines.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: B2_PALETTE.cream, color: B2_PALETTE.ink,
      fontFamily: B2_FONTS.sans, padding: '48px 56px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: B2_FONTS.mono, fontSize: 11, color: B2_PALETTE.violet, letterSpacing: '0.12em', textTransform: 'uppercase', paddingBottom: 18, borderBottom: `1px solid rgba(10,10,12,0.15)`, marginBottom: 32 }}>
          <span>§ Le constat</span>
          <span>02 / 04</span>
        </div>
        <h2 style={{
          fontFamily: B2_FONTS.display, fontSize: 108, fontWeight: 700, color: B2_PALETTE.ink,
          margin: '0 0 24px', lineHeight: 0.85, letterSpacing: '-0.045em',
        }}>
          Vous vous<br />
          <span style={{
            background: `linear-gradient(100deg, #5a37c2, ${B2_PALETTE.violet})`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>reconnaissez ?</span>
        </h2>
        <p style={{
          color: 'rgba(10,10,12,0.65)', fontSize: 16, lineHeight: 1.55,
          maxWidth: 380, margin: 'auto 0 0',
        }}>
          Quatre symptômes qui reviennent chez 9 PME sur 10. Le problème n'est jamais l'envie ou les compétences internes — c'est le digital qui n'a pas suivi le rythme.
        </p>
      </div>
      <div>
        {problems.map((p, i) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr',
            padding: '20px 0', borderTop: `1px solid rgba(10,10,12,0.15)`,
            borderBottom: i === problems.length - 1 ? `1px solid rgba(10,10,12,0.15)` : 'none',
            alignItems: 'baseline', gap: 20,
          }}>
            <div style={{
              fontFamily: B2_FONTS.mono, fontSize: 13, color: B2_PALETTE.violet,
              letterSpacing: '0.06em',
            }}>{p.n} /</div>
            <div>
              <h3 style={{
                fontFamily: B2_FONTS.display, fontWeight: 700, fontSize: 28, color: B2_PALETTE.ink,
                margin: '0 0 6px', lineHeight: 1.05, letterSpacing: '-0.025em',
              }}>{p.title}</h3>
              <p style={{
                color: 'rgba(10,10,12,0.6)', fontSize: 14.5, lineHeight: 1.55, margin: 0,
              }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DirB2_Identity, DirB2_Hero, DirB2_Cards, DirB2_Pattern });
