export type FaqItem = { question: string; answer: string }

/**
 * SSR-visible FAQ block (AEO rule: answers stay in the DOM, no JS accordion).
 * The page is responsible for emitting the matching faqPage() JSON-LD.
 */
export function FaqSection({ title, items }: { title?: string; items: FaqItem[] }) {
  return (
    <section className="border-border bg-muted border-y py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        {title ? (
          <h2 className="mb-10 font-serif text-3xl font-semibold leading-[1.2] md:text-[34px]">
            {title}
          </h2>
        ) : null}
        <dl className="grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.question}
              className="border-border border-t-accent flex flex-col gap-2.5 border border-t-2 bg-white p-7"
            >
              <dt className="text-[19px] font-semibold leading-snug">{item.question}</dt>
              <dd className="text-muted-foreground text-[15px] leading-[1.6]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
