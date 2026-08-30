import styled from 'styled-components'

import { microLabel } from '@/styles'

export const AmountRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xxs};
`

export const AmountLabel = styled.span`
  ${microLabel};
  padding-bottom: 0.45rem;
  color: ${({ theme }) => theme.colors.graphiteSoft};
`

export const AmountValue = styled.strong`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-variant-numeric: tabular-nums lining-nums;
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.graphite};

  /* O simbolo da moeda recua para os numerais dominarem. */
  small {
    font-size: 0.42em;
    letter-spacing: 0.08em;
    vertical-align: 0.85em;
    margin-right: 0.15em;
    color: ${({ theme }) => theme.colors.graphiteSoft};
  }
`
