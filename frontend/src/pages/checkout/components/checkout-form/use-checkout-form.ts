import { zodResolver } from '@hookform/resolvers/zod'
import type { ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { buildPixPaymentRoute } from '@/constants'
import { useCreatePixPaymentMutation } from '@/services/payments'
import { formatCurrency, maskCurrency, parseCurrencyToNumber } from '@/utils'

import type { CheckoutFormData } from '../../checkout.schema'
import { checkoutSchema, MAX_PAYMENT_VALUE } from '../../checkout.schema'

export const QUICK_AMOUNTS = [29.9, 87.5, 287.9] as const

export const useCheckoutForm = () => {
  const { t } = useTranslation('checkout')
  const navigate = useNavigate()

  const { register, handleSubmit, setValue, formState } =
    useForm<CheckoutFormData>({
      resolver: zodResolver(checkoutSchema),
      defaultValues: { amount: '' },
      mode: 'onSubmit',
    })

  const { mutate: createPixPayment, isPending } = useCreatePixPaymentMutation()

  const amountField = register('amount')

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('amount', maskCurrency(event.target.value), {
      shouldValidate: formState.isSubmitted,
    })
  }

  const handleQuickAmount = (amount: number) => {
    setValue('amount', maskCurrency(String(Math.round(amount * 100))), {
      shouldValidate: formState.isSubmitted,
    })
  }

  const handleCreatePayment = ({ amount }: CheckoutFormData) => {
    createPixPayment(
      { value: parseCurrencyToNumber(amount) },
      {
        onSuccess: (payment) => {
          void navigate(buildPixPaymentRoute(payment.id))
        },
        onError: () => toast.error(t('errors.createFailed')),
      },
    )
  }

  const errorKey = formState.errors.amount?.message

  return {
    amountField: { ...amountField, onChange: handleAmountChange },
    quickAmounts: QUICK_AMOUNTS,
    isPending,
    errorMessage: errorKey
      ? t(errorKey, { max: formatCurrency(MAX_PAYMENT_VALUE) })
      : undefined,
    handleQuickAmount,
    handleSubmitForm: handleSubmit(handleCreatePayment),
  }
}
