import { BaseStamp } from '@/components/atoms'
import type { PixPaymentStatus } from '@/services/payments'

import { getStatusTone } from './status-stamp.utils'
import { StampSlot } from './styles'

type StatusStampProps = {
  status: PixPaymentStatus
  label: string
}

export function StatusStamp({ status, label }: StatusStampProps) {
  return (
    <StampSlot>
      <BaseStamp
        label={label}
        tone={getStatusTone(status)}
        isAnimated={status === 'paid'}
      />
    </StampSlot>
  )
}
