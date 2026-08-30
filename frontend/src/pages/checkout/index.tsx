import { useTranslation } from 'react-i18next'

import { BaseText } from '@/components/atoms'
import { Card } from '@/components/organisms'

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
        <Card.Root>
          <Card.Header>
            <BaseText as="h2" variant="title">
              {t('amountLabel')}
            </BaseText>
          </Card.Header>

          <Card.Section>
            <CheckoutForm />
          </Card.Section>
        </Card.Root>
      </FormColumn>
    </CheckoutLayout>
  )
}
