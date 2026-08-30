export const ROUTES = {
  checkout: '/',
  pixPayment: '/pagamentos/pix/:paymentId',
  notFound: '*',
} as const

export const buildPixPaymentRoute = (paymentId: string): string =>
  ROUTES.pixPayment.replace(':paymentId', paymentId)
