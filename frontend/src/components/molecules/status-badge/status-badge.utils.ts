import type { BaseBadgeTone } from '@/components/atoms'
import type { PixPaymentStatus } from '@/services/payments'

const STATUS_TONE: Record<PixPaymentStatus, BaseBadgeTone> = {
  pending: 'pending',
  paid: 'success',
  expired: 'neutral',
}

export const getStatusTone = (status: PixPaymentStatus): BaseBadgeTone =>
  STATUS_TONE[status]
