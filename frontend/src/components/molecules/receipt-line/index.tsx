import type { ReactNode } from 'react'

import { LineLabel, LineLeader, LineValue, LineWrapper } from './styles'

type ReceiptLineProps = {
  label: string
  children: ReactNode
}

export function ReceiptLine({ label, children }: ReceiptLineProps) {
  return (
    <LineWrapper>
      <LineLabel>{label}</LineLabel>
      <LineLeader aria-hidden="true" />
      <LineValue>{children}</LineValue>
    </LineWrapper>
  )
}
