import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { APP } from '@/constants'

import enUSCheckout from './locales/en-US/checkout.json'
import enUSCommon from './locales/en-US/common.json'
import enUSErrors from './locales/en-US/errors.json'
import enUSPayment from './locales/en-US/payment.json'
import ptBRCheckout from './locales/pt-BR/checkout.json'
import ptBRCommon from './locales/pt-BR/common.json'
import ptBRErrors from './locales/pt-BR/errors.json'
import ptBRPayment from './locales/pt-BR/payment.json'

export const SUPPORTED_LOCALES = ['pt-BR', 'en-US'] as const

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const resources = {
  'pt-BR': {
    common: ptBRCommon,
    checkout: ptBRCheckout,
    payment: ptBRPayment,
    errors: ptBRErrors,
  },
  'en-US': {
    common: enUSCommon,
    checkout: enUSCheckout,
    payment: enUSPayment,
    errors: enUSErrors,
  },
} as const

void i18n.use(initReactI18next).init({
  resources,
  lng: APP.defaultLocale,
  fallbackLng: APP.defaultLocale,
  supportedLngs: SUPPORTED_LOCALES,
  defaultNS: 'common',
  ns: ['common', 'checkout', 'payment', 'errors'],
  interpolation: { escapeValue: false },
})

export { i18n }
