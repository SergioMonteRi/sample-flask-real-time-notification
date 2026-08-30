import styled, { css } from 'styled-components'

import { microLabel, stampDown } from '@/styles'

export type BaseStampTone = 'accent' | 'success' | 'muted'

interface StampProps {
  $tone: BaseStampTone
  $isAnimated: boolean
}

const toneStyles = {
  accent: css`
    color: ${({ theme }) => theme.colors.vermilion};
  `,
  success: css`
    color: ${({ theme }) => theme.colors.moss};
  `,
  muted: css`
    color: ${({ theme }) => theme.colors.graphiteFaint};
  `,
} as const satisfies Record<BaseStampTone, ReturnType<typeof css>>

export const StampFrame = styled.span<StampProps>`
  ${microLabel};

  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  border: 2px solid currentColor;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  font-weight: 600;
  letter-spacing: 0.24em;
  transform: rotate(-8deg);
  opacity: 0.92;
  /* Tinta gasta: o carimbo nunca bate perfeito. */
  mask-image:
    radial-gradient(circle at 22% 30%, transparent 0 1.2px, #000 1.6px),
    radial-gradient(circle at 74% 68%, transparent 0 1.4px, #000 1.8px),
    linear-gradient(#000, #000);
  mask-composite: intersect;

  ${({ $tone }) => toneStyles[$tone]};

  ${({ $isAnimated }) =>
    $isAnimated &&
    css`
      animation: ${stampDown} ${({ theme }) => theme.transitions.spring} both;
    `}

  &::before,
  &::after {
    content: '★';
    font-size: 0.5rem;
    opacity: 0.7;
  }
`
