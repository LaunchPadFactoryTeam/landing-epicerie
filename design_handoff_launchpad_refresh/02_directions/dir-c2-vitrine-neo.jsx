// Direction C v2 — Vitrine Néo
// Évolution mature du site Webflow actuel — on garde l'énergie "creative
// agency" mais maîtrisée. Crème + ink + orange signature (héritage de
// #ff603a). Bricolage Grotesque + Geist. Bold mais ordonné. Optimiste.
// L'agence qui sait coder ET qui sait designer.

const C2_PALETTE = {
  ink: '#161210',
  inkSoft: '#5a4f49',
  paper: '#fbf6ef',
  cream: '#f1ead9',
  orange: '#ff5c2c',         // évolution de #ff603a
  orangeSoft: '#ffb398',
  blueDeep: '#1d2bbf',       // évolution de #233af8, moins fluo
  forest: '#1f3528',
  line: 'rgba(22, 18, 16, 0.12)',
};

const C2_FONTS = {
  display: '"Bricolage Grotesque", -apple-system, sans-serif',
  serif: '"Instrument Serif", "Times New Roman", serif',
  sans: '"Geist", "Inter", -apple-system, sans-serif',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
};

function DirC2_Identity() {
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      background: C2_PALETTE.paper, color: C2_PALETTE.ink, fontFamily: C2_FONTS.sans,
      padding: '48px', position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative orange shape, top right */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 200, height: 200,
        background: C2_PALETTE.orange, borderRadius: '50%',
        opacity: 0.9,
      }} />
      <div style={{
        position: 'absolute', top: 24, right: 24, fontFamily: C2_FONTS.mono,
        fontSize: 10, letterSpacing: '0.14em', color: C2_PALETTE.paper,
        textTransform: 'uppercase', zIndex: 1,
      }}>★ NEW</div>

      <div style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ fontFamily: C2_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: C2_PALETTE.orange, marginBottom: 14 }}>
          DIRECTION C · VITRINE NÉO
        </div>
        <h1 style={{
          fontFamily: C2_FONTS.display, fontSize: 88, fontWeight: 700, color: C2_PALETTE.ink,
          margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em', maxWidth: 600,
        }}>
          Vitrine<br />
          <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.orange }}>Néo.</em>
        </h1>
        <p style={{ fontSize: 15, color: C2_PALETTE.inkSoft, marginTop: 16, maxWidth: 480, lineHeight: 1.55 }}>
          L'évolution mature de votre site Webflow actuel. On garde l'énergie « creative agency » (orange signature, formes graphiques, boldness) mais on assagit le chaos. Bricolage Grotesque + Geist + Instrument Serif pour les accents italiques.
        </p>
      </div>

      <div style={{ marginTop: 28, marginBottom: 24 }}>
        <div style={{ fontFamily: C2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C2_PALETTE.inkSoft, marginBottom: 12 }}>
          01 / Palette
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
          {[
            { name: 'Encre', hex: '#161210', bg: C2_PALETTE.ink, fg: C2_PALETTE.paper },
            { name: 'Paper', hex: '#fbf6ef', bg: C2_PALETTE.paper, fg: C2_PALETTE.ink, border: true },
            { name: 'Orange ★', hex: '#ff5c2c', bg: C2_PALETTE.orange, fg: '#fff' },
            { name: 'Bleu prof.', hex: '#1d2bbf', bg: C2_PALETTE.blueDeep, fg: '#fff' },
            { name: 'Forêt', hex: '#1f3528', bg: C2_PALETTE.forest, fg: C2_PALETTE.paper },
          ].map((c) => (
            <div key={c.name} style={{
              height: 88, background: c.bg, color: c.fg, borderRadius: 12,
              border: c.border ? `1px solid ${C2_PALETTE.line}` : 'none',
              padding: 12, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}>
              <div style={{ fontFamily: C2_FONTS.display, fontWeight: 600, fontSize: 14, lineHeight: 1 }}>{c.name}</div>
              <div style={{ fontFamily: C2_FONTS.mono, fontSize: 10 }}>{c.hex}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: C2_FONTS.sans, fontSize: 11, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: C2_PALETTE.inkSoft, marginBottom: 12 }}>
          02 / Type
        </div>
        <div style={{ background: C2_PALETTE.cream, borderRadius: 16, padding: '22px 28px' }}>
          <div style={{ fontFamily: C2_FONTS.display, fontSize: 56, fontWeight: 700, color: C2_PALETTE.ink, lineHeight: 0.95, letterSpacing: '-0.035em' }}>
            Le digital,<br />
            <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.orange }}>fait main.</em>
          </div>
          <div style={{ fontFamily: C2_FONTS.sans, fontSize: 14.5, color: C2_PALETTE.inkSoft, lineHeight: 1.55, marginTop: 14 }}>
            Une agence digitale française. Web, mobile, automatisation, marketing. On vous accompagne du brief au déploiement.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
        <button style={{
          padding: '13px 22px', background: C2_PALETTE.ink, color: C2_PALETTE.paper,
          border: 'none', borderRadius: 999, fontFamily: C2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>Démarrer →</button>
        <button style={{
          padding: '13px 22px', background: C2_PALETTE.orange, color: '#fff',
          border: 'none', borderRadius: 999, fontFamily: C2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
        }}>Voir le showroom</button>
        <button style={{
          padding: '13px 22px', background: 'transparent', color: C2_PALETTE.ink,
          border: `1.5px solid ${C2_PALETTE.ink}`, borderRadius: 999, fontFamily: C2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
        }}>Notre approche</button>
      </div>
    </div>
  );
}

