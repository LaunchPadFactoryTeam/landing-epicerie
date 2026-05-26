// ═══════════════════════════════════════════════════════════════
//  DS · DOC — the design system documentation page
//  Composes everything into a navigable single-scroll document.
// ═══════════════════════════════════════════════════════════════

// ─── Layout helpers ─────────────────────────────────────────
function DocSection({ id, num, eyebrow, title, italic, lead, children, dark }) {
  return (
    <section id={id} data-screen-label={`${num} ${eyebrow}`} style={{
      padding: '88px 56px 112px',
      background: dark ? DS.color.ink : 'transparent',
      color: dark ? DS.color.paper : DS.color.ink,
      borderTop: `1px solid ${dark ? DS.color.inkLine : DS.color.line}`,
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
          <Eyebrow tone={dark ? 'olive' : 'orange'}>§ {eyebrow}</Eyebrow>
          <span style={{
            fontFamily: DS.font.mono, fontSize: 11, letterSpacing: '0.14em',
            color: dark ? 'rgba(251,246,239,0.5)' : DS.color.inkSoft, textTransform: 'uppercase',
          }}>{num}</span>
        </div>
        <h2 style={{
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 64, lineHeight: 0.95,
          letterSpacing: '-0.035em', margin: '0 0 20px',
        }}>
          {title}{italic && <> <em style={{
            fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.orange,
          }}>{italic}</em></>}
        </h2>
        {lead && <p style={{
          fontSize: 19, lineHeight: 1.55, maxWidth: 700, marginBottom: 56,
          color: dark ? 'rgba(251,246,239,0.7)' : DS.color.inkSoft,
        }}>{lead}</p>}
        {children}
      </div>
    </section>
  );
}

function Specimen({ title, code, children, full, dark }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: full ? '1fr' : '1fr 280px', gap: 24,
      marginTop: 32, marginBottom: 32,
    }}>
      <div style={{
        background: dark ? DS.color.inkLift : DS.color.cream,
        borderRadius: DS.radius.lg, padding: 32, overflow: 'hidden',
        border: `1px solid ${dark ? DS.color.inkLine : DS.color.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 100,
      }}>
        {children}
      </div>
      {!full && (
        <aside style={{
          fontFamily: DS.font.mono, fontSize: 12,
          color: dark ? 'rgba(251,246,239,0.7)' : DS.color.inkSoft,
        }}>
          <div style={{
            fontFamily: DS.font.sans, fontWeight: 600, fontSize: 14,
            color: dark ? DS.color.paper : DS.color.ink, marginBottom: 6,
          }}>{title}</div>
          {code && <pre style={{
            margin: 0, padding: '12px 14px',
            background: dark ? 'rgba(0,0,0,0.3)' : DS.color.paper,
            borderRadius: DS.radius.md, border: `1px solid ${dark ? DS.color.inkLine : DS.color.line}`,
            fontSize: 11, lineHeight: 1.55, whiteSpace: 'pre-wrap',
            color: dark ? DS.color.paper : DS.color.ink,
          }}>{code}</pre>}
        </aside>
      )}
    </div>
  );
}

// ─── 01 · Brand & principes ──────────────────────────────────
function SecBrand() {
  return (
    <DocSection id="brand" num="01" eyebrow="Marque & principes" title="Le digital," italic="fait main."
      lead="Une agence digitale française. On conçoit, on développe, on déploie. Le DS qui suit n'est pas une charte de plus — c'est l'incarnation visuelle de cette promesse : ordonné, confiant, sans gimmick, avec juste ce qu'il faut de chaleur pour qu'on s'y attache.">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 32 }}>
        {[
          { title: 'Maîtrisé', body: 'Une grille stricte, une palette resserrée. Aucun élément n\'est là par accident — chaque chose justifie sa présence.' },
          { title: 'Confiant', body: 'Typographie XXL, beaucoup d\'air, des CTA assumés. On ne murmure pas, on dit ce qu\'on fait.' },
          { title: 'Tactile', body: 'Italiques de Instrument Serif, micro-interactions, marquees, accents chauds. Le digital, mais fait main.' },
        ].map((p, i) => (
          <div key={i} style={{
            padding: '32px 28px', background: DS.color.paper,
            border: `1px solid ${DS.color.line}`, borderRadius: DS.radius.lg,
          }}>
            <div style={{
              fontFamily: DS.font.serif, fontStyle: 'italic', fontSize: 36, fontWeight: 400,
              color: DS.color.orange, lineHeight: 1, marginBottom: 14,
            }}>0{i + 1}</div>
            <h3 style={{
              fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink,
              letterSpacing: '-0.015em', marginBottom: 8,
            }}>{p.title}</h3>
            <p style={{ color: DS.color.inkSoft, fontSize: 15, lineHeight: 1.55 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </DocSection>
  );
}

// ─── 02 · Color ───────────────────────────────────────────────
function SecColor() {
  const swatches = [
    { name: 'ink', hex: DS.color.ink, role: 'Texte principal · headlines · CTA primary', fg: DS.color.paper },
    { name: 'inkSoft', hex: DS.color.inkSoft, role: 'Texte secondaire · descriptions', fg: '#fff' },
    { name: 'paper', hex: DS.color.paper, role: 'Surface par défaut · light mode', fg: DS.color.ink, border: true },
    { name: 'cream', hex: DS.color.cream, role: 'Surface alternée · cards · sections', fg: DS.color.ink, border: true },
    { name: 'line', hex: 'rgba(22,18,16,0.12)', role: 'Bordures · separators', fg: DS.color.ink, border: true, demoBg: DS.color.paper },
  ];
  const primary = [
    { name: 'orange', hex: DS.color.orange, role: 'Accent agence · CTA · liens · badges', fg: '#fff' },
    { name: 'orangeDeep', hex: DS.color.orangeDeep, role: 'Hover / pressed', fg: '#fff' },
    { name: 'orangeSoft', hex: DS.color.orangeSoft, role: 'Surfaces douces · backgrounds', fg: DS.color.ink },
  ];
  const secondary = [
    { name: 'olive', hex: DS.color.olive, role: 'Accent épicerie · CTA · liens', fg: '#fff' },
    { name: 'oliveDeep', hex: DS.color.oliveDeep, role: 'Surface foncée épicerie', fg: '#fff' },
    { name: 'oliveSoft', hex: DS.color.oliveSoft, role: 'Surfaces douces · hover', fg: DS.color.ink },
  ];
  const swatchBlock = (s) => (
    <div key={s.name} style={{
      display: 'flex', flexDirection: 'column', borderRadius: DS.radius.md, overflow: 'hidden',
      border: s.border ? `1px solid ${DS.color.line}` : 'none',
    }}>
      <div style={{
        height: 88, background: s.demoBg || s.hex, color: s.fg, padding: 14,
        display: 'flex', alignItems: 'flex-end',
        borderBottom: s.demoBg ? `2px solid ${DS.color.ink}` : 'none',
      }}>
        {s.demoBg && <div style={{
          position: 'relative', width: '100%', height: 2, background: s.hex,
        }} />}
      </div>
      <div style={{ padding: '12px 14px', background: DS.color.paper }}>
        <div style={{ fontFamily: DS.font.sans, fontWeight: 600, fontSize: 14, color: DS.color.ink }}>{s.name}</div>
        <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, marginTop: 2 }}>{s.hex}</div>
        <div style={{ fontSize: 12, color: DS.color.inkSoft, marginTop: 6, lineHeight: 1.4 }}>{s.role}</div>
      </div>
    </div>
  );
  return (
    <DocSection id="color" num="02" eyebrow="Couleur" title="Une palette," italic="deux territoires."
      lead="Neutres communs aux deux sites. Orange signature pour l'agence, olive sauge en complément pour les épiceries fines. Pas de troisième accent à inventer — la déclinaison se fait sur ces deux axes.">

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 16, marginBottom: 18 }}>Neutres</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {swatches.map(swatchBlock)}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 8 }}>
        Accent primaire · <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.orange }}>agence</em>
      </h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 18 }}>Utilisé sur tout le site générique et sur le carnet d'articles. L'épicerie l'utilise en touches discrètes (links, soulignages) pour rester rattachée à l'agence mère.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {primary.map(swatchBlock)}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 8 }}>
        Accent secondaire · <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.olive }}>épiceries</em>
      </h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 18 }}>Utilisé exclusivement sur le vertical épiceries fines (launchpadfactory.fr). Remplace l'orange dans les CTAs, badges, et accents typographiques de ces pages.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {secondary.map(swatchBlock)}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 18 }}>
        Surfaces foncées
      </h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 18 }}>L'encre (#161210) sert de surface principale pour le footer, le bloc constat, et toute section qui doit "reposer" la lecture. Sur fond foncé, on utilise paper + accent au lieu de cream + ink.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { name: 'ink', hex: DS.color.ink, role: 'Surface foncée principale', fg: DS.color.paper },
          { name: 'inkLift', hex: DS.color.inkLift, role: 'Card sur fond foncé', fg: DS.color.paper },
          { name: 'forest', hex: DS.color.forest, role: 'Alternative dark · projets agence', fg: DS.color.paper },
        ].map(swatchBlock)}
      </div>
    </DocSection>
  );
}

// ─── 03 · Typography ─────────────────────────────────────────
function SecType() {
  return (
    <DocSection id="type" num="03" eyebrow="Typographie" title="Trois familles," italic="un seul langage."
      lead="Bricolage Grotesque pour les titres et l'interface, Instrument Serif italique pour les accents éditoriaux, Geist Mono pour les métadonnées. Geist en body. Toutes Google Fonts, toutes libres.">

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginTop: 32 }}>
        {[
          { name: 'Bricolage Grotesque', role: 'Display · titres · interface', sample: 'Le digital, fait main.', family: DS.font.display, weight: 700, size: 44, ls: '-0.035em' },
          { name: 'Instrument Serif', role: 'Accents italiques · éditorial', sample: 'fait main', family: DS.font.serif, weight: 400, italic: true, size: 56, ls: '-0.025em' },
          { name: 'Geist', role: 'Body · paragraphe · lead · CTA', sample: 'Une agence digitale française.', family: DS.font.sans, weight: 500, size: 22, ls: '0' },
          { name: 'Geist Mono', role: 'Métadonnées · tags · code · eyebrows', sample: '§ 03.21.04.2026 · WEB · CASE №01', family: DS.font.mono, weight: 500, size: 16, ls: '0.04em' },
        ].map((f, i) => (
          <div key={i} style={{
            padding: 24, background: DS.color.cream, borderRadius: DS.radius.lg,
            border: `1px solid ${DS.color.line}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
              <strong style={{ fontFamily: DS.font.sans, fontSize: 14, fontWeight: 600, color: DS.color.ink }}>{f.name}</strong>
              <span style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{f.role}</span>
            </div>
            <div style={{
              fontFamily: f.family, fontWeight: f.weight, fontSize: f.size,
              fontStyle: f.italic ? 'italic' : 'normal', letterSpacing: f.ls,
              color: DS.color.ink, lineHeight: 1, minHeight: 64,
            }}>{f.sample}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 18 }}>Échelle complète</h3>
      <div style={{
        background: DS.color.paper, borderRadius: DS.radius.lg,
        border: `1px solid ${DS.color.line}`, overflow: 'hidden',
      }}>
        {Object.entries(DS.type).map(([name, t], i, arr) => (
          <div key={name} style={{
            display: 'grid', gridTemplateColumns: '180px 1fr 160px',
            alignItems: 'baseline', gap: 24, padding: '16px 24px',
            borderBottom: i < arr.length - 1 ? `1px solid ${DS.color.line}` : 'none',
          }}>
            <div style={{ fontFamily: DS.font.mono, fontSize: 12, color: DS.color.inkSoft, letterSpacing: '0.06em' }}>{name}</div>
            <div style={{
              ...typeStyle(name),
              color: DS.color.ink,
              maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {t.upper ? 'le digital · fait main' : 'Le digital, fait main.'}
            </div>
            <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, textAlign: 'right' }}>
              {t.size}px / {t.lh} / {t.w}
            </div>
          </div>
        ))}
      </div>
    </DocSection>
  );
}

