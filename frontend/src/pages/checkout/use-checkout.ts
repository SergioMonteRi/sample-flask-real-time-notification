import { APP } from '@/constants'

interface UseCheckoutReturn {
  expirationMinutes: number
}

export const useCheckout = (): UseCheckoutReturn => ({
  expirationMinutes: APP.pixExpirationMinutes,
})
