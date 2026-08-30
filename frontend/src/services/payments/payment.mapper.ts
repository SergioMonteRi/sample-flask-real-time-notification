import type { PixPayment, PixPaymentApiPayload } from './payment.types'

export const mapPixPayment = (payload: PixPaymentApiPayload): PixPayment => ({
  id: payload.id,
  value: Number(payload.value),
  isPaid: payload.is_paid,
  bankPaymentId: payload.bank_payment_id,
  pixPayload: payload.pix_payload,
  expirationDate: payload.expiration_date,
})
