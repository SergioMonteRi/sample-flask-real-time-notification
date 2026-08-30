import { STORAGE_KEYS } from '@/constants'
import { sessionStorageUtils } from '@/utils'

import type { PixPayment } from './payment.types'

/**
 * Ponte temporaria: guarda o pagamento devolvido pelo POST para que o
 * comprovante sobreviva a um reload enquanto o GET nao devolver o objeto
 * completo. Some inteiro quando o backend implementar a rota.
 */
type SnapshotMap = Record<string, PixPayment>

const readAll = (): SnapshotMap =>
  sessionStorageUtils.get<SnapshotMap>(STORAGE_KEYS.pixPaymentSnapshot) ?? {}

export const paymentSnapshot = {
  save(payment: PixPayment): void {
    sessionStorageUtils.set(STORAGE_KEYS.pixPaymentSnapshot, {
      ...readAll(),
      [payment.id]: payment,
    })
  },

  read(paymentId: string): PixPayment | null {
    return readAll()[paymentId] ?? null
  },

  markAsPaid(paymentId: string): PixPayment | null {
    const snapshots = readAll()
    const payment = snapshots[paymentId]

    if (!payment) return null

    const paidPayment: PixPayment = { ...payment, isPaid: true }

    sessionStorageUtils.set(STORAGE_KEYS.pixPaymentSnapshot, {
      ...snapshots,
      [paymentId]: paidPayment,
    })

    return paidPayment
  },
}
