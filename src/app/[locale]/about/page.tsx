import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, organization } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { PageHero } from '@/components/site/templates/page-hero'
import { CtaBand } from '@/components/site/templates/cta-band'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

type ValueItem = {
  title: string
  text: string
}

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

  const t = await getTranslations({ locale, namespace: 'AboutPage' })

  return buildMetadata({
    locale,
    path: '/about',
    title: t('metadata.title'),
    description: t('metadata.description'),
    localizedPaths: { de: '/ueber-uns', en: '/about' },
  })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('AboutPage')
  const nav = await getTranslations('Nav')
  const values = t.raw('values.items') as ValueItem[]
  const path = locale === 'de' ? '/ueber-uns' : '/about'

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('about'), url: `${SITE.url}/${locale}${path}` },
          ]),
          organization({ locale, url: SITE.url, name: SITE.legalName }),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="text-muted-foreground max-w-[68ch] text-lg leading-8">{t('body')}</p>
        </div>
      </section>

      <section className="border-border bg-muted border-y py-16">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 md:grid-cols-3 lg:px-10">
          {values.map((item) => (
            <article key={item.title} className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-muted-foreground leading-7">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand
        title={t('cta.title')}
        text={t('cta.text')}
        primary={{ label: t('cta.label'), href: '/contact' }}
      />
    </main>
  )
}
