import styled from 'styled-components'

import { fadeIn, microLabel, riseIn } from '@/styles'

export const PaymentLayout = styled.div`
  display: grid;
  flex: 1;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns:
    minmax(0, ${({ theme }) => theme.layout.cardWidth})
    minmax(0, 1fr);
  padding-block: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 58rem) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const CardColumn = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const AsideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 28rem;
  animation: ${fadeIn} 600ms ease 180ms both;
`

export const AsideHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
`

export const AsideDescription = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const StatusRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const AsideActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const LoadingPanel = styled.div`
  ${microLabel};

  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xxl};
  color: ${({ theme }) => theme.colors.textFaint};
`