// ─── 04 · Layout · spacing · radii · shadows ─────────────────
function SecLayout() {
  return (
    <DocSection id="layout" num="04" eyebrow="Layout & finition" title="Échelle," italic="grille, finition.">
      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 16, marginBottom: 18 }}>Spacing</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 18 }}>Échelle de 4px. Padding, gap et margins se choisissent dans cette liste — pas de nombres ad-hoc.</p>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        {Object.entries(DS.space).map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{
              width: v, height: v, background: DS.color.orange, borderRadius: 4,
              minWidth: 4, minHeight: 4,
            }} />
            <div style={{ fontFamily: DS.font.mono, fontSize: 10, color: DS.color.inkSoft, marginTop: 6 }}>{k}</div>
            <div style={{ fontFamily: DS.font.mono, fontSize: 10, color: DS.color.ink, fontWeight: 600 }}>{v}px</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 18 }}>Rayons</h3>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.entries(DS.radius).map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{
              width: 88, height: 88, background: DS.color.cream,
              border: `1px solid ${DS.color.line}`, borderRadius: v,
            }} />
            <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, marginTop: 8 }}>{k}</div>
            <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.ink, fontWeight: 600 }}>{v}px</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 18 }}>Ombres</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {Object.entries(DS.shadow).filter(([k]) => k !== 'ring').map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center' }}>
            <div style={{
              width: '100%', height: 88, background: DS.color.paper,
              borderRadius: DS.radius.md, boxShadow: v,
            }} />
            <div style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, marginTop: 12 }}>shadow.{k}</div>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginTop: 56, marginBottom: 18 }}>Container & rythme</h3>
      <div style={{
        background: DS.color.paper, border: `1px solid ${DS.color.line}`, borderRadius: DS.radius.lg,
        padding: 32, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24,
      }}>
        {[
          { k: 'layout.container', v: '1240px', body: 'Largeur max du contenu sur grands écrans.' },
          { k: 'layout.containerNarrow', v: '880px', body: 'Article reader, formulaires, contenus longs.' },
          { k: 'layout.sectionY', v: 'clamp(72px, 9vw, 128px)', body: 'Padding vertical d\'une section. Fluide.' },
          { k: 'layout.columnGap', v: '24px', body: 'Gap par défaut entre colonnes de la grille.' },
        ].map(t => (
          <div key={t.k}>
            <div style={{ fontFamily: DS.font.mono, fontSize: 12, color: DS.color.orange, letterSpacing: '0.06em' }}>{t.k}</div>
            <div style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 28, color: DS.color.ink, letterSpacing: '-0.02em', marginTop: 4 }}>{t.v}</div>
            <p style={{ color: DS.color.inkSoft, fontSize: 14, marginTop: 6, lineHeight: 1.5 }}>{t.body}</p>
          </div>
        ))}
      </div>
    </DocSection>
  );
}

