import type { Metadata } from 'next'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import {
  getAdjacentPosts,
  getPost,
  getPostAlternates,
  listAllPosts,
  readingTimeMinutes,
  type PostSummary,
} from '@/lib/content/blog'
import { extractToc, rehypeHeadingIds } from '@/lib/content/toc'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { ArticleToc } from '@/components/site/blog/article-toc'
import { ReadingProgress } from '@/components/site/blog/reading-progress'
import { article, breadcrumbList, faqPage } from '@/lib/seo/jsonld'
import { localizePath } from '@/lib/seo/routes'
import { SITE } from '@/lib/seo/site'

export const dynamic = 'force-static'

export async function generateStaticParams() {
  const all = await listAllPosts()
  return all.map((post) => ({ locale: post.locale, slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  const post = await getPost(locale, slug)
  if (!post) notFound()
  const alternates = await getPostAlternates(post)
  const localizedPaths = Object.fromEntries(
    Object.entries(alternates).map(([loc, localizedSlug]) => [
      loc,
      localizePath('/blog/[slug]', loc as (typeof routing.locales)[number]).replace(
        '[slug]',
        localizedSlug,
      ),
    ]),
  )

  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    image: post.cover,
    localizedPaths,
  })
}

/**
 * `scroll-mt` on the headings keeps anchor jumps clear of the fixed header —
 * the TOC relies on it instead of doing its own scroll math.
 */
const HEADING_SCROLL_MARGIN = 'scroll-mt-[calc(var(--header-height)+2rem)]'

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={`${HEADING_SCROLL_MARGIN} mt-14 mb-4 font-serif text-[1.9rem] leading-[1.15] font-medium tracking-[-0.02em] text-balance first:mt-0 md:text-[2.25rem]`}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={`${HEADING_SCROLL_MARGIN} mt-10 mb-3 font-serif text-xl leading-snug font-medium text-balance md:text-2xl`}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-foreground/90 mb-5 text-[17px] leading-[1.75] text-pretty" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="marker:text-brand-600 mb-5 ml-5 list-disc space-y-2 text-[17px] leading-[1.7]"
      {...props}
    />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol
      className="marker:text-brand-600 mb-5 ml-5 list-decimal space-y-2 text-[17px] leading-[1.7]"
      {...props}
    />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className="text-brand-700 decoration-brand-300 hover:decoration-brand-600 underline underline-offset-4 transition-colors"
      {...props}
    />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-brand-600 text-foreground/85 my-8 border-l-2 py-1 pl-6 text-[18px] leading-[1.7] italic"
      {...props}
    />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className="text-foreground font-semibold" {...props} />
  ),
  hr: (props: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="border-border my-12" {...props} />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div
      className="border-border my-8 overflow-x-auto border"
      tabIndex={0}
      role="region"
      aria-label="Tabelle"
    >
      <table className="w-full min-w-[36rem] border-collapse text-left" {...props} />
    </div>
  ),
  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border-border bg-muted/70 border-b px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase"
      {...props}
    />
  ),
  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border-border text-foreground/85 border-b px-4 py-3 align-top text-[15px] leading-relaxed"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted rounded-sm px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      tabIndex={0}
      className="border-border bg-muted/50 my-8 overflow-x-auto border p-5 font-mono text-[13px] leading-relaxed"
      {...props}
    />
  ),
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const post = await getPost(locale, slug)
  if (!post) notFound()

  const nav = await getTranslations('Nav')
  const t = await getTranslations('BlogPost')

  const toc = extractToc(post.body)
  const minutes = readingTimeMinutes(post.body)
  const { newer, older } = await getAdjacentPosts(locale, slug)

  const blogPath = localizePath('/blog', locale)
  const postPath = localizePath('/blog/[slug]', locale).replace('[slug]', slug)
  const url = `${SITE.url}/${locale}${postPath}`
  const structuredData = [
    breadcrumbList([
      { name: nav('home'), url: `${SITE.url}/${locale}` },
      { name: nav('blog'), url: `${SITE.url}/${locale}${blogPath}` },
      { name: post.title, url },
    ]),
    article({
      locale,
      url,
      title: post.title,
      description: post.description,
      datePublished: post.date,
      image: post.cover,
      authorName: post.author,
    }),
    ...(post.faqs?.length ? [faqPage(post.faqs)] : []),
  ]

  const tocNode =
    toc.length > 0 ? (
      <ArticleToc items={toc} label={t('toc.label')} ariaLabel={t('toc.aria')} />
    ) : null

  return (
    <div className="bg-background">
      <JsonLd data={structuredData} />
      <ReadingProgress />

      <header className="border-border border-b">
        <div className="mx-auto w-full max-w-[1320px] px-5 pt-14 pb-12 sm:px-7 md:pt-20 md:pb-16 lg:px-12">
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-brand-700 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            {t('backToOverview')}
          </Link>

          <h1 className="mt-7 max-w-[20ch] font-serif text-[2.6rem] leading-[1.02] font-medium tracking-[-0.03em] text-balance break-words hyphens-auto md:text-[3.8rem] lg:text-[4.4rem]">
            {post.title}
          </h1>

          <p className="text-muted-foreground mt-7 max-w-[62ch] text-[1.05rem] leading-[1.75] text-pretty">
            {post.description}
          </p>

          <dl className="text-muted-foreground mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase">
            <div>
              <dt className="sr-only">{t('meta.published')}</dt>
              <dd>
                <time dateTime={post.date}>
                  {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(
                    new Date(post.date),
                  )}
                </time>
              </dd>
            </div>
            <span aria-hidden="true" className="bg-border h-px w-6" />
            <div>
              <dt className="sr-only">{t('meta.readingTimeLabel')}</dt>
              <dd>{t('meta.readingTime', { minutes })}</dd>
            </div>
            {post.author ? (
              <>
                <span aria-hidden="true" className="bg-border h-px w-6" />
                <div>
                  <dt className="sr-only">{t('meta.author')}</dt>
                  <dd>{post.author}</dd>
                </div>
              </>
            ) : null}
          </dl>
        </div>
      </header>

      {/* Collapsed on small screens, where a sticky rail has nowhere to live. */}
      {tocNode ? (
        <div className="border-border mx-auto w-full max-w-[1320px] border-b px-5 sm:px-7 lg:hidden">
          <details className="group py-4">
            <summary className="text-foreground flex cursor-pointer list-none items-center justify-between text-sm font-medium">
              {t('toc.mobileToggle')}
              <span
                aria-hidden="true"
                className="text-muted-foreground font-mono text-xs transition-transform duration-150 group-open:rotate-180 motion-reduce:transition-none"
              >
                ↓
              </span>
            </summary>
            <div className="mt-4 pb-2">{tocNode}</div>
          </details>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[1320px] px-5 py-14 sm:px-7 md:py-20 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          {/* The article stays first in the DOM — the sidebar is placed left
              purely by grid position, so crawlers and answer engines still hit
              the prose before a link list. */}
          <article
            id="article-content"
            className="max-w-[70ch] min-w-0 lg:col-start-2 lg:row-start-1"
          >
            <MDXRemote
              source={post.body}
              components={mdxComponents}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHeadingIds],
                },
              }}
            />
          </article>

          {tocNode ? (
            <aside className="hidden lg:sticky lg:top-[calc(var(--header-height)+2.5rem)] lg:col-start-1 lg:row-start-1 lg:block lg:self-start">
              {tocNode}
            </aside>
          ) : null}
        </div>
      </div>

      {/* No frontmatter FAQ block here on purpose: posts that declare `faqs`
          also spell the same Q&A out in their MDX body, so rendering both
          would duplicate them. The frontmatter still drives faqPage() JSON-LD. */}

      {newer || older ? (
        <nav
          aria-label={t('pagination.aria')}
          className="mx-auto w-full max-w-[1320px] px-5 py-14 sm:px-7 md:py-20 lg:px-12"
        >
          <ul className="border-border grid gap-px border-y md:grid-cols-2">
            {older ? (
              <AdjacentLink post={older} direction="older" label={t('pagination.older')} />
            ) : null}
            {newer ? (
              <AdjacentLink post={newer} direction="newer" label={t('pagination.newer')} />
            ) : null}
          </ul>
        </nav>
      ) : null}
    </div>
  )
}

function AdjacentLink({
  post,
  direction,
  label,
}: {
  post: PostSummary
  direction: 'older' | 'newer'
  label: string
}) {
  const Icon = direction === 'older' ? ArrowLeft : ArrowRight
  return (
    <li className="min-w-0">
      <Link
        href={{ pathname: '/blog/[slug]', params: { slug: post.slug } }}
        className="group hover:bg-muted/60 flex h-full flex-col gap-3 py-8 transition-colors duration-150 motion-reduce:transition-none md:px-6"
      >
        <span className="text-muted-foreground flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase">
          {direction === 'older' ? <Icon className="size-3.5" aria-hidden="true" /> : null}
          {label}
          {direction === 'newer' ? <Icon className="size-3.5" aria-hidden="true" /> : null}
        </span>
        <span className="group-hover:text-brand-700 font-serif text-xl leading-snug font-medium text-balance transition-colors md:text-2xl">
          {post.title}
        </span>
        <ArrowUpRight
          className="text-muted-foreground mt-auto size-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </li>
  )
}
