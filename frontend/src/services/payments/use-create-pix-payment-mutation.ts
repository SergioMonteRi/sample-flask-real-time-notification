import { useMutation, useQueryClient } from '@tanstack/react-query'

import { paymentMutations } from './payment.mutations'

export const useCreatePixPaymentMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(paymentMutations.createPix(queryClient))
}
