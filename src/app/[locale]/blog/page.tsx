import type { Metadata } from 'next'
import {
  ArrowRight,
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
  careers: '/careers',
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
  questions: string[]
}

type DecisionStep = {
  number: string
  title: string
  text: string
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
  const decisionSteps = t.raw('decision.items') as DecisionStep[]
  const faq = t.raw('faq.items') as FaqItem[]
  const featuredPost = posts[0]
  const remainingPosts = posts.slice(1)

  return (
    <div className="bg-background">
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

      {featuredPost ? (
        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
            <div className="grid overflow-hidden bg-neutral-950 text-white lg:grid-cols-[0.78fr_1.22fr]">
              <div className="border-b border-white/15 p-7 lg:border-r lg:border-b-0 lg:p-10">
                <p className="text-brand-300 text-[11px] font-semibold tracking-[0.18em] uppercase">
                  {t('featured.eyebrow')}
                </p>
                <p className="mt-8 max-w-[28ch] font-serif text-3xl leading-[1.08] font-medium text-balance md:text-[2.5rem]">
                  {t('featured.title')}
                </p>
                <p className="mt-5 max-w-[42ch] text-sm leading-7 text-pretty text-white/65">
                  {t('featured.text')}
                </p>
              </div>
              <article className="flex flex-col p-7 lg:p-10">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/55">
                  <time dateTime={featuredPost.date}>
                    {dateFmt.format(new Date(featuredPost.date))}
                  </time>
                  {featuredPost.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="border-l border-white/20 pl-5">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-7 max-w-[22ch] font-serif text-4xl leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-5xl">
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: featuredPost.slug } }}
                    className="transition-colors hover:text-white/75"
                  >
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-[62ch] text-[15px] leading-7 text-pretty text-white/70">
                  {featuredPost.description}
                </p>
                <Link
                  href={{ pathname: '/blog/[slug]', params: { slug: featuredPost.slug } }}
                  className="text-brand-300 mt-10 inline-flex min-h-11 w-fit items-center gap-3 text-sm font-semibold transition-colors hover:text-white"
                >
                  {t('featured.read')}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-border border-t py-16 md:py-20">
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
                    <ul className="text-muted-foreground mt-5 space-y-2 text-sm leading-6">
                      {category.questions.map((question) => (
                        <li key={question} className="flex gap-3">
                          <span className="text-primary" aria-hidden="true">
                            —
                          </span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
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

      <section className="border-border bg-muted/45 border-y py-16 md:py-24">
        <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20 lg:px-10">
          <div>
            <p className="text-primary text-[12px] font-semibold tracking-[0.16em] uppercase">
              {t('decision.eyebrow')}
            </p>
            <h2 className="mt-3 max-w-[14ch] font-serif text-3xl font-semibold text-balance md:text-[40px]">
              {t('decision.title')}
            </h2>
            <p className="text-muted-foreground mt-5 max-w-[44ch] leading-7 text-pretty">
              {t('decision.text')}
            </p>
          </div>
          <ol className="border-border border-t">
            {decisionSteps.map((step) => (
              <li
                key={step.number}
                className="border-border grid gap-4 border-b py-7 sm:grid-cols-[3rem_0.72fr_1.28fr] sm:gap-6"
              >
                <span className="text-primary font-mono text-xs font-semibold tabular-nums">
                  {step.number}
                </span>
                <h3 className="font-serif text-xl font-semibold text-balance">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-7 text-pretty">{step.text}</p>
              </li>
            ))}
          </ol>
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
              {t('articles.count', { count: remainingPosts.length })}
            </span>
          </div>
          <ul className="divide-border divide-y border-y">
            {remainingPosts.map((post) => (
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
            {remainingPosts.length === 0 ? (
              <li className="text-muted-foreground py-8">{t('articles.empty')}</li>
            ) : null}
          </ul>
        </div>
      </section>

      <FaqSection title={t('faq.title')} items={faq} />
    </div>
  )
}
