import styled from 'styled-components'

import { microLabel, riseIn } from '@/styles'

export const StepsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const StepsTitle = styled.h2`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textFaint};
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
  grid-template-columns: 1.5rem 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: start;
  counter-increment: step;
  animation: ${riseIn} 500ms cubic-bezier(0.22, 1, 0.36, 1) both;

  &:nth-child(1) {
    animation-delay: 220ms;
  }
  &:nth-child(2) {
    animation-delay: 290ms;
  }
  &:nth-child(3) {
    animation-delay: 360ms;
  }

  &::before {
    content: counter(step);
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.accentSoft};
    color: ${({ theme }) => theme.colors.accentStrong};
    font-size: ${({ theme }) => theme.fontSizes.micro};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
`

export const StepText = styled.p`
  margin: 0;
  padding-top: 0.1rem;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`
