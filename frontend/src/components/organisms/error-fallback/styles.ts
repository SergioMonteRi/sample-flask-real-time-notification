import styled from 'styled-components'

export const FallbackWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-block: ${({ theme }) => theme.spacing.xxl};
`

export const FallbackActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`

export const StampRow = styled.div`
  display: flex;
  padding-block: ${({ theme }) => theme.spacing.xs};
`
