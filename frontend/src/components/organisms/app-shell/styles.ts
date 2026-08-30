import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { fadeIn, focusRing, microLabel } from '@/styles'

export const ShellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`

export const ShellHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  animation: ${fadeIn} 500ms ease both;
`

export const BrandLink = styled(Link)`
  ${focusRing};

  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.sm};
`

export const BrandMark = styled.span`
  display: grid;
  grid-template-columns: repeat(2, 6px);
  grid-template-rows: repeat(2, 6px);
  gap: 2px;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.accent};

  span {
    border-radius: 1px;
    background-color: ${({ theme }) => theme.colors.surface};
  }

  span:nth-child(4) {
    opacity: 0.45;
  }
`

export const BrandCopy = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.2;
`

export const BrandName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  letter-spacing: -0.015em;
  color: ${({ theme }) => theme.colors.text};
`

export const BrandTagline = styled.span`
  ${microLabel};
  font-size: 0.625rem;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.colors.textFaint};
`

export const ShellMain = styled.main`
  flex: 1;
  display: flex;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `0 ${theme.spacing.lg} ${theme.spacing.xxl}`};
`

export const ShellFooter = styled.footer`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const FooterNote = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textFaint};
`
