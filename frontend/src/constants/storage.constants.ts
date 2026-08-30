export const STORAGE_KEYS = {
  /**
   * Snapshot local do pagamento recem-criado.
   *
   * Necessario apenas enquanto `GET /payments/pix/<id>` devolver somente
   * `{ message, payment_id }`. Quando a rota passar a retornar o pagamento
   * completo, esta chave e o `payment-snapshot.utils` podem ser removidos.
   */
  pixPaymentSnapshot: '@caixa-pix:payment-snapshot',
} as const
