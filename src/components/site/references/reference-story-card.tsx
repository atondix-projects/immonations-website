import Image from 'next/image'
import {
  referenceStoryImage,
  referenceStoryPropertyAlt,
  type ReferenceStoryItem,
} from '@/lib/content/reference-stories'

export function ReferenceStoryCard({
  item,
  locale,
  soldLabel,
  labels,
}: {
  item: ReferenceStoryItem
  locale: 'de' | 'en'
  soldLabel: string
  labels: {
    startingPoint: string
    challenge: string
    result: string
  }
}) {
  return (
    <article className="border-border bg-background overflow-hidden border">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[260px] bg-neutral-100 md:min-h-[320px]">
          <Image
            src={referenceStoryImage(item.id)}
            alt={referenceStoryPropertyAlt(item.id, locale)}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04] motion-reduce:transition-none"
          />
        </div>
        <div className="flex flex-col justify-center px-7 py-8 sm:px-9 md:py-10">
          <span className="bg-brand-50 text-brand-800 border-brand-100 w-fit border px-3 py-1 text-[10px] font-bold tracking-[0.12em] uppercase">
            {soldLabel}
          </span>
          <h3 className="mt-4 font-serif text-[1.35rem] leading-tight font-semibold text-balance md:text-[1.5rem]">
            {item.type}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">{item.location}</p>
          <p className="mt-5 text-sm font-semibold">{item.name}</p>
        </div>
      </div>

      <dl className="border-border bg-muted/60 flex flex-wrap gap-x-7 gap-y-4 border-y px-6 py-4 sm:px-7">
        {item.kpis.map((kpi) => (
          <div key={`${kpi.value}-${kpi.label}`}>
            <dt className="sr-only">{kpi.label}</dt>
            <dd className="font-serif text-lg font-semibold tabular-nums">{kpi.value}</dd>
            <dd className="text-muted-foreground mt-0.5 text-[11px] tracking-wide uppercase">
              {kpi.label}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-4 px-6 py-6 sm:px-7 sm:py-7">
        <p className="text-[15px] leading-[1.7] text-pretty">
          <span className="font-semibold">{labels.startingPoint}</span> {item.startingPoint}
        </p>
        <p className="text-[15px] leading-[1.7] text-pretty">
          <span className="font-semibold">{labels.challenge}</span> {item.challenge}
        </p>
        <p className="text-[15px] leading-[1.7] text-pretty">
          <span className="font-semibold">{labels.result}</span> {item.result}
        </p>
      </div>

      <blockquote className="border-brand-500 mx-6 mb-6 border border-l-[3px] px-6 py-5 sm:mx-7 sm:mb-7">
        <p className="text-[17px] leading-[1.55] font-medium text-pretty">„{item.quote}“</p>
        <footer className="text-muted-foreground mt-3 text-sm font-semibold">{item.name}</footer>
      </blockquote>
    </article>
  )
}
