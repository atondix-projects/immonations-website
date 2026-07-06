import { cn } from '@/lib/utils'

/**
 * Light page hero for content and marketing sub-pages.
 * Split layout: display title left, optional lede right — no decorative side stripes.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  className,
}: {
  eyebrow?: string
  title: string
  lede?: string
  className?: string
}) {
  return (
    <section
      className={cn(
        'mx-auto grid w-full max-w-[1240px] gap-8 px-6 py-16 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-14 lg:px-10 lg:py-20',
        className,
      )}
    >
      <div>
        {eyebrow ? (
          <p className="text-primary text-[13px] font-semibold tracking-[0.16em] uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`font-serif text-4xl leading-[1.08] font-semibold text-balance md:text-5xl lg:text-[56px] ${eyebrow ? 'mt-4' : ''}`}
        >
          {title}
        </h1>
      </div>
      {lede ? (
        <p className="text-muted-foreground max-w-[62ch] text-lg leading-[1.65] lg:pb-1">{lede}</p>
      ) : null}
    </section>
  )
}
