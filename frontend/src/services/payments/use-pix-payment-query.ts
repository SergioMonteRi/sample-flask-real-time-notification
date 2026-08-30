import { useQuery } from '@tanstack/react-query'

import { APP } from '@/constants'
import { isNotFoundError } from '@/services/http'
import { isExpired } from '@/utils'

import { mapPixPayment } from './payment.mapper'
import { paymentQueryKeys } from './payment.query-keys'
import { paymentService } from './payment.service'
import type { PixPaymentDetail } from './payment.types'
import { paymentSnapshot } from './payment-snapshot.utils'

interface UsePixPaymentQueryParams {
  paymentId: string
  isEnabled?: boolean
}

export const usePixPaymentQuery = ({
  paymentId,
  isEnabled = true,
}: UsePixPaymentQueryParams) =>
  useQuery<PixPaymentDetail>({
    queryKey: paymentQueryKeys.pixDetail(paymentId),
    enabled: isEnabled && Boolean(paymentId),
    queryFn: async () => {
      const response = await paymentService.getPixPayment(paymentId)

      if (response.payment) {
        return {
          paymentId,
          payment: mapPixPayment(response.payment),
          isFromLocalSnapshot: false,
        }
      }

      /* Enquanto a rota for stub, o comprovante vem do snapshot da sessao. */
      const snapshot = paymentSnapshot.read(paymentId)

      return {
        paymentId,
        payment: snapshot,
        isFromLocalSnapshot: snapshot !== null,
      }
    },
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 2,
    /* Enquanto o banco nao confirma, o caixa reconsulta sozinho. */
    refetchInterval: (query) => {
      const payment = query.state.data?.payment

      if (!payment) return false
      if (payment.isPaid) return false
      if (isExpired(payment.expirationDate)) return false

      return APP.paymentPollingIntervalMs
    },
  })
