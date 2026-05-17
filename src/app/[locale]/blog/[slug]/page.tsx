import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { routing } from '@/i18n/routing'
import { getPost, listAllPosts } from '@/lib/content/blog'
import { buildMetadata } from '@/lib/seo/metadata'
import { JsonLd } from '@/components/site/json-ld'
import { article, breadcrumbList } from '@/lib/seo/jsonld'
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

  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    image: post.cover,
  })
}

const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-6 mt-10 text-4xl font-semibold tracking-tight first:mt-0" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="mb-4 mt-10 text-2xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="mb-3 mt-8 text-xl font-medium" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-foreground/90 mb-4 leading-7" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc space-y-2 leading-7" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal space-y-2 leading-7" {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className="text-foreground underline underline-offset-4 hover:opacity-80" {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-border my-6 border-l-2 pl-4 italic" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-muted rounded px-1.5 py-0.5 text-sm" {...props} />
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

  const t = await getTranslations('Nav')
  const url = `${SITE.url}/${locale}/blog/${slug}`

  return (
    <article className="container mx-auto max-w-3xl px-6 py-16">
      <JsonLd
        data={[
          breadcrumbList([
            { name: t('home'), url: `${SITE.url}/${locale}` },
            { name: t('blog'), url: `${SITE.url}/${locale}/blog` },
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
        ]}
      />
      <header className="mb-10">
        <p className="text-muted-foreground text-sm uppercase tracking-wider">
          {new Intl.DateTimeFormat(locale, { dateStyle: 'long' }).format(new Date(post.date))}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">{post.title}</h1>
        <p className="text-muted-foreground mt-4 text-lg">{post.description}</p>
      </header>
      <div>
        <MDXRemote
          source={post.body}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  )
}
