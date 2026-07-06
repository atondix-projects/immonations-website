import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { listServices } from '@/lib/content/services'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  return buildMetadata({
    locale,
    path: '/services',
    title: locale === 'de' ? 'Leistungen' : 'Services',
    description:
      locale === 'de'
        ? 'Beratung, Bewertung, Vermarktung und Transaktion — alle Leistungen von Immonation im Überblick.'
        : 'Advisory, valuation, marketing, and transaction services — the full Immonation offering.',
    localizedPaths: { de: '/leistungen', en: '/services' },
  })
}

export default async function ServicesIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const services = await listServices(locale)
  const t = await getTranslations('Nav')

  return (
    <section className="container mx-auto px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: t('home'), url: `${SITE.url}/${locale}` },
          {
            name: t('services'),
            url: `${SITE.url}/${locale}${locale === 'de' ? '/leistungen' : '/services'}`,
          },
        ])}
      />
      <header className="mb-12 max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t('services')}</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          {locale === 'de'
            ? 'Vier Leistungsbereiche, die wir mit derselben Sorgfalt liefern wie ein einzelnes Projekt.'
            : 'Four service areas delivered with the care of a single project.'}
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((svc) => (
          <Card key={svc.slug} className="group h-full">
            <CardHeader>
              <CardTitle className="text-2xl">
                <Link
                  href={{ pathname: '/services/[slug]', params: { slug: svc.slug } }}
                  className="hover:text-foreground/80 flex items-start justify-between gap-4"
                >
                  {svc.title}
                  <ArrowUpRight className="text-muted-foreground group-hover:text-foreground mt-1 size-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </CardTitle>
              <CardDescription className="text-base">{svc.lede}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-muted-foreground space-y-1.5 text-sm">
                {svc.hero.bullets.map((b) => (
                  <li
                    key={b}
                    className="before:bg-foreground/40 relative pl-4 before:absolute before:top-2 before:left-0 before:size-1.5 before:rounded-full"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
