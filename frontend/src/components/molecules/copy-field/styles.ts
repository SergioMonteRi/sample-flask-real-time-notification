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
  color: ${({ theme }) => theme.colors.graphiteSoft};
`

export const PayloadBox = styled.p`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm};
  max-height: 5.25rem;
  overflow-y: auto;
  overflow-wrap: anywhere;
  border: 1px dashed ${({ theme }) => theme.colors.paperEdge};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: rgba(255, 255, 255, 0.4);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  line-height: 1.9;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.graphiteSoft};

  /* Blocos de 4 caracteres, como um codigo de barras transcrito. */
  span + span {
    margin-left: 0.5em;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.paperEdge} transparent;
`

export const CopyHint = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  color: ${({ theme }) => theme.colors.graphiteFaint};
`
