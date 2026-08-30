import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { fadeIn, focusRing, marquee, microLabel } from '@/styles'

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
  animation: ${fadeIn} 600ms ease both;
`

export const BrandLink = styled(Link)`
  ${focusRing};

  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-decoration: none;
`

export const BrandMark = styled.span`
  display: grid;
  grid-template-columns: repeat(2, 7px);
  grid-template-rows: repeat(2, 7px);
  gap: 2px;

  span {
    background-color: ${({ theme }) => theme.colors.vermilion};
  }

  span:nth-child(4) {
    background-color: ${({ theme }) => theme.colors.onInkSoft};
  }
`

export const BrandCopy = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.15;
`

export const BrandName = styled.span`
  font-family: ${({ theme }) => theme.fonts.display};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.onInk};
`

export const BrandTagline = styled.span`
  ${microLabel};
  font-size: 0.5625rem;
  letter-spacing: 0.28em;
  color: ${({ theme }) => theme.colors.onInkSoft};
`

export const ShellMain = styled.main`
  flex: 1;
  display: flex;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.pageMaxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}
    ${theme.spacing.xxl}`};
`

export const ShellFooter = styled.footer`
  overflow: hidden;
  flex-shrink: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.inkLine};
  padding-block: ${({ theme }) => theme.spacing.sm};
  mask-image: linear-gradient(
    90deg,
    transparent,
    #000 12%,
    #000 88%,
    transparent
  );
`

/* Fita de teleimpressora percorrendo o rodape. */
export const FooterTicker = styled.div`
  display: flex;
  width: max-content;
  animation: ${marquee} 42s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

export const TickerRun = styled.span`
  ${microLabel};
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-right: ${({ theme }) => theme.spacing.lg};
  line-height: 1.8;
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.onInkSoft};
  white-space: nowrap;
`
