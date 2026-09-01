import type { z } from 'zod'

import type {
  confirmPixPaymentResponseSchema,
  createPixPaymentResponseSchema,
  getPixPaymentResponseSchema,
  pixPaymentSchema,
} from './payment.schemas'

/** Entidade de dominio usada por toda a UI, derivada do schema. */
export type PixPayment = z.infer<typeof pixPaymentSchema>

export type CreatePixPaymentResponse = z.infer<
  typeof createPixPaymentResponseSchema
>
export type GetPixPaymentResponse = z.infer<typeof getPixPaymentResponseSchema>
export type ConfirmPixPaymentResponse = z.infer<
  typeof confirmPixPaymentResponseSchema
>

export interface CreatePixPaymentRequest {
  value: number
}

export type PixPaymentStatus = 'pending' | 'paid' | 'expired'
