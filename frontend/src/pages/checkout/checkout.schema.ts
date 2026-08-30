import { z } from 'zod'

import { parseCurrencyToNumber } from '@/utils'

/** O backend guarda o valor em Numeric(10, 2). */
export const MAX_PAYMENT_VALUE = 99_999_999.99

/**
 * As mensagens sao chaves de traducao: quem renderiza decide o idioma,
 * e o schema segue sendo a unica fonte de verdade da validacao.
 */
export const checkoutSchema = z.object({
  amount: z
    .string()
    .trim()
    .min(1, { error: 'errors.required' })
    .refine((value) => parseCurrencyToNumber(value) > 0, {
      error: 'errors.min',
    })
    .refine((value) => parseCurrencyToNumber(value) <= MAX_PAYMENT_VALUE, {
      error: 'errors.max',
    }),
})

export type CheckoutFormData = z.infer<typeof checkoutSchema>
