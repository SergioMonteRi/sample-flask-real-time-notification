import { useQuery } from '@tanstack/react-query'

import { paymentQueries } from './payment.queries'

interface UsePixPaymentQueryParams {
  paymentId: string
  isEnabled?: boolean
}

export const usePixPaymentQuery = ({
  paymentId,
  isEnabled = true,
}: UsePixPaymentQueryParams) =>
  useQuery({
    ...paymentQueries.pixDetail(paymentId),
    enabled: isEnabled && Boolean(paymentId),
  })
