import { useMutation, useQueryClient } from '@tanstack/react-query'

import { mapPixPayment } from './payment.mapper'
import { paymentQueryKeys } from './payment.query-keys'
import { paymentService } from './payment.service'
import type {
  CreatePixPaymentApiResponse,
  CreatePixPaymentRequest,
  PixPayment,
  PixPaymentDetail,
} from './payment.types'
import { paymentSnapshot } from './payment-snapshot.utils'

export const useCreatePixPaymentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<
    PixPayment,
    Error,
    CreatePixPaymentRequest,
    { response: CreatePixPaymentApiResponse }
  >({
    mutationFn: async (payload) => {
      const response = await paymentService.createPixPayment(payload)

      return mapPixPayment(response.payment)
    },
    onSuccess: (payment) => {
      /* Semeia o cache para que o comprovante abra sem um segundo request. */
      paymentSnapshot.save(payment)

      queryClient.setQueryData<PixPaymentDetail>(
        paymentQueryKeys.pixDetail(payment.id),
        { paymentId: payment.id, payment, isFromLocalSnapshot: false },
      )
    },
  })
}
