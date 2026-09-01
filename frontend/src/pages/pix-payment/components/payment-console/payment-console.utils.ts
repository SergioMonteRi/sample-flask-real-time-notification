export type ConsoleDotState = 'live' | 'waiting' | 'off'

export const resolveCheckDotState = (isChecking: boolean): ConsoleDotState =>
  isChecking ? 'live' : 'off'

/**
 * Enquanto a cobranca esta aberta, um canal fora do ar e um alerta — nao um
 * estado neutro. Por isso `waiting` em vez de `off`.
 */
export const resolveChannelDotState = (
  isRealtimeConnected: boolean,
): ConsoleDotState => (isRealtimeConnected ? 'live' : 'waiting')
