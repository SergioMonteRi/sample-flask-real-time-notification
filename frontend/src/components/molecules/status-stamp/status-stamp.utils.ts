import type { BaseStampTone } from '@/components/atoms'
import type { PixPaymentStatus } from '@/services/payments'

const STATUS_TONE: Record<PixPaymentStatus, BaseStampTone> = {
  pending: 'accent',
  paid: 'success',
  expired: 'muted',
}

export const getStatusTone = (status: PixPaymentStatus): BaseStampTone =>
  STATUS_TONE[status]
