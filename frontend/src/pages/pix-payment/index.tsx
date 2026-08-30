import { Trans, useTranslation } from 'react-i18next'

import { BaseButton, BaseSpinner } from '@/components/atoms'
import { CopyField, Countdown, StatusStamp } from '@/components/molecules'
import { Receipt } from '@/components/organisms'
import { maskIdentifier } from '@/utils'

import { NotFoundPage } from '../not-found'
import {
  BankSimulator,
  PaymentAmount,
  PaymentConsole,
  PaymentDetails,
  PaymentNotice,
  PixQrCode,
} from './components'
import {
  AsideActions,
  AsideColumn,
  AsideDescription,
  AsideHeading,
  LoadingPanel,
  PaymentLayout,
  ReceiptColumn,
  StatusRow,
} from './styles'
import { usePixPayment } from './use-pix-payment'

export function PixPaymentPage() {
  const { t } = useTranslation('payment')
  const { t: tCommon } = useTranslation('common')
  const { t: tErrors } = useTranslation('errors')

  const {
    paymentId,
    payment,
    status,
    countdown,
    isLoading,
    isChecking,
    isNotFound,
    hasLoadError,
    isConfirming,
    handleSimulateConfirmation,
    handleCopyError,
    handleCreateNewPayment,
  } = usePixPayment()

  if (isNotFound) return <NotFoundPage />

  if (isLoading) {
    return (
      <LoadingPanel>
        <BaseSpinner label={tCommon('loading')} />
        {tCommon('loading')}
      </LoadingPanel>
    )
  }

  return (
    <PaymentLayout>
      <ReceiptColumn>
        <Receipt.Root>
          <Receipt.Header
            eyebrow={t('eyebrow')}
            serial={maskIdentifier(paymentId, 4)}
          />

          {payment?.pixPayload ? (
            <PixQrCode
              payload={payment.pixPayload}
              status={status}
              caption={t('qrCaption')}
            />
          ) : (
            <PaymentNotice
              title={t('missingPayload.title')}
              description={t('missingPayload.description')}
            />
          )}

          {hasLoadError && (
            <PaymentNotice
              tone="danger"
              title={t('errors.loadFailed')}
              description={tErrors('network')}
            />
          )}

          {payment && <PaymentAmount value={payment.value} />}

          {payment && (
            <StatusRow>
              {status !== 'paid' && (
                <Countdown
                  label={t('countdown.label')}
                  expiredLabel={t('countdown.expired')}
                  targetDate={payment.expirationDate}
                  formattedTime={countdown.formattedTime}
                  hasExpired={countdown.hasExpired}
                  isCloseToExpiring={countdown.isCloseToExpiring}
                />
              )}

              <StatusStamp status={status} label={t(`status.${status}`)} />
            </StatusRow>
          )}

          {payment && (
            <>
              <Receipt.Divider label={t('details.title')} />
              <PaymentDetails payment={payment} status={status} />
            </>
          )}

          {payment?.pixPayload && (
            <>
              <Receipt.Divider />
              <CopyField
                label={t('copyPaste.label')}
                hint={t('copyPaste.hint')}
                value={payment.pixPayload}
                copyLabel={tCommon('actions.copy')}
                copiedLabel={tCommon('actions.copied')}
                onCopyError={handleCopyError}
              />
            </>
          )}

          <Receipt.Footer caption={tCommon('brand.receiptLabel')} />
        </Receipt.Root>
      </ReceiptColumn>

      <AsideColumn>
        <AsideHeading>{t(`${status}.title`)}</AsideHeading>

        <AsideDescription>
          <Trans
            t={t}
            i18nKey={`${status}.description`}
            components={[<strong key="highlight" />]}
          />
        </AsideDescription>

        <PaymentConsole
          isChecking={isChecking}
          isListening={status === 'pending'}
          statusLabel={t(`status.${status}`)}
        />

        <BankSimulator
          isConfirming={isConfirming}
          isDisabled={status !== 'pending'}
          onConfirm={handleSimulateConfirmation}
        />

        <AsideActions>
          <BaseButton
            variant="ghost"
            size="sm"
            onClick={handleCreateNewPayment}
          >
            {tCommon('actions.newPayment')}
          </BaseButton>
        </AsideActions>
      </AsideColumn>
    </PaymentLayout>
  )
}
