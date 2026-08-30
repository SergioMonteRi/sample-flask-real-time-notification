import { apiClient } from '@/services/http'

import type {
  ConfirmPixPaymentApiResponse,
  CreatePixPaymentApiResponse,
  CreatePixPaymentRequest,
  GetPixPaymentApiResponse,
} from './payment.types'

const PIX_ENDPOINT = '/payments/pix'

export const paymentService = {
  createPixPayment: async (
    payload: CreatePixPaymentRequest,
  ): Promise<CreatePixPaymentApiResponse> => {
    const { data } = await apiClient.post<CreatePixPaymentApiResponse>(
      PIX_ENDPOINT,
      payload,
    )

    return data
  },

  getPixPayment: async (
    paymentId: string,
  ): Promise<GetPixPaymentApiResponse> => {
    const { data } = await apiClient.get<GetPixPaymentApiResponse>(
      `${PIX_ENDPOINT}/${paymentId}`,
    )

    return data
  },

  confirmPixPayment: async (): Promise<ConfirmPixPaymentApiResponse> => {
    const { data } = await apiClient.post<ConfirmPixPaymentApiResponse>(
      `${PIX_ENDPOINT}/confirmation`,
    )

    return data
  },
}
