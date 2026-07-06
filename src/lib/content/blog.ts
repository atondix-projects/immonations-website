import { routing } from '@/i18n/routing'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

type LocaleKey = (typeof routing.locales)[number]

export type PostFrontmatter = {
  title: string
  description: string
  date: string
  translationKey?: string
  tags?: string[]
  cover?: string
  author?: string
}

export type PostSummary = PostFrontmatter & {
  slug: string
  locale: LocaleKey
}

export type PostFull = PostSummary & {
  body: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content', 'blog')

async function readPostsForLocale(locale: LocaleKey): Promise<PostSummary[]> {
  const dir = path.join(CONTENT_ROOT, locale)
  let entries: string[]
  try {
    entries = await fs.readdir(dir)
  } catch {
    return []
  }
  const mdxFiles = entries.filter((e) => e.endsWith('.mdx'))

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = await fs.readFile(path.join(dir, file), 'utf8')
      const { data } = matter(raw)
      const fm = data as PostFrontmatter
      return { ...fm, slug, locale }
    }),
  )
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
}

export async function listPosts(locale: LocaleKey): Promise<PostSummary[]> {
  return readPostsForLocale(locale)
}

/**
 * Every (locale, slug) combination — used by the sitemap and `generateStaticParams`.
 */
export async function listAllPosts(): Promise<PostSummary[]> {
  const lists = await Promise.all(
    routing.locales.map((loc) => readPostsForLocale(loc as LocaleKey)),
  )
  return lists.flat()
}

export async function getPost(locale: LocaleKey, slug: string): Promise<PostFull | null> {
  const file = path.join(CONTENT_ROOT, locale, `${slug}.mdx`)
  try {
    const raw = await fs.readFile(file, 'utf8')
    const { data, content } = matter(raw)
    const fm = data as PostFrontmatter
    return { ...fm, slug, locale, body: content }
  } catch {
    return null
  }
}

export async function getPostAlternates(
  post: Pick<PostSummary, 'locale' | 'slug' | 'translationKey'>,
): Promise<Partial<Record<LocaleKey, string>>> {
  const paths: Partial<Record<LocaleKey, string>> = {
    [post.locale]: post.slug,
  }

  if (!post.translationKey) return paths

  const allPosts = await listAllPosts()
  for (const candidate of allPosts) {
    if (candidate.translationKey === post.translationKey) {
      paths[candidate.locale] = candidate.slug
    }
  }

  return paths
}
