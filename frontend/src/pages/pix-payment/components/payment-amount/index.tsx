import { useTranslation } from 'react-i18next'

import { formatAmount } from '@/utils'

import { AmountLabel, AmountRow, AmountValue } from './styles'

type PaymentAmountProps = {
  value: number
}

export function PaymentAmount({ value }: PaymentAmountProps) {
  const { t, i18n } = useTranslation('payment')

  return (
    <AmountRow>
      <AmountLabel>{t('amountLabel')}</AmountLabel>

      <AmountValue>
        <small>R$</small>
        {formatAmount(value, i18n.resolvedLanguage)}
      </AmountValue>
    </AmountRow>
  )
}
