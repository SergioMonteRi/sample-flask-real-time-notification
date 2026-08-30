import styled, { css } from 'styled-components'

import { popIn } from '@/styles'

export const QrFrame = styled.figure`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
`

export const QrCanvas = styled.div<{ $isDimmed: boolean }>`
  position: relative;
  display: flex;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  transition: opacity ${({ theme }) => theme.transitions.base};

  /* Codigo pago ou expirado nao deve mais convidar a leitura. */
  ${({ $isDimmed }) =>
    $isDimmed &&
    css`
      opacity: 0.18;
    `}
`

export const PaidSeal = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
`

export const SealMark = styled.div`
  display: grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.surface};
  background-color: ${({ theme }) => theme.colors.accent};
  animation: ${popIn} ${({ theme }) => theme.transitions.spring} 80ms both;
`

export const SealCheck = styled.span`
  font-size: 1.5rem;
  line-height: 1;
`

export const QrCaption = styled.figcaption`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textFaint};
  text-align: center;
`
