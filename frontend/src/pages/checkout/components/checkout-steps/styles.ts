import styled from 'styled-components'

import { microLabel, riseIn } from '@/styles'

export const StepsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 34rem;
`

export const StepsTitle = styled.h2`
  ${microLabel};
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.onInkSoft};
`

export const StepsList = styled.ol`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
`

export const StepItem = styled.li`
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: baseline;
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.inkLine};
  counter-increment: step;
  animation: ${riseIn} 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both;

  &:nth-child(1) {
    animation-delay: 320ms;
  }
  &:nth-child(2) {
    animation-delay: 400ms;
  }
  &:nth-child(3) {
    animation-delay: 480ms;
  }

  &::before {
    content: '0' counter(step);
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: 1;
    color: ${({ theme }) => theme.colors.vermilion};
  }
`

export const StepText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.onInkSoft};
`
