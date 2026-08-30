import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ROUTES } from '@/constants'
import type { CountdownState } from '@/hooks'
import { useCountdown } from '@/hooks'
import { isNotFoundError, normalizeApiError } from '@/services/http'
import type { PixPayment, PixPaymentStatus } from '@/services/payments'
import {
  useConfirmPixPaymentMutation,
  usePixPaymentQuery,
} from '@/services/payments'

interface UsePixPaymentReturn {
  payment: PixPayment | null
  status: PixPaymentStatus
  countdown: CountdownState
  isLoading: boolean
  isChecking: boolean
  isNotFound: boolean
  loadErrorMessage: string | null
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
  const { t: tErrors } = useTranslation('errors')
  const navigate = useNavigate()

  const { data, error, isError, isLoading, isFetching } = usePixPaymentQuery({
    paymentId,
  })

  const payment = data?.payment ?? null
  const countdown = useCountdown({ targetDate: payment?.expirationDate })
  const status = resolveStatus(payment, countdown.hasExpired)

  const { mutate: confirmPayment, isPending: isConfirming } =
    useConfirmPixPaymentMutation(paymentId)

  /* Sucesso e erro desta mutation saem do `meta`, no QueryClient. */
  const handleSimulateConfirmation = () => confirmPayment()

  const handleCopyError = () => toast.error(t('errors.copyFailed'))

  const handleCreateNewPayment = () => {
    void navigate(ROUTES.checkout)
  }

  const errorKind = isError ? normalizeApiError(error).kind : null

  return {
    payment,
    status,
    countdown,
    isLoading,
    isChecking: isFetching,
    isNotFound: isError && isNotFoundError(error),
    /* O erro de carga aparece inline no cartao, e nao como toast. */
    loadErrorMessage:
      errorKind && errorKind !== 'not-found'
        ? tErrors(errorKind === 'contract' ? 'contract' : 'network')
        : null,
    isConfirming,
    handleSimulateConfirmation,
    handleCopyError,
    handleCreateNewPayment,
  }
}
