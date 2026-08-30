import '@tanstack/react-query'

/**
 * Tipagem do `meta` de queries e mutations. Em vez de cada call site cablear
 * um toast, ele declara a chave de traducao e o QueryClient decide o que
 * fazer — ver `providers/app-providers/query-client.ts`.
 */
declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      errorMessageKey?: string
    }
    mutationMeta: {
      errorMessageKey?: string
      successMessageKey?: string
    }
  }
}
