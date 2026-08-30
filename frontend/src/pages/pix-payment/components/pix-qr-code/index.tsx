import { QRCodeSVG } from 'qrcode.react'
import { useTranslation } from 'react-i18next'

import type { PixPaymentStatus } from '@/services/payments'
import { theme } from '@/styles'

import {
  PaidSeal,
  QrCanvas,
  QrCaption,
  QrFrame,
  ScanLine,
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

  return (
    <QrFrame $isPaid={isPaid}>
      <QrCanvas $isDimmed={status !== 'pending'}>
        <QRCodeSVG
          value={payload}
          size={196}
          level="M"
          marginSize={0}
          bgColor="transparent"
          fgColor={theme.colors.graphite}
          title={t('qrAlt')}
        />

        {status === 'pending' && <ScanLine aria-hidden="true" />}
      </QrCanvas>

      {isPaid && (
        <PaidSeal>
          <SealMark>
            <SealCheck aria-hidden="true">✓</SealCheck>
            {t('paid.stamp')}
          </SealMark>
        </PaidSeal>
      )}

      <QrCaption>{caption}</QrCaption>
    </QrFrame>
  )
}
