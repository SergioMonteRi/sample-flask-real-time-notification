import { BaseBadge } from '@/components/atoms'
import type { PixPaymentStatus } from '@/services/payments'

import { getStatusTone } from './status-badge.utils'
import { BadgeSlot } from './styles'

type StatusBadgeProps = {
  status: PixPaymentStatus
  label: string
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <BadgeSlot>
      <BaseBadge
        label={label}
        tone={getStatusTone(status)}
        isAnimated={status === 'paid'}
      />
    </BadgeSlot>
  )
}
