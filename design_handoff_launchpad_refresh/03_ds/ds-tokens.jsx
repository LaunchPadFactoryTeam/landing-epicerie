// ═══════════════════════════════════════════════════════════════
//  LaunchPad Factory · Design System — TOKENS
//  Source of truth. All other files import from here via window.DS.
// ═══════════════════════════════════════════════════════════════

const DS = {
  // ─── COLORS ────────────────────────────────────────────────
  color: {
    // Neutrals
    ink:        '#161210',
    inkSoft:    '#5a4f49',
    inkMute:    '#8a807a',
    paper:      '#fbf6ef',
    cream:      '#f1ead9',
    creamDeep:  '#e8dfc8',
    white:      '#ffffff',
    line:       'rgba(22, 18, 16, 0.12)',
    lineStrong: 'rgba(22, 18, 16, 0.22)',

    // Primary brand — Agence (orange signature)
    orange:     '#ff5c2c',
    orangeDeep: '#cc4218',
    orangeSoft: '#ffb398',
    orangeTint: 'rgba(255, 92, 44, 0.10)',

    // Secondary brand — Épiceries (olive sauge)
    olive:      '#5d6b3f',
    oliveDeep:  '#3f4a2b',
    oliveSoft:  '#a9b285',
    oliveTint:  'rgba(93, 107, 63, 0.10)',

    // Utility
    blueDeep:   '#1d2bbf',     // links, info
    forest:     '#1f3528',     // dark surface alt
    success:    '#2f7a3a',
    warn:       '#c47c1a',
    danger:     '#c0392b',

    // Dark surface (used on "constat" sections, footer)
    inkLift:    '#211d1a',
    inkLine:    'rgba(251, 246, 239, 0.16)',
  },

  // ─── TYPOGRAPHY ────────────────────────────────────────────
  font: {
    display: '"Bricolage Grotesque", -apple-system, BlinkMacSystemFont, sans-serif',
    serif:   '"Instrument Serif", "Times New Roman", serif',  // italic accents only
    sans:    '"Geist", "Inter Tight", -apple-system, sans-serif',
    mono:    '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
  },

  // Type scale — px / line-height / tracking / weight / family-shorthand
  type: {
    // Display (Bricolage Grotesque, weight 700)
    'display-2xl': { size: 156, lh: 0.85, ls: '-0.05em',  w: 700, family: 'display' },
    'display-xl':  { size: 120, lh: 0.86, ls: '-0.045em', w: 700, family: 'display' },
    'display-lg':  { size: 88,  lh: 0.88, ls: '-0.04em',  w: 700, family: 'display' },
    'display-md':  { size: 64,  lh: 0.92, ls: '-0.035em', w: 700, family: 'display' },
    'display-sm':  { size: 44,  lh: 0.95, ls: '-0.03em',  w: 700, family: 'display' },

    // Headings
    h1: { size: 48, lh: 1.05, ls: '-0.025em', w: 700, family: 'display' },
    h2: { size: 36, lh: 1.05, ls: '-0.02em',  w: 700, family: 'display' },
    h3: { size: 24, lh: 1.15, ls: '-0.015em', w: 600, family: 'display' },
    h4: { size: 18, lh: 1.3,  ls: '-0.005em', w: 600, family: 'sans' },

    // Body
    'body-lg': { size: 18, lh: 1.55, ls: '0',      w: 400, family: 'sans' },
    body:      { size: 16, lh: 1.55, ls: '0',      w: 400, family: 'sans' },
    'body-sm': { size: 14, lh: 1.5,  ls: '0',      w: 400, family: 'sans' },
    caption:   { size: 13, lh: 1.45, ls: '0',      w: 400, family: 'sans' },
    micro:     { size: 11, lh: 1.3,  ls: '0.14em', w: 500, family: 'mono', upper: true },
    eyebrow:   { size: 11, lh: 1.3,  ls: '0.18em', w: 500, family: 'mono', upper: true },
  },

  // ─── SPACING ───────────────────────────────────────────────
  space: { 1:4, 2:8, 3:12, 4:16, 5:20, 6:24, 8:32, 10:40, 14:56, 18:72, 24:96, 32:128 },

  // ─── RADIUS ────────────────────────────────────────────────
  radius: { sm: 6, md: 12, lg: 20, xl: 28, pill: 999 },

  // ─── SHADOW ────────────────────────────────────────────────
  shadow: {
    xs: '0 1px 2px rgba(22,18,16,0.04)',
    sm: '0 4px 14px rgba(22,18,16,0.06)',
    md: '0 12px 30px rgba(22,18,16,0.10)',
    lg: '0 24px 60px rgba(22,18,16,0.14)',
    ring: '0 0 0 3px rgba(255,92,44,0.22)',
  },

  // ─── MOTION ────────────────────────────────────────────────
  motion: {
    fast: '160ms cubic-bezier(0.2,0.7,0.3,1)',
    base: '260ms cubic-bezier(0.2,0.7,0.3,1)',
    slow: '480ms cubic-bezier(0.2,0.7,0.3,1)',
  },

  // ─── LAYOUT ────────────────────────────────────────────────
  layout: {
    container: 1240,
    containerNarrow: 880,
    sectionY: 'clamp(72px, 9vw, 128px)',
    columnGap: 24,
  },
};

// Inject Google Fonts + base CSS reset shared by all DS demos.
if (typeof document !== 'undefined' && !document.getElementById('ds-base')) {
  const s = document.createElement('style');
  s.id = 'ds-base';
  s.textContent = `
    .ds-reset *, .ds-reset *::before, .ds-reset *::after { box-sizing: border-box; }
    .ds-reset { font-family: ${DS.font.sans}; color: ${DS.color.ink}; }
    .ds-reset p { margin: 0; }
    .ds-reset h1, .ds-reset h2, .ds-reset h3, .ds-reset h4 { margin: 0; }
    .ds-reset ul { padding: 0; margin: 0; list-style: none; }
    .ds-reset button { font: inherit; cursor: pointer; border: 0; background: none; }
    .ds-reset a { color: inherit; text-decoration: none; }
  `;
  document.head.appendChild(s);
}

// Helper — turn a type token into a style object
function typeStyle(name) {
  const t = DS.type[name];
  if (!t) return {};
  return {
    fontFamily: DS.font[t.family],
    fontSize: t.size,
    lineHeight: t.lh,
    letterSpacing: t.ls,
    fontWeight: t.w,
    textTransform: t.upper ? 'uppercase' : undefined,
  };
}

Object.assign(window, { DS, typeStyle });
