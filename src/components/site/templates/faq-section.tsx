import type { ReactNode } from 'react'
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
 * SSR-visible FAQ block (AEO rule: answers stay in the DOM, no JS accordion).
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
              'font-serif font-medium tracking-[-0.025em]',
              headingLevel === 'h2' &&
                'mb-12 max-w-[18ch] text-[2.35rem] leading-[1.04] md:text-[3.2rem]',
              headingLevel === 'h3' && 'mb-8 max-w-[28ch] text-2xl leading-tight md:text-3xl',
            )}
          >
            {title}
          </Heading>
        ) : null}
        <dl className="divide-border border-border border-y">
          {items.map((item, index) => (
            <div
              key={item.question}
              className="grid gap-4 border-b py-7 last:border-b-0 md:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 md:py-9"
            >
              <span className="text-brand-700 font-mono text-xs tabular-nums">
                {String(startIndex + index).padStart(2, '0')}
              </span>
              <dt className="max-w-[28ch] font-serif text-xl leading-snug font-medium md:text-2xl">
                {item.question}
              </dt>
              <dd className="text-muted-foreground max-w-[65ch] text-[15px] leading-[1.75]">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        {footer}
      </div>
    </section>
  )
}
