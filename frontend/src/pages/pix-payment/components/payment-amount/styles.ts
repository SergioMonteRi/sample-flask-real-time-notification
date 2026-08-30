import styled from 'styled-components'

import { microLabel } from '@/styles'

export const AmountRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  align-items: center;
`

export const AmountLabel = styled.span`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textFaint};
`

export const AmountValue = styled.strong`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.amount};
  font-variant-numeric: tabular-nums lining-nums;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.text};

  small {
    font-size: 0.44em;
    letter-spacing: 0;
    margin-right: 0.18em;
    color: ${({ theme }) => theme.colors.textFaint};
  }
`
