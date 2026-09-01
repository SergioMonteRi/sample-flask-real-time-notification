/**
 * Eventos do canal Socket.IO do backend (`backend/sockets/payment.py`).
 * As strings ficam aqui para que UI e hooks nunca as repitam soltas.
 */
export const PIX_PAYMENT_EVENTS = {
  /** Entra na sala `payment:<id>`; o backend espera `{ payment_id }`. */
  join: 'join-payment',
  /** Emitido pelo servico assim que o banco confirma a cobranca. */
  confirmed: 'payment-confirmed',
} as const
