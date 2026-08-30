import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

import type { PixPaymentStatus } from '@/services/payments'
import { theme } from '@/styles'

import {
  PaidSeal,
  QrCanvas,
  QrCaption,
  QrFrame,
  SealCheck,
  SealMark,
} from './styles'

type PixQrCodeProps = {
  payload: string
  status: PixPaymentStatus
  caption: string
}

export function PixQrCode({ payload, status, caption }: PixQrCodeProps) {
  const { t } = useTranslation('payment')

  const isPaid = status === 'paid'
  const isPending = status === 'pending'

  return (
    <QrFrame>
      <QrCanvas $isDimmed={status !== 'pending'}>
        <QRCodeSVG
          value={payload}
          size={188}
          level="M"
          marginSize={0}
          bgColor="transparent"
          fgColor={theme.colors.text}
          title={t('qrAlt')}
        />
      </QrCanvas>

      {isPaid && (
        <PaidSeal>
          <SealMark>
            <SealCheck aria-hidden="true">✓</SealCheck>
          </SealMark>
        </PaidSeal>
      )}

      {isPending && <QrCaption>{caption}</QrCaption>}
    </QrFrame>
  )
}
