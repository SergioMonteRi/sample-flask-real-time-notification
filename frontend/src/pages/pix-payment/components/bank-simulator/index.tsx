import { useTranslation } from 'react-i18next'

import { BaseButton } from '@/components/atoms'

import { SimulatorPanel, SimulatorText, SimulatorTitle } from './styles'

type BankSimulatorProps = {
  isConfirming: boolean
  isDisabled: boolean
  onConfirm: () => void
}

export function BankSimulator({
  isConfirming,
  isDisabled,
  onConfirm,
}: BankSimulatorProps) {
  const { t } = useTranslation('payment')

  return (
    <SimulatorPanel>
      <SimulatorTitle>{t('simulation.title')}</SimulatorTitle>
      <SimulatorText>{t('simulation.description')}</SimulatorText>

      <BaseButton
        variant="secondary"
        size="sm"
        isFullWidth
        isLoading={isConfirming}
        disabled={isDisabled}
        onClick={onConfirm}
      >
        {isConfirming ? t('simulation.running') : t('simulation.action')}
      </BaseButton>
    </SimulatorPanel>
  )
}
