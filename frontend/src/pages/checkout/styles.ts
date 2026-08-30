import styled from 'styled-components'

import { fadeIn, microLabel, riseIn } from '@/styles'

export const CheckoutLayout = styled.div`
  display: grid;
  flex: 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: minmax(0, 1fr) minmax(
      0,
      ${({ theme }) => theme.layout.cardWidth}
    );
  padding-block: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 60rem) {
    grid-template-columns: minmax(0, 1fr);
    align-items: start;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`

export const IntroColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 32rem;
`

export const IntroEyebrow = styled.span`
  ${microLabel};
  color: ${({ theme }) => theme.colors.accent};
  animation: ${fadeIn} 500ms ease both;
`

export const IntroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  font-weight: 300;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.text};
  max-width: 15ch;
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 60ms both;
`

export const IntroDescription = styled.p`
  max-width: 42ch;
  text-wrap: balance;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 140ms both;
`

export const FormColumn = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 60rem) {
    justify-content: flex-start;
  }
`