// ─── 05 · Buttons & inputs ───────────────────────────────────
function SecForms() {
  return (
    <DocSection id="forms" num="05" eyebrow="Boutons & formulaires" title="L'action," italic="à portée de pouce.">
      <Specimen title="Button · variants" code={`<Button variant="primary" size="md">…</Button>\n<Button variant="accent" tone="orange" />\n<Button variant="secondary" />\n<Button variant="ghost" />`}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="primary" trailing="→">Démarrer</Button>
          <Button variant="accent" tone="orange">Voir le showroom</Button>
          <Button variant="accent" tone="olive">Variante épicerie</Button>
          <Button variant="secondary">Notre approche</Button>
          <Button variant="ghost">Plus tard</Button>
        </div>
      </Specimen>

      <Specimen title="Button · sizes" code={`<Button size="sm" />\n<Button size="md" />\n<Button size="lg" />`}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button size="sm" trailing="→">Small</Button>
          <Button size="md" trailing="→">Medium</Button>
          <Button size="lg" trailing="→">Large</Button>
        </div>
      </Specimen>

      <Specimen title="Button · dark mode" code={`<Button mode="dark" />`} dark>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Button variant="primary" mode="dark" trailing="→">Démarrer</Button>
          <Button variant="accent" tone="orange" mode="dark">Showroom</Button>
          <Button variant="secondary" mode="dark">Approche</Button>
        </div>
      </Specimen>

      <Specimen title="Inputs · text, textarea" code={`<Input label="…" placeholder="…" hint="…" />\n<Textarea label="…" rows={4} />`} full>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, width: '100%', maxWidth: 720 }}>
          <Input label="Email professionnel" placeholder="vous@exemple.fr" hint="On ne spamme jamais. Désabonnement en 1 clic." />
          <Input label="Nom de votre boutique" placeholder="L'épicerie de…" />
          <Input label="Téléphone" placeholder="06 12 34 56 78" error="Format de téléphone non reconnu." />
          <Textarea label="Décrivez votre besoin" placeholder="On a un site mais on n'arrive pas à…" rows={3} />
        </div>
      </Specimen>
    </DocSection>
  );
}

