import styled from 'styled-components'

import { fadeIn, riseIn } from '@/styles'

export const NotFoundLayout = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-block: ${({ theme }) => theme.spacing.xxl};
`

export const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 34rem;
  text-align: center;
`

export const VoidNumber = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.hero};
  font-weight: 300;
  line-height: 0.9;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.borderStrong};
  animation: ${fadeIn} 700ms ease both;
`

export const VoidHeading = styled.h1`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 400;
  line-height: 1.25;
  color: ${({ theme }) => theme.colors.text};
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 100ms both;
`

export const VoidDescription = styled.p`
  max-width: 44ch;
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textMuted};
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 160ms both;
`

export const VoidActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.xs};
  animation: ${riseIn} 560ms cubic-bezier(0.22, 1, 0.36, 1) 220ms both;
`
