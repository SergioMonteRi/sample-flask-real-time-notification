import styled, { css } from 'styled-components'

import { focusRing, microLabel } from '@/styles'

export const SwitchWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.inkLine};
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
`

export const SwitchOption = styled.button<{ $isActive: boolean }>`
  ${microLabel};
  ${focusRing};

  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.xs}`};
  letter-spacing: 0.16em;
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  ${({ $isActive, theme }) =>
    $isActive
      ? css`
          background-color: ${theme.colors.vermilion};
          color: ${theme.colors.paper};
        `
      : css`
          color: ${theme.colors.onInkSoft};

          &:hover {
            color: ${theme.colors.onInk};
          }
        `}

  & + & {
    border-left: 1px solid ${({ theme }) => theme.colors.inkLine};
  }
`
