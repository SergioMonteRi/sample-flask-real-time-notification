import { BaseButton } from '@/components/atoms'

import {
  CopyHeader,
  CopyHint,
  CopyLabel,
  CopyWrapper,
  PayloadBox,
} from './styles'
import { useCopyField } from './use-copy-field'

type CopyFieldProps = {
  label: string
  hint?: string
  value: string
  copyLabel: string
  copiedLabel: string
  onCopyError: () => void
}

export function CopyField({
  label,
  hint,
  value,
  copyLabel,
  copiedLabel,
  onCopyError,
}: CopyFieldProps) {
  const { hasCopied, handleCopy } = useCopyField({ value, onCopyError })

  return (
    <CopyWrapper>
      <CopyHeader>
        <CopyLabel>{label}</CopyLabel>

        <BaseButton variant="link" size="sm" onClick={handleCopy}>
          {hasCopied ? `✓ ${copiedLabel}` : copyLabel}
        </BaseButton>
      </CopyHeader>

      <PayloadBox>{value}</PayloadBox>

      {hint && <CopyHint>{hint}</CopyHint>}
    </CopyWrapper>
  )
}
