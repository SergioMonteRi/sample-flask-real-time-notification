import styled from 'styled-components'

import { fadeIn, microLabel, riseIn } from '@/styles'

export const CheckoutLayout = styled.div`
  display: grid;
  flex: 1;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xxl};
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
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
  gap: ${({ theme }) => theme.spacing.xl};
  /* Quebra do grid: a coluna editorial desce um pouco para criar tensao. */
  padding-top: ${({ theme }) => theme.spacing.xl};

  @media (max-width: 60rem) {
    padding-top: 0;
  }
`

export const IntroEyebrow = styled.span`
  ${microLabel};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  letter-spacing: 0.34em;
  color: ${({ theme }) => theme.colors.vermilion};
  animation: ${fadeIn} 520ms ease both;

  &::before {
    content: '';
    width: 2rem;
    height: 1px;
    background-color: currentColor;
  }
`

export const IntroHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.display};
  line-height: 0.98;
  letter-spacing: -0.018em;
  color: ${({ theme }) => theme.colors.onInk};
  max-width: 14ch;
  animation: ${riseIn} 620ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: 80ms;

  em {
    font-style: italic;
    color: ${({ theme }) => theme.colors.vermilion};
  }
`

export const IntroDescription = styled.p`
  max-width: 40ch;
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.onInkSoft};
  animation: ${riseIn} 620ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
  animation-delay: 180ms;
`

export const FormColumn = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 60rem) {
    justify-content: flex-start;
  }
`
