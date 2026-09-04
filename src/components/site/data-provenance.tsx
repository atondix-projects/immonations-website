import { CalendarCheck2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type DataProvenanceProps = {
  /** Rendered as-of date, e.g. "Stand: September 2026". Use DATA_AS_OF from @/lib/content/provenance. */
  asOf: string
  /** Attribution line, e.g. "Quelle: immowelt / PriceHubble". */
  source?: string
  /** What the figures do not promise. Keeps the page honest without draft language. */
  note?: string
  className?: string
}

/**
 * Shared provenance footer for pages that publish numbers.
 *
 * Before this existed, `/market`, `/market-data`, `/price-atlas` and `/land-value` each
 * hand-rolled differently-worded (and differently-dated) attribution text, and one of them
 * shipped an internal to-do note to visitors. Every page that renders figures should end
 * with this block so the source and the as-of date are stated the same way everywhere.
 */
export function DataProvenance({ asOf, source, note, className }: DataProvenanceProps) {
  return (
    <aside
      className={cn(
        'border-border text-muted-foreground mt-8 border-t pt-5 text-sm leading-[1.65]',
        className,
      )}
    >
      <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-medium">
        <span className="inline-flex items-center gap-1.5">
          <CalendarCheck2
            className="text-brand-600 size-3.5 shrink-0"
            strokeWidth={1.75}
            aria-hidden
          />
          {asOf}
        </span>
        {source ? <span className="inline-flex items-center gap-1.5">{source}</span> : null}
      </p>
      {note ? (
        <p className="mt-2 flex max-w-[72ch] items-start gap-1.5 text-pretty">
          <Info className="mt-[0.3em] size-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span>{note}</span>
        </p>
      ) : null}
    </aside>
  )
}
