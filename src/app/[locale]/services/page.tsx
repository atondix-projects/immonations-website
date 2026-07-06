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
import { PageHero } from '@/components/site/templates/page-hero'
import { CtaBand } from '@/components/site/templates/cta-band'
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
  const copy =
    locale === 'de'
      ? {
          eyebrow: 'Leistungen',
          lede: 'Vier Leistungsbereiche, die wir mit derselben Sorgfalt liefern wie ein einzelnes Projekt.',
          ctaTitle: 'Unsicher, wo Sie anfangen sollen?',
          ctaText: 'Im Erstgespräch klären wir Ziel, Zeitplan und den passenden Einstieg.',
          ctaPrimary: 'Erstgespräch vereinbaren',
        }
      : {
          eyebrow: 'Services',
          lede: 'Four service areas delivered with the care of a single project.',
          ctaTitle: 'Not sure where to start?',
          ctaText:
            'In an initial conversation we clarify your goal, timeline, and the right entry point.',
          ctaPrimary: 'Book initial consultation',
        }

  return (
    <div className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: t('home'), url: `${SITE.url}/${locale}` },
          {
            name: t('services'),
            url: `${SITE.url}/${locale}${locale === 'de' ? '/leistungen' : '/services'}`,
          },
        ])}
      />

      <PageHero eyebrow={copy.eyebrow} title={t('services')} lede={copy.lede} />

      <section className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="divide-border divide-y">
            {services.map((svc) => (
              <li key={svc.slug}>
                <Link
                  href={{ pathname: '/services/[slug]', params: { slug: svc.slug } }}
                  className="group grid gap-4 py-8 transition-colors md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-10"
                >
                  <div>
                    <h2 className="group-hover:text-primary font-serif text-2xl leading-tight font-semibold transition-colors md:text-3xl">
                      {svc.title}
                    </h2>
                    <p className="text-muted-foreground mt-3 max-w-[62ch] text-[15px] leading-7">
                      {svc.lede}
                    </p>
                    <ul className="text-muted-foreground mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {svc.hero.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <ArrowUpRight
                    className="text-primary size-6 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={copy.ctaTitle}
        text={copy.ctaText}
        primary={{ label: copy.ctaPrimary, href: '/contact' }}
        secondary={{ label: t('mega.valuation'), href: '/property-valuation' }}
      />
    </div>
  )
}
