import { useTranslation } from 'react-i18next'

import { BaseButton, BaseStamp, BaseText } from '@/components/atoms'

import { Receipt } from '../receipt'
import { FallbackActions, FallbackWrapper, StampRow } from './styles'

type ErrorFallbackProps = {
  resetErrorBoundary: () => void
}

export function ErrorFallback({ resetErrorBoundary }: ErrorFallbackProps) {
  const { t } = useTranslation('errors')
  const { t: tCommon } = useTranslation('common')

  return (
    <FallbackWrapper role="alert">
      <Receipt.Root>
        <Receipt.Header eyebrow={tCommon('brand.name')} serial="ERR" />

        <StampRow>
          <BaseStamp label={t('boundary.stamp')} tone="accent" isAnimated />
        </StampRow>

        <Receipt.Section>
          <BaseText as="h1" variant="title">
            {t('boundary.title')}
          </BaseText>
          <BaseText tone="inkSoft">{t('boundary.description')}</BaseText>
        </Receipt.Section>

        <FallbackActions>
          <BaseButton onClick={resetErrorBoundary}>
            {tCommon('actions.retry')}
          </BaseButton>
        </FallbackActions>

        <Receipt.Footer caption={tCommon('brand.receiptLabel')} />
      </Receipt.Root>
    </FallbackWrapper>
  )
}
