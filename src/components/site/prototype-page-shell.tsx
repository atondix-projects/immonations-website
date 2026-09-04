import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Locale } from '@/i18n/routing'
import type { CatalogPageContent } from '@/content/catalog-pages'
import type { RouteRecord } from '@/lib/routing/route-catalog'
import { breadcrumbList, faqPage, service } from '@/lib/seo/jsonld'
import { SITE } from '@/lib/seo/site'
import { JsonLd } from './json-ld'
import { CtaBand } from './templates/cta-band'
import { FaqSection } from './templates/faq-section'
import { PageHero } from './templates/page-hero'

export function PrototypePageShell({
  locale,
  content,
  routeRecord,
  children,
  showSections = true,
}: {
  locale: Locale
  content: CatalogPageContent
  routeRecord: RouteRecord
  children?: ReactNode
  showSections?: boolean
}) {
  const pageUrl = `${SITE.url}/${locale}${routeRecord.paths[locale]}`
  const homeLabel = locale === 'de' ? 'Start' : 'Home'

  return (
    <>
      <JsonLd
        data={[
          breadcrumbList([
            { name: homeLabel, url: `${SITE.url}/${locale}` },
            { name: content.title, url: pageUrl },
          ]),
          service({
            locale,
            url: pageUrl,
            name: content.title,
            description: content.description,
            areaServed: 'Metropolregion Nürnberg',
          }),
          faqPage(content.faq),
        ]}
      />
      <main className="bg-background">
        <PageHero eyebrow={content.eyebrow} title={content.title} lede={content.lede} />
        <section className="border-border bg-muted/45 border-y py-10 md:py-12">
          <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
            <p className="max-w-[82ch] text-[17px] leading-[1.75] text-pretty">{content.answer}</p>
          </div>
        </section>

        {children}

        {showSections ? (
          <section className="py-16 md:py-24">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
              <div className="border-border grid gap-px border bg-neutral-900/10 md:grid-cols-3">
                {content.sectionTitles.map((title, index) => (
                  <article key={title} className="bg-background flex flex-col p-7 md:p-9">
                    <span className="text-brand-700 font-mono text-xs tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="mt-6 font-serif text-2xl leading-tight font-semibold text-balance">
                      {title}
                    </h2>
                    <p className="text-muted-foreground mt-4 text-[15px] leading-[1.75]">
                      {content.sectionTexts?.[index] ?? ''}
                    </p>
                    {content.sectionHrefs?.[index] ? (
                      <Link
                        href={content.sectionHrefs[index]}
                        className="text-brand-700 mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold"
                      >
                        {locale === 'de' ? 'Mehr erfahren' : 'Learn more'}
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <FaqSection
          title={locale === 'de' ? 'Häufige Fragen' : 'Frequently asked questions'}
          items={content.faq}
        />
        <CtaBand
          title={content.ctaTitle}
          text={content.ctaText}
          primary={{ label: content.ctaLabel, href: content.ctaHref }}
        />
      </main>
    </>
  )
}
