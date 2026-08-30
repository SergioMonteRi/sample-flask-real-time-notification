import { REGEX } from '@/constants'

import { formatAmount, parseCurrencyToNumber } from './number.utils'

/** Mascara de digitacao de moeda: o usuario digita apenas digitos. */
export const maskCurrency = (value: string): string => {
  const digits = value.replace(REGEX.onlyDigits, '')

  if (!digits) return ''

  return formatAmount(parseCurrencyToNumber(digits))
}

/** Reduz um identificador longo a um formato legivel: "1f2e…9ac4". */
export const maskIdentifier = (value: string, visible = 4): string => {
  if (value.length <= visible * 2) return value

  return `${value.slice(0, visible)}…${value.slice(-visible)}`
}

/** Quebra o payload Pix em blocos, no estilo de um comprovante impresso. */
export const chunkPayload = (payload: string, size = 4): string[] =>
  payload.match(new RegExp(`.{1,${size}}`, 'g')) ?? []
