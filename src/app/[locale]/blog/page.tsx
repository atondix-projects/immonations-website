import type { Metadata } from 'next'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Calculator,
  Download,
  House,
  KeyRound,
  MapPinned,
  type LucideIcon,
} from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/json-ld'
import { FaqSection, type FaqItem } from '@/components/site/templates/faq-section'
import { PageHero } from '@/components/site/templates/page-hero'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { listPosts } from '@/lib/content/blog'
import { breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { buildMetadata } from '@/lib/seo/metadata'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

const CATEGORY_LINKS = {
  selling: '/sell',
  valuation: '/property-valuation',
  buying: '/buy',
  local: '/locations',
  careers: '/real-estate-agent-career',
  downloads: '/downloads',
} as const

const CATEGORY_ICONS: Record<keyof typeof CATEGORY_LINKS, LucideIcon> = {
  selling: House,
  valuation: Calculator,
  buying: KeyRound,
  local: MapPinned,
  careers: BriefcaseBusiness,
  downloads: Download,
}

type KnowledgeCategory = {
  id: keyof typeof CATEGORY_LINKS
  title: string
  text: string
  link: string
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const t = await getTranslations({ locale, namespace: 'KnowledgeHub' })
  return buildMetadata({
    locale,
    path: '/blog',
    title: t('metadata.title'),
    description: t('metadata.description'),
  })
}

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const posts = await listPosts(locale)
  const nav = await getTranslations('Nav')
  const t = await getTranslations('KnowledgeHub')
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
  const blogPath = localizePath('/blog', locale)
  const categories = t.raw('categories.items') as KnowledgeCategory[]
  const faq = t.raw('faq.items') as FaqItem[]

  return (
    <main className="bg-background">
      <JsonLd
        data={[
          breadcrumbList([
            { name: nav('home'), url: `${SITE.url}/${locale}` },
            { name: nav('blog'), url: `${SITE.url}/${locale}${blogPath}` },
          ]),
          faqPage(faq),
        ]}
      />

      <PageHero eyebrow={t('eyebrow')} title={t('title')} lede={t('lede')} />

      <section className="border-border bg-muted/45 border-y py-10">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="max-w-[82ch] text-[17px] leading-[1.7] text-pretty">{t('answer')}</p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
            {t('categories.eyebrow')}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-balance md:text-[40px]">
            {t('categories.title')}
          </h2>
          <ul className="mt-10 grid gap-px bg-neutral-900/10 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.id]
              return (
                <li key={category.id} className="bg-background">
                  <Link
                    href={CATEGORY_LINKS[category.id]}
                    className="group hover:bg-muted/55 flex h-full min-h-[230px] flex-col p-7 transition-[background-color] duration-150 motion-reduce:transition-none"
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="text-primary size-6" strokeWidth={1.6} aria-hidden="true" />
                      <ArrowUpRight
                        className="text-muted-foreground size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="mt-9 font-serif text-2xl font-semibold text-balance">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mt-3 text-sm leading-[1.65] text-pretty">
                      {category.text}
                    </p>
                    <span className="text-primary mt-auto pt-7 text-sm font-semibold">
                      {category.link}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <aside className="mx-auto mb-12 w-full max-w-[1240px] px-6 lg:px-10">
        <div className="bg-muted/60 max-w-[76ch] px-6 py-5">
          <p className="text-primary text-sm font-semibold">{t('note.title')}</p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed text-pretty">
            {t('note.text')}
          </p>
        </div>
      </aside>

      <section className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="font-serif text-3xl font-semibold text-balance">
              {t('articles.title')}
            </h2>
            <span className="text-muted-foreground text-sm tabular-nums">
              {t('articles.count', { count: posts.length })}
            </span>
          </div>
          <ul className="divide-border divide-y border-y">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="grid gap-4 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
                  <div>
                    <time
                      dateTime={post.date}
                      className="text-primary text-xs font-semibold tracking-[0.14em] uppercase"
                    >
                      {dateFmt.format(new Date(post.date))}
                    </time>
                    <Link
                      href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                      className="hover:text-primary mt-3 block font-serif text-3xl leading-tight font-semibold text-balance transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-muted-foreground mt-3 max-w-[62ch] leading-7 text-pretty">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                    className="text-primary inline-flex min-h-11 items-center gap-2 text-sm font-semibold"
                  >
                    {t('articles.read')}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
            {posts.length === 0 ? (
              <li className="text-muted-foreground py-8">{t('articles.empty')}</li>
            ) : null}
          </ul>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faq} />
    </main>
  )
}