function DirC2_Hero() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      fontFamily: C2_FONTS.sans, background: C2_PALETTE.paper,
    }}>
      {/* Nav */}
      <div style={{
        padding: '24px 56px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: C2_PALETTE.orange,
          }} />
          <span style={{ fontFamily: C2_FONTS.display, fontWeight: 700, fontSize: 20, color: C2_PALETTE.ink, letterSpacing: '-0.02em' }}>
            LaunchPad <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.orange }}>Factory</em>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 28, color: C2_PALETTE.ink, fontSize: 14, fontWeight: 500, alignItems: 'center' }}>
          <span>Showroom</span><span>Pratiques</span><span>Carnet</span><span>Contact</span>
          <button style={{
            padding: '10px 18px', background: C2_PALETTE.ink, color: C2_PALETTE.paper,
            border: 'none', borderRadius: 999, fontWeight: 600, fontSize: 13, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>Démarrer →</button>
        </div>
      </div>

      <div style={{ padding: '32px 56px 0', position: 'relative' }}>
        {/* Big orange disc behind title */}
        <div style={{
          position: 'absolute', top: 60, right: 56,
          width: 380, height: 380, borderRadius: '50%',
          background: C2_PALETTE.orange, zIndex: 0,
        }} />
        {/* "★ NEW" sticker on disc */}
        <div style={{
          position: 'absolute', top: 90, right: 220,
          padding: '6px 12px', background: C2_PALETTE.ink, color: C2_PALETTE.paper,
          fontFamily: C2_FONTS.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
          transform: 'rotate(-8deg)', borderRadius: 4, zIndex: 2,
        }}>★ Showroom v2</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '6px 14px', borderRadius: 999, background: C2_PALETTE.cream, border: `1px solid ${C2_PALETTE.line}`, fontFamily: C2_FONTS.mono, fontSize: 11, letterSpacing: '0.14em', color: C2_PALETTE.orange, marginBottom: 28, textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C2_PALETTE.orange }} />
            Agence digitale · France
          </div>

          <h1 style={{
            fontFamily: C2_FONTS.display, fontWeight: 700, color: C2_PALETTE.ink,
            fontSize: 164, lineHeight: 0.85, letterSpacing: '-0.05em', margin: '0 0 24px',
            maxWidth: 980,
          }}>
            Le digital,<br />
            <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.paper }}>fait main</em>
            <span style={{ color: C2_PALETTE.paper }}>.</span>
          </h1>

          <div style={{
            display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end',
            paddingBottom: 32,
          }}>
            <div>
              <p style={{
                fontFamily: C2_FONTS.sans, fontSize: 19, lineHeight: 1.55, color: C2_PALETTE.ink,
                maxWidth: 540, margin: '0 0 28px', fontWeight: 500,
              }}>
                On conçoit, on développe, on déploie.<br />
                <span style={{ color: C2_PALETTE.inkSoft, fontWeight: 400 }}>
                  Web, mobile, automatisation, marketing — pour les marques qui veulent reprendre la main sur leur outil.
                </span>
              </p>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                <button style={{
                  padding: '14px 24px', background: C2_PALETTE.ink, color: C2_PALETTE.paper,
                  border: 'none', borderRadius: 999, fontFamily: C2_FONTS.sans, fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>Réserver un appel →</button>
                <button style={{
                  padding: '14px 24px', background: C2_PALETTE.paper, color: C2_PALETTE.ink,
                  border: `1.5px solid ${C2_PALETTE.ink}`, borderRadius: 999, fontFamily: C2_FONTS.sans, fontWeight: 500, fontSize: 14, cursor: 'pointer',
                }}>Voir le showroom</button>
              </div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
              borderTop: `1.5px solid ${C2_PALETTE.ink}`, borderBottom: `1.5px solid ${C2_PALETTE.ink}`,
            }}>
              {[
                { n: '+50', l: 'projets livrés' },
                { n: '03', l: 'apps publiées' },
                { n: '24h', l: '1er retour' },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: '18px 16px',
                  borderLeft: i > 0 ? `1px solid ${C2_PALETTE.line}` : 'none',
                }}>
                  <div style={{ fontFamily: C2_FONTS.display, fontWeight: 700, fontSize: 48, color: C2_PALETTE.ink, lineHeight: 1, letterSpacing: '-0.035em' }}>
                    {s.n}
                  </div>
                  <div style={{ fontFamily: C2_FONTS.mono, fontSize: 10, color: C2_PALETTE.inkSoft, marginTop: 8, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
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

function DirC2_Cards() {
  const works = [
    { tag: 'WEB · CASE №01', title: 'Traceo App', body: 'Application mobile DLC pour épiceries fines. Conception, dev, MAJ.', bg: C2_PALETTE.orange, fg: '#fff' },
    { tag: 'WEB · CASE №02', title: 'E-commerce headless', body: 'Boutique en ligne raccordée à la caisse physique. Stack maison.', bg: C2_PALETTE.blueDeep, fg: '#fff' },
    { tag: 'OPS · CASE №03', title: 'Pipeline marketing', body: 'Newsletter, GMB, social. Tout automatisé. Tableau de bord unique.', bg: C2_PALETTE.forest, fg: C2_PALETTE.paper },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: C2_PALETTE.paper, fontFamily: C2_FONTS.sans,
      padding: '48px 56px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36 }}>
        <div>
          <div style={{ fontFamily: C2_FONTS.mono, fontSize: 11, letterSpacing: '0.18em', color: C2_PALETTE.orange, marginBottom: 14, textTransform: 'uppercase' }}>
            § Showroom · §03
          </div>
          <h2 style={{
            fontFamily: C2_FONTS.display, fontSize: 76, fontWeight: 700, color: C2_PALETTE.ink,
            margin: 0, lineHeight: 0.92, letterSpacing: '-0.04em',
          }}>
            Trois preuves <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.orange }}>récentes.</em>
          </h2>
        </div>
        <button style={{
          padding: '10px 18px', background: 'transparent', color: C2_PALETTE.ink,
          border: `1.5px solid ${C2_PALETTE.ink}`, borderRadius: 999, fontFamily: C2_FONTS.sans, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>+12 projets →</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {works.map((w, i) => (
          <div key={w.tag} style={{
            borderRadius: 20, overflow: 'hidden',
            display: 'flex', flexDirection: 'column', position: 'relative',
            transform: i === 1 ? 'translateY(-8px)' : 'none',
            transition: 'all 250ms ease',
          }}>
            <div style={{
              aspectRatio: '4 / 3',
              background: w.bg, color: w.fg,
              position: 'relative',
              backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 24px)`,
            }}>
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)',
                color: '#fff', fontFamily: C2_FONTS.mono, fontSize: 10, letterSpacing: '0.12em',
                padding: '4px 10px', textTransform: 'uppercase', borderRadius: 999,
              }}>{w.tag}</div>
              {/* Logo placeholder centered */}
              <div style={{
                position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                fontFamily: C2_FONTS.display, fontWeight: 700, fontSize: 56, color: w.fg,
                opacity: 0.4, letterSpacing: '-0.04em',
              }}>{w.title.split(' ')[0]}</div>
              {i === 1 && (
                <div style={{
                  position: 'absolute', bottom: 14, right: 14,
                  background: C2_PALETTE.paper, color: C2_PALETTE.ink,
                  fontFamily: C2_FONTS.sans, fontWeight: 600, fontSize: 12,
                  padding: '6px 12px', borderRadius: 999,
                }}>★ Case study →</div>
              )}
            </div>
            <div style={{ padding: '22px 24px 24px', background: C2_PALETTE.cream, display: 'flex', flexDirection: 'column', flex: 1 }}>
              <h3 style={{
                fontFamily: C2_FONTS.display, fontWeight: 700, fontSize: 28, color: C2_PALETTE.ink,
                margin: '0 0 10px', lineHeight: 1.0, letterSpacing: '-0.025em',
              }}>{w.title}</h3>
              <p style={{
                color: C2_PALETTE.inkSoft, fontSize: 14, lineHeight: 1.55, margin: 0, flex: 1,
              }}>{w.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DirC2_Pattern() {
  const problems = [
    { n: '01', title: 'Un site qui n\'apporte rien', body: 'Vitrine figée, parcours qui ne convertit pas — un site qui occupe l\'URL sans jouer son rôle.' },
    { n: '02', title: 'Des outils dispersés', body: 'Caisse, e-commerce, CRM, compta. La même donnée saisie trois fois par jour.' },
    { n: '03', title: 'Pas de visibilité data', body: 'Vous décidez au feeling. Vous ne savez pas ce qui marche, où mettre l\'effort.' },
    { n: '04', title: 'Pas d\'équipe digitale', body: 'Personne en interne pour bouger vite. Tout passe par un prestataire à deux semaines.' },
  ];
  return (
    <div style={{
      width: '100%', height: '100%',
      background: C2_PALETTE.ink, color: C2_PALETTE.paper,
      fontFamily: C2_FONTS.sans, padding: '48px 56px',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, position: 'relative', overflow: 'hidden',
    }}>
      {/* Big orange disc bottom-left */}
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 320, height: 320, borderRadius: '50%',
        background: C2_PALETTE.orange, opacity: 0.95,
      }} />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: C2_FONTS.mono, fontSize: 11, color: C2_PALETTE.orange, letterSpacing: '0.12em', textTransform: 'uppercase', paddingBottom: 18, borderBottom: `1px solid rgba(251,246,239,0.16)`, marginBottom: 32 }}>
          <span>§ Le constat</span>
          <span>02 / 04</span>
        </div>
        <h2 style={{
          fontFamily: C2_FONTS.display, fontSize: 92, fontWeight: 700, color: C2_PALETTE.paper,
          margin: '0 0 24px', lineHeight: 0.88, letterSpacing: '-0.04em',
        }}>
          Vous vous<br />
          <em style={{ fontFamily: C2_FONTS.serif, fontWeight: 400, fontStyle: 'italic', color: C2_PALETTE.orange }}>reconnaissez ?</em>
        </h2>
        <p style={{
          color: 'rgba(251,246,239,0.72)', fontSize: 16, lineHeight: 1.55,
          maxWidth: 380, margin: 0,
        }}>
          Quatre symptômes qui reviennent chez 9 PME sur 10. Le digital n'a pas suivi le rythme du business.
        </p>
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        {problems.map((p, i) => (
          <div key={p.n} style={{
            display: 'grid', gridTemplateColumns: '60px 1fr',
            padding: '18px 0', borderTop: `1px solid rgba(251,246,239,0.16)`,
            borderBottom: i === problems.length - 1 ? `1px solid rgba(251,246,239,0.16)` : 'none',
            alignItems: 'baseline', gap: 20,
          }}>
            <div style={{
              fontFamily: C2_FONTS.mono, fontSize: 13, color: C2_PALETTE.orange,
              letterSpacing: '0.06em',
            }}>{p.n} /</div>
            <div>
              <h3 style={{
                fontFamily: C2_FONTS.display, fontWeight: 700, fontSize: 28, color: C2_PALETTE.paper,
                margin: '0 0 6px', lineHeight: 1.05, letterSpacing: '-0.025em',
              }}>{p.title}</h3>
              <p style={{
                color: 'rgba(251,246,239,0.7)', fontSize: 14.5, lineHeight: 1.55, margin: 0,
              }}>{p.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { DirC2_Identity, DirC2_Hero, DirC2_Cards, DirC2_Pattern });
