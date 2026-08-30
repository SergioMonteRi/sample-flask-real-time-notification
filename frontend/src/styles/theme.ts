/**
 * Direcao visual: "Comprovante".
 *
 * A interface e um terminal de caixa: fundo de tinta quente, o pagamento
 * impresso em papel off-white com bordas serrilhadas, carimbos em vermelhao
 * e verde-musgo. Serifada editorial para os numeros, monoespacada para os
 * dados — como um recibo de verdade.
 */
export const theme = {
  colors: {
    ink: '#0E0D0B',
    inkSoft: '#161411',
    inkLine: '#2A2620',

    paper: '#F4EFE3',
    paperShade: '#E7DFCC',
    paperEdge: '#D5CAB0',

    graphite: '#221F19',
    graphiteSoft: '#6B6355',
    graphiteFaint: '#9C9484',

    vermilion: '#E0472C',
    vermilionDeep: '#B4331C',
    moss: '#2F6B45',
    mossSoft: '#4E9068',
    amber: '#C4891A',

    onInk: '#EFE9DC',
    onInkSoft: '#8C8577',
  },

  fonts: {
    display: "'Instrument Serif', 'Iowan Old Style', Georgia, serif",
    mono: "'IBM Plex Mono', 'SFMono-Regular', ui-monospace, monospace",
  },

  fontSizes: {
    micro: '0.6875rem',
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.9375rem',
    lg: '1.125rem',
    xl: '1.5rem',
    display: 'clamp(2.25rem, 7vw, 3.5rem)',
    hero: 'clamp(5rem, 20vw, 11rem)',
  },

  spacing: {
    xxs: '0.25rem',
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
  },

  radii: {
    none: '0',
    sm: '2px',
    md: '4px',
    pill: '999px',
  },

  shadows: {
    hard: '6px 6px 0 rgba(0, 0, 0, 0.55)',
    hardSmall: '3px 3px 0 rgba(0, 0, 0, 0.45)',
    lifted: '0 32px 60px -24px rgba(0, 0, 0, 0.8)',
    stamp: '0 0 0 1px currentColor',
  },

  layout: {
    receiptWidth: '30rem',
    pageMaxWidth: '68rem',
    perforationSize: '10px',
  },

  transitions: {
    fast: '140ms cubic-bezier(0.3, 0, 0.2, 1)',
    base: '240ms cubic-bezier(0.3, 0, 0.2, 1)',
    spring: '520ms cubic-bezier(0.22, 1.2, 0.36, 1)',
  },
} as const

export type AppTheme = typeof theme
