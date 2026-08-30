import styled from 'styled-components'

import {
  microLabel,
  paperGrain,
  perforatedEdges,
  printOut,
  riseIn,
} from '@/styles'

export const ReceiptRootWrapper = styled.article`
  position: relative;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.receiptWidth};
  color: ${({ theme }) => theme.colors.graphite};
  filter: drop-shadow(0 26px 40px rgba(0, 0, 0, 0.55));
  animation: ${printOut} 620ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
`

export const ReceiptPaper = styled.div`
  ${perforatedEdges};
  ${paperGrain};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `calc(${theme.spacing.xl} + 6px) ${theme.spacing.lg}
    calc(${theme.spacing.xl} + 6px)`};
  background-color: ${({ theme }) => theme.colors.paper};

  > * {
    animation: ${riseIn} 420ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  > *:nth-child(1) {
    animation-delay: 180ms;
  }
  > *:nth-child(2) {
    animation-delay: 250ms;
  }
  > *:nth-child(3) {
    animation-delay: 320ms;
  }
  > *:nth-child(4) {
    animation-delay: 390ms;
  }
  > *:nth-child(5) {
    animation-delay: 460ms;
  }
  > *:nth-child(n + 6) {
    animation-delay: 530ms;
  }
`

export const ReceiptHeaderRow = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.graphite};
`

export const ReceiptEyebrow = styled.span`
  ${microLabel};
  letter-spacing: 0.26em;
  color: ${({ theme }) => theme.colors.graphiteSoft};
`

export const ReceiptSerial = styled.span`
  ${microLabel};
  font-weight: 400;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.graphiteFaint};
  text-align: right;
`

export const ReceiptBodySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const ReceiptFooterRow = styled.footer`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 2px solid ${({ theme }) => theme.colors.graphite};
`

/* Faixa de codigo de barras desenhada em CSS puro. */
export const BarcodeStrip = styled.div`
  height: 2.25rem;
  background-image: repeating-linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.graphite} 0 2px,
    transparent 2px 4px,
    ${({ theme }) => theme.colors.graphite} 4px 5px,
    transparent 5px 9px,
    ${({ theme }) => theme.colors.graphite} 9px 12px,
    transparent 12px 14px,
    ${({ theme }) => theme.colors.graphite} 14px 15px,
    transparent 15px 20px
  );
  opacity: 0.86;
`

export const BarcodeCaption = styled.span`
  ${microLabel};
  font-weight: 400;
  letter-spacing: 0.32em;
  color: ${({ theme }) => theme.colors.graphiteFaint};
  text-align: center;
`
