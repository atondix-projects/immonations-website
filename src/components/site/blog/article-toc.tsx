'use client'

import { useEffect, useRef, useState } from 'react'
import type { TocItem } from '@/lib/content/toc'
import { cn } from '@/lib/utils'

type ArticleTocProps = {
  items: readonly TocItem[]
  /** Visible kicker above the list, e.g. “Inhalt”. */
  label: string
  /** Accessible name for the nav landmark. */
  ariaLabel: string
  className?: string
}

/**
 * Sticky table of contents for `/blog/[slug]`.
 *
 * Navigation is plain anchors — `html { scroll-behavior: smooth }` plus the
 * `scroll-mt` on the headings already lands them below the fixed header, so
 * there is no scroll math here. The IntersectionObserver only drives the
 * active highlight.
 */
export function ArticleToc({ items, label, ariaLabel, className }: ArticleTocProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null)
  // Headings that have scrolled past the top band, in document order.
  const passedRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (items.length === 0) return

    const order = items.map((item) => item.id)
    const sections = order
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)
    if (sections.length === 0) return

    const passed = passedRef.current
    const headerHeight =
      Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
      ) || 68
    // Top edge of the "currently reading" band, in viewport coordinates.
    const bandTop = headerHeight + 16

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Inside the band the heading is being read; anything above the band
          // has been read past. The comparison must use `bandTop`, not 0 — a
          // heading sitting between the viewport top and the band would
          // otherwise count as neither, and the highlight would lag a section.
          if (entry.isIntersecting || entry.boundingClientRect.top < bandTop) {
            passed.add(entry.target.id)
          } else {
            passed.delete(entry.target.id)
          }
        }
        // The deepest heading we have reached wins — that is the section the
        // reader is actually in.
        const reached = order.filter((id) => passed.has(id))
        setActiveId(reached[reached.length - 1] ?? order[0] ?? null)
      },
      {
        // Active band: from just under the fixed header down to ~25 % of the
        // viewport, so the highlight tracks what is being read, not what is
        // barely visible at the bottom.
        rootMargin: `-${bandTop}px 0px -75% 0px`,
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      passed.clear()
    }
  }, [items])

  if (items.length === 0) return null

  // Only top-level sections carry a number; nested h3 rows are indented
  // instead, so the count must not run over them.
  let sectionNumber = 0
  const numbering = items.map((item) => (item.level === 2 ? ++sectionNumber : null))

  return (
    <nav aria-label={ariaLabel} className={cn('text-sm', className)}>
      <p className="text-muted-foreground font-mono text-[11px] tracking-[0.2em] uppercase">
        {label}
      </p>

      <ol className="border-border relative mt-5 border-l">
        {items.map((item, index) => {
          const isActive = item.id === activeId
          return (
            <li key={item.id} className="relative">
              {/* Active marker: a brand hairline that overlaps the list rule.
                  No pill, no badge — the page has hard edges throughout. */}
              <span
                aria-hidden="true"
                className={cn(
                  'bg-brand-600 absolute top-0 -left-px h-full w-[2px] transition-opacity duration-200 motion-reduce:transition-none',
                  isActive ? 'opacity-100' : 'opacity-0',
                )}
              />
              <a
                href={`#${item.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'hover:bg-muted/70 group flex gap-3 py-2 pr-2 leading-snug transition-colors duration-150 motion-reduce:transition-none',
                  item.level === 3 ? 'pl-9' : 'pl-4',
                  isActive
                    ? 'text-brand-700 font-medium'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {numbering[index] !== null ? (
                  <span className="font-mono text-[11px] tabular-nums opacity-70">
                    {String(numbering[index]).padStart(2, '0')}
                  </span>
                ) : null}
                <span className="text-[13.5px] text-pretty">{item.title}</span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
