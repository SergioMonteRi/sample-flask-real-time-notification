import { ErrorBoundary } from 'react-error-boundary'

import { AppShell, ErrorFallback } from '@/components/organisms'
import { AppProviders } from '@/providers'
import { AppRoutes } from '@/routes'

export function App() {
  return (
    <AppProviders>
      <AppShell>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <AppRoutes />
        </ErrorBoundary>
      </AppShell>
    </AppProviders>
  )
}
