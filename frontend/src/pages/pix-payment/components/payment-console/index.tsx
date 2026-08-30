import { useTranslation } from 'react-i18next'

import { APP } from '@/constants'

import {
  ConsoleHint,
  ConsolePanel,
  ConsoleRow,
  ConsoleText,
  ConsoleTitle,
  LiveDot,
} from './styles'

type PaymentConsoleProps = {
  isChecking: boolean
  isListening: boolean
  statusLabel: string
}

export function PaymentConsole({
  isChecking,
  isListening,
  statusLabel,
}: PaymentConsoleProps) {
  const { t } = useTranslation('payment')

  const pollingSeconds = Math.round(APP.paymentPollingIntervalMs / 1000)

  return (
    <ConsolePanel aria-live="polite">
      <ConsoleTitle>{t('details.status')}</ConsoleTitle>

      <ConsoleRow>
        <LiveDot $isActive={isChecking} aria-hidden="true" />
        <ConsoleText>
          {isChecking ? t('listening.checking') : statusLabel}
        </ConsoleText>
      </ConsoleRow>

      {isListening && (
        <ConsoleHint>
          {t('listening.interval', { seconds: pollingSeconds })}
        </ConsoleHint>
      )}
    </ConsolePanel>
  )
}
