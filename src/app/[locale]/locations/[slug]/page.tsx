import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing } from '@/i18n/routing'
import { getLocation, listAllLocations } from '@/lib/content/locations'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return listAllLocations().map(({ locale, slug }) => ({ locale, slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const location = getLocation(locale, slug)
  if (!location) notFound()

  return buildMetadata({
    locale,
    path: `/locations/${slug}`,
    title: location.title,
    description: location.description,
    localizedPaths: {
      de: localizePath('/locations/[slug]', 'de').replace('[slug]', slug),
      en: localizePath('/locations/[slug]', 'en').replace('[slug]', slug),
    },
  })
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const location = getLocation(locale, slug)
  if (!location) notFound()

  const nav = await getTranslations('Nav')
  const t = await getTranslations('LocationDetailPage')
  const path = localizePath('/locations/[slug]', locale).replace('[slug]', slug)
  const url = `${SITE.url}/${locale}${path}`

  return (
    <article className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            {
              name: t('hub'),
              url: `${SITE.url}/${locale}${localizePath('/locations', locale)}`,
            },
            { name: location.name, url },
          ]),
          service({
            locale,
            url,
            name: location.title,
            description: location.description,
            serviceType: t('serviceType'),
            areaServed: location.name,
          }),
          faqPage(location.faq),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={location.title} lede={location.lede} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[82ch] text-[17px] leading-[1.7] text-pretty">{location.answer}</p>
        </div>
      </section>

      <section className="py-14 md:py-18">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="grid gap-px bg-neutral-900/10 md:grid-cols-3">
            {location.localFocus.map((item) => (
              <li key={item} className="bg-background flex min-h-28 items-start gap-3 p-6">
                <span className="bg-brand-100 text-primary mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-4" aria-hidden="true" />
                </span>
                <span className="font-medium text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="pb-16 md:pb-22">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-10">
          <div>
            <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
              {t('contentEyebrow')}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-balance">
              {t('contentTitle', { city: location.name })}
            </h2>
          </div>
          <div className="divide-border divide-y border-y">
            {location.sections.map((section) => (
              <section key={section.heading} className="py-7">
                <h3 className="font-serif text-2xl font-semibold text-balance">
                  {section.heading}
                </h3>
                <p className="text-muted-foreground mt-3 leading-[1.7] text-pretty">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title={t('faqTitle', { city: location.name })} items={location.faq} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text', { city: location.name })}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </article>
  )
}
