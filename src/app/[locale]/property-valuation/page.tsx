import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { FaqHubLink } from '@/components/site/faq-category-nav'
import { JsonLd } from '@/components/site/json-ld'
import { ReferenceProofRail } from '@/components/site/references/reference-proof-rail'
import {
  ValuationPage,
  type ValuationFeature,
  type ValuationStat,
  type ValuationStep,
} from '@/components/site/templates/valuation-page'
import { routing } from '@/i18n/routing'
import { selectFaqsForPage, toFaqSectionItems } from '@/lib/content/faqs'
import { listReferencesByPropertyType } from '@/lib/content/references'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
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
  const faqT = await getTranslations('FaqPage')
  const nav = await getTranslations('Nav')
  const features = t.raw('features.items') as ValuationFeature[]
  const stepsRaw = t.raw('steps.items') as Array<{ title: string; text: string }>
  const steps: ValuationStep[] = stepsRaw.map(({ title, text }) => ({ title, text }))
  const stats = t.raw('stats') as ValuationStat[]
  const faqItems = toFaqSectionItems(selectFaqsForPage(locale, 'property-valuation'))
  const publicPath = localizePath('/property-valuation', locale)
  const url = `${SITE.url}/${locale}${publicPath}`
  const referencesT = await getTranslations('ReferencesPage')

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
          faqPage(faqItems),
        ]}
      />
      <ValuationPage
        locale={locale}
        hero={{ eyebrow: t('hero.eyebrow'), title: t('hero.title'), lede: t('hero.lede') }}
        answer={t('answer')}
        features={{ title: t('features.title'), items: features }}
        steps={{ title: t('steps.title'), items: steps }}
        stats={stats}
        faq={{ title: t('faq.title'), items: faqItems }}
        faqFooter={<FaqHubLink label={faqT('viewAll')} />}
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
      <ReferenceProofRail
        references={[
          ...listReferencesByPropertyType('house'),
          ...listReferencesByPropertyType('apartment'),
        ]}
        locale={locale}
        eyebrow={referencesT('gallery.eyebrow')}
        title={referencesT('proof.title')}
        text={referencesT('proof.text')}
        referenceLabel={referencesT('gallery.referenceLabel')}
      />
    </>
  )
}
