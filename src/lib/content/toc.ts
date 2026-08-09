/**
 * Heading anchors for long-form MDX.
 *
 * Two consumers must agree on every id:
 *   1. `extractToc()` — reads the raw markdown before it is compiled and builds
 *      the sidebar list.
 *   2. `rehypeHeadingIds` — stamps `id` on the rendered `<h2>` / `<h3>`.
 *
 * They agree because both feed the *visible* heading text through the same
 * `createSlugger()`: the extractor strips inline markdown first, the rehype
 * plugin concatenates the text descendants of the already-parsed heading.
 */

export type TocItem = {
  id: string
  title: string
  level: 2 | 3
}

const UMLAUTS: Record<string, string> = {
  ä: 'ae',
  ö: 'oe',
  ü: 'ue',
  ß: 'ss',
}

/** Deterministic, ASCII-only, German-aware slug. */
export function slugify(input: string): string {
  return (
    input
      .normalize('NFC') // so the umlaut map below sees composed characters
      .toLowerCase()
      .replace(/[äöüß]/g, (char) => UMLAUTS[char] ?? char)
      .normalize('NFKD')
      // Drop the combining marks NFKD just split off (é → e), so accented
      // characters collapse into their base letter instead of into a dash.
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  )
}

/**
 * Slug factory with collision suffixes (`intro`, `intro-1`, …). One instance
 * per document — never share it across posts.
 */
export function createSlugger(): (input: string) => string {
  const seen = new Map<string, number>()

  return (input: string) => {
    const base = slugify(input) || 'section'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }
}

/** Remove the inline markdown that never reaches the reader. */
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Collect `##` / `###` headings in document order, ignoring anything inside a
 * fenced code block.
 */
export function extractToc(markdown: string): TocItem[] {
  const slug = createSlugger()
  const items: TocItem[] = []
  let insideFence = false

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      insideFence = !insideFence
      continue
    }
    if (insideFence) continue

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line)
    if (!match) continue

    const hashes = match[1] ?? ''
    const title = stripInlineMarkdown(match[2] ?? '')
    if (!title) continue

    items.push({ id: slug(title), title, level: hashes.length === 2 ? 2 : 3 })
  }

  return items
}

/** Minimal structural view of a hast node — avoids pulling in `@types/hast`. */
type HastNode = {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function textContent(node: HastNode): string {
  if (node.type === 'text') return node.value ?? ''
  if (!node.children) return ''
  return node.children.map(textContent).join('')
}

function isHastNode(value: unknown): value is HastNode {
  return typeof value === 'object' && value !== null && 'type' in value
}

/**
 * Rehype plugin: give every `<h2>` / `<h3>` a stable id derived from its
 * rendered text. Document order is guaranteed by the depth-first walk, so the
 * collision suffixes line up with `extractToc()`.
 */
export function rehypeHeadingIds() {
  return (tree: unknown) => {
    if (!isHastNode(tree)) return
    const slug = createSlugger()

    const walk = (node: HastNode) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const title = stripInlineMarkdown(textContent(node))
        if (title) {
          node.properties = { ...node.properties, id: slug(title) }
        }
      }
      node.children?.forEach(walk)
    }

    walk(tree)
  }
}
