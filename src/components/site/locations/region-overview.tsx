import { AnimatedNumber } from '@/components/site/animated-number'
import { CONTAINER } from '@/components/site/home/section-shell'
import { cn } from '@/lib/utils'

export type RegionStat = { value: string; label: string }

/** Antwortabsatz (AEO) neben den aus den Registern abgeleiteten Kennzahlen. */
export function RegionOverview({ answer, stats }: { answer: string; stats: RegionStat[] }) {
  return (
    <section className="border-border bg-muted/45 border-y">
      <div
        className={cn(
          CONTAINER,
          'grid gap-10 py-12 md:py-14 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16',
        )}
      >
        <p className="max-w-[60ch] text-[17px] leading-[1.7] text-pretty">{answer}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="border-border flex flex-col gap-2 border-t pt-4">
              <dt className="text-muted-foreground order-2 text-[13px] leading-snug">
                {stat.label}
              </dt>
              <dd className="order-1">
                <AnimatedNumber
                  value={stat.value}
                  delay={index * 0.08}
                  className="font-serif text-[2.25rem] leading-none font-medium tracking-[-0.03em] md:text-[2.6rem]"
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
