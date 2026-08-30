import styled, { css } from 'styled-components'

import { microLabel, softPulse, surfaceCard } from '@/styles'

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

export const LiveDot = styled.span<{ $isActive: boolean }>`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.borderStrong};

  ${({ $isActive }) =>
    $isActive &&
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
