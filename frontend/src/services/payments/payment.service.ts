import { apiClient } from '@/services/http'

import {
  confirmPixPaymentResponseSchema,
  createPixPaymentResponseSchema,
  getPixPaymentResponseSchema,
} from './payment.schemas'
import type {
  ConfirmPixPaymentResponse,
  CreatePixPaymentRequest,
  CreatePixPaymentResponse,
  GetPixPaymentResponse,
} from './payment.types'

const PIX_ENDPOINT = '/payments/pix'

export const paymentService = {
  createPixPayment: async (
    payload: CreatePixPaymentRequest,
  ): Promise<CreatePixPaymentResponse> => {
    const { data } = await apiClient.post(PIX_ENDPOINT, payload)

    return createPixPaymentResponseSchema.parse(data)
  },

  getPixPayment: async (paymentId: string): Promise<GetPixPaymentResponse> => {
    const { data } = await apiClient.get(`${PIX_ENDPOINT}/${paymentId}`)

    console.log('teste', data, 'teste')
    console.log(getPixPaymentResponseSchema.parse(data))
    return getPixPaymentResponseSchema.parse(data)
  },

  confirmPixPayment: async (): Promise<ConfirmPixPaymentResponse> => {
    const { data } = await apiClient.post(`${PIX_ENDPOINT}/confirmation`)

    return confirmPixPaymentResponseSchema.parse(data)
  },
}
