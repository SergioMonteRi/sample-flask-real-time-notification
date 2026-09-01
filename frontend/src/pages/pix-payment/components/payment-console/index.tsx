import { useTranslation } from 'react-i18next'

import { APP } from '@/constants'

import {
  resolveChannelDotState,
  resolveCheckDotState,
} from './payment-console.utils'
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
  isRealtimeConnected: boolean
  statusLabel: string
}

export function PaymentConsole({
  isChecking,
  isListening,
  isRealtimeConnected,
  statusLabel,
}: PaymentConsoleProps) {
  const { t } = useTranslation('payment')

  const fallbackSeconds = Math.round(
    (isRealtimeConnected
      ? APP.paymentRealtimeFallbackIntervalMs
      : APP.paymentPollingIntervalMs) / 1000,
  )

  return (
    <ConsolePanel aria-live="polite">
      <ConsoleTitle>{t('details.status')}</ConsoleTitle>

      <ConsoleRow>
        <LiveDot $state={resolveCheckDotState(isChecking)} aria-hidden="true" />
        <ConsoleText>
          {isChecking ? t('listening.checking') : statusLabel}
        </ConsoleText>
      </ConsoleRow>

      {isListening && (
        <>
          <ConsoleRow>
            <LiveDot
              $state={resolveChannelDotState(isRealtimeConnected)}
              aria-hidden="true"
            />
            <ConsoleText>
              {isRealtimeConnected
                ? t('listening.channel.connected')
                : t('listening.channel.connecting')}
            </ConsoleText>
          </ConsoleRow>

          <ConsoleHint>
            {isRealtimeConnected
              ? t('listening.fallback', { seconds: fallbackSeconds })
              : t('listening.interval', { seconds: fallbackSeconds })}
          </ConsoleHint>
        </>
      )}
    </ConsolePanel>
  )
}
