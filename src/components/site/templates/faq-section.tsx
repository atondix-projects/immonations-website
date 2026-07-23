export type FaqItem = { question: string; answer: string }

/**
 * SSR-visible FAQ block (AEO rule: answers stay in the DOM, no JS accordion).
 * The page is responsible for emitting the matching faqPage() JSON-LD.
 */
export function FaqSection({ title, items }: { title?: string; items: FaqItem[] }) {
  return (
    <section className="border-border bg-muted/65 border-y py-18 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-7 lg:px-12">
        {title ? (
          <h2 className="mb-12 max-w-[18ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] md:text-[3.2rem]">
            {title}
          </h2>
        ) : null}
        <dl className="divide-border border-border border-y">
          {items.map((item, index) => (
            <div
              key={item.question}
              className="grid gap-4 border-b py-7 last:border-b-0 md:grid-cols-[3rem_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-8 md:py-9"
            >
              <span className="text-brand-700 font-mono text-xs tabular-nums">
                {String(index + 1).padStart(2, '0')}
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
      </div>
    </section>
  )
}
