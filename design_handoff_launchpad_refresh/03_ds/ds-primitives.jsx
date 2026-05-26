// ═══════════════════════════════════════════════════════════════
//  DS · PRIMITIVES — atomic components
//  All consume window.DS; export to window for downstream files.
// ═══════════════════════════════════════════════════════════════

// ─── Logo / Wordmark ───────────────────────────────────────
function Logo({ size = 'md', variant = 'agence', mode = 'light', as = 'a', href = '#', ...rest }) {
  const sizes = {
    sm: { dot: 22, font: 18 },
    md: { dot: 28, font: 22 },
    lg: { dot: 36, font: 28 },
  };
  const s = sizes[size];
  const accent = variant === 'epicerie' ? DS.color.olive : DS.color.orange;
  const ink = mode === 'dark' ? DS.color.paper : DS.color.ink;
  const Tag = as;
  return (
    <Tag href={href} {...rest} style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      textDecoration: 'none', color: ink,
    }}>
      <span style={{ width: s.dot, height: s.dot, borderRadius: '50%', background: accent, display: 'inline-block' }} />
      <span style={{ fontFamily: DS.font.display, fontWeight: 700, fontSize: s.font, letterSpacing: '-0.02em' }}>
        LaunchPad <em style={{ fontFamily: DS.font.serif, fontWeight: 400, fontStyle: 'italic', color: accent }}>Factory</em>
      </span>
    </Tag>
  );
}

// ─── Eyebrow ─────────────────────────────────────────────────
function Eyebrow({ children, tone = 'orange', size = 'md', style }) {
  const c = tone === 'olive' ? DS.color.olive : tone === 'ink' ? DS.color.ink : DS.color.orange;
  const fs = size === 'sm' ? 10 : size === 'lg' ? 13 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      fontFamily: DS.font.mono, fontSize: fs, fontWeight: 500,
      letterSpacing: '0.18em', textTransform: 'uppercase', color: c,
      ...style,
    }}>
      <span style={{ width: 22, height: 1, background: 'currentColor' }} />
      {children}
    </span>
  );
}

// ─── Badge ────────────────────────────────────────────────────
function Badge({ children, tone = 'orange', filled = false, dot = false, style }) {
  const map = {
    orange:  { bg: DS.color.orangeTint, fg: DS.color.orangeDeep, fill: DS.color.orange, fillFg: '#fff' },
    olive:   { bg: DS.color.oliveTint,  fg: DS.color.oliveDeep,  fill: DS.color.olive,  fillFg: '#fff' },
    ink:     { bg: 'rgba(22,18,16,0.06)', fg: DS.color.ink, fill: DS.color.ink, fillFg: DS.color.paper },
    cream:   { bg: DS.color.cream, fg: DS.color.ink, fill: DS.color.cream, fillFg: DS.color.ink },
    success: { bg: 'rgba(47,122,58,0.10)', fg: DS.color.success, fill: DS.color.success, fillFg: '#fff' },
  };
  const c = map[tone] || map.orange;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: DS.radius.pill,
      background: filled ? c.fill : c.bg, color: filled ? c.fillFg : c.fg,
      fontFamily: DS.font.mono, fontSize: 11, fontWeight: 500,
      letterSpacing: '0.12em', textTransform: 'uppercase',
      ...style,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />}
      {children}
    </span>
  );
}

// ─── Tag (smaller, neutral) ────────────────────────────────
function Tag({ children, style }) {
  return (
    <span style={{
      display: 'inline-block', padding: '3px 8px',
      fontFamily: DS.font.mono, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: DS.color.inkSoft,
      border: `1px solid ${DS.color.line}`, borderRadius: DS.radius.sm,
      ...style,
    }}>{children}</span>
  );
}

// ─── Button ──────────────────────────────────────────────────
// variants: primary (ink), accent (orange/olive), secondary (paper outline), ghost
function Button({
  children, variant = 'primary', size = 'md', tone = 'orange',
  trailing, leading, mode = 'light', style, ...rest
}) {
  const sizes = {
    sm: { pad: '9px 16px', fs: 13, gap: 6 },
    md: { pad: '13px 22px', fs: 14, gap: 8 },
    lg: { pad: '16px 28px', fs: 16, gap: 10 },
  };
  const s = sizes[size];
  const accent = tone === 'olive' ? DS.color.olive : DS.color.orange;
  const accentFg = '#ffffff';

  let bg, fg, border = 'none';
  if (variant === 'primary') {
    bg = mode === 'dark' ? DS.color.paper : DS.color.ink;
    fg = mode === 'dark' ? DS.color.ink : DS.color.paper;
  } else if (variant === 'accent') {
    bg = accent; fg = accentFg;
  } else if (variant === 'secondary') {
    bg = 'transparent';
    fg = mode === 'dark' ? DS.color.paper : DS.color.ink;
    border = `1.5px solid ${mode === 'dark' ? 'rgba(251,246,239,0.3)' : DS.color.ink}`;
  } else if (variant === 'ghost') {
    bg = mode === 'dark' ? 'rgba(251,246,239,0.06)' : 'rgba(22,18,16,0.05)';
    fg = mode === 'dark' ? DS.color.paper : DS.color.ink;
  }

  return (
    <button {...rest} style={{
      display: 'inline-flex', alignItems: 'center', gap: s.gap,
      padding: s.pad, borderRadius: DS.radius.pill,
      fontFamily: DS.font.sans, fontWeight: 600, fontSize: s.fs,
      background: bg, color: fg, border,
      transition: `transform ${DS.motion.fast}, box-shadow ${DS.motion.base}, background ${DS.motion.base}`,
      cursor: 'pointer',
      ...style,
    }}>
      {leading}
      {children}
      {trailing}
    </button>
  );
}

