import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing, type Locale } from '@/i18n/routing'
import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import { listIndexableRoutes } from '@/lib/routing/route-catalog'

export const generateMetadata = createCatalogMetadata('html-sitemap')

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function HtmlSitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const groups = Map.groupBy(listIndexableRoutes(), (routeRecord) => routeRecord.phase)
  const labels =
    locale === 'de'
      ? {
          eyebrow: 'Alle Seiten',
          title: 'Sitemap',
          lede: 'Alle veröffentlichten Inhalte von Immonation, geordnet nach Ausbaustufe.',
          phase: 'Bereich',
        }
      : {
          eyebrow: 'All pages',
          title: 'Sitemap',
          lede: 'All published Immonation content, grouped by rollout area.',
          phase: 'Section',
        }

  return (
    <main className="bg-background">
      <PageHero eyebrow={labels.eyebrow} title={labels.title} lede={labels.lede} />
      <div className="mx-auto w-full max-w-[1240px] px-6 py-16 lg:px-10">
        {[...groups.entries()].map(([phase, routes]) => (
          <section key={phase} className="border-border border-t py-10 first:border-t-0 first:pt-0">
            <h2 className="font-serif text-2xl font-semibold">
              {labels.phase} {phase}
            </h2>
            <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
              {routes.map((routeRecord) => (
                <li key={routeRecord.id}>
                  <a
                    className="text-brand-700 hover:text-brand-800 text-sm font-medium underline-offset-4 hover:underline"
                    href={`/${locale}${routeRecord.paths[locale as Locale]}`.replace(/\/$/, '')}
                  >
                    {routeRecord.paths[locale as Locale] || '/'}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
