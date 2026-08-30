/** Contrato bruto devolvido pelo Flask (snake_case, como no CreatePaymentResponse). */
export interface PixPaymentApiPayload {
  id: string
  /** Pydantic serializa Decimal como string em `model_dump(mode="json")`. */
  value: string | number
  is_paid: boolean
  bank_payment_id: string | null
  pix_payload: string | null
  expiration_date: string
}

export interface CreatePixPaymentApiResponse {
  message: string
  payment: PixPaymentApiPayload
}

/**
 * `GET /payments/pix/<id>` ainda e um stub e devolve apenas
 * `{ message, payment_id }`. `payment` fica opcional para que o front
 * passe a usar o dado real assim que a rota for implementada.
 */
export interface GetPixPaymentApiResponse {
  message: string
  payment_id: string
  payment?: PixPaymentApiPayload
}

export interface ConfirmPixPaymentApiResponse {
  message: string
}

export interface CreatePixPaymentRequest {
  value: number
}

/** Entidade de dominio usada por toda a UI. */
export interface PixPayment {
  id: string
  value: number
  isPaid: boolean
  bankPaymentId: string | null
  pixPayload: string | null
  expirationDate: string
}

/** Resultado da consulta de uma cobranca, com a origem do dado. */
export interface PixPaymentDetail {
  paymentId: string
  payment: PixPayment | null
  isFromLocalSnapshot: boolean
}

export type PixPaymentStatus = 'pending' | 'paid' | 'expired'
