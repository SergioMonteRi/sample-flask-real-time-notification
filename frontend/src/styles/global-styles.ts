import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html {
    -webkit-text-size-adjust: 100%;
    color-scheme: dark;
  }

  body {
    min-height: 100dvh;
    background-color: ${({ theme }) => theme.colors.ink};
    color: ${({ theme }) => theme.colors.onInk};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;

    /* Atmosfera: luz baixa de balcao + malha de grade tecnica. */
    background-image:
      radial-gradient(
        ellipse 90% 55% at 50% -8%,
        rgba(224, 71, 44, 0.14),
        transparent 62%
      ),
      radial-gradient(
        ellipse 70% 50% at 50% 108%,
        rgba(47, 107, 69, 0.1),
        transparent 60%
      ),
      linear-gradient(
        to right,
        ${({ theme }) => theme.colors.inkLine} 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        ${({ theme }) => theme.colors.inkLine} 1px,
        transparent 1px
      );
    background-size: 100% 100%, 100% 100%, 44px 44px, 44px 44px;
    background-attachment: fixed;
  }

  /* Granulacao sobre toda a cena. */
  body::after {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0.4;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
  }

  #root {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    isolation: isolate;
  }

  h1, h2, h3, h4 {
    font-weight: 400;
    line-height: 1.05;
    text-wrap: balance;
  }

  p {
    text-wrap: pretty;
  }

  button,
  input,
  textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }

  a {
    color: inherit;
  }

  svg {
    display: block;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.vermilion};
    color: ${({ theme }) => theme.colors.paper};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
`
