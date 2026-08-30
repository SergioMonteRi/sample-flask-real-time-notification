import { createGlobalStyle } from 'styled-components'

import { microLabel } from '@/styles'

/** Sonner e headless aqui: a aparencia vem toda do tema do terminal. */
export const ToastStyles = createGlobalStyle`
  [data-sonner-toast] {
    ${microLabel};

    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    width: 100%;
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    border: 1px solid ${({ theme }) => theme.colors.graphite};
    border-radius: ${({ theme }) => theme.radii.sm};
    background-color: ${({ theme }) => theme.colors.paper};
    color: ${({ theme }) => theme.colors.graphite};
    box-shadow: ${({ theme }) => theme.shadows.hardSmall};
    letter-spacing: 0.1em;
    text-transform: none;
  }

  [data-sonner-toast][data-type='error'] {
    border-left: 4px solid ${({ theme }) => theme.colors.vermilion};
  }

  [data-sonner-toast][data-type='success'] {
    border-left: 4px solid ${({ theme }) => theme.colors.moss};
  }

  [data-sonner-toast] [data-icon] {
    display: none;
  }
`
