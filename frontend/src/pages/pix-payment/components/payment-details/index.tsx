import { useTranslation } from 'react-i18next'

import { ReceiptLine } from '@/components/molecules'
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
      <ReceiptLine label={t('details.paymentId')}>
        {maskIdentifier(payment.id, 6)}
      </ReceiptLine>

      {payment.bankPaymentId && (
        <ReceiptLine label={t('details.bankPaymentId')}>
          {maskIdentifier(payment.bankPaymentId, 6)}
        </ReceiptLine>
      )}

      <ReceiptLine label={t('details.expiresAt')}>
        {formatDateTime(payment.expirationDate, i18n.resolvedLanguage)}
      </ReceiptLine>

      <ReceiptLine label={t('details.status')}>
        {t(`status.${status}`)}
      </ReceiptLine>
    </DetailsList>
  )
}
