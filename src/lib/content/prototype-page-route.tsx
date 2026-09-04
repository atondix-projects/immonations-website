import type { ReactNode } from 'react'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PrototypePageShell } from '@/components/site/prototype-page-shell'
import { getCatalogPageData } from './catalog-page-route'
import { routing, type Locale } from '@/i18n/routing'
import type { CatalogPageId } from '@/content/catalog-pages'

export function generatePrototypeStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export function createPrototypePage(
  id: CatalogPageId,
  renderExtra?: (locale: Locale) => ReactNode,
  showSections = true,
) {
  return async function PrototypeRoute({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    if (!hasLocale(routing.locales, locale)) notFound()
    setRequestLocale(locale)
    const { content, routeRecord } = getCatalogPageData(id, locale)

    return (
      <PrototypePageShell
        locale={locale}
        content={content}
        routeRecord={routeRecord}
        showSections={showSections}
      >
        {renderExtra?.(locale)}
      </PrototypePageShell>
    )
  }
}
