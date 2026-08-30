import styled from 'styled-components'

import { fadeIn, microLabel, riseIn } from '@/styles'

export const PaymentLayout = styled.div`
  display: grid;
  flex: 1;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns:
    minmax(0, ${({ theme }) => theme.layout.receiptWidth})
    minmax(0, 1fr);
  padding-block: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 58rem) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const ReceiptColumn = styled.div`
  display: flex;
  justify-content: flex-start;
`

export const AsideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} 700ms ease 300ms both;

  @media (max-width: 58rem) {
    padding-top: 0;
  }
`

export const AsideHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.onInk};
  animation: ${riseIn} 620ms cubic-bezier(0.2, 0.8, 0.2, 1) 320ms both;
`

export const AsideDescription = styled.p`
  max-width: 38ch;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.onInkSoft};

  strong {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.onInk};
    text-decoration: underline;
    text-underline-offset: 3px;
    text-decoration-color: ${({ theme }) => theme.colors.vermilion};
  }
`

export const StatusRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-bottom: ${({ theme }) => theme.spacing.xs};
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
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.onInkSoft};
`
