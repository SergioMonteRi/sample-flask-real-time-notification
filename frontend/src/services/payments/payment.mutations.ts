import type { QueryClient } from '@tanstack/react-query'
import { mutationOptions } from '@tanstack/react-query'

import { paymentKeys, paymentQueries } from './payment.queries'
import { paymentService } from './payment.service'
import type { CreatePixPaymentRequest, PixPayment } from './payment.types'

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
   * Bancada de testes: faz o papel do banco chamando `POST /webhooks/pix`.
   *
   * Sem optimistic update de proposito. Quem sabe que a cobranca foi paga e
   * o servidor, e ele avisa pelo socket — a resposta do webhook diz apenas
   * que a notificacao foi aceita. Antecipar `isPaid` aqui esconderia
   * justamente o caminho que esta tela existe para mostrar.
   */
  simulateBankWebhook: (queryClient: QueryClient, paymentId: string) => {
    const { queryKey } = paymentQueries.pixDetail(paymentId)

    return mutationOptions({
      mutationKey: [...paymentKeys.pixDetail(paymentId), 'webhook'],
      mutationFn: paymentService.sendPixWebhook,
      /* Rede de seguranca: se o canal estiver fora, a consulta resolve. */
      onSettled: () => {
        void queryClient.invalidateQueries({ queryKey })
      },
      meta: {
        errorMessageKey: 'payment:errors.webhookFailed',
        successMessageKey: 'payment:success.webhookSent',
      },
    })
  },
}
