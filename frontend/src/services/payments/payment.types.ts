import type { z } from 'zod'

import type {
  createPixPaymentResponseSchema,
  getPixPaymentResponseSchema,
  paymentConfirmedEventSchema,
  pixPaymentSchema,
  pixWebhookResponseSchema,
} from './payment.schemas'

/** Entidade de dominio usada por toda a UI, derivada do schema. */
export type PixPayment = z.infer<typeof pixPaymentSchema>

export type CreatePixPaymentResponse = z.infer<
  typeof createPixPaymentResponseSchema
>
export type GetPixPaymentResponse = z.infer<typeof getPixPaymentResponseSchema>
export type PixWebhookResponse = z.infer<typeof pixWebhookResponseSchema>

export type PaymentConfirmedEvent = z.infer<typeof paymentConfirmedEventSchema>

export interface CreatePixPaymentRequest {
  value: number
}

/** O que o banco manda ao webhook — aqui, o que a bancada de testes finge. */
export interface SendPixWebhookRequest {
  bankPaymentId: string
}

export type PixPaymentStatus = 'pending' | 'paid' | 'expired'
