import { Bike, Car, TrainFront } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

type DirectionRoute = { from: string; meta: string; text: string }

type DirectionMode = {
  id: 'car' | 'transit' | 'bike'
  title: string
  intro?: string
  routes: DirectionRoute[]
  note?: string
}

const MODE_ICONS: Record<DirectionMode['id'], LucideIcon> = {
  car: Car,
  transit: TrainFront,
  bike: Bike,
}

const EYEBROW = 'text-brand-700 text-[11px] font-semibold tracking-[0.22em] uppercase md:text-xs'

/** Route descriptions per travel mode — plain prose, indexable, no interaction. */
export async function Directions() {
  const t = await getTranslations('ContactPage.directions')
  const modes = t.raw('modes') as DirectionMode[]

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end lg:gap-16">
        <div>
          <p className={EYEBROW}>{t('eyebrow')}</p>
          <h2 className="mt-4 max-w-[16ch] font-serif text-[2.35rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance break-words hyphens-headline md:text-[3.2rem]">
            {t('title')}
          </h2>
        </div>
        <p className="text-muted-foreground max-w-[68ch] text-[16px] leading-[1.75] text-pretty">
          {t('intro')}
        </p>
      </div>

      <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {modes.map((mode) => {
          const Icon = MODE_ICONS[mode.id]

          return (
            <section key={mode.id} className="border-border border-t pt-6">
              <Icon className="text-brand-600 size-5" strokeWidth={1.75} aria-hidden="true" />
              <h3 className="mt-4 font-serif text-xl leading-snug font-medium md:text-2xl">
                {mode.title}
              </h3>
              {mode.intro ? (
                <p className="text-muted-foreground mt-3 text-[15px] leading-[1.7] text-pretty">
                  {mode.intro}
                </p>
              ) : null}
              <ul className="mt-6 grid gap-6">
                {mode.routes.map((route) => (
                  <li key={route.from}>
                    <p className="text-[15px] font-semibold">{route.from}</p>
                    <p className="text-brand-700 mt-1 font-mono text-[11px] tracking-[0.06em] tabular-nums">
                      {route.meta}
                    </p>
                    <p className="text-muted-foreground mt-2 text-[15px] leading-[1.7] text-pretty hyphens-auto">
                      {route.text}
                    </p>
                  </li>
                ))}
              </ul>
              {mode.note ? (
                <p className="text-muted-foreground border-border mt-6 border-t pt-4 text-sm leading-[1.7] text-pretty">
                  {mode.note}
                </p>
              ) : null}
            </section>
          )
        })}
      </div>
    </div>
  )
}
