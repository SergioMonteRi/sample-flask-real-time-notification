import { APP } from '@/constants'

/** Segundos restantes ate a data informada (nunca negativo). */
export const getSecondsUntil = (isoDate: string): number => {
  const diffInMs = new Date(isoDate).getTime() - Date.now()

  return Math.max(0, Math.floor(diffInMs / 1000))
}

/** Converte segundos em "MM:SS" (ou "HH:MM:SS" quando passa de uma hora). */
export const formatDuration = (totalSeconds: number): string => {
  const safeSeconds = Math.max(0, totalSeconds)

  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60

  const pad = (unit: number) => String(unit).padStart(2, '0')

  if (hours > 0) return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`

  return `${pad(minutes)}:${pad(seconds)}`
}

/** Data e hora completas, no formato do comprovante. */
export const formatDateTime = (
  isoDate: string,
  locale: string = APP.defaultLocale,
): string =>
  new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate))

export const isExpired = (isoDate: string): boolean =>
  getSecondsUntil(isoDate) === 0
