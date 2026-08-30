import styled from 'styled-components'

import { microLabel } from '@/styles'

export const CopyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`

export const CopyHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const CopyLabel = styled.span`
  ${microLabel};
  color: ${({ theme }) => theme.colors.textMuted};
`

export const PayloadBox = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm};
  max-height: 4.75rem;
  overflow-y: auto;
  overflow-wrap: anywhere;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  line-height: 1.85;
  color: ${({ theme }) => theme.colors.textMuted};

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.borderStrong} transparent;
`

export const CopyHint = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textFaint};
`
