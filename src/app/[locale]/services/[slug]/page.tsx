import type { Metadata } from 'next'
import Image from 'next/image'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { getService, listServiceSlugs } from '@/lib/content/services'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList, faqPage, service as serviceLd } from '@/lib/seo/jsonld'
import { PageHero } from '@/components/site/templates/page-hero'
import { FaqSection } from '@/components/site/templates/faq-section'
import { CtaBand } from '@/components/site/templates/cta-band'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  return listServiceSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const svc = await getService(locale, slug)
  if (!svc) notFound()

  return buildMetadata({
    locale,
    path: `/services/${slug}`,
    title: svc.title,
    description: svc.lede,
    localizedPaths: { de: `/leistungen/${slug}`, en: `/services/${slug}` },
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const svc = await getService(locale, slug)
  if (!svc) notFound()

  const t = await getTranslations('Nav')
  const servicesPath = locale === 'de' ? '/leistungen' : '/services'
  const detailPath = `${servicesPath}/${slug}`
  const url = `${SITE.url}/${locale}${detailPath}`
  const labels =
    locale === 'de'
      ? {
          proof: 'Unverbindlich. Diskret. Ohne Verkaufsdruck.',
          ready: 'Bereit für ein erstes Gespräch?',
        }
      : {
          proof: 'Non-binding. Discreet. No sales pressure.',
          ready: 'Ready for an initial conversation?',
        }

  return (
    <article className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: t('home'), url: `${SITE.url}/${locale}` },
            { name: t('services'), url: `${SITE.url}/${locale}${servicesPath}` },
            { name: svc.title, url },
          ]),
          serviceLd({
            locale,
            url,
            name: svc.title,
            description: svc.lede,
            serviceType: svc.serviceType,
            areaServed: svc.areaServed,
          }),
          faqPage(svc.faq),
        ]}
      />

      <section className="border-border border-b">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(280px,38%)] lg:items-start lg:gap-14 lg:px-10 lg:py-20">
          <div>
            <PageHero
              eyebrow={svc.hero.eyebrow}
              title={svc.title}
              lede={svc.lede}
              className="!px-0 !py-0 lg:grid-cols-1"
            />
            <ul className="text-muted-foreground -mt-2 flex flex-col gap-2 text-[15px] leading-relaxed lg:mt-0">
              {svc.hero.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href={svc.cta.href}
                className="bg-primary hover:bg-primary/90 inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-colors"
              >
                {svc.cta.label}
              </Link>
              <span className="text-muted-foreground text-sm">{labels.proof}</span>
            </div>
          </div>

          <div className="relative min-h-[280px] overflow-hidden lg:min-h-[360px]">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
              alt={
                locale === 'de'
                  ? 'Wohnimmobilie in der Region Nürnberg'
                  : 'Residential property in the Nuremberg region'
              }
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="grid max-w-[820px] gap-10">
            {svc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h2 className="font-serif text-2xl leading-tight font-semibold">
                  {section.heading}
                </h2>
                <p className="text-muted-foreground text-[15px] leading-[1.7]">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <FaqSection title={labels.ready} items={svc.faq} />
      <CtaBand
        title={svc.cta.label}
        text={labels.proof}
        primary={{ label: svc.cta.label, href: svc.cta.href }}
        secondary={{ label: t('contact'), href: '/contact' }}
      />
    </article>
  )
}