// ─── 06 · Badges · eyebrows · tags · logo ────────────────────
function SecMarkers() {
  return (
    <DocSection id="markers" num="06" eyebrow="Marqueurs" title="Eyebrows," italic="badges, tags, logo.">

      <Specimen title="Logo · LaunchPad Factory" code={`<Logo size="md" variant="agence" />\n<Logo variant="epicerie" />\n<Logo mode="dark" />`} full>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap', width: '100%', justifyContent: 'space-between' }}>
          <Logo size="lg" variant="agence" />
          <Logo size="md" variant="epicerie" />
          <div style={{ background: DS.color.ink, padding: '16px 22px', borderRadius: DS.radius.md }}>
            <Logo size="md" mode="dark" />
          </div>
        </div>
      </Specimen>

      <Specimen title="Eyebrow · section labels" code={`<Eyebrow tone="orange" />\n<Eyebrow tone="olive" />`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Eyebrow tone="orange">§ Showroom · §03</Eyebrow>
          <Eyebrow tone="olive">§ Carnet · §05</Eyebrow>
          <Eyebrow tone="ink">§ Coulisses</Eyebrow>
        </div>
      </Specimen>

      <Specimen title="Badge · pill labels" code={`<Badge tone="orange" />\n<Badge tone="olive" filled />\n<Badge dot />`}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Badge tone="orange" dot>Agence digitale · France</Badge>
          <Badge tone="olive" filled dot>Vertical · Épiceries fines</Badge>
          <Badge tone="ink">★ Showroom v2</Badge>
          <Badge tone="success" dot>Disponible</Badge>
        </div>
      </Specimen>

      <Specimen title="Tag · neutre, métadonnée" code={`<Tag>WEB · CASE №01</Tag>`}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <Tag>WEB · CASE №01</Tag>
          <Tag>21.05.2026</Tag>
          <Tag>5 min de lecture</Tag>
          <Tag>Présence en ligne</Tag>
        </div>
      </Specimen>
    </DocSection>
  );
}

// ─── 07 · Navigation & footer ────────────────────────────────
function SecChrome() {
  return (
    <DocSection id="chrome" num="07" eyebrow="Chrome" title="Navigation," italic="footer.">
      <Specimen title="Header · variant agence" full>
        <div style={{ width: '100%' }}><Nav variant="agence" mode="light" /></div>
      </Specimen>
      <Specimen title="Header · variant épicerie" full>
        <div style={{ width: '100%' }}><Nav variant="epicerie" mode="light" /></div>
      </Specimen>
      <Specimen title="Header · dark mode" full>
        <div style={{ width: '100%' }}><Nav variant="agence" mode="dark" /></div>
      </Specimen>
      <Specimen title="Footer · agence" full>
        <div style={{ width: '100%' }}><Footer variant="agence" /></div>
      </Specimen>
    </DocSection>
  );
}

// ─── 08 · Patterns — Hero & section heads ────────────────────
function SecHero() {
  return (
    <DocSection id="hero" num="08" eyebrow="Patterns · Hero" title="Deux héros," italic="deux registres.">

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 8 }}>Hero · agence</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Typographie XXL, disque orange signature en fond, ticker de stats à droite. Pas de photo — la marque elle-même fait le show.</p>
      <Specimen full>
        <div style={{ width: '100%', transform: 'scale(0.55)', transformOrigin: 'top left', height: 530, marginBottom: -100 }}>
          <div style={{ width: 1280 }}>
            <HeroAgence
              sub="On conçoit, on développe, on déploie. Web, mobile, automatisation, marketing."
              stats={[{ n: '+50', l: 'projets' }, { n: '03', l: 'apps live' }, { n: '24h', l: '1er retour' }]}
            />
          </div>
        </div>
      </Specimen>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 8, marginTop: 32 }}>Hero · épicerie</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Photo en fond avec overlay sombre, accent olive, titre + sous-titre incarnés. L'imagerie remplace le bloc graphique — on parle d'un produit, pas d'une compétence.</p>
      <Specimen full>
        <div style={{ width: '100%', transform: 'scale(0.55)', transformOrigin: 'top left', height: 440, marginBottom: -100 }}>
          <div style={{ width: 1280 }}>
            <HeroEpicerie
              sub="On s'occupe de tout le digital pour accompagner votre croissance, afin que vous vous concentriez sur l'essentiel : conseiller, vendre, et faire grandir votre épicerie."
            />
          </div>
        </div>
      </Specimen>
    </DocSection>
  );
}

