import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

import { ENV } from '@/config'

/**
 * Uma unica conexao Socket.IO para toda a aplicacao.
 *
 * O socket nasce desconectado: quem precisa dele chama `acquireSocket`, e a
 * conexao so cai quando o ultimo interessado devolve (`releaseSocket`). Sem
 * essa contagem, uma tela que desmonta derrubaria o canal de outra que ainda
 * esta ouvindo.
 */
let socket: Socket | null = null
let subscriberCount = 0

const createSocket = (): Socket =>
  io(ENV.socketUrl, {
    path: ENV.socketPath,
    autoConnect: false,
  })

export const acquireSocket = (): Socket => {
  socket ??= createSocket()
  subscriberCount += 1

  /* `connect()` e idempotente: nao reabre um socket ja conectado. */
  socket.connect()

  return socket
}

export const releaseSocket = (): void => {
  subscriberCount = Math.max(0, subscriberCount - 1)

  if (subscriberCount === 0) socket?.disconnect()
}
