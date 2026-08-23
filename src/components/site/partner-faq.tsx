import { ChevronDown } from 'lucide-react'

type FaqItem = { question: string; answer: string }

export function PartnerFaq({ title, items }: { title: string; items: FaqItem[] }) {
  return (
    <section aria-labelledby="partner-faq-title">
      <h2
        id="partner-faq-title"
        className="hyphens-headline max-w-[19ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance md:text-[3.35rem]"
      >
        {title}
      </h2>
      <div className="border-border mt-10 border-y">
        {items.map((item, index) => (
          <details
            key={item.question}
            name="partner-faq"
            className="group border-border border-b last:border-b-0"
          >
            <summary className="hover:text-brand-700 flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-base leading-7 font-semibold transition-colors marker:content-none md:py-7 md:text-lg [&::-webkit-details-marker]:hidden">
              <span className="grid min-w-0 grid-cols-[2.5rem_1fr] items-start gap-4 text-left">
                <span className="text-brand-700 pt-0.5 font-mono text-xs tabular-nums">
                  {String(index + 1).padStart(2, '0')}
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
    </section>
  )
}
