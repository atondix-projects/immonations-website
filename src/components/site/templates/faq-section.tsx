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
          <h2 className="mb-10 font-serif text-3xl leading-[1.2] font-semibold md:text-[34px]">
            {title}
          </h2>
        ) : null}
        <dl className="grid gap-8 lg:grid-cols-2">
          {items.map((item) => (
            <div key={item.question} className="flex flex-col gap-2.5">
              <dt className="text-[18px] leading-snug font-semibold">{item.question}</dt>
              <dd className="text-muted-foreground text-[15px] leading-[1.65]">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
