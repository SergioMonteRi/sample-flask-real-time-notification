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

export const paymentQueries = {
  pixDetail: (paymentId: string) =>
    queryOptions({
      queryKey: paymentKeys.pixDetail(paymentId),
      queryFn: () => paymentService.getPixPayment(paymentId),
      retry: (failureCount, error) =>
        !isNotFoundError(error) && failureCount < 2,
      /* Enquanto o banco nao confirma, o caixa reconsulta sozinho. */
      refetchInterval: (query) => {
        const payment = query.state.data

        if (!payment) return false
        if (payment.isPaid) return false
        if (isExpired(payment.expirationDate)) return false

        return APP.paymentPollingIntervalMs
      },
    }),
}
