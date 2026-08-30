import type { BaseStampTone } from './styles'
import { StampFrame } from './styles'

type BaseStampProps = {
  label: string
  tone?: BaseStampTone
  isAnimated?: boolean
  className?: string
}

export function BaseStamp({
  label,
  tone = 'accent',
  isAnimated = false,
  className,
}: BaseStampProps) {
  return (
    <StampFrame className={className} $tone={tone} $isAnimated={isAnimated}>
      {label}
    </StampFrame>
  )
}

export type { BaseStampTone }