// ─── 09 · Patterns — Cards (showroom, service, article) ─────
function SecCards() {
  return (
    <DocSection id="cards" num="09" eyebrow="Patterns · Cards" title="Trois cartes," italic="trois usages.">

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14 }}>Showroom card</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Présentation de projets / case studies. Visuel coloré XL en haut, métadonnées en bas. La carte centrale d'une rangée de trois est mise en avant (translateY -8px, badge "Case study →" visible).</p>
      <Specimen full>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: '100%' }}>
          <ShowroomCard tag="WEB · CASE №01" title="Traceo App" body="Application mobile DLC pour épiceries fines." color={DS.color.orange} />
          <ShowroomCard tag="WEB · CASE №02" title="Boutique headless" body="E-commerce raccordé à la caisse physique." color={DS.color.blueDeep} emphasis />
          <ShowroomCard tag="OPS · CASE №03" title="Pipeline marketing" body="Newsletter, GMB, social — tout automatisé." color={DS.color.forest} fg={DS.color.paper} />
        </div>
      </Specimen>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14, marginTop: 32 }}>Service card</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Présentation des pratiques de l'agence. Icône glyph dans un carré ink, tag mono, titre + body court, lien "voir en détail" en bas.</p>
      <Specimen full>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, width: '100%' }}>
          <ServiceCard glyph="✦" tag="WEB" title="Sites & e-commerce" body="Vitrine ou boutique. Sur-mesure, performant." />
          <ServiceCard glyph="◆" tag="APP" title="Applications" body="Outils métier conçus avec vous." />
          <ServiceCard glyph="◐" tag="OPS" title="Automatisations" body="Vos outils reliés, vos données qui circulent." />
          <ServiceCard glyph="★" tag="GROWTH" title="Marketing digital" body="Newsletter, GMB, social, contenu." tone="olive" />
        </div>
      </Specimen>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14, marginTop: 32 }}>Article card</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Pour le carnet et les pages d'articles. Plus serrée, plus éditoriale.</p>
      <Specimen full>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, width: '100%' }}>
          <ArticleCard tag="GUIDE · 04" title="5 leviers pour activer votre LinkedIn d'épicerie" lead="Ce qu'on a appris en accompagnant 12 épiceries fines sur 6 mois." date="15.04.2026" readTime="8 min" color={DS.color.olive} />
          <ArticleCard tag="CASE STUDY" title="L'Épicerie Lebon × Traceo" lead="Le pas-à-pas, métriques à l'appui." date="02.04.2026" readTime="12 min" color={DS.color.oliveDeep} />
          <ArticleCard tag="OUTIL" title="Traceo · L'app DLC" lead="L'outil métier qu'on a construit avec vous." date="20.03.2026" readTime="5 min" color={DS.color.ink} fg={DS.color.oliveSoft} />
        </div>
      </Specimen>
    </DocSection>
  );
}

