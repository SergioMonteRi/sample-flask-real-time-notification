import styled, { css } from 'styled-components'

import { microLabel, paperKick, scanSweep, stampDown } from '@/styles'

export const QrFrame = styled.figure<{ $isPaid: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.paperEdge};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: rgba(255, 255, 255, 0.55);
  overflow: hidden;

  /* Cantos de marcacao, como as guias de corte de uma prova grafica. */
  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    border: 1px solid ${({ theme }) => theme.colors.graphiteFaint};
    pointer-events: none;
  }

  &::before {
    top: 6px;
    left: 6px;
    border-right: none;
    border-bottom: none;
  }

  &::after {
    right: 6px;
    bottom: 6px;
    border-top: none;
    border-left: none;
  }

  ${({ $isPaid }) =>
    $isPaid &&
    css`
      animation: ${paperKick} 320ms ease-out 120ms both;
    `}
`

export const QrCanvas = styled.div<{ $isDimmed: boolean }>`
  position: relative;
  display: flex;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: filter ${({ theme }) => theme.transitions.base};

  /* Codigo pago ou expirado nao deve mais convidar a leitura. */
  ${({ $isDimmed }) =>
    $isDimmed &&
    css`
      filter: grayscale(1) opacity(0.32);
    `}
`

/* Varredura continua enquanto o pagamento nao cai. */
export const ScanLine = styled.span`
  position: absolute;
  inset-inline: 0;
  height: 34%;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(224, 71, 44, 0.16),
    transparent
  );
  animation: ${scanSweep} 3.4s ease-in-out infinite;
  pointer-events: none;
`

export const PaidSeal = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
`

export const SealMark = styled.div`
  ${microLabel};

  display: grid;
  place-items: center;
  width: 7.5rem;
  height: 7.5rem;
  border: 3px double ${({ theme }) => theme.colors.moss};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.moss};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 0.2em;
  background-color: rgba(244, 239, 227, 0.72);
  box-shadow: inset 0 0 0 6px rgba(244, 239, 227, 0.6);
  animation: ${stampDown} 560ms cubic-bezier(0.22, 1.2, 0.36, 1) 120ms both;

  /* Tinta falhada do carimbo. */
  mask-image:
    radial-gradient(circle at 30% 26%, transparent 0 3px, #000 4px),
    radial-gradient(circle at 72% 74%, transparent 0 2px, #000 3px),
    linear-gradient(#000, #000);
  mask-composite: intersect;
`

export const SealCheck = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`

export const QrCaption = styled.figcaption`
  ${microLabel};
  color: ${({ theme }) => theme.colors.graphiteFaint};
  letter-spacing: 0.2em;
`
