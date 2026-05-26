// ═══════════════════════════════════════════════════════════════
//  DS · PATTERNS — composed blocks (used in templates)
// ═══════════════════════════════════════════════════════════════

// ─── Section Head ────────────────────────────────────────────
function SectionHead({ eyebrow, eyebrowTone = 'orange', title, italic, lead, align = 'left', size = 'md', counter }) {
  const sizes = {
    sm: { font: 36, lh: 1.0 },
    md: { font: 56, lh: 0.95 },
    lg: { font: 76, lh: 0.9 },
    xl: { font: 92, lh: 0.88 },
  };
  const s = sizes[size];
  return (
    <header style={{
      textAlign: align,
      maxWidth: align === 'center' ? 880 : 'none',
      margin: align === 'center' ? '0 auto' : 0,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        {eyebrow && <Eyebrow tone={eyebrowTone}>{eyebrow}</Eyebrow>}
        {counter && <span style={{
          fontFamily: DS.font.mono, fontSize: 11, letterSpacing: '0.14em',
          color: DS.color.inkSoft, textTransform: 'uppercase',
        }}>{counter}</span>}
      </div>
      <h2 style={{
        fontFamily: DS.font.display, fontWeight: 700,
        fontSize: s.font, lineHeight: s.lh, letterSpacing: '-0.035em',
        color: 'inherit', margin: 0,
      }}>
        {title}{italic && <> <em style={{
          fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic',
          color: eyebrowTone === 'olive' ? DS.color.olive : DS.color.orange,
        }}>{italic}</em></>}
      </h2>
      {lead && <p style={{
        marginTop: 20, fontSize: 18, lineHeight: 1.55,
        color: 'currentColor', opacity: 0.7, maxWidth: 640,
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}>{lead}</p>}
    </header>
  );
}

// ─── Hero · Agence (typographique XXL + disque) ─────────────
function HeroAgence({ kicker = 'Agence digitale · France', title1 = 'Le digital,', title2 = 'fait main', sub, ctaPrimary = 'Réserver un appel', ctaSecondary = 'Voir le showroom', stats }) {
  return (
    <section style={{
      background: DS.color.paper, padding: '32px 56px 64px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative disc */}
      <div style={{
        position: 'absolute', top: 80, right: 56,
        width: 380, height: 380, borderRadius: '50%',
        background: DS.color.orange, zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: 110, right: 220,
        padding: '6px 12px', background: DS.color.ink, color: DS.color.paper,
        fontFamily: DS.font.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        transform: 'rotate(-8deg)', borderRadius: 4, zIndex: 2,
      }}>★ Showroom v2</div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Badge tone="orange" dot style={{ marginBottom: 28 }}>{kicker}</Badge>
        <h1 style={{
          fontFamily: DS.font.display, fontWeight: 700, color: DS.color.ink,
          fontSize: 156, lineHeight: 0.85, letterSpacing: '-0.05em', margin: '0 0 24px',
        }}>
          {title1}<br />
          <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.paper }}>{title2}</em>
          <span style={{ color: DS.color.paper }}>.</span>
        </h1>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end',
        }}>
          <div>
            {sub && <p style={{
              fontFamily: DS.font.sans, fontSize: 19, lineHeight: 1.55, color: DS.color.ink,
              maxWidth: 540, margin: '0 0 28px', fontWeight: 500,
            }}>{sub}</p>}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="primary" size="lg" trailing="→">{ctaPrimary}</Button>
              <Button variant="secondary" size="lg">{ctaSecondary}</Button>
            </div>
          </div>
          {stats && <StatGrid items={stats} />}
        </div>
      </div>
    </section>
  );
}

// ─── Hero · Épicerie (photo + accent olive) ─────────────────
function HeroEpicerie({ kicker, title1, title2, sub, ctaPrimary, ctaSecondary, stats }) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden', color: DS.color.paper,
      padding: '32px 56px 64px', minHeight: 600,
    }}>
      {/* Photo background placeholder */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        background: `
          repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 24px),
          linear-gradient(160deg, ${DS.color.oliveDeep} 0%, #2a3520 100%)
        `,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: `linear-gradient(90deg, rgba(22,18,16,0.78) 0%, rgba(22,18,16,0.45) 60%, rgba(22,18,16,0.20) 100%)`,
      }} />
      <div style={{
        position: 'absolute', right: 32, top: 32, zIndex: 2,
        fontFamily: DS.font.mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(251,246,239,0.5)',
      }}>[ photo · rayonnage d'épicerie fine ]</div>

      <div style={{ position: 'relative', zIndex: 2, paddingTop: 32 }}>
        <Badge tone="olive" filled dot style={{ marginBottom: 28 }}>{kicker || 'Vertical · Épiceries fines'}</Badge>
        <h1 style={{
          fontFamily: DS.font.display, fontWeight: 700, color: DS.color.paper,
          fontSize: 124, lineHeight: 0.88, letterSpacing: '-0.045em', margin: '0 0 24px',
          maxWidth: 900,
        }}>
          {title1 || 'L\'agence qui parle'}<br />
          <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.oliveSoft }}>
            {title2 || 'le langage du goût.'}
          </em>
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end', maxWidth: 1200 }}>
          <div>
            {sub && <p style={{
              fontSize: 19, lineHeight: 1.55, color: 'rgba(251,246,239,0.92)',
              maxWidth: 540, margin: '0 0 28px',
            }}>{sub}</p>}
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Button variant="accent" tone="olive" size="lg" trailing="→">{ctaPrimary || 'Réserver un appel'}</Button>
              <Button variant="secondary" mode="dark" size="lg">{ctaSecondary || 'Télécharger le guide'}</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stat Grid ───────────────────────────────────────────────
