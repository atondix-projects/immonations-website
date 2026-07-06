import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { listPosts } from '@/lib/content/blog'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { breadcrumbList } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { PageHero } from '@/components/site/templates/page-hero'
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

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const posts = await listPosts(locale)
  const t = await getTranslations('Nav')
  const dateFmt = new Intl.DateTimeFormat(locale, { dateStyle: 'long' })
  const blogPath = localizePath('/blog', locale)
  const copy =
    locale === 'de'
      ? {
          eyebrow: 'Ressourcen',
          title: 'Blog & Markteinblicke',
          lede: 'Marktkommentare, Leitfäden und Insider-Beobachtungen für Eigentümer und Käufer in der Region.',
          noteTitle: 'Redaktioneller Hinweis',
          note: 'Unsere Beiträge sollen Entscheidungen vorbereiten, nicht ersetzen. Für konkrete Objektfragen prüfen wir Lage, Unterlagen und Ziel persönlich.',
          empty: 'Bald mehr.',
          read: 'Beitrag lesen',
        }
      : {
          eyebrow: 'Resources',
          title: 'Blog & market insights',
          lede: 'Market commentary, guides, and insider observations for owners and buyers in the region.',
          noteTitle: 'Editorial note',
          note: 'Our articles prepare decisions; they do not replace individual advice. For concrete property questions, we review location, documents, and goals personally.',
          empty: 'More coming soon.',
          read: 'Read article',
        }

  return (
    <section className="bg-background">
      <JsonLd
        data={breadcrumbList([
          { name: t('home'), url: `${SITE.url}/${locale}` },
          { name: t('blog'), url: `${SITE.url}/${locale}${blogPath}` },
        ])}
      />

      <PageHero eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />

      <aside className="mx-auto mb-10 w-full max-w-[1240px] px-6 lg:px-10">
        <div className="bg-muted/60 max-w-[76ch] px-6 py-5">
          <p className="text-primary text-sm font-semibold">{copy.noteTitle}</p>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{copy.note}</p>
        </div>
      </aside>

      <div className="border-border border-t py-12 md:py-16">
        <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
          <ul className="divide-border divide-y">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="grid gap-4 py-8 first:pt-0 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-10">
                  <div>
                    <time
                      dateTime={post.date}
                      className="text-primary text-xs font-semibold tracking-[0.14em] uppercase"
                    >
                      {dateFmt.format(new Date(post.date))}
                    </time>
                    <Link
                      href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                      className="hover:text-primary mt-3 block font-serif text-3xl leading-tight font-semibold transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-muted-foreground mt-3 max-w-[62ch] leading-7">
                      {post.description}
                    </p>
                  </div>
                  <Link
                    href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                    className="text-primary inline-flex items-center gap-2 text-sm font-semibold"
                  >
                    {copy.read}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                </article>
              </li>
            ))}
            {posts.length === 0 ? (
              <li className="text-muted-foreground py-8">{copy.empty}</li>
            ) : null}
          </ul>
        </div>
      </div>
    </section>
  )
}
