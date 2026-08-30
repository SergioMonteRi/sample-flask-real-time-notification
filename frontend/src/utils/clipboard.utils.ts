/** Copia um texto para a area de transferencia, com fallback para http. */
export const copyToClipboard = async (text: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)

    return
  }

  const textArea = document.createElement('textarea')

  textArea.value = text
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'

  document.body.appendChild(textArea)
  textArea.select()

  try {
    const hasCopied = document.execCommand('copy')

    if (!hasCopied) throw new Error('Clipboard command was rejected')
  } finally {
    document.body.removeChild(textArea)
  }
}
