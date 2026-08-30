import { useEffect, useState } from 'react'

import { APP } from '@/constants'
import { formatDuration, getSecondsUntil } from '@/utils'

interface UseCountdownParams {
  targetDate: string | undefined
}

export interface CountdownState {
  secondsLeft: number
  formattedTime: string
  hasExpired: boolean
  isCloseToExpiring: boolean
}

const readSecondsLeft = (targetDate: string | undefined): number =>
  targetDate ? getSecondsUntil(targetDate) : 0

/**
 * Contador regressivo local. Nao consulta a API: apenas reflete a
 * `expiration_date` que o backend ja devolveu, e faz a tela reagir
 * no segundo em que o prazo termina.
 */
export const useCountdown = ({
  targetDate,
}: UseCountdownParams): CountdownState => {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    readSecondsLeft(targetDate),
  )
  const [trackedDate, setTrackedDate] = useState(targetDate)

  /* Ajuste de estado durante o render: evita um frame com o prazo antigo. */
  if (trackedDate !== targetDate) {
    setTrackedDate(targetDate)
    setSecondsLeft(readSecondsLeft(targetDate))
  }

  useEffect(() => {
    if (!targetDate) return

    const intervalId = window.setInterval(() => {
      const remaining = getSecondsUntil(targetDate)

      setSecondsLeft(remaining)

      if (remaining === 0) window.clearInterval(intervalId)
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetDate])

  return {
    secondsLeft,
    formattedTime: formatDuration(secondsLeft),
    hasExpired: Boolean(targetDate) && secondsLeft === 0,
    isCloseToExpiring:
      secondsLeft > 0 && secondsLeft <= APP.expirationWarningSeconds,
  }
}
