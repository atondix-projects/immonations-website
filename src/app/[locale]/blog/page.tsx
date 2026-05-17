import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
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

  return (
    <section className="container mx-auto px-6 py-16">
      <JsonLd
        data={breadcrumbList([
          { name: t('home'), url: `${SITE.url}/${locale}` },
          { name: t('blog'), url: `${SITE.url}/${locale}/blog` },
        ])}
      />
      <h1 className="mb-3 text-4xl font-semibold tracking-tight">{t('blog')}</h1>
      <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
        {locale === 'de'
          ? 'Marktkommentare, Leitfäden und Insider-Beobachtungen.'
          : 'Market commentary, guides, and insider observations.'}
      </p>
      <ul className="divide-border/60 divide-y">
        {posts.map((post) => (
          <li key={post.slug} className="py-6">
            <article className="flex flex-col gap-2">
              <Link
                href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
                className="hover:text-foreground/80 text-2xl font-medium tracking-tight"
              >
                {post.title}
              </Link>
              <p className="text-muted-foreground">{post.description}</p>
              <time
                dateTime={post.date}
                className="text-muted-foreground/80 text-xs uppercase tracking-wider"
              >
                {dateFmt.format(new Date(post.date))}
              </time>
            </article>
          </li>
        ))}
        {posts.length === 0 && (
          <li className="text-muted-foreground py-6">
            {locale === 'de' ? 'Bald mehr.' : 'More coming soon.'}
          </li>
        )}
      </ul>
    </section>
  )
}
