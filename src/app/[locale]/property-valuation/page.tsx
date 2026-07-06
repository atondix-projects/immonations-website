import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import {
  MarketingPage,
  type MarketingFeature,
  type MarketingStat,
  type MarketingStep,
} from '@/components/site/templates/marketing-page'
import type { FaqItem } from '@/components/site/templates/faq-section'

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
  const t = await getTranslations({ locale, namespace: 'ValuationPage' })

  return buildMetadata({
    locale,
    path: '/property-valuation',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/property-valuation', 'de'),
      en: localizePath('/property-valuation', 'en'),
    },
  })
}

export default async function PropertyValuationPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('ValuationPage')
  const nav = await getTranslations('Nav')
  const features = t.raw('features.items') as MarketingFeature[]
  const steps = t.raw('steps.items') as MarketingStep[]
  const stats = t.raw('stats') as MarketingStat[]
  const faqItems = t.raw('faq.items') as FaqItem[]
  const publicPath = localizePath('/property-valuation', locale)
  const url = `${SITE.url}/${locale}${publicPath}`

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('hero.title'), url },
          ]),
          service({
            locale,
            url,
            name: t('metadata.title'),
            description: t('metadata.description'),
            serviceType: 'Real estate valuation',
            areaServed: 'Zirndorf, Nürnberg, Fürth, Erlangen und Umgebung',
          }),
          faqPage(faqItems.map((item) => ({ question: item.question, answer: item.answer }))),
        ]}
      />
      <MarketingPage
        locale={locale}
        hero={{ eyebrow: t('hero.eyebrow'), title: t('hero.title'), lede: t('hero.lede') }}
        answer={t('answer')}
        features={{ title: t('features.title'), items: features }}
        steps={{ title: t('steps.title'), items: steps }}
        stats={stats}
        faq={{ title: t('faq.title'), items: faqItems }}
        cta={{
          title: t('cta.title'),
          text: t('cta.text'),
          primary: {
            label: t('cta.primaryLabel'),
            href: { pathname: '/', hash: '#bewertung' },
          },
          secondary: { label: t('cta.secondaryLabel'), href: '/contact' },
        }}
      />
    </>
  )
}
