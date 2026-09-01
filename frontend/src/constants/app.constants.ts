export const APP = {
  defaultLocale: 'pt-BR',
  currency: 'BRL',
  /** O backend expira o Pix em 30 minutos (PaymentService.create_pix_payment). */
  pixExpirationMinutes: 30,
  /** Abaixo deste limite o contador entra em estado de alerta. */
  expirationWarningSeconds: 5 * 60,
  /** Intervalo de consulta enquanto o pagamento nao e confirmado. */
  paymentPollingIntervalMs: 5000,
  /**
   * Com o canal em tempo real ativo, a confirmacao chega pelo socket e a
   * consulta vira apenas rede de seguranca — por isso o intervalo folgado.
   */
  paymentRealtimeFallbackIntervalMs: 30000,
  httpTimeoutMs: 15000,
} as const
