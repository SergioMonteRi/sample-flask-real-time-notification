import { queryOptions } from '@tanstack/react-query'

import { APP } from '@/constants'
import { isNotFoundError } from '@/services/http'
import { isExpired } from '@/utils'

import { paymentService } from './payment.service'

export const paymentKeys = {
  all: ['payments'] as const,
  pix: () => [...paymentKeys.all, 'pix'] as const,
  pixDetail: (paymentId: string) => [...paymentKeys.pix(), paymentId] as const,
}

interface PixDetailOptions {
  /** Nao entra na `queryKey`: muda apenas o ritmo do refetch. */
  isRealtimeConnected?: boolean
}

export const paymentQueries = {
  pixDetail: (
    paymentId: string,
    { isRealtimeConnected = false }: PixDetailOptions = {},
  ) =>
    queryOptions({
      queryKey: paymentKeys.pixDetail(paymentId),
      queryFn: () => paymentService.getPixPayment(paymentId),
      retry: (failureCount, error) =>
        !isNotFoundError(error) && failureCount < 2,
      /**
       * Enquanto o banco nao confirma, o caixa reconsulta sozinho. Com o
       * socket no ar quem avisa e o servidor, entao a consulta recua para o
       * papel de rede de seguranca — se o canal cair, o ritmo volta.
       */
      refetchInterval: (query) => {
        const payment = query.state.data

        if (!payment) return false
        if (payment.isPaid) return false
        if (isExpired(payment.expirationDate)) return false

        return isRealtimeConnected
          ? APP.paymentRealtimeFallbackIntervalMs
          : APP.paymentPollingIntervalMs
      },
    }),
}