// ─── Input ───────────────────────────────────────────────────
function Input({ label, hint, error, placeholder, type = 'text', value, style, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: DS.font.sans, ...style }}>
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: DS.color.ink }}>{label}</span>}
      <input type={type} placeholder={placeholder} defaultValue={value} {...rest} style={{
        padding: '12px 14px', fontFamily: DS.font.sans, fontSize: 15,
        background: DS.color.paper, border: `1.5px solid ${error ? DS.color.danger : DS.color.line}`,
        borderRadius: DS.radius.md, color: DS.color.ink,
        outline: 'none', transition: `border-color ${DS.motion.fast}, background ${DS.motion.fast}`,
      }} />
      {(hint || error) && (
        <span style={{ fontSize: 12, color: error ? DS.color.danger : DS.color.inkSoft }}>
          {error || hint}
        </span>
      )}
    </label>
  );
}

// ─── Textarea ────────────────────────────────────────────────
function Textarea({ label, hint, rows = 4, ...rest }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: DS.font.sans }}>
      {label && <span style={{ fontSize: 13, fontWeight: 600, color: DS.color.ink }}>{label}</span>}
      <textarea rows={rows} {...rest} style={{
        padding: '12px 14px', fontFamily: DS.font.sans, fontSize: 15,
        background: DS.color.paper, border: `1.5px solid ${DS.color.line}`,
        borderRadius: DS.radius.md, color: DS.color.ink, resize: 'vertical',
        outline: 'none', lineHeight: 1.5,
      }} />
      {hint && <span style={{ fontSize: 12, color: DS.color.inkSoft }}>{hint}</span>}
    </label>
  );
}

// ─── Nav (Header) ────────────────────────────────────────────
function Nav({ variant = 'agence', mode = 'light' }) {
  const items = variant === 'epicerie'
    ? ['Solutions', 'Guides', 'Carnet', 'Traceo']
    : ['Showroom', 'Pratiques', 'Carnet', 'Contact'];
  const bg = mode === 'dark' ? DS.color.ink : DS.color.paper;
  const accent = variant === 'epicerie' ? DS.color.olive : DS.color.orange;
  return (
    <nav style={{
      padding: '20px 56px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      background: bg, borderBottom: `1px solid ${mode === 'dark' ? DS.color.inkLine : DS.color.line}`,
    }}>
      <Logo variant={variant} mode={mode} size="md" />
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {items.map(item => (
          <span key={item} style={{
            fontFamily: DS.font.sans, fontSize: 14, fontWeight: 500,
            color: mode === 'dark' ? DS.color.paper : DS.color.ink, cursor: 'pointer',
          }}>{item}</span>
        ))}
        <Button variant="primary" size="sm" mode={mode} trailing={<span style={{ color: accent }}>→</span>}>
          {variant === 'epicerie' ? 'Échangeons' : 'Démarrer'}
        </Button>
      </div>
    </nav>
  );
}

// ─── Footer ──────────────────────────────────────────────────
function Footer({ variant = 'agence' }) {
  const accent = variant === 'epicerie' ? DS.color.olive : DS.color.orange;
  const accentName = variant === 'epicerie' ? 'olive sauge' : 'orange signature';
  const cols = [
    { title: 'Pratiques', items: ['Web & e-commerce', 'Mobile sur-mesure', 'Automatisations', 'Marketing digital'] },
    { title: 'Agence', items: ['Notre approche', 'Carnet', 'Recrutement', 'Mentions légales'] },
    { title: 'Contact', items: ['hello@launchpadfactory.fr', '+33 1 23 45 67 89', 'Réserver un appel', 'LinkedIn'] },
  ];
  return (
    <footer style={{
      background: DS.color.ink, color: DS.color.paper, padding: '64px 56px 32px',
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 56, marginBottom: 48 }}>
        <div>
          <Logo mode="dark" variant={variant} size="md" />
          <p style={{
            marginTop: 16, color: 'rgba(251,246,239,0.6)', fontSize: 14, lineHeight: 1.55, maxWidth: 280,
          }}>
            Agence digitale française. On conçoit, on développe, on déploie. {accentName} {variant === 'epicerie' ? '· vertical épiceries fines' : ''}.
          </p>
        </div>
        {cols.map(c => (
          <div key={c.title}>
            <h4 style={{
              fontFamily: DS.font.mono, fontSize: 11, fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: 16,
            }}>{c.title}</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {c.items.map(it => (
                <li key={it} style={{ fontSize: 14, color: 'rgba(251,246,239,0.78)', cursor: 'pointer' }}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: `1px solid ${DS.color.inkLine}`, paddingTop: 22,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: DS.font.mono, fontSize: 11, color: 'rgba(251,246,239,0.4)',
        letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <span>© 2026 LaunchPad Factory · Le digital, fait main</span>
        <span>Made in France · v2.0</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Logo, Eyebrow, Badge, Tag, Button, Input, Textarea, Nav, Footer });
