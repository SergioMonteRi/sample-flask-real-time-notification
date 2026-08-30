import styled from 'styled-components'

export const RowWrapper = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`

export const RowLabel = styled.dt`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
`

export const RowValue = styled.dd`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
  overflow-wrap: anywhere;
`
