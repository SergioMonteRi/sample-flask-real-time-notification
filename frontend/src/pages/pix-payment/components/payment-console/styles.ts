import styled, { css } from 'styled-components'

import { microLabel, softPulse, surfaceCard } from '@/styles'

import type { ConsoleDotState } from './payment-console.utils'

export const ConsolePanel = styled.section`
  ${surfaceCard};

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
`

export const ConsoleTitle = styled.h2`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textFaint};
`

export const ConsoleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const DOT_COLOR = {
  live: css`
    background-color: ${({ theme }) => theme.colors.accent};
  `,
  waiting: css`
    background-color: ${({ theme }) => theme.colors.pending};
  `,
  off: css`
    background-color: ${({ theme }) => theme.colors.borderStrong};
  `,
}

export const LiveDot = styled.span<{ $state: ConsoleDotState }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;

  ${({ $state }) => DOT_COLOR[$state]};

  ${({ $state }) =>
    $state !== 'off' &&
    css`
      animation: ${softPulse} 1.4s ease-in-out infinite;
    `}
`

export const ConsoleText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`

export const ConsoleHint = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textFaint};
`
