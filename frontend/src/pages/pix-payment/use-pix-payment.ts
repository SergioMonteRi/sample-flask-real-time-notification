import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ROUTES } from '@/constants'
import type { CountdownState } from '@/hooks'
import { useCountdown } from '@/hooks'
import { isNotFoundError } from '@/services/http'
import type { PixPayment, PixPaymentStatus } from '@/services/payments'
import {
  useConfirmPixPaymentMutation,
  usePixPaymentQuery,
} from '@/services/payments'

interface UsePixPaymentReturn {
  paymentId: string
  payment: PixPayment | null
  status: PixPaymentStatus
  countdown: CountdownState
  isLoading: boolean
  isChecking: boolean
  isNotFound: boolean
  hasLoadError: boolean
  isConfirming: boolean
  handleSimulateConfirmation: () => void
  handleCopyError: () => void
  handleCreateNewPayment: () => void
}

const resolveStatus = (
  payment: PixPayment | null,
  hasExpired: boolean,
): PixPaymentStatus => {
  if (payment?.isPaid) return 'paid'
  if (hasExpired) return 'expired'

  return 'pending'
}

export const usePixPayment = (): UsePixPaymentReturn => {
  const { paymentId = '' } = useParams<{ paymentId: string }>()
  const { t } = useTranslation('payment')
  const navigate = useNavigate()

  const { data, error, isError, isLoading, isFetching } = usePixPaymentQuery({
    paymentId,
  })

  const payment = data?.payment ?? null
  const countdown = useCountdown({ targetDate: payment?.expirationDate })
  const status = resolveStatus(payment, countdown.hasExpired)

  const { mutate: confirmPayment, isPending: isConfirming } =
    useConfirmPixPaymentMutation(paymentId)

  const handleSimulateConfirmation = () => {
    confirmPayment(undefined, {
      onSuccess: () => toast.success(t('success.confirmed')),
      onError: () => toast.error(t('errors.confirmFailed')),
    })
  }

  const handleCopyError = () => toast.error(t('errors.copyFailed'))

  const handleCreateNewPayment = () => {
    void navigate(ROUTES.checkout)
  }

  return {
    paymentId,
    payment,
    status,
    countdown,
    isLoading,
    isChecking: isFetching,
    isNotFound: isError && isNotFoundError(error),
    hasLoadError: isError && !isNotFoundError(error),
    isConfirming,
    handleSimulateConfirmation,
    handleCopyError,
    handleCreateNewPayment,
  }
}
