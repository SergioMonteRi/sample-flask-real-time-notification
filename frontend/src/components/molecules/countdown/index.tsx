import { Fragment } from 'react'

import { CountdownClock, CountdownLabel, CountdownWrapper } from './styles'

type CountdownProps = {
  label: string
  expiredLabel: string
  targetDate: string
  formattedTime: string
  hasExpired: boolean
  isCloseToExpiring: boolean
}

export function Countdown({
  label,
  expiredLabel,
  targetDate,
  formattedTime,
  hasExpired,
  isCloseToExpiring,
}: CountdownProps) {
  return (
    <CountdownWrapper>
      <CountdownLabel>{label}</CountdownLabel>

      <CountdownClock
        dateTime={targetDate}
        aria-live={isCloseToExpiring ? 'polite' : 'off'}
        $isCloseToExpiring={isCloseToExpiring}
        $hasExpired={hasExpired}
      >
        {hasExpired
          ? expiredLabel
          : formattedTime.split(':').map((unit, index) => (
              <Fragment key={`${unit}-${index}`}>
                {index > 0 && <span data-separator>:</span>}
                {unit}
              </Fragment>
            ))}
      </CountdownClock>
    </CountdownWrapper>
  )
}
