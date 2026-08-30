import styled from 'styled-components'

import { spin } from '@/styles'

export const SpinnerRing = styled.span<{ $size: number }>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border: 1.5px dashed currentColor;
  border-radius: 50%;
  animation: ${spin} 2.4s linear infinite;
  opacity: 0.75;
`
