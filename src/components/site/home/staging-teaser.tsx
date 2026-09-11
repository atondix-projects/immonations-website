import { ArrowUpRight } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { VisualizationCompare } from '@/components/site/staging/visualization-compare'
import { HOME_TEASER_PAIR, PAIR_SLUGS } from '@/components/site/staging/visualization-pairs'
import { CONTAINER, SectionHeader } from './section-shell'

/**
 * KI-Visualisierungs-Teaser der Startseite.
 *
 * Die Marketing-Kachel davor zeigt Visualisierungen als Film; hier steht der Beleg,
 * den sonst nur `/staging` trägt: Original und Visualisierung aus derselben
 * Kameraposition, per Regler vergleichbar. Paartexte, Labels und Hinweis kommen aus
 * `StagingPage`, damit Startseite und Unterseite nicht auseinanderlaufen.
 *
 * Bewusst heller Grund: `VisualizationCompare` setzt seine Bildunterschrift in
 * `text-muted-foreground` und ist nur für helle Flächen gebaut.
 */
export async function StagingTeaser() {
  const t = await getTranslations('Home.staging')
  const pageT = await getTranslations('StagingPage')
  const slug = HOME_TEASER_PAIR

  return (
    <section
      id="ki-visualisierung"
      className="bg-background border-border scroll-mt-24 border-b py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        {/* DOM-Reihenfolge Text → Regler → CTA: Auf Mobil steht der Beleg vor dem Link,
            der wegführt. Ab `lg` hebt das Grid den Regler in die rechte Spalte über beide
            Zeilen; `auto_1fr` fängt dessen Überhöhe in der CTA-Zeile auf. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-9 xl:gap-x-24">
          <p className="text-muted-foreground max-w-[46ch] text-[17px] leading-[1.75] text-pretty lg:col-start-1 lg:row-start-1">
            {t('text')}
          </p>

          {/* `min-w-0`: sonst drückt das Bild die Grid-Spalte auf Mobil auf. */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <VisualizationCompare
              pair={{
                slug,
                title: pageT(`compare.items.${slug}.title`),
                text: pageT(`compare.items.${slug}.text`),
                beforeAlt: pageT(`compare.items.${slug}.beforeAlt`),
                afterAlt: pageT(`compare.items.${slug}.afterAlt`),
              }}
              index={0}
              beforeLabel={pageT('compare.beforeLabel')}
              afterLabel={pageT('compare.afterLabel')}
              controlLabel={pageT('compare.controlLabel')}
              size="compact"
            />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <Link
              href="/staging"
              className="focus-visible:ring-brand-500 inline-flex min-h-12 items-center justify-center gap-2 bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('cta', { count: PAIR_SLUGS.length })}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <p className="text-muted-foreground mt-6 max-w-[46ch] text-[13px] leading-[1.7] text-pretty">
              {pageT('compare.disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
