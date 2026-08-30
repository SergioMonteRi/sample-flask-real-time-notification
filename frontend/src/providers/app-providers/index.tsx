import { QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { I18nextProvider } from 'react-i18next'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { i18n } from '@/i18n'
import { ToastProvider } from '@/providers/toast-provider'
import { GlobalStyles, theme } from '@/styles'

import { createQueryClient } from './query-client'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(createQueryClient)

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>{children}</BrowserRouter>
          <ToastProvider />
        </QueryClientProvider>
      </ThemeProvider>
    </I18nextProvider>
  )
}
