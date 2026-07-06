import type { Metadata } from 'next'
import Image from 'next/image'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowUpRight, BookOpen, FileText, LineChart } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { listPosts } from '@/lib/content/blog'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList } from '@/lib/seo/jsonld'
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
  return buildMetadata({
    locale,
    path: '/blog',
    title: locale === 'de' ? 'Blog & Markteinblicke' : 'Blog & market insights',
    description:
      locale === 'de'
        ? 'Marktkommentare, Leitfäden und Insider-Beobachtungen aus dem deutschen Immobilienmarkt.'
        : 'Market commentary, guides, and insider observations from the German property market.',
  })
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const posts = await listPosts(locale)
  const t = await getTranslations('Nav')
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
  const copy =
    locale === 'de'
      ? {
          eyebrow: 'Ressourcen',
          title: 'Blog & Markteinblicke',
          lede: 'Marktkommentare, Leitfäden und Insider-Beobachtungen für Eigentümer und Käufer in der Region.',
          noteTitle: 'Redaktioneller Hinweis',
          note:
            'Unsere Beiträge sollen Entscheidungen vorbereiten, nicht ersetzen. Für konkrete Objektfragen prüfen wir Lage, Unterlagen und Ziel persönlich.',
          status: 'Aktuell',
          empty: 'Bald mehr.',
          read: 'Beitrag lesen',
          rail: ['Markt', 'Verkauf', 'Bewertung', 'Finanzierung'],
        }
      : {
          eyebrow: 'Resources',
          title: 'Blog & market insights',
          lede: 'Market commentary, guides, and insider observations for owners and buyers in the region.',
          noteTitle: 'Editorial note',
          note:
            'Our articles prepare decisions; they do not replace individual advice. For concrete property questions, we review location, documents, and goals personally.',
          status: 'Current',
          empty: 'More coming soon.',
          read: 'Read article',
          rail: ['Market', 'Selling', 'Valuation', 'Financing'],
        }

  return (
    <section className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: t('home'), url: `${SITE.url}/${locale}` },
          { name: t('blog'), url: `${SITE.url}/${locale}/blog` },
        ])}
      />

      <div className="mx-auto grid w-full max-w-[1440px] lg:grid-cols-[280px_1fr]">
        <aside className="border-border hidden min-h-full border-r px-9 py-12 lg:block">
          <div className="sticky top-28 flex min-h-[calc(100dvh-8rem)] flex-col justify-between">
            <div>
              <div className="mb-16 flex items-center gap-3">
                <span className="bg-primary h-8 w-1" />
                <span className="font-semibold tracking-tight">Immonation</span>
              </div>
              <nav className="flex flex-col">
                {[copy.eyebrow, ...copy.rail].map((item, index) => (
                  <span
                    key={item}
                    className="border-border text-muted-foreground border-b py-4 text-[15px] first:border-t first:text-primary first:font-semibold"
                  >
                    {index === 0 ? copy.eyebrow : item}
                  </span>
                ))}
              </nav>
            </div>
            <div className="border-border bg-muted/40 p-5">
              <LineChart className="text-primary size-6" aria-hidden="true" />
              <p className="mt-4 text-sm leading-6">{copy.note}</p>
            </div>
          </div>
        </aside>

        <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
          <header className="px-6 py-16 lg:px-20 lg:py-24">
            <p className="text-primary text-sm font-semibold uppercase tracking-[0.22em]">
              {copy.eyebrow}
            </p>
            <h1 className="mt-8 max-w-[700px] font-serif text-5xl font-semibold leading-[1.02] text-balance md:text-7xl">
              {copy.title}
            </h1>
            <p className="text-muted-foreground mt-8 max-w-[62ch] text-lg leading-8">{copy.lede}</p>
            <div className="border-border mt-12 grid gap-6 border-y py-8 md:grid-cols-3">
              {[
                { icon: BookOpen, title: copy.rail[0], text: copy.status },
                { icon: FileText, title: copy.rail[1], text: copy.rail[2] },
                { icon: LineChart, title: copy.rail[3], text: copy.status },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="border-border md:border-r md:pr-6 md:last:border-r-0">
                  <Icon className="text-primary size-7" aria-hidden="true" />
                  <p className="mt-5 font-semibold">{title}</p>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">{text}</p>
                </div>
              ))}
            </div>
            <aside className="border-primary bg-muted/50 mt-12 border-l-2 p-7">
              <p className="text-primary text-sm font-semibold">{copy.noteTitle}</p>
              <p className="text-muted-foreground mt-3 text-sm leading-7">{copy.note}</p>
            </aside>
          </header>

          <div className="bg-muted relative overflow-hidden border-l border-border px-6 py-16 lg:px-12 lg:py-24">
            <div className="absolute inset-x-0 top-0 h-44 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="Regional real estate market"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-35"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-4 pt-20">
              {posts.map((post) => (
                <article key={post.slug} className="border-border bg-white p-6 shadow-sm">
                  <div className="flex flex-wrap items-center gap-3">
                    <time
                      dateTime={post.date}
                      className="text-primary text-xs font-semibold uppercase tracking-[0.16em]"
                    >
                      {dateFmt.format(new Date(post.date))}
                    </time>
                    <span className="bg-brand-100 text-primary px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]">
                      {copy.status}
                    </span>
                  </div>
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                    className="mt-5 block font-serif text-3xl font-semibold leading-tight transition-colors hover:text-primary"
                  >
                    {post.title}
                  </Link>
                  <p className="text-muted-foreground mt-3 max-w-[60ch] leading-7">{post.description}</p>
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                    className="text-primary mt-6 inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    {copy.read}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              ))}
              {posts.length === 0 ? (
                <p className="border-border bg-white p-6 text-muted-foreground">{copy.empty}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
