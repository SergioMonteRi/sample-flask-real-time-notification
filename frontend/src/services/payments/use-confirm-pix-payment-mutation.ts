import { useMutation, useQueryClient } from '@tanstack/react-query'

import { paymentQueryKeys } from './payment.query-keys'
import { paymentService } from './payment.service'
import type {
  ConfirmPixPaymentApiResponse,
  PixPaymentDetail,
} from './payment.types'
import { paymentSnapshot } from './payment-snapshot.utils'

interface ConfirmMutationContext {
  previousDetail: PixPaymentDetail | undefined
}

/**
 * Dispara o endpoint que o banco chamara quando o Pix cair.
 * Aplica optimistic update: o carimbo de pago aparece na hora e volta
 * atras caso o servidor recuse.
 */
export const useConfirmPixPaymentMutation = (paymentId: string) => {
  const queryClient = useQueryClient()
  const queryKey = paymentQueryKeys.pixDetail(paymentId)

  return useMutation<
    ConfirmPixPaymentApiResponse,
    Error,
    void,
    ConfirmMutationContext
  >({
    mutationFn: paymentService.confirmPixPayment,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey })

      const previousDetail =
        queryClient.getQueryData<PixPaymentDetail>(queryKey)

      queryClient.setQueryData<PixPaymentDetail>(queryKey, (current) =>
        current?.payment
          ? { ...current, payment: { ...current.payment, isPaid: true } }
          : current,
      )

      return { previousDetail }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousDetail) {
        queryClient.setQueryData(queryKey, context.previousDetail)
      }
    },
    onSuccess: () => {
      paymentSnapshot.markAsPaid(paymentId)
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey })
    },
  })
}
