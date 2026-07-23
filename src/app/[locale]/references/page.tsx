import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, View } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { breadcrumbList, itemList } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import { referenceImage, type ReferenceItem } from '@/lib/content/references'
import { JsonLd } from '@/components/site/json-ld'
import { PageHero } from '@/components/site/templates/page-hero'
import { CtaBand } from '@/components/site/templates/cta-band'
import { ReferenceGallery } from '@/components/site/references/reference-gallery'
import { FeedbackVideos } from '@/components/site/home/feedback-videos'

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
  const t = await getTranslations({ locale, namespace: 'ReferencesPage' })

  return buildMetadata({
    locale,
    path: '/references',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: { de: '/referenzen', en: '/references' },
  })
}

export default async function ReferencesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('ReferencesPage')
  const nav = await getTranslations('Nav')
  const items = t.raw('items') as ReferenceItem[]
  const pagePath = localizePath('/references', locale)

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('references'), url: `${SITE.url}/${locale}${pagePath}` },
          ]),
          itemList(
            items.map((item) => ({
              name: item.title,
              description: `${item.type}, ${item.location}`,
              image: `${SITE.url}${referenceImage(item.id)}`,
              url: `${SITE.url}/${locale}${localizePath(`/references/${item.id}`, locale)}`,
            })),
          ),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border border-y bg-neutral-950 py-9 text-white">
        <div className="mx-auto grid w-full max-w-[1240px] gap-7 px-6 md:grid-cols-[auto_1fr] md:items-center lg:px-10">
          <span className="font-serif text-5xl leading-none font-semibold tabular-nums">15</span>
          <div>
            <h2 className="text-base font-semibold">{t('proof.title')}</h2>
            <p className="mt-1 max-w-[72ch] text-sm leading-relaxed text-neutral-400">
              {t('proof.text')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="mb-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
                {t('gallery.eyebrow')}
              </p>
              <h2 className="mt-3 max-w-[18ch] font-serif text-3xl leading-[1.12] font-semibold text-balance md:text-[42px]">
                {t('gallery.title')}
              </h2>
            </div>
            <p className="text-muted-foreground max-w-[66ch] text-[16px] leading-[1.65] lg:justify-self-end">
              {t('gallery.text')}
            </p>
          </div>
          <ReferenceGallery
            items={items}
            referenceLabel={t('gallery.referenceLabel')}
            allLabel={t('gallery.allLabel')}
            filterLabel={t('gallery.filterLabel')}
          />
        </div>
      </section>

      <section className="border-border bg-muted border-y py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] overflow-hidden bg-white lg:grid-cols-[1.08fr_0.92fr]">
          <div className="relative min-h-[320px] lg:min-h-[430px]">
            <Image
              src="/images/references/zirndorf-gartenwohnung.webp"
              alt={t('tour.imageAlt')}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-r from-black/10 to-transparent" />
          </div>
          <div className="flex flex-col justify-center px-7 py-10 sm:px-10 lg:px-12">
            <View aria-hidden="true" className="text-primary size-6" strokeWidth={1.6} />
            <p className="text-primary mt-7 font-mono text-[11px] tracking-[0.18em] uppercase">
              {t('tour.eyebrow')}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight font-semibold text-balance">
              {t('tour.title')}
            </h2>
            <p className="text-muted-foreground mt-5 text-[16px] leading-[1.65]">
              {t('tour.text')}
            </p>
            <a
              href={`/${locale}#virtuelle-besichtigung`}
              className="text-primary focus-visible:ring-primary hover:text-brand-800 mt-8 inline-flex w-fit items-center gap-2 font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
            >
              {t('tour.link')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <FeedbackVideos />

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.primary'), href: '/property-valuation' }}
        secondary={{ label: t('cta.secondary'), href: '/contact' }}
      />
    </main>
  )
}
