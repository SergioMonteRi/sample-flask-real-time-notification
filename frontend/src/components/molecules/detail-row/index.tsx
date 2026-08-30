import type { ReactNode } from 'react'

import { RowLabel, RowValue, RowWrapper } from './styles'

type DetailRowProps = {
  label: string
  children: ReactNode
}

export function DetailRow({ label, children }: DetailRowProps) {
  return (
    <RowWrapper>
      <RowLabel>{label}</RowLabel>
      <RowValue>{children}</RowValue>
    </RowWrapper>
  )
}
