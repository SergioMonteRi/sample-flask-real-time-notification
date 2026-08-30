import styled, { css } from 'styled-components'

import { blink, microLabel } from '@/styles'

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
  color: ${({ theme }) => theme.colors.textFaint};
`

export const CountdownClock = styled.time<ClockProps>`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};

  span[data-separator] {
    animation: ${blink} 1s steps(1, end) infinite;
  }

  ${({ $isCloseToExpiring }) =>
    $isCloseToExpiring &&
    css`
      color: ${({ theme }) => theme.colors.pending};
    `}

  ${({ $hasExpired }) =>
    $hasExpired &&
    css`
      font-family: ${({ theme }) => theme.fonts.sans};
      font-size: ${({ theme }) => theme.fontSizes.md};
      color: ${({ theme }) => theme.colors.textFaint};
    `}
`
