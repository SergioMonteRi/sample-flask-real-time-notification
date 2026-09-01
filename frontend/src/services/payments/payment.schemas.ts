import { z } from 'zod'

/**
 * Contrato do Flask validado na fronteira: o que entra na aplicacao ja sai
 * daqui em camelCase e com os tipos certos. Se o backend mudar de formato,
 * o erro aparece aqui — e nao como `NaN` na tela.
 */
const pixPaymentApiSchema = z.object({
  id: z.string(),
  /** O Pydantic serializa `Decimal` como string em `model_dump(mode="json")`. */
  value: z.coerce.number(),
  is_paid: z.boolean(),
  bank_payment_id: z.string().nullable(),
  pix_payload: z.string().nullable(),
  expiration_date: z.string(),
})

export const pixPaymentSchema = pixPaymentApiSchema.transform((payment) => ({
  id: payment.id,
  value: payment.value,
  isPaid: payment.is_paid,
  bankPaymentId: payment.bank_payment_id,
  pixPayload: payment.pix_payload,
  expirationDate: payment.expiration_date,
}))

export const createPixPaymentResponseSchema = z.object({
  message: z.string(),
  payment: pixPaymentSchema,
})

export const getPixPaymentResponseSchema = pixPaymentSchema

/** `POST /webhooks/pix` responde apenas se aceitou a notificacao do banco. */
export const pixWebhookResponseSchema = z.object({
  status: z.string(),
})

/**
 * Payload de `payment-confirmed`. O socket e uma fronteira como qualquer
 * outra: o que chega dele tambem passa pelo Zod antes de virar estado.
 */
export const paymentConfirmedEventSchema = z
  .object({ payment_id: z.string() })
  .transform((event) => ({ paymentId: event.payment_id }))
