import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, itemList } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import { FREE_DOCS, type FreeDocId } from '@/lib/content/freedocs'
import { PageHero } from '@/components/site/templates/page-hero'
import { FreedocsSection } from '@/components/site/freedocs-section'
import { MagazineSection } from '@/components/site/magazine-section'
import { HandbookRequestForm } from '@/components/site/handbook-request-form'

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
  const t = await getTranslations({ locale, namespace: 'DownloadsPage' })

  return buildMetadata({
    locale,
    path: '/downloads',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function DownloadsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('DownloadsPage')
  const nav = await getTranslations('Nav')
  const documents = t.raw('freedocs.documents') as Record<
    FreeDocId,
    { title: string; description: string }
  >
  const downloadsUrl = `${SITE.url}/${locale}${localizePath('/downloads', locale)}`

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: t('title'), url: downloadsUrl },
          ]),
          itemList(
            FREE_DOCS.map((doc) => ({
              name: documents[doc.id].title,
              description: documents[doc.id].description,
              url: `${SITE.url}${doc.href}`,
            })),
          ),
        ]}
      />
      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />
      <FreedocsSection />
      <MagazineSection />
      <section id="handbuch" className="border-border bg-muted/45 border-t py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(380px,0.7fr)] lg:items-start lg:gap-16 lg:px-10">
          <div className="max-w-[58ch] lg:pt-8">
            <p className="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">
              {t('handbook.eyebrow')}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold md:text-[40px]">
              {t('handbook.title')}
            </h2>
            <p className="text-muted-foreground mt-5 text-[17px] leading-relaxed">
              {t('handbook.text')}
            </p>
            <div className="border-primary mt-8 border-l-2 pl-5">
              <p className="font-semibold">{t('handbook.accessTitle')}</p>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                {t('handbook.accessText')}
              </p>
            </div>
          </div>
          <HandbookRequestForm />
        </div>
      </section>
    </main>
  )
}
