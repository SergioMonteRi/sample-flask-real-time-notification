import { css } from 'styled-components'

/** Borda serrilhada de comprovante, aplicada como mascara no papel. */
export const perforatedEdges = css`
  --perforation: ${({ theme }) => theme.layout.perforationSize};

  mask-image:
    radial-gradient(
      var(--perforation) var(--perforation) at 50% 0,
      transparent 0 calc(var(--perforation) - 1px),
      #000 var(--perforation)
    ),
    radial-gradient(
      var(--perforation) var(--perforation) at 50% 100%,
      transparent 0 calc(var(--perforation) - 1px),
      #000 var(--perforation)
    ),
    linear-gradient(#000, #000);
  mask-size:
    calc(var(--perforation) * 2) var(--perforation),
    calc(var(--perforation) * 2) var(--perforation),
    100% calc(100% - var(--perforation) * 2);
  mask-position:
    top left,
    bottom left,
    center;
  mask-repeat: repeat-x, repeat-x, no-repeat;
`

/** Textura de papel: fibras finas por cima da cor de base. */
export const paperGrain = css`
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(34, 31, 25, 0.028) 0 1px,
      transparent 1px 3px
    ),
    radial-gradient(
      circle at 18% 12%,
      rgba(224, 71, 44, 0.05),
      transparent 45%
    ),
    radial-gradient(circle at 88% 84%, rgba(47, 107, 69, 0.05), transparent 42%);
`

export const dashedRule = css`
  border: 0;
  border-top: 1px dashed ${({ theme }) => theme.colors.paperEdge};
  margin: 0;
`

/** Rotulo pequeno em caixa alta, com tracking largo. */
export const microLabel = css`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.vermilion};
    outline-offset: 3px;
  }
`

export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`
