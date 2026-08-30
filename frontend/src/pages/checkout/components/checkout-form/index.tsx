import { useTranslation } from 'react-i18next'

import { BaseButton, BaseTextInput } from '@/components/atoms'
import { formatAmount } from '@/utils'

import {
  FormElement,
  QuickAmountsLabel,
  QuickAmountsRow,
  QuickAmountsWrapper,
} from './styles'
import { useCheckoutForm } from './use-checkout-form'

export function CheckoutForm() {
  const { t } = useTranslation('checkout')

  const {
    amountField,
    quickAmounts,
    isPending,
    errorMessage,
    handleQuickAmount,
    handleSubmitForm,
  } = useCheckoutForm()

  return (
    <FormElement onSubmit={handleSubmitForm} noValidate>
      <BaseTextInput
        {...amountField}
        label={t('amountLabel')}
        placeholder={t('amountPlaceholder')}
        hint={t('amountHint')}
        errorMessage={errorMessage}
        prefix="R$"
        inputMode="numeric"
        autoComplete="off"
        autoFocus
      />

      <QuickAmountsWrapper>
        <QuickAmountsLabel>{t('quickAmounts')}</QuickAmountsLabel>

        <QuickAmountsRow>
          {quickAmounts.map((amount) => (
            <BaseButton
              key={amount}
              variant="paper"
              size="sm"
              onClick={() => handleQuickAmount(amount)}
            >
              {formatAmount(amount)}
            </BaseButton>
          ))}
        </QuickAmountsRow>
      </QuickAmountsWrapper>

      <BaseButton type="submit" isFullWidth isLoading={isPending}>
        {isPending ? t('submitting') : t('submit')}
      </BaseButton>
    </FormElement>
  )
}
