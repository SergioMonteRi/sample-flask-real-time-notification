import { useTranslation } from 'react-i18next'

import { Receipt } from '@/components/organisms'

import { CheckoutForm, CheckoutSteps } from './components'
import {
  CheckoutLayout,
  FormColumn,
  IntroColumn,
  IntroDescription,
  IntroEyebrow,
  IntroHeading,
} from './styles'
import { useCheckout } from './use-checkout'

export function CheckoutPage() {
  const { t } = useTranslation('checkout')
  const { t: tCommon } = useTranslation('common')
  const { expirationMinutes } = useCheckout()

  return (
    <CheckoutLayout>
      <IntroColumn>
        <IntroEyebrow>{t('eyebrow')}</IntroEyebrow>
        <IntroHeading>{t('title')}</IntroHeading>
        <IntroDescription>
          {t('description', { minutes: expirationMinutes })}
        </IntroDescription>

        <CheckoutSteps />
      </IntroColumn>

      <FormColumn>
        <Receipt.Root>
          <Receipt.Header
            eyebrow={tCommon('brand.name')}
            serial={t('eyebrow')}
          />

          <Receipt.Section>
            <CheckoutForm />
          </Receipt.Section>

          <Receipt.Footer caption={tCommon('brand.receiptLabel')} />
        </Receipt.Root>
      </FormColumn>
    </CheckoutLayout>
  )
}
