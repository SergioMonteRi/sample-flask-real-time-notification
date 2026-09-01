import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

import { paymentKeys, paymentQueries } from './payment.queries'
import { paymentService } from './payment.service'
import type { CreatePixPaymentRequest, PixPayment } from './payment.types'

interface ConfirmMutationContext {
  previousPayment: PixPayment | undefined
}

export const paymentMutations = {
  createPix: (queryClient: QueryClient) =>
    mutationOptions({
      mutationKey: [...paymentKeys.pix(), 'create'],
      mutationFn: async (
        payload: CreatePixPaymentRequest,
      ): Promise<PixPayment> => {
        const response = await paymentService.createPixPayment(payload)

        return response.payment
      },
      onSuccess: (payment) => {
        queryClient.setQueryData(
          paymentQueries.pixDetail(payment.id).queryKey,
          payment,
        )
      },
      meta: { errorMessageKey: 'checkout:errors.createFailed' },
    }),

  /**
   * Dispara o endpoint que o banco chamara quando o Pix cair.
   * Optimistic update: o status muda na hora e volta atras se o servidor
   * recusar.
   */
  confirmPix: (queryClient: QueryClient, paymentId: string) => {
    const { queryKey } = paymentQueries.pixDetail(paymentId)

    return mutationOptions({
      mutationKey: [...paymentKeys.pixDetail(paymentId), 'confirm'],
      mutationFn: paymentService.confirmPixPayment,
      onMutate: async (): Promise<ConfirmMutationContext> => {
        await queryClient.cancelQueries({ queryKey })

        const previousPayment = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, (current) =>
          current ? { ...current, isPaid: true } : current,
        )

        return { previousPayment }
      },
      onError: (_error, _variables, context) => {
        if (context?.previousPayment) {
          queryClient.setQueryData(queryKey, context.previousPayment)
        }
      },
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey })
      },
      meta: {
        errorMessageKey: 'payment:errors.confirmFailed',
        successMessageKey: 'payment:success.confirmed',
      },
    })
  },
}
