import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { acquireSocket, releaseSocket } from '@/services/realtime'

import { PIX_PAYMENT_EVENTS } from './payment.events'
import { paymentQueries } from './payment.queries'
import { paymentConfirmedEventSchema } from './payment.schemas'

interface UsePixPaymentRealtimeParams {
  paymentId: string
}

interface UsePixPaymentRealtimeReturn {
  isConnected: boolean
}

/**
 * Ponte entre o canal Socket.IO e o cache do TanStack Query.
 *
 * O socket nao vira estado de tela: quando a confirmacao chega, ela e
 * escrita na mesma `queryKey` que o resto da aplicacao ja observa. Assim a
 * origem do dado (consulta HTTP ou evento do banco) fica invisivel para a UI.
 */
export const usePixPaymentRealtime = ({
  paymentId,
}: UsePixPaymentRealtimeParams): UsePixPaymentRealtimeReturn => {
  const queryClient = useQueryClient()
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!paymentId) return

    const socket = acquireSocket()
    const { queryKey } = paymentQueries.pixDetail(paymentId)

    /* Cada (re)conexao ganha um novo sid, entao a sala precisa ser refeita. */
    const handleConnect = () => {
      setIsConnected(true)
      socket.emit(PIX_PAYMENT_EVENTS.join, { payment_id: paymentId })
    }

    const handleDisconnect = () => setIsConnected(false)

    const handleConfirmed = (payload: unknown) => {
      const event = paymentConfirmedEventSchema.safeParse(payload)

      if (!event.success || event.data.paymentId !== paymentId) return

      /* Pinta a confirmacao na hora e revalida com o servidor em seguida. */
      queryClient.setQueryData(queryKey, (current) =>
        current ? { ...current, isPaid: true } : current,
      )

      void queryClient.invalidateQueries({ queryKey })
    }

    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on(PIX_PAYMENT_EVENTS.confirmed, handleConfirmed)

    /* O socket e compartilhado: pode ja estar conectado ao montar a tela. */
    if (socket.connected) handleConnect()

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off(PIX_PAYMENT_EVENTS.confirmed, handleConfirmed)
      setIsConnected(false)
      releaseSocket()
    }
  }, [paymentId, queryClient])

  return { isConnected }
}
