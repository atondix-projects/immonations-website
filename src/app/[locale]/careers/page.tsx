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
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

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

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
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
        feature={
          <section className="mx-auto mb-12 w-full max-w-[1240px] px-6 lg:px-10">
            <Link
              href="/real-estate-agent-career"
              className="group bg-surface-dark grid gap-6 p-7 text-white md:grid-cols-[1fr_auto] md:items-end md:p-9"
            >
              <div>
                <p className="text-brand-300 text-[12px] font-semibold tracking-[0.16em] uppercase">
                  {t('agentTrack.eyebrow')}
                </p>
                <h2 className="mt-3 max-w-[20ch] font-serif text-3xl font-semibold text-balance">
                  {t('agentTrack.title')}
                </h2>
                <p className="mt-4 max-w-[62ch] leading-[1.65] text-pretty text-neutral-400">
                  {t('agentTrack.text')}
                </p>
              </div>
              <span className="text-brand-300 inline-flex min-h-11 items-center gap-2 text-sm font-semibold">
                {t('agentTrack.link')}
                <ArrowUpRight
                  className="size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </section>
        }
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
