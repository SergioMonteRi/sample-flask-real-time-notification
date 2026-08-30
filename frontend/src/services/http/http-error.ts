import axios from 'axios'

export type ApiErrorKind = 'network' | 'not-found' | 'validation' | 'unexpected'

export interface NormalizedApiError {
  kind: ApiErrorKind
  status: number | null
  message: string
}

/**
 * Traduz qualquer erro em um formato estavel para a camada de hooks.
 * Nenhum detalhe tecnico daqui deve ser exibido ao usuario final.
 */
export const normalizeApiError = (error: unknown): NormalizedApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null

    if (!error.response) {
      return { kind: 'network', status, message: error.message }
    }

    if (status === 404) {
      return { kind: 'not-found', status, message: error.message }
    }

    if (status === 400 || status === 422) {
      return { kind: 'validation', status, message: error.message }
    }

    return { kind: 'unexpected', status, message: error.message }
  }

  if (error instanceof Error) {
    return { kind: 'unexpected', status: null, message: error.message }
  }

  return { kind: 'unexpected', status: null, message: String(error) }
}

export const isNotFoundError = (error: unknown): boolean =>
  normalizeApiError(error).kind === 'not-found'
