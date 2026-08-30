import type { ElementType, ReactNode } from 'react'

import type { BaseTextTone, BaseTextVariant } from './styles'
import { StyledText } from './styles'

type BaseTextProps = {
  children: ReactNode
  as?: ElementType
  variant?: BaseTextVariant
  tone?: BaseTextTone
  align?: 'left' | 'center' | 'right'
  isItalic?: boolean
  id?: string
  className?: string
}

export function BaseText({
  children,
  as = 'p',
  variant = 'body',
  tone = 'ink',
  align,
  isItalic = false,
  id,
  className,
}: BaseTextProps) {
  return (
    <StyledText
      as={as}
      id={id}
      className={className}
      $variant={variant}
      $tone={tone}
      $align={align}
      $isItalic={isItalic}
    >
      {children}
    </StyledText>
  )
}

export type { BaseTextTone, BaseTextVariant }
