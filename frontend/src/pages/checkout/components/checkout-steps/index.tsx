import { useTranslation } from 'react-i18next'

import {
  StepItem,
  StepsList,
  StepsTitle,
  StepsWrapper,
  StepText,
} from './styles'

const STEP_KEYS = ['steps.one', 'steps.two', 'steps.three'] as const

export function CheckoutSteps() {
  const { t } = useTranslation('checkout')

  return (
    <StepsWrapper>
      <StepsTitle>{t('steps.title')}</StepsTitle>

      <StepsList>
        {STEP_KEYS.map((stepKey) => (
          <StepItem key={stepKey}>
            <StepText>{t(stepKey)}</StepText>
          </StepItem>
        ))}
      </StepsList>
    </StepsWrapper>
  )
}
