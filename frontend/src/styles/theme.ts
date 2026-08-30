/**
 * Direcao visual: "Console claro".
 *
 * Superficies brancas sobre um fundo quente quase branco, hairlines de 1px
 * em vez de sombras pesadas e cor usada apenas com significado: preto para
 * acao, verde para confirmado, ambar para aguardando, vermelho para erro.
 */
export const theme = {
  colors: {
    canvas: '#F7F7F4',
    surface: '#FFFFFF',
    surfaceMuted: '#F2F2ED',
    border: '#E7E6E0',
    borderStrong: '#D5D4CC',

    text: '#1A1A17',
    textMuted: '#6C6C63',
    textFaint: '#9C9C93',
    onDark: '#FBFBF9',

    ink: '#1A1A17',
    inkHover: '#37372F',

    accent: '#0F6E5C',
    accentSoft: '#E8F2EF',
    accentStrong: '#0B5445',

    pending: '#956200',
    pendingSoft: '#FBF2DF',

    danger: '#B3261E',
    dangerSoft: '#FBEBE9',
  },

  fonts: {
    display: "'Fraunces', 'Iowan Old Style', Georgia, serif",
    sans: "'Instrument Sans', -apple-system, 'Segoe UI', Helvetica, sans-serif",
    mono: "'DM Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace",
  },

  fontSizes: {
    micro: '0.6875rem',
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.375rem',
    display: 'clamp(2rem, 4.5vw, 2.875rem)',
    amount: 'clamp(2.25rem, 5vw, 3rem)',
    hero: 'clamp(4.5rem, 14vw, 8rem)',
  },

  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3.5rem',
  },

  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px',
  },

  shadows: {
    subtle: '0 1px 2px rgba(26, 26, 23, 0.04)',
    card: '0 1px 2px rgba(26, 26, 23, 0.04), 0 16px 36px -24px rgba(26, 26, 23, 0.22)',
    lifted: '0 24px 56px -32px rgba(26, 26, 23, 0.3)',
  },

  layout: {
    cardWidth: '30rem',
    pageMaxWidth: '68rem',
  },

  transitions: {
    fast: '140ms cubic-bezier(0.3, 0, 0.2, 1)',
    base: '240ms cubic-bezier(0.3, 0, 0.2, 1)',
    spring: '420ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

export type AppTheme = typeof theme
