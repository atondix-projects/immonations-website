import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { FaqCategoryNav } from '@/components/site/faq-category-nav'
import { JsonLd } from '@/components/site/json-ld'
import { CtaBand } from '@/components/site/templates/cta-band'
import { FaqSection } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { routing } from '@/i18n/routing'
import {
  FAQ_CATEGORY_ORDER,
  listFaqsByCategory,
  toFaqSectionItems,
  type FaqCategoryId,
} from '@/lib/content/faqs'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
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
  const t = await getTranslations({ locale, namespace: 'FaqPage' })

  return buildMetadata({
    locale,
    path: '/faq',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/faq', 'de'),
      en: localizePath('/faq', 'en'),
    },
  })
}

export default async function FaqHubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('FaqPage')
  const nav = await getTranslations('Nav')
  const groups = listFaqsByCategory(locale)
  const allItems = groups.flatMap((group) => toFaqSectionItems(group.items))
  const publicPath = localizePath('/faq', locale)
  const pageUrl = `${SITE.url}/${locale}${publicPath}`

  const categoryLabels = t.raw('categories') as Record<FaqCategoryId, string>
  const navItems = FAQ_CATEGORY_ORDER.filter((id) =>
    groups.some((group) => group.category === id),
  ).map((id) => ({ id, label: categoryLabels[id] }))

  const groupsWithStart = groups.reduce<
    Array<(typeof groups)[number] & { startIndex: number }>
  >((acc, group) => {
    const previous = acc.at(-1)
    const startIndex = previous ? previous.startIndex + previous.items.length : 1
    acc.push({ ...group, startIndex })
    return acc
  }, [])

  return (
    <div className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('title'), url: pageUrl },
          ]),
          faqPage(allItems),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />
      <FaqCategoryNav items={navItems} ariaLabel={t('categoryNavLabel')} />

      <div className="border-border bg-muted/65 border-y">
        <div className="mx-auto w-full max-w-[1320px] px-5 py-10 sm:px-7 md:py-14 lg:px-12">
          {groupsWithStart.map((group, groupIndex) => (
            <FaqSection
              key={group.category}
              id={group.category}
              title={categoryLabels[group.category]}
              items={toFaqSectionItems(group.items)}
              headingLevel="h2"
              startIndex={group.startIndex}
              variant="nested"
              className={groupIndex > 0 ? 'border-border border-t' : undefined}
            />
          ))}
        </div>
      </div>

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primaryLabel'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondaryLabel'), href: '/contact' }}
      />
    </div>
  )
}
