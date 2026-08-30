import { useMutation, useQueryClient } from '@tanstack/react-query'

import { paymentMutations } from './payment.mutations'

export const useConfirmPixPaymentMutation = (paymentId: string) => {
  const queryClient = useQueryClient()

  return useMutation(paymentMutations.confirmPix(queryClient, paymentId))
}
