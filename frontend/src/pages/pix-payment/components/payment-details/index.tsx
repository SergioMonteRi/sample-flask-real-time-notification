import { useTranslation } from 'react-i18next'

import { DetailRow } from '@/components/molecules'
import type { PixPayment, PixPaymentStatus } from '@/services/payments'
import { formatDateTime, maskIdentifier } from '@/utils'

import { DetailsList } from './styles'

type PaymentDetailsProps = {
  payment: PixPayment
  status: PixPaymentStatus
}

export function PaymentDetails({ payment, status }: PaymentDetailsProps) {
  const { t, i18n } = useTranslation('payment')

  return (
    <DetailsList>
      <DetailRow label={t('details.paymentId')}>
        {maskIdentifier(payment.id, 6)}
      </DetailRow>

      {payment.bankPaymentId && (
        <DetailRow label={t('details.bankPaymentId')}>
          {maskIdentifier(payment.bankPaymentId, 6)}
        </DetailRow>
      )}

      <DetailRow label={t('details.expiresAt')}>
        {formatDateTime(payment.expirationDate, i18n.resolvedLanguage)}
      </DetailRow>

      <DetailRow label={t('details.status')}>{t(`status.${status}`)}</DetailRow>
    </DetailsList>
  )
}