function StatGrid({ items, mode = 'light', tone = 'orange' }) {
  const accent = tone === 'olive' ? DS.color.olive : DS.color.orange;
  const ink = mode === 'dark' ? DS.color.paper : DS.color.ink;
  const line = mode === 'dark' ? DS.color.inkLine : DS.color.ink;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      borderTop: `1.5px solid ${line}`, borderBottom: `1.5px solid ${line}`,
    }}>
      {items.map((s, i) => (
        <div key={i} style={{
          padding: '18px 16px',
          borderLeft: i > 0 ? `1px solid ${mode === 'dark' ? DS.color.inkLine : DS.color.line}` : 'none',
        }}>
          <div style={{
            fontFamily: DS.font.display, fontWeight: 700, fontSize: 48,
            color: ink, lineHeight: 1, letterSpacing: '-0.035em',
          }}>
            {s.n}
          </div>
          <div style={{
            fontFamily: DS.font.mono, fontSize: 10, color: accent,
            marginTop: 8, letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Showroom Card (project) ────────────────────────────────
function ShowroomCard({ tag, title, body, color, fg = '#fff', emphasis = false, cta = 'Case study →' }) {
  return (
    <div style={{
      borderRadius: DS.radius.xl, overflow: 'hidden',
      display: 'flex', flexDirection: 'column', position: 'relative',
      transform: emphasis ? 'translateY(-8px)' : 'none',
      transition: `all ${DS.motion.base}`,
      boxShadow: emphasis ? DS.shadow.md : 'none',
    }}>
      <div style={{
        aspectRatio: '4 / 3', position: 'relative',
        background: color, color: fg,
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 24px)`,
      }}>
        <Tag style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(6px)',
          color: '#fff', border: 'none',
        }}>{tag}</Tag>
        <div style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 64, color: fg,
          opacity: 0.35, letterSpacing: '-0.04em',
        }}>{(title.split(' ')[0] || '').slice(0, 8)}</div>
        {emphasis && (
          <Badge tone="cream" filled style={{
            position: 'absolute', bottom: 14, right: 14,
            background: DS.color.paper, color: DS.color.ink,
            fontFamily: DS.font.sans, fontWeight: 600, fontSize: 12, textTransform: 'none', letterSpacing: 0,
            padding: '6px 12px',
          }}>{cta}</Badge>
        )}
      </div>
      <div style={{ padding: '22px 24px', background: DS.color.cream, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 28, color: DS.color.ink,
          margin: '0 0 10px', lineHeight: 1.0, letterSpacing: '-0.025em',
        }}>{title}</h3>
        <p style={{
          color: DS.color.inkSoft, fontSize: 14, lineHeight: 1.55, margin: 0, flex: 1,
        }}>{body}</p>
      </div>
    </div>
  );
}

// ─── Service Card (smaller, icon-led) ───────────────────────
function ServiceCard({ glyph, tag, title, body, tone = 'orange' }) {
  const accent = tone === 'olive' ? DS.color.olive : DS.color.orange;
  return (
    <div style={{
      background: DS.color.paper, borderRadius: DS.radius.xl, padding: '32px 26px',
      border: `1px solid ${DS.color.line}`,
      display: 'flex', flexDirection: 'column',
      transition: `all ${DS.motion.base}`,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: DS.radius.md, background: DS.color.ink,
        color: accent, display: 'grid', placeItems: 'center',
        fontFamily: DS.font.serif, fontStyle: 'italic', fontSize: 26, fontWeight: 400, marginBottom: 22,
      }}>{glyph}</div>
      <Tag style={{ marginBottom: 10, alignSelf: 'flex-start' }}>{tag}</Tag>
      <h3 style={{
        fontFamily: DS.font.display, fontWeight: 700, fontSize: 22, color: DS.color.ink,
        margin: '0 0 10px', lineHeight: 1.15, letterSpacing: '-0.02em',
      }}>{title}</h3>
      <p style={{
        color: DS.color.inkSoft, fontSize: 14.5, lineHeight: 1.55, margin: 0, flex: 1,
      }}>{body}</p>
      <div style={{
        marginTop: 20, color: accent, fontWeight: 600, fontSize: 14,
        display: 'inline-flex', alignItems: 'center', gap: 6, alignSelf: 'flex-start',
      }}>Voir en détail →</div>
    </div>
  );
}

// ─── Article Card ───────────────────────────────────────────
function ArticleCard({ tag, title, lead, date, readTime, color = DS.color.olive, fg = '#fff' }) {
  return (
    <article style={{
      borderRadius: DS.radius.lg, overflow: 'hidden',
      background: DS.color.paper, border: `1px solid ${DS.color.line}`,
      display: 'flex', flexDirection: 'column',
      transition: `all ${DS.motion.base}`,
    }}>
      <div style={{
        aspectRatio: '16 / 10', background: color, color: fg,
        position: 'relative',
        backgroundImage: `repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 6px, transparent 6px 18px)`,
      }}>
        <Tag style={{
          position: 'absolute', top: 14, left: 14,
          background: 'rgba(0,0,0,0.3)', color: '#fff', border: 'none',
        }}>{tag}</Tag>
      </div>
      <div style={{ padding: '20px 22px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <h3 style={{
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 20, color: DS.color.ink,
          lineHeight: 1.2, letterSpacing: '-0.018em', margin: 0,
        }}>{title}</h3>
        <p style={{ color: DS.color.inkSoft, fontSize: 14, lineHeight: 1.55, margin: 0 }}>{lead}</p>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: 8, paddingTop: 14, borderTop: `1px solid ${DS.color.line}`,
          fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkMute, letterSpacing: '0.08em', textTransform: 'uppercase',
        }}>
          <span>{date}</span>
          <span>{readTime} de lecture</span>
        </div>
      </div>
    </article>
  );
}

// ─── Constat (problem list) ─────────────────────────────────
function ConstatBlock({ tone = 'orange', items, title = 'Vous vous', titleItalic = 'reconnaissez ?', lead, ctaLabel }) {
  const accent = tone === 'olive' ? DS.color.olive : DS.color.orange;
  return (
    <section style={{
      background: DS.color.ink, color: DS.color.paper,
      padding: '72px 56px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: -100, left: -100,
        width: 320, height: 320, borderRadius: '50%',
        background: accent, opacity: 0.95,
      }} />
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
        position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Eyebrow tone={tone} style={{ marginBottom: 16, color: accent }}>§ Le constat</Eyebrow>
          <h2 style={{
            fontFamily: DS.font.display, fontSize: 84, fontWeight: 700, color: DS.color.paper,
            margin: '0 0 24px', lineHeight: 0.88, letterSpacing: '-0.04em',
          }}>
            {title}<br />
            <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: accent }}>{titleItalic}</em>
          </h2>
          {lead && <p style={{ color: 'rgba(251,246,239,0.7)', fontSize: 16, lineHeight: 1.55, maxWidth: 400, margin: 0 }}>{lead}</p>}
          {ctaLabel && (
            <div style={{ marginTop: 24 }}>
              <Button variant="accent" tone={tone} size="md" trailing="→">{ctaLabel}</Button>
            </div>
          )}
        </div>
        <div>
          {items.map((p, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '60px 1fr',
              padding: '18px 0', borderTop: `1px solid rgba(251,246,239,0.16)`,
              borderBottom: i === items.length - 1 ? `1px solid rgba(251,246,239,0.16)` : 'none',
              alignItems: 'baseline', gap: 20,
            }}>
              <div style={{
                fontFamily: DS.font.mono, fontSize: 13, color: accent, letterSpacing: '0.06em',
              }}>{String(i + 1).padStart(2, '0')} /</div>
              <div>
                <h3 style={{
                  fontFamily: DS.font.display, fontWeight: 700, fontSize: 26, color: DS.color.paper,
                  margin: '0 0 6px', lineHeight: 1.1, letterSpacing: '-0.022em',
                }}>{p.title}</h3>
                <p style={{ color: 'rgba(251,246,239,0.7)', fontSize: 14.5, lineHeight: 1.55, margin: 0 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Block ──────────────────────────────────────────────
function CtaBlock({ tone = 'orange', title, italic, lead, primary, secondary }) {
  const accent = tone === 'olive' ? DS.color.olive : DS.color.orange;
  return (
    <section style={{
      background: DS.color.cream, padding: '88px 56px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 280, height: 280, borderRadius: '50%',
        background: accent, opacity: 0.95,
      }} />
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: 760,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      }}>
        <Eyebrow tone={tone} style={{ marginBottom: 16 }}>★ On y va ?</Eyebrow>
        <h2 style={{
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 64, color: DS.color.ink,
          margin: '0 0 20px', lineHeight: 0.95, letterSpacing: '-0.035em',
        }}>
          {title} <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: accent }}>{italic}</em>
        </h2>
        <p style={{ color: DS.color.inkSoft, fontSize: 18, lineHeight: 1.55, marginBottom: 28, maxWidth: 540 }}>{lead}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="primary" size="lg" trailing="→">{primary}</Button>
          {secondary && <Button variant="secondary" size="lg">{secondary}</Button>}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { SectionHead, HeroAgence, HeroEpicerie, StatGrid, ShowroomCard, ServiceCard, ArticleCard, ConstatBlock, CtaBlock });
