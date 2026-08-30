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
  color: ${({ theme }) => theme.colors.graphiteSoft};
`

export const InputShell = styled.div<FieldProps>`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.paperEdge};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: rgba(255, 255, 255, 0.42);
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.graphite};
    box-shadow: ${({ theme }) => theme.shadows.hardSmall};
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.vermilion};

      &:focus-within {
        border-color: ${({ theme }) => theme.colors.vermilion};
      }
    `}
`

export const InputPrefix = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.graphiteSoft};
  user-select: none;
`

export const StyledInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  background: none;
  outline: none;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-variant-numeric: tabular-nums lining-nums;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.graphite};

  &::placeholder {
    color: ${({ theme }) => theme.colors.paperEdge};
  }

  /* Remove os esporas do input numerico. */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`

export const FieldMessage = styled.span<FieldProps>`
  ${microLabel};
  letter-spacing: 0.08em;
  text-transform: none;
  animation: ${riseIn} ${({ theme }) => theme.transitions.base} both;
  color: ${({ theme, $hasError }) =>
    $hasError ? theme.colors.vermilionDeep : theme.colors.graphiteFaint};
`
