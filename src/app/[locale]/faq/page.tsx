import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import { PageHero } from '@/components/site/templates/page-hero'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { CtaBand } from '@/components/site/templates/cta-band'

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
  const t = await getTranslations({ locale, namespace: 'FaqPage' })

  return buildMetadata({
    locale,
    path: '/faq',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function FaqHubPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('FaqPage')
  const nav = await getTranslations('Nav')
  const items = t.raw('items') as FaqItem[]

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('title'), url: `${SITE.url}/${locale}/faq` },
          ]),
          faqPage(items.map((item) => ({ question: item.question, answer: item.answer }))),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />
      <FaqSection items={items} />
      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primaryLabel'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondaryLabel'), href: '/contact' }}
      />
    </div>
  )
}
