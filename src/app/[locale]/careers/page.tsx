import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import { ResourcePage } from '@/components/site/templates/resource-page'
import type { TextSection } from '@/components/site/templates/text-page'

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
  const t = await getTranslations({ locale, namespace: 'CareersPage' })

  return buildMetadata({
    locale,
    path: '/careers',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: {
      de: localizePath('/careers', 'de'),
      en: localizePath('/careers', 'en'),
    },
  })
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('CareersPage')
  const nav = await getTranslations('Nav')
  const sections = t.raw('sections') as TextSection[]

  return (
    <>
      <JsonLd
        data={breadcrumbList([
          { name: nav('home'), url: `${SITE.url}/${locale}` },
          { name: t('title'), url: `${SITE.url}/${locale}${localizePath('/careers', locale)}` },
        ])}
      />
      <ResourcePage
        locale={locale}
        eyebrow={t('eyebrow')}
        title={t('title')}
        lede={t('lede')}
        sections={sections}
        note={t('note')}
        action={{
          title: t('cta.title'),
          text: t('cta.text'),
          label: t('cta.primaryLabel'),
          href: '/contact',
        }}
      />
    </>
  )
}
