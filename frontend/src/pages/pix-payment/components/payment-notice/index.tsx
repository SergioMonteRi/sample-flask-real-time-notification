import type { NoticeTone } from './styles'
import { NoticeBox, NoticeText, NoticeTitle } from './styles'

type PaymentNoticeProps = {
  title: string
  description: string
  tone?: NoticeTone
}

export function PaymentNotice({
  title,
  description,
  tone = 'info',
}: PaymentNoticeProps) {
  return (
    <NoticeBox $tone={tone} role="status">
      <NoticeTitle>{title}</NoticeTitle>
      <NoticeText>{description}</NoticeText>
    </NoticeBox>
  )
}

export type { NoticeTone }
