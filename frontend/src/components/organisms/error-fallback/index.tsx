import { useTranslation } from 'react-i18next'

import { BaseBadge, BaseButton, BaseText } from '@/components/atoms'

import { Card } from '../card'
import { FallbackActions, FallbackWrapper } from './styles'

type ErrorFallbackProps = {
  resetErrorBoundary: () => void
}

export function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useTranslation('errors')
  const { t: tCommon } = useTranslation('common')

  return (
    <FallbackWrapper role="alert">
      <Card.Root>
        <Card.Header>
          <BaseText variant="micro" tone="faint">
            {tCommon('brand.name')}
          </BaseText>
          <BaseBadge label={t('boundary.badge')} tone="danger" />
        </Card.Header>

        <Card.Section>
          <BaseText as="h1" variant="title">
            {t('boundary.title')}
          </BaseText>
          <BaseText tone="muted">{t('boundary.description')}</BaseText>
        </Card.Section>

        <FallbackActions>
          <BaseButton onClick={resetErrorBoundary}>
            {tCommon('actions.retry')}
          </BaseButton>
        </FallbackActions>
      </Card.Root>
    </FallbackWrapper>
  )
}
