import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitch } from '@/components/molecules'
import { ROUTES } from '@/constants'

import {
  BrandCopy,
  BrandLink,
  BrandMark,
  BrandName,
  BrandTagline,
  FooterNote,
  ShellFooter,
  ShellHeader,
  ShellMain,
  ShellWrapper,
} from './styles'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { t } = useTranslation('common')

  return (
    <ShellWrapper>
      <ShellHeader>
        <BrandLink to={ROUTES.checkout}>
          <BrandMark aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </BrandMark>

          <BrandCopy>
            <BrandName>{t('brand.name')}</BrandName>
            <BrandTagline>{t('brand.tagline')}</BrandTagline>
          </BrandCopy>
        </BrandLink>

        <LanguageSwitch />
      </ShellHeader>

      <ShellMain>{children}</ShellMain>

      <ShellFooter>
        <FooterNote>{t('footer.note')}</FooterNote>
      </ShellFooter>
    </ShellWrapper>
  )
}
