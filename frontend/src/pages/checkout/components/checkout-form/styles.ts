import styled from 'styled-components'

import { microLabel } from '@/styles'

export const FormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const QuickAmountsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const QuickAmountsLabel = styled.span`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textFaint};
`

export const QuickAmountsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
`
