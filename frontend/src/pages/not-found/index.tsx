import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BaseButton, BaseStamp } from '@/components/atoms'
import { Receipt } from '@/components/organisms'
import { ROUTES } from '@/constants'

import {
  BlankLines,
  NotFoundLayout,
  ReceiptColumn,
  StampRow,
  VoidActions,
  VoidColumn,
  VoidDescription,
  VoidHeading,
  VoidNumber,
} from './styles'

export function NotFoundPage() {
  const { t } = useTranslation('errors')
  const { t: tCommon } = useTranslation('common')
  const navigate = useNavigate()

  const handleGoToCheckout = () => {
    void navigate(ROUTES.checkout)
  }

  return (
    <NotFoundLayout>
      <VoidColumn>
        <VoidNumber aria-hidden="true">404</VoidNumber>

        <VoidHeading>{t('notFound.title')}</VoidHeading>
        <VoidDescription>{t('notFound.description')}</VoidDescription>

        <VoidActions>
          <BaseButton onClick={handleGoToCheckout}>
            {tCommon('actions.newPayment')}
          </BaseButton>
        </VoidActions>
      </VoidColumn>

      <ReceiptColumn>
        <Receipt.Root>
          <Receipt.Header eyebrow={tCommon('brand.name')} serial="—" />

          <StampRow>
            <BaseStamp label={t('notFound.stamp')} tone="muted" isAnimated />
          </StampRow>

          <BlankLines aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </BlankLines>

          <Receipt.Divider />
          <Receipt.Footer caption={tCommon('brand.receiptLabel')} />
        </Receipt.Root>
      </ReceiptColumn>
    </NotFoundLayout>
  )
}
