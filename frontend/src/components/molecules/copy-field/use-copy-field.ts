import { useEffect, useState } from 'react'

import { copyToClipboard } from '@/utils'

interface UseCopyFieldParams {
  value: string
  onCopyError: () => void
}

interface UseCopyFieldReturn {
  hasCopied: boolean
  handleCopy: () => Promise<void>
}

const COPIED_FEEDBACK_MS = 2200

export const useCopyField = ({
  value,
  onCopyError,
}: UseCopyFieldParams): UseCopyFieldReturn => {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    if (!hasCopied) return

    const timeoutId = window.setTimeout(
      () => setHasCopied(false),
      COPIED_FEEDBACK_MS,
    )

    return () => window.clearTimeout(timeoutId)
  }, [hasCopied])

  const handleCopy = async () => {
    try {
      await copyToClipboard(value)
      setHasCopied(true)
    } catch {
      onCopyError()
    }
  }

  return { hasCopied, handleCopy }
}
