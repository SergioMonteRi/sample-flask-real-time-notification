import { useQuery } from '@tanstack/react-query'

import { paymentQueries } from './payment.queries'

interface UsePixPaymentQueryParams {
  paymentId: string
  isEnabled?: boolean
  isRealtimeConnected?: boolean
}

export const usePixPaymentQuery = ({
  paymentId,
  isEnabled = true,
  isRealtimeConnected = false,
}: UsePixPaymentQueryParams) =>
  useQuery({
    ...paymentQueries.pixDetail(paymentId, { isRealtimeConnected }),
    enabled: isEnabled && Boolean(paymentId),
  })
