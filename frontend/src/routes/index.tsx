import { Route, Routes } from 'react-router-dom'

import { ROUTES } from '@/constants'
import { CheckoutPage, NotFoundPage, PixPaymentPage } from '@/pages'

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.checkout} element={<CheckoutPage />} />
      <Route path={ROUTES.pixPayment} element={<PixPaymentPage />} />
      <Route path={ROUTES.notFound} element={<NotFoundPage />} />
    </Routes>
  )
}