// ─── 10 · Patterns — Constat, CTA, Stats ────────────────────
function SecBlocks() {
  return (
    <DocSection id="blocks" num="10" eyebrow="Patterns · Blocs" title="Constat, CTA," italic="stats.">

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14 }}>Bloc « Le constat »</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Le moment où on parle aux problèmes du visiteur. Surface foncée, disque accent en bas-gauche, liste numérotée à droite.</p>
      <Specimen full>
        <div style={{ width: '100%', transform: 'scale(0.55)', transformOrigin: 'top left', height: 330, marginBottom: -50 }}>
          <div style={{ width: 1280 }}>
            <ConstatBlock items={[
              { title: 'Un site qui n\'apporte rien', body: 'Vitrine figée, parcours qui ne convertit pas.' },
              { title: 'Des outils dispersés', body: 'La même donnée saisie trois fois par jour.' },
              { title: 'Pas de visibilité data', body: 'Vous décidez au feeling.' },
              { title: 'Pas d\'équipe digitale', body: 'Tout passe par un prestataire à deux semaines.' },
            ]} lead="Quatre symptômes qui reviennent chez 9 PME sur 10." ctaLabel="Diagnostic gratuit" />
          </div>
        </div>
      </Specimen>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14, marginTop: 32 }}>Bloc CTA</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Le bloc d'appel à l'action de fin de page. Surface cream + disque accent. Titre + tagline italique + CTA primaire + secondaire.</p>
      <Specimen full>
        <div style={{ width: '100%', transform: 'scale(0.55)', transformOrigin: 'top left', height: 220, marginBottom: -40 }}>
          <div style={{ width: 1280 }}>
            <CtaBlock
              title="On se parle"
              italic="lundi prochain ?"
              lead="30 minutes pour comprendre votre situation, identifier le levier prioritaire, et voir si on peut vous accompagner."
              primary="Réserver l'appel"
              secondary="Recevoir une proposition par mail"
            />
          </div>
        </div>
      </Specimen>

      <h3 style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 24, color: DS.color.ink, letterSpacing: '-0.015em', marginBottom: 14, marginTop: 32 }}>Stat grid</h3>
      <p style={{ fontSize: 14, color: DS.color.inkSoft, marginBottom: 20 }}>Petite grille de chiffres-clés. Encadrée par deux lignes ink. Numérateur en Bricolage XXL, label en mono uppercase.</p>
      <Specimen full>
        <div style={{ width: 480, maxWidth: '100%' }}>
          <StatGrid items={[{ n: '+50', l: 'projets livrés' }, { n: '03', l: 'apps publiées' }, { n: '24h', l: '1er retour' }]} />
        </div>
      </Specimen>
    </DocSection>
  );
}

