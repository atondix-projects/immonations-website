import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { DrKleinToolEmbed } from '@/components/site/finance/drklein-tool-embed'
import { drKleinEmbedUrl, getDrKleinTool } from '@/lib/content/drklein-tools'
import { CONTAINER, EYEBROW } from './section-shell'

/**
 * Der Bauzinsrechner braucht ausgefahren rund 3450 px — auf der Startseite wäre
 * das ein Fremdkörper. Hier steht deshalb nur das Eingabeformular in voller
 * Höhe; die Angebotsliste darunter erreicht man durch Scrollen im Modul oder
 * über den Link auf die Finanzierungsseite.
 */
const TEASER_HEIGHT = 980

/**
 * Finanzierungs-Teaser der Startseite.
 *
 * Rechts steht der echte Bauzinsrechner von Dr. Klein, nicht dessen Abbild —
 * die Frage "was kostet mich das monatlich" lässt sich damit sofort beantworten,
 * ohne die Seite zu wechseln. Der Link führt für alles Weitere auf
 * `/financing`, wo Bauzinschart und Hauskreditrechner danebenstehen.
 *
 * Wie überall bei Drittanbieter-Einbettungen lädt der Rechner erst nach
 * Freigabe; vorher erreicht Dr. Klein keine Anfrage.
 */
export async function FinancingTeaser() {
  const locale = await getLocale()
  const t = await getTranslations('Home.financing')
  const embedT = await getTranslations('DrKleinEmbed')
  const tool = getDrKleinTool('construction-interest-calculator')

  return (
    <section
      id="finanzierung"
      aria-labelledby="financing-teaser-title"
      className="bg-muted/45 border-border scroll-mt-24 border-y py-16 md:py-24"
    >
      <div className={CONTAINER}>
        <div className="grid gap-12 lg:grid-cols-[minmax(17rem,0.78fr)_minmax(0,1.22fr)] lg:gap-16 xl:gap-24">
          <div>
            <p className={EYEBROW}>{t('eyebrow')}</p>
            <h2
              id="financing-teaser-title"
              className="mt-5 max-w-[15ch] font-serif text-[2rem] leading-[1.04] font-medium tracking-[-0.025em] text-balance sm:text-[2.35rem] md:text-[3.35rem]"
            >
              {t('title')}
            </h2>
            <p className="text-muted-foreground mt-6 max-w-[42ch] text-[17px] leading-[1.75] text-pretty">
              {t('text')}
            </p>
            {locale === 'de' ? null : (
              <p className="text-muted-foreground mt-4 max-w-[42ch] text-[13px] leading-[1.7] text-pretty">
                {embedT('germanOnlyNote')}
              </p>
            )}
            <Link
              href="/financing"
              className="focus-visible:ring-brand-500 mt-9 inline-flex min-h-12 items-center justify-center bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {t('cta')}
            </Link>
            <p className="text-muted-foreground mt-6 max-w-[46ch] text-[13px] leading-[1.7] text-pretty">
              {t('disclaimer')}
            </p>
          </div>

          {/* `min-w-0`: sonst drückt das iframe die Grid-Spalte auf Mobil auf. */}
          <div className="min-w-0">
            <DrKleinToolEmbed
              url={drKleinEmbedUrl(tool)}
              toolId={tool.id}
              frameHeight={TEASER_HEIGHT}
              labels={{
                name: tool.name,
                load: embedT('load', { name: tool.name }),
                loading: embedT('loading'),
                consentNote: embedT('consentNote', { name: tool.name }),
                failedTitle: embedT('failedTitle'),
                failedLink: embedT('failedLink', { name: tool.name }),
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
