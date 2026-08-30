import { queryOptions } from '@tanstack/react-query'

import { APP } from '@/constants'
import { isNotFoundError } from '@/services/http'
import { isExpired } from '@/utils'

import { paymentService } from './payment.service'
import type { PixPaymentDetail } from './payment.types'
import { paymentSnapshot } from './payment-snapshot.utils'

export const paymentKeys = {
  all: ['payments'] as const,
  pix: () => [...paymentKeys.all, 'pix'] as const,
  pixDetail: (paymentId: string) => [...paymentKeys.pix(), paymentId] as const,
}

const fetchPixPaymentDetail = async (
  paymentId: string,
): Promise<PixPaymentDetail> => {
  const response = await paymentService.getPixPayment(paymentId)

  if (response.payment) {
    return { paymentId, payment: response.payment, isFromLocalSnapshot: false }
  }

  /* Enquanto a rota for stub, o comprovante vem do snapshot da sessao. */
  const snapshot = paymentSnapshot.read(paymentId)

  return {
    paymentId,
    payment: snapshot,
    isFromLocalSnapshot: snapshot !== null,
  }
}

/**
 * `queryOptions` amarra queryKey e queryFn num objeto so: a chave passa a
 * carregar o tipo do dado, entao `setQueryData` infere sozinho e as duas
 * pontas nao tem como divergir.
 */
export const paymentQueries = {
  pixDetail: (paymentId: string) =>
    queryOptions({
      queryKey: paymentKeys.pixDetail(paymentId),
      queryFn: () => fetchPixPaymentDetail(paymentId),
      retry: (failureCount, error) =>
        !isNotFoundError(error) && failureCount < 2,
      /* Enquanto o banco nao confirma, o caixa reconsulta sozinho. */
      refetchInterval: (query) => {
        const payment = query.state.data?.payment

        if (!payment) return false
        if (payment.isPaid) return false
        if (isExpired(payment.expirationDate)) return false

        return APP.paymentPollingIntervalMs
      },
      /* Sem `meta.errorMessageKey`: esta tela mostra o erro inline, no
         proprio cartao, em vez de um toast. */
    }),
}
