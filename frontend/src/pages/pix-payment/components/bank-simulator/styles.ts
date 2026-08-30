import styled from 'styled-components'

import { microLabel } from '@/styles'

export const SimulatorPanel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const SimulatorTitle = styled.h2`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const SimulatorText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textFaint};
`
