import { useMutation, useQueryClient } from '@tanstack/react-query'

import { paymentMutations } from './payment.mutations'

export const useSimulateBankWebhookMutation = (paymentId: string) => {
  const queryClient = useQueryClient()

  return useMutation(
    paymentMutations.simulateBankWebhook(queryClient, paymentId),
  )
}
