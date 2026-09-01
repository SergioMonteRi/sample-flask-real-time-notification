import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ROUTES } from '@/constants'
import type { CountdownState } from '@/hooks'
import { useCountdown } from '@/hooks'
import type { ApiErrorKind } from '@/services/http'
import { isNotFoundError, normalizeApiError } from '@/services/http'
import type { PixPayment, PixPaymentStatus } from '@/services/payments'
import {
  usePixPaymentQuery,
  usePixPaymentRealtime,
  useSimulateBankWebhookMutation,
} from '@/services/payments'

interface UsePixPaymentReturn {
  payment: PixPayment | null
  status: PixPaymentStatus
  countdown: CountdownState
  isLoading: boolean
  isChecking: boolean
  isNotFound: boolean
  isRealtimeConnected: boolean
  loadErrorMessage: string | null
  isConfirming: boolean
  canSimulateConfirmation: boolean
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

const resolveLoadErrorMessage = (
  errorKind: ApiErrorKind | null,
  tErrors: TFunction<'errors'>,
): string | null => {
  if (!errorKind || errorKind === 'not-found') return null
  if (errorKind === 'contract') return tErrors('contract')

  return tErrors('network')
}

export const usePixPayment = (): UsePixPaymentReturn => {
  const { paymentId = '' } = useParams<{ paymentId: string }>()
  const { t } = useTranslation('payment')
  const { t: tErrors } = useTranslation('errors')
  const navigate = useNavigate()

  /* Assina antes de consultar: a query usa o canal para dosar o polling. */
  const { isConnected: isRealtimeConnected } = usePixPaymentRealtime({
    paymentId,
  })

  const { data, error, isError, isLoading, isFetching } = usePixPaymentQuery({
    paymentId,
    isRealtimeConnected,
  })

  const payment = data ?? null
  const countdown = useCountdown({ targetDate: payment?.expirationDate })
  const status = resolveStatus(payment, countdown.hasExpired)

  const { mutate: sendWebhook, isPending: isConfirming } =
    useSimulateBankWebhookMutation(paymentId)

  /* O webhook e identificado pelo id do banco, nao pelo id da cobranca. */
  const bankPaymentId = payment?.bankPaymentId ?? null
  const canSimulateConfirmation = status === 'pending' && Boolean(bankPaymentId)

  /* Sucesso e erro desta mutation saem do `meta`, no QueryClient. */
  const handleSimulateConfirmation = () => {
    if (!bankPaymentId) return

    sendWebhook({ bankPaymentId })
  }

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
    isRealtimeConnected,
    loadErrorMessage: resolveLoadErrorMessage(errorKind, tErrors),
    isConfirming,
    canSimulateConfirmation,
    handleSimulateConfirmation,
    handleCopyError,
    handleCreateNewPayment,
  }
}
