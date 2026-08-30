import styled, { css } from 'styled-components'

import { microLabel } from '@/styles'

export type BaseTextVariant =
  'hero' | 'display' | 'title' | 'body' | 'label' | 'micro' | 'data' | 'amount'

export type BaseTextTone =
  | 'ink'
  | 'inkSoft'
  | 'inkFaint'
  | 'paper'
  | 'paperSoft'
  | 'accent'
  | 'success'
  | 'warning'

interface StyledTextProps {
  $variant: BaseTextVariant
  $tone: BaseTextTone
  $align?: 'left' | 'center' | 'right'
  $isItalic?: boolean
}

const variantStyles = {
  hero: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.hero};
    line-height: 0.82;
    letter-spacing: -0.03em;
  `,
  display: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.display};
    line-height: 0.98;
    letter-spacing: -0.015em;
  `,
  title: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    line-height: 1.1;
  `,
  body: css`
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: 1.7;
  `,
  label: css`
    ${microLabel};
    font-size: ${({ theme }) => theme.fontSizes.xs};
    letter-spacing: 0.14em;
  `,
  micro: css`
    ${microLabel};
  `,
  data: css`
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01em;
  `,
  amount: css`
    font-family: ${({ theme }) => theme.fonts.display};
    font-size: ${({ theme }) => theme.fontSizes.display};
    font-variant-numeric: tabular-nums lining-nums;
    line-height: 1;
    letter-spacing: -0.02em;
  `,
} as const satisfies Record<BaseTextVariant, ReturnType<typeof css>>

const toneStyles = {
  ink: css`
    color: ${({ theme }) => theme.colors.graphite};
  `,
  inkSoft: css`
    color: ${({ theme }) => theme.colors.graphiteSoft};
  `,
  inkFaint: css`
    color: ${({ theme }) => theme.colors.graphiteFaint};
  `,
  paper: css`
    color: ${({ theme }) => theme.colors.onInk};
  `,
  paperSoft: css`
    color: ${({ theme }) => theme.colors.onInkSoft};
  `,
  accent: css`
    color: ${({ theme }) => theme.colors.vermilion};
  `,
  success: css`
    color: ${({ theme }) => theme.colors.moss};
  `,
  warning: css`
    color: ${({ theme }) => theme.colors.amber};
  `,
} as const satisfies Record<BaseTextTone, ReturnType<typeof css>>

export const StyledText = styled.span<StyledTextProps>`
  display: block;
  margin: 0;
  text-align: ${({ $align }) => $align ?? 'inherit'};
  font-style: ${({ $isItalic }) => ($isItalic ? 'italic' : 'normal')};

  ${({ $variant }) => variantStyles[$variant]};
  ${({ $tone }) => toneStyles[$tone]};
`
