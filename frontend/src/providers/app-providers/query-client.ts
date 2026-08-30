import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { i18n } from '@/i18n'

/**
 * Feedback de erro centralizado: quem dispara a chamada apenas declara
 * `meta.errorMessageKey`; a traducao e o toast acontecem aqui, uma vez so.
 */
const notifyError = (messageKey?: string) => {
  if (messageKey) toast.error(i18n.t(messageKey))
}

const notifySuccess = (messageKey?: string) => {
  if (messageKey) toast.success(i18n.t(messageKey))
}

export const createQueryClient = (): QueryClient =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (_error, query) => notifyError(query.meta?.errorMessageKey),
    }),
    mutationCache: new MutationCache({
      onError: (_error, _variables, _onMutateResult, mutation) =>
        notifyError(mutation.meta?.errorMessageKey),
      onSuccess: (_data, _variables, _onMutateResult, mutation) =>
        notifySuccess(mutation.meta?.successMessageKey),
    }),
    defaultOptions: {
      queries: {
        staleTime: 15_000,
        refetchOnWindowFocus: true,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  })
