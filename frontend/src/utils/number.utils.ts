import { APP, REGEX } from '@/constants'

/** Converte "R$ 1.234,56" (ou "1234,56") em 1234.56. */
export const parseCurrencyToNumber = (value: string): number => {
  const digits = value.replace(REGEX.onlyDigits, '')

  if (!digits) return 0

  return Number(digits) / 100
}

/** Formata um numero como moeda no locale informado. */
export const formatCurrency = (
  value: number,
  locale: string = APP.defaultLocale,
): string =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: APP.currency,
  }).format(value)

/** Formata apenas a parte numerica, sem o simbolo da moeda. */
export const formatAmount = (
  value: number,
  locale: string = APP.defaultLocale,
): string =>
  new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
