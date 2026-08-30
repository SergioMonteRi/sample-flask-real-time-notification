import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { BaseBadge, BaseButton } from '@/components/atoms'
import { ROUTES } from '@/constants'

import {
  NotFoundContent,
  NotFoundLayout,
  VoidActions,
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
      <NotFoundContent>
        <VoidNumber aria-hidden="true">404</VoidNumber>

        <BaseBadge label={t('notFound.badge')} tone="neutral" />

        <VoidHeading>{t('notFound.title')}</VoidHeading>
        <VoidDescription>{t('notFound.description')}</VoidDescription>

        <VoidActions>
          <BaseButton onClick={handleGoToCheckout}>
            {tCommon('actions.newPayment')}
          </BaseButton>
        </VoidActions>
      </NotFoundContent>
    </NotFoundLayout>
  )
}
