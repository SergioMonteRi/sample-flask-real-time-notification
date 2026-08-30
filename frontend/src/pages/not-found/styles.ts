import styled from 'styled-components'

import { fadeIn, riseIn } from '@/styles'

export const NotFoundLayout = styled.div`
  display: grid;
  flex: 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: minmax(0, 1fr) minmax(
      0,
      ${({ theme }) => theme.layout.receiptWidth}
    );
  padding-block: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 58rem) {
    grid-template-columns: minmax(0, 1fr);
  }
`

/* O 404 e um numero desenhado: preenchimento vazado sobre a grade. */
export const VoidNumber = styled.p`
  position: relative;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.hero};
  line-height: 0.78;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.onInkSoft};
  animation: ${fadeIn} 800ms ease both;

  /* Camada solida deslocada, como uma impressao fora de registro. */
  &::after {
    content: '404';
    position: absolute;
    inset: 0;
    color: ${({ theme }) => theme.colors.vermilion};
    -webkit-text-stroke: 0;
    mix-blend-mode: screen;
    opacity: 0.9;
    transform: translate(6px, 6px);
    clip-path: polygon(0 0, 100% 0, 100% 46%, 0 46%);
  }
`

export const VoidColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  animation: ${riseIn} 620ms cubic-bezier(0.2, 0.8, 0.2, 1) 120ms both;
`

export const VoidHeading = styled.h1`
  max-width: 18ch;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.12;
  color: ${({ theme }) => theme.colors.onInk};
`

export const VoidDescription = styled.p`
  max-width: 44ch;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.onInkSoft};
`

export const VoidActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ReceiptColumn = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 58rem) {
    justify-content: flex-start;
  }
`

export const StampRow = styled.div`
  display: flex;
  padding-block: ${({ theme }) => theme.spacing.sm};
`

/* Papel rasgado: o comprovante sem registro nao imprime nada util. */
export const BlankLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xs};

  span {
    height: 8px;
    border-radius: ${({ theme }) => theme.radii.pill};
    background-color: ${({ theme }) => theme.colors.paperShade};
  }

  span:nth-child(1) {
    width: 82%;
  }
  span:nth-child(2) {
    width: 64%;
  }
  span:nth-child(3) {
    width: 71%;
  }
  span:nth-child(4) {
    width: 38%;
  }
`
