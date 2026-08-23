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
        // Der zweispaltige Split erst ab xl: bei 1024-1279px wird die Titelspalte
        // sonst so schmal, dass die Überschrift in 6-7 Zeilen zerfällt. Das
        // Verhältnis 1.18/0.82 gibt der Titelspalte ab 1280px genug Breite, damit
        // 16-Zeichen-Komposita wie "Eigentumswohnung" ungetrennt passen.
        'mx-auto grid w-full max-w-[1320px] gap-8 px-5 py-16 sm:px-7 md:py-24 lg:px-12 lg:py-28 xl:grid-cols-[1.18fr_0.82fr] xl:items-end xl:gap-16',
        className,
      )}
    >
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h1
          className={`hyphens-headline max-w-[17ch] font-serif text-[2.8rem] leading-[0.98] font-medium tracking-[-0.035em] text-balance break-words md:text-[4.25rem] lg:text-[4.6rem] xl:text-[5.2rem] ${eyebrow ? 'mt-5' : ''}`}
        >
          {title}
        </h1>
      </div>
      {lede ? (
        <p className="text-muted-foreground max-w-[56ch] min-w-0 text-[1.05rem] leading-[1.75] text-pretty xl:pb-2">
          {lede}
        </p>
      ) : null}
    </section>
  )
}
