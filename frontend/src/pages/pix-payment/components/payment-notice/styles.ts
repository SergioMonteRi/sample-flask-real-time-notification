import styled, { css } from 'styled-components'

export type NoticeTone = 'info' | 'danger'

export const NoticeBox = styled.aside<{ $tone: NoticeTone }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};

  ${({ $tone, theme }) =>
    $tone === 'danger'
      ? css`
          background-color: ${theme.colors.dangerSoft};
        `
      : css`
          background-color: ${theme.colors.pendingSoft};
        `}
`

export const NoticeTitle = styled.strong<{ $tone: NoticeTone }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: 600;
  color: ${({ theme, $tone }) =>
    $tone === 'danger' ? theme.colors.danger : theme.colors.pending};
`

export const NoticeText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
`
