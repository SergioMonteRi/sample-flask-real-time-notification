/* eslint-disable react-refresh/only-export-components --
   Composition Pattern: este arquivo exporta o objeto `Receipt`, e nao
   componentes soltos. O Fast Refresh nao consegue rastrear esse formato. */
import type { ReactNode } from 'react'

import { BaseDivider } from '@/components/atoms'

import {
  BarcodeCaption,
  BarcodeStrip,
  ReceiptBodySection,
  ReceiptEyebrow,
  ReceiptFooterRow,
  ReceiptHeaderRow,
  ReceiptPaper,
  ReceiptRootWrapper,
  ReceiptSerial,
} from './styles'

type WithChildren = { children: ReactNode }

function Root({ children }: WithChildren) {
  return (
    <ReceiptRootWrapper>
      <ReceiptPaper>{children}</ReceiptPaper>
    </ReceiptRootWrapper>
  )
}

type HeaderProps = {
  eyebrow: string
  serial?: string
}

function Header({ eyebrow, serial }: HeaderProps) {
  return (
    <ReceiptHeaderRow>
      <ReceiptEyebrow>{eyebrow}</ReceiptEyebrow>
      {serial && <ReceiptSerial>{serial}</ReceiptSerial>}
    </ReceiptHeaderRow>
  )
}

function Section({ children }: WithChildren) {
  return <ReceiptBodySection>{children}</ReceiptBodySection>
}

function Divider({ label }: { label?: string }) {
  return <BaseDivider label={label} />
}

function Footer({ caption }: { caption: string }) {
  return (
    <ReceiptFooterRow>
      <BarcodeStrip aria-hidden="true" />
      <BarcodeCaption>{caption}</BarcodeCaption>
    </ReceiptFooterRow>
  )
}

/**
 * Composition Pattern: cada parte do comprovante e montada pela pagina,
 * sem uma lista crescente de props no componente raiz.
 */
export const Receipt = {
  Root,
  Header,
  Section,
  Divider,
  Footer,
}