// ─── 11 · Templates — 3 full-page mocks ─────────────────────
function TemplateFrame({ title, sub, children, height = 2200, scale = 0.4 }) {
  return (
    <div style={{
      marginTop: 32, marginBottom: 32,
      borderRadius: DS.radius.xl, overflow: 'hidden',
      border: `1px solid ${DS.color.line}`, background: DS.color.cream,
    }}>
      <div style={{
        padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: `1px solid ${DS.color.line}`, background: DS.color.paper,
      }}>
        <div>
          <strong style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: 22, color: DS.color.ink, letterSpacing: '-0.015em' }}>{title}</strong>
          {sub && <span style={{ fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft, marginLeft: 14, letterSpacing: '0.08em', textTransform: 'uppercase' }}>· {sub}</span>}
        </div>
        <Tag>{Math.round(scale * 100)}% · preview</Tag>
      </div>
      <div style={{
        height: height * scale, overflow: 'hidden',
        background: DS.color.paper,
      }}>
        <div style={{
          width: 1280, transform: `scale(${scale})`, transformOrigin: 'top left',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function SecTemplates() {
  return (
    <DocSection id="templates" num="11" eyebrow="Templates" title="Trois pages," italic="un seul DS." dark
      lead="Les trois templates principaux, montés à partir des composants ci-dessus. Aucun token, aucune mesure n'est unique — tout est dans le DS.">

      <TemplateFrame title="Template 01 · Home Agence" sub="launchpadfactory.webflow.io v2" height={2900}>
        <TplHomeAgence />
      </TemplateFrame>

      <TemplateFrame title="Template 02 · Home Épicerie" sub="launchpadfactory.fr v2" height={2700}>
        <TplHomeEpicerie />
      </TemplateFrame>

      <TemplateFrame title="Template 03 · Article reader" sub="carnet · template d'article" height={3000}>
        <TplArticle />
      </TemplateFrame>
    </DocSection>
  );
}

// ─── Cover & table of contents ──────────────────────────────
function Cover() {
  const nav = [
    { id: 'brand', n: '01', t: 'Marque & principes' },
    { id: 'color', n: '02', t: 'Couleur' },
    { id: 'type', n: '03', t: 'Typographie' },
    { id: 'layout', n: '04', t: 'Layout & finition' },
    { id: 'forms', n: '05', t: 'Boutons & formulaires' },
    { id: 'markers', n: '06', t: 'Marqueurs' },
    { id: 'chrome', n: '07', t: 'Navigation & footer' },
    { id: 'hero', n: '08', t: 'Hero patterns' },
    { id: 'cards', n: '09', t: 'Cards' },
    { id: 'blocks', n: '10', t: 'Constat, CTA, stats' },
    { id: 'templates', n: '11', t: 'Templates' },
  ];
  return (
    <header style={{
      position: 'relative', overflow: 'hidden',
      background: DS.color.paper, padding: '64px 56px 96px',
      borderBottom: `1px solid ${DS.color.line}`,
    }} data-screen-label="00 Cover">
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 460, height: 460, borderRadius: '50%',
        background: DS.color.orange, opacity: 0.95, zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', top: 32, right: 320,
        padding: '6px 12px', background: DS.color.ink, color: DS.color.paper,
        fontFamily: DS.font.mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
        transform: 'rotate(-8deg)', borderRadius: 4, zIndex: 2,
      }}>★ Doc 03 · DS v1.0</div>

      <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 56 }}>
          <Logo size="md" />
          <span style={{
            fontFamily: DS.font.mono, fontSize: 11, color: DS.color.inkSoft,
            letterSpacing: '0.14em', textTransform: 'uppercase',
          }}>Design system · v1.0 · 21.05.2026</span>
        </div>

        <Badge tone="orange" dot style={{ marginBottom: 28 }}>★ Doc 03 · Design system unifié</Badge>

        <h1 style={{
          fontFamily: DS.font.display, fontWeight: 700, fontSize: 152, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: DS.color.ink, margin: '0 0 28px', maxWidth: 980,
        }}>
          Le digital,<br />
          <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.paper }}>fait main</em>
          <span style={{ color: DS.color.paper }}>.</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'end' }}>
          <p style={{
            fontFamily: DS.font.sans, fontSize: 21, lineHeight: 1.55, color: DS.color.ink,
            maxWidth: 600, margin: 0, fontWeight: 500,
          }}>
            Le design system unifié de LaunchPad Factory.<br />
            <span style={{ color: DS.color.inkSoft, fontWeight: 400 }}>
              Tokens, composants, patterns et templates. Une source de vérité commune au site agence et au vertical épiceries fines.
            </span>
          </p>
          {/* TOC mini */}
          <nav style={{
            border: `1.5px solid ${DS.color.ink}`, borderRadius: DS.radius.lg,
            padding: 20, background: DS.color.paper,
          }}>
            <div style={{
              fontFamily: DS.font.mono, fontSize: 11, color: DS.color.orange,
              letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 12,
            }}>§ Sommaire · 11 sections</div>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 18px' }}>
              {nav.map(item => (
                <li key={item.id}>
                  <a href={`#${item.id}`} style={{
                    display: 'flex', justifyContent: 'space-between', padding: '6px 0',
                    fontFamily: DS.font.sans, fontSize: 13, color: DS.color.ink,
                    textDecoration: 'none', borderBottom: `1px solid ${DS.color.line}`,
                  }}>
                    <span>{item.t}</span>
                    <span style={{ fontFamily: DS.font.mono, fontSize: 10, color: DS.color.inkSoft }}>{item.n}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

// ─── Sticky side nav ────────────────────────────────────────
function SideNav() {
  const nav = [
    { id: 'brand', n: '01', t: 'Marque' },
    { id: 'color', n: '02', t: 'Couleur' },
    { id: 'type', n: '03', t: 'Typographie' },
    { id: 'layout', n: '04', t: 'Layout' },
    { id: 'forms', n: '05', t: 'Boutons & inputs' },
    { id: 'markers', n: '06', t: 'Marqueurs' },
    { id: 'chrome', n: '07', t: 'Nav & footer' },
    { id: 'hero', n: '08', t: 'Hero' },
    { id: 'cards', n: '09', t: 'Cards' },
    { id: 'blocks', n: '10', t: 'Blocs' },
    { id: 'templates', n: '11', t: 'Templates' },
  ];
  return (
    <aside style={{
      position: 'fixed', top: 24, left: 24, zIndex: 50,
      width: 200, background: DS.color.paper,
      border: `1px solid ${DS.color.line}`, borderRadius: DS.radius.lg,
      padding: '16px 18px',
      boxShadow: DS.shadow.sm,
      fontFamily: DS.font.sans, fontSize: 13,
    }}>
      <div style={{
        fontFamily: DS.font.mono, fontSize: 10, color: DS.color.orange,
        letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8,
      }}>§ Sommaire</div>
      <nav>
        <ul style={{ display: 'flex', flexDirection: 'column' }}>
          {nav.map(item => (
            <li key={item.id}>
              <a href={`#${item.id}`} style={{
                display: 'flex', justifyContent: 'space-between', padding: '5px 0',
                color: DS.color.ink, textDecoration: 'none',
              }}>
                <span>{item.t}</span>
                <span style={{ fontFamily: DS.font.mono, fontSize: 10, color: DS.color.inkSoft }}>{item.n}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

// ─── Main ───────────────────────────────────────────────────
function DSDoc() {
  return (
    <div className="ds-reset" style={{ background: DS.color.paper, color: DS.color.ink, minHeight: '100vh' }}>
      <SideNav />
      <main style={{ marginLeft: 0 }}>
        <Cover />
        <SecBrand />
        <SecColor />
        <SecType />
        <SecLayout />
        <SecForms />
        <SecMarkers />
        <SecChrome />
        <SecHero />
        <SecCards />
        <SecBlocks />
        <SecTemplates />

        {/* Outro */}
        <footer style={{
          background: DS.color.ink, color: DS.color.paper, padding: '64px 56px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <Eyebrow tone="orange" style={{ marginBottom: 16 }}>§ Fin · DS v1.0</Eyebrow>
            <h2 style={{
              fontFamily: DS.font.display, fontWeight: 700, fontSize: 64, lineHeight: 0.95,
              letterSpacing: '-0.035em', marginBottom: 18,
            }}>
              Source de <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: DS.color.orange }}>vérité</em>.
            </h2>
            <p style={{ color: 'rgba(251,246,239,0.7)', fontSize: 18, lineHeight: 1.55, margin: 0 }}>
              Toutes les pages des deux sites se construisent à partir de ce document. Aucune valeur ad-hoc, aucune nouvelle couleur — si vous avez besoin de quelque chose qui n'est pas ici, on l'ajoute ici d'abord.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

Object.assign(window, { DSDoc });
