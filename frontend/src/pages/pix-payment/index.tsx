import { Trans, useTranslation } from 'react-i18next'

import { BaseButton, BaseSpinner, BaseText } from '@/components/atoms'
import { CopyField, Countdown, StatusBadge } from '@/components/molecules'
import { Card } from '@/components/organisms'

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
  CardColumn,
  LoadingPanel,
  PaymentLayout,
  StatusRow,
} from './styles'
import { usePixPayment } from './use-pix-payment'

export function PixPaymentPage() {
  const { t } = useTranslation('payment')
  const { t: tCommon } = useTranslation('common')

  const {
    payment,
    status,
    countdown,
    isLoading,
    isChecking,
    isNotFound,
    loadErrorMessage,
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
      <CardColumn>
        <Card.Root>
          <Card.Header>
            <BaseText variant="micro" tone="faint">
              {t('eyebrow')}
            </BaseText>
            <StatusBadge status={status} label={t(`status.${status}`)} />
          </Card.Header>

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

          {loadErrorMessage && (
            <PaymentNotice
              tone="danger"
              title={t('errors.loadFailed')}
              description={loadErrorMessage}
            />
          )}

          {payment && <PaymentAmount value={payment.value} />}

          {payment && status !== 'paid' && (
            <StatusRow>
              <Countdown
                label={t('countdown.label')}
                expiredLabel={t('countdown.expired')}
                targetDate={payment.expirationDate}
                formattedTime={countdown.formattedTime}
                hasExpired={countdown.hasExpired}
                isCloseToExpiring={countdown.isCloseToExpiring}
              />
            </StatusRow>
          )}

          {payment?.pixPayload && status === 'pending' && (
            <>
              <Card.Divider />
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

          {payment && (
            <>
              <Card.Divider />
              <PaymentDetails payment={payment} status={status} />
            </>
          )}
        </Card.Root>
      </CardColumn>

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
            variant="secondary"
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
