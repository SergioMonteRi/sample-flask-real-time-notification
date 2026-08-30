import styled, { css } from 'styled-components'

import { microLabel, riseIn } from '@/styles'

interface FieldProps {
  $hasError: boolean
}

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`

export const FieldLabel = styled.label`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const InputShell = styled.div<FieldProps>`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surface};
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.accentSoft};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};

      &:focus-within {
        border-color: ${({ theme }) => theme.colors.danger};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.dangerSoft};
      }
    `}
`

export const InputPrefix = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 300;
  color: ${({ theme }) => theme.colors.textFaint};
  user-select: none;
`

export const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.amount};
  font-weight: 300;
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textFaint};
    opacity: 0.55;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`

export const FieldMessage = styled.span<FieldProps>`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.5;
  animation: ${riseIn} ${({ theme }) => theme.transitions.base} both;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.danger : theme.colors.textFaint};
`
