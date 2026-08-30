import styled, { css } from 'styled-components'

import { alertPulse, microLabel } from '@/styles'

export const ConsolePanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.inkLine};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: rgba(22, 20, 17, 0.72);
  backdrop-filter: blur(2px);
`

export const ConsoleTitle = styled.h2`
  ${microLabel};
  letter-spacing: 0.28em;
  color: ${({ theme }) => theme.colors.onInkSoft};
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
    $isActive ? theme.colors.vermilion : theme.colors.onInkSoft};

  ${({ $isActive }) =>
    $isActive &&
    css`
      animation: ${alertPulse} 1.2s ease-in-out infinite;
      box-shadow: 0 0 10px 1px currentColor;
    `}
`

export const ConsoleText = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.onInk};
`

export const ConsoleHint = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  color: ${({ theme }) => theme.colors.onInkSoft};
`
