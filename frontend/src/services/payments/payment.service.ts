import { apiClient } from '@/services/http'

import {
  createPixPaymentResponseSchema,
  getPixPaymentResponseSchema,
  pixWebhookResponseSchema,
} from './payment.schemas'
import type {
  CreatePixPaymentRequest,
  CreatePixPaymentResponse,
  GetPixPaymentResponse,
  PixWebhookResponse,
  SendPixWebhookRequest,
} from './payment.types'

const PIX_ENDPOINT = '/payments/pix'
const PIX_WEBHOOK_ENDPOINT = '/webhooks/pix'

export const paymentService = {
  createPixPayment: async (
    payload: CreatePixPaymentRequest,
  ): Promise<CreatePixPaymentResponse> => {
    const { data } = await apiClient.post(PIX_ENDPOINT, payload)

    return createPixPaymentResponseSchema.parse(data)
  },

  getPixPayment: async (paymentId: string): Promise<GetPixPaymentResponse> => {
    const { data } = await apiClient.get(`${PIX_ENDPOINT}/${paymentId}`)

    return getPixPaymentResponseSchema.parse(data)
  },

  sendPixWebhook: async ({
    bankPaymentId,
  }: SendPixWebhookRequest): Promise<PixWebhookResponse> => {
    const { data } = await apiClient.post(PIX_WEBHOOK_ENDPOINT, {
      bank_payment_id: bankPaymentId,
    })

    return pixWebhookResponseSchema.parse(data)
  },
}
