import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

import { paymentKeys, paymentQueries } from './payment.queries'
import { paymentService } from './payment.service'
import type {
  CreatePixPaymentRequest,
  PixPayment,
  PixPaymentDetail,
} from './payment.types'
import { paymentSnapshot } from './payment-snapshot.utils'

interface ConfirmMutationContext {
  previousDetail: PixPaymentDetail | undefined
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
        /* Semeia o cache para que o cartao abra sem um segundo request. */
        paymentSnapshot.save(payment)

        queryClient.setQueryData(
          paymentQueries.pixDetail(payment.id).queryKey,
          {
            paymentId: payment.id,
            payment,
            isFromLocalSnapshot: false,
          },
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

        const previousDetail = queryClient.getQueryData(queryKey)

        queryClient.setQueryData(queryKey, (current) =>
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
      meta: {
        errorMessageKey: 'payment:errors.confirmFailed',
        successMessageKey: 'payment:success.confirmed',
      },
    })
  },
}
