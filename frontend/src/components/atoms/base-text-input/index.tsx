import type { InputHTMLAttributes, Ref } from 'react'
import { useId } from 'react'

import {
  FieldLabel,
  FieldMessage,
  FieldWrapper,
  InputPrefix,
  InputShell,
  StyledInput,
} from './styles'

type BaseTextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> & {
  label?: string
  hint?: string
  errorMessage?: string
  prefix?: string
  ref?: Ref<HTMLInputElement>
}

export function BaseTextInput({
  label,
  hint,
  errorMessage,
  prefix,
  id,
  ref,
  ...inputProps
}: BaseTextInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const messageId = `${inputId}-message`

  const hasError = Boolean(errorMessage)
  const message = errorMessage ?? hint

  return (
    <FieldWrapper>
      {label && <FieldLabel htmlFor={inputId}>{label}</FieldLabel>}

      <InputShell $hasError={hasError}>
        {prefix && <InputPrefix aria-hidden="true">{prefix}</InputPrefix>}

        <StyledInput
          {...inputProps}
          id={inputId}
          ref={ref}
          aria-invalid={hasError}
          aria-describedby={message ? messageId : undefined}
        />
      </InputShell>

      {message && (
        <FieldMessage
          id={messageId}
          $hasError={hasError}
          role={hasError ? 'alert' : undefined}
        >
          {message}
        </FieldMessage>
      )}
    </FieldWrapper>
  )
}
