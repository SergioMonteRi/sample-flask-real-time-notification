import styled, { css } from 'styled-components'

import { alertPulse, blink, microLabel } from '@/styles'

interface ClockProps {
  $isCloseToExpiring: boolean
  $hasExpired: boolean
}

export const CountdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
`

export const CountdownLabel = styled.span`
  ${microLabel};
  color: ${({ theme }) => theme.colors.graphiteSoft};
`

export const CountdownClock = styled.time<ClockProps>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.colors.graphite};

  /* O separador pisca como no visor de um terminal. */
  span[data-separator] {
    animation: ${blink} 1s steps(1, end) infinite;
  }

  ${({ $isCloseToExpiring }) =>
    $isCloseToExpiring &&
    css`
      color: ${({ theme }) => theme.colors.vermilion};
      animation: ${alertPulse} 1.4s ease-in-out infinite;
    `}

  ${({ $hasExpired }) =>
    $hasExpired &&
    css`
      color: ${({ theme }) => theme.colors.graphiteFaint};
      text-decoration: line-through;
    `}
`
