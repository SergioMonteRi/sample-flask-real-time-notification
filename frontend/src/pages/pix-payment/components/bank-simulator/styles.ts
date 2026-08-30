import styled from 'styled-components'

import { microLabel } from '@/styles'

export const SimulatorPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px dashed ${({ theme }) => theme.colors.inkLine};
  border-radius: ${({ theme }) => theme.radii.sm};
`

export const SimulatorTitle = styled.h2`
  ${microLabel};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  letter-spacing: 0.28em;
  color: ${({ theme }) => theme.colors.amber};

  &::before {
    content: '⌁';
    font-size: ${({ theme }) => theme.fontSizes.md};
    letter-spacing: 0;
  }
`

export const SimulatorText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.onInkSoft};
`
