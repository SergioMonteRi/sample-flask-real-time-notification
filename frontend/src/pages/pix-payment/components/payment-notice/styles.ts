import styled, { css } from 'styled-components'

import { microLabel } from '@/styles'

export type NoticeTone = 'info' | 'danger'

export const NoticeBox = styled.aside<{ $tone: NoticeTone }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: rgba(255, 255, 255, 0.42);

  ${({ $tone, theme }) =>
    $tone === 'danger'
      ? css`
          border-left: 3px solid ${theme.colors.vermilion};
        `
      : css`
          border-left: 3px solid ${theme.colors.amber};
        `}
`

export const NoticeTitle = styled.strong`
  ${microLabel};
  color: ${({ theme }) => theme.colors.graphite};
`

export const NoticeText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.micro};
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.graphiteSoft};
`
