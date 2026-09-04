import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type FaqItem = { question: string; answer: string }

type FaqSectionProps = {
  title?: string
  items: FaqItem[]
  id?: string
  /** Defaults to h2 when a title is present. */
  headingLevel?: 'h2' | 'h3'
  /** Start numbering at this value (1-based display). */
  startIndex?: number
  className?: string
  /** Soften the section chrome when stacked in a multi-category hub. */
  variant?: 'default' | 'nested'
  footer?: ReactNode
}

/**
 * SSR-visible FAQ accordion (AEO rule: answers stay in the DOM).
 * Uses native `<details>`/`<summary>` — collapsed but present in the markup, unlike a
 * JS accordion that mounts answers on click. Matching pattern: `@/components/site/partner-faq`.
 * The page is responsible for emitting the matching faqPage() JSON-LD.
 */
export function FaqSection({
  title,
  items,
  id,
  headingLevel = 'h2',
  startIndex = 1,
  className,
  variant = 'default',
  footer,
}: FaqSectionProps) {
  const Heading = headingLevel
  // Scopes the exclusive-open behaviour to this block: the FAQ hub stacks several
  // FaqSections on one page and they must not collapse each other.
  const groupName = `faq-${id ?? 'section'}`

  return (
    <section
      id={id}
      className={cn(
        variant === 'default' && 'border-border bg-muted/65 border-y py-18 md:py-24',
        variant === 'nested' && 'scroll-mt-28 py-10 md:py-12',
        className,
      )}
    >
      <div
        className={cn(
          variant === 'default' && 'mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12',
          variant === 'nested' && 'w-full',
        )}
      >
        {title ? (
          <Heading
            className={cn(
              // `break-words hyphens-headline`: lange deutsche Komposita sprengen
              // sonst die Spalte auf schmalen Viewports; kurze Wörter und
              // Ortsnamen bleiben ungetrennt (siehe globals.css).
              'hyphens-headline font-serif font-medium tracking-[-0.025em] break-words',
              headingLevel === 'h2' &&
                'mb-12 max-w-[18ch] text-[2.35rem] leading-[1.04] md:text-[3.2rem]',
              headingLevel === 'h3' && 'mb-8 max-w-[28ch] text-2xl leading-tight md:text-3xl',
            )}
          >
            {title}
          </Heading>
        ) : null}
        <div className="border-border border-y">
          {items.map((item, index) => (
            <details
              key={item.question}
              name={groupName}
              className="group border-border border-b last:border-b-0"
            >
              <summary className="hover:text-brand-700 flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-base leading-7 font-semibold transition-colors marker:content-none md:py-7 md:text-lg [&::-webkit-details-marker]:hidden">
                <span className="grid min-w-0 grid-cols-[2.5rem_1fr] items-start gap-4 text-left">
                  <span className="text-brand-700 pt-0.5 font-mono text-xs tabular-nums">
                    {String(startIndex + index).padStart(2, '0')}
                  </span>
                  <span>{item.question}</span>
                </span>
                <ChevronDown
                  className="text-muted-foreground mt-1 size-4 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <div className="text-muted-foreground pb-7 pl-[4rem] text-[15px] leading-[1.75] md:max-w-[82ch]">
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
        {footer}
      </div>
    </section>
  )
}
