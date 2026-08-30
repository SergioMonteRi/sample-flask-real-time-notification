import styled from 'styled-components'

import { microLabel } from '@/styles'

export const LineWrapper = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`

export const LineLabel = styled.dt`
  ${microLabel};
  color: ${({ theme }) => theme.colors.graphiteSoft};
  white-space: nowrap;
`

/* Guia de pontinhos, como nas linhas de um recibo impresso. */
export const LineLeader = styled.span`
  flex: 1;
  min-width: ${({ theme }) => theme.spacing.md};
  align-self: center;
  height: 1px;
  border-bottom: 1px dotted ${({ theme }) => theme.colors.paperEdge};
`

export const LineValue = styled.dd`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.graphite};
  white-space: nowrap;
`
