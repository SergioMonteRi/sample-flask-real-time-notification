import styled, { css } from 'styled-components'

import { focusRing, microLabel, spin } from '@/styles'

export type BaseButtonVariant = 'primary' | 'paper' | 'ghost' | 'link'
export type BaseButtonSize = 'sm' | 'md'

interface StyledButtonProps {
  $variant: BaseButtonVariant
  $size: BaseButtonSize
  $isFullWidth: boolean
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.vermilion};
    color: ${({ theme }) => theme.colors.paper};
    border: 1px solid ${({ theme }) => theme.colors.vermilionDeep};
    box-shadow: ${({ theme }) => theme.shadows.hardSmall};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.vermilionDeep};
    }
  `,
  paper: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.graphite};
    border: 1px solid ${({ theme }) => theme.colors.paperEdge};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.paperShade};
      border-color: ${({ theme }) => theme.colors.graphiteSoft};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.onInk};
    border: 1px solid ${({ theme }) => theme.colors.inkLine};

    &:hover:not(:disabled) {
      border-color: ${({ theme }) => theme.colors.vermilion};
      color: ${({ theme }) => theme.colors.vermilion};
    }
  `,
  link: css`
    background: none;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.vermilion};
    padding-inline: 0;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;

    &:hover:not(:disabled) {
      color: ${({ theme }) => theme.colors.vermilionDeep};
    }
  `,
} as const satisfies Record<BaseButtonVariant, ReturnType<typeof css>>

const sizeStyles = {
  sm: css`
    min-height: 2.25rem;
    padding: 0 ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.micro};
  `,
  md: css`
    min-height: 3rem;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,
} as const satisfies Record<BaseButtonSize, ReturnType<typeof css>>

export const StyledButton = styled.button<StyledButtonProps>`
  ${microLabel};
  ${focusRing};

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition:
    background-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast},
    transform ${({ theme }) => theme.transitions.fast};

  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};

  &:active:not(:disabled) {
    transform: translate(1px, 1px);
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`

export const ButtonSpinner = styled.span`
  width: 0.75rem;
  height: 0.75rem;
  border: 1.5px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 720ms linear infinite;
`
