import styled from 'styled-components'

import { dashedRule, microLabel } from '@/styles'

export const PlainRule = styled.hr`
  ${dashedRule};
`

export const LabelledRule = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.graphiteFaint};

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-top: 1px dashed ${({ theme }) => theme.colors.paperEdge};
  }
`

export const RuleLabel = styled.span`
  ${microLabel};
  letter-spacing: 0.22em;
  white-space: nowrap;
`
