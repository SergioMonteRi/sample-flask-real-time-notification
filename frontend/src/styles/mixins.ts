import { css } from 'styled-components'

/** Superficie branca com hairline — a base de todo bloco da interface. */
export const surfaceCard = css`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

/** Rotulo pequeno em caixa alta, com tracking largo. */
export const microLabel = css`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

export const hairline = css`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0;
`

export const focusRing = css`
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
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
