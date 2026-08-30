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

/**
 * `GET /payments/pix/<id>` ainda nao devolve o pagamento. `payment` fica
 * opcional para que o front passe a usar o dado real assim que a rota for
 * implementada, sem mudar nenhuma outra linha.
 */
export const getPixPaymentResponseSchema = z.object({
  message: z.string(),
  payment_id: z.string(),
  payment: pixPaymentSchema.nullish(),
})

export const confirmPixPaymentResponseSchema = z.object({
  message: z.string(),
})
