'use client'

import { Check, ShieldCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { storeConsentChoice } from '@/lib/consent/store'
import { useExternalMediaConsent, useIsHydrated } from '@/components/site/consent/use-consent'
import { cn } from '@/lib/utils'

/**
 * Der Sammel-Schalter über der Kachelwand: einmal einwilligen, statt jede Kachel
 * einzeln freizugeben.
 *
 * Er schreibt dieselbe Auswahl wie „Alle erlauben" im Cookie-Hinweis
 * (`storeConsentChoice('all')`) — es gibt also nur einen Einwilligungszustand,
 * nicht zwei konkurrierende. Danach zeigt die Leiste den erreichten Zustand an
 * und verschwindet nicht, damit sichtbar bleibt, dass eine Einwilligung vorliegt.
 *
 * Vor der Hydration wird nichts gerendert: Serverseitig ist die gespeicherte
 * Auswahl unbekannt, und ein kurz aufblitzender Hinweis wäre irreführend.
 */
export function SocialConsentBar({ className }: { className?: string }) {
  const t = useTranslations('SocialEmbed.consentBar')
  const hasConsent = useExternalMediaConsent()
  const isHydrated = useIsHydrated()

  if (!isHydrated) return null

  return (
    <div
      className={cn(
        'border-border bg-muted/50 flex flex-col gap-3 border p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="text-brand-700 mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-[14px] leading-snug font-semibold">
            {hasConsent ? t('activeTitle') : t('title')}
          </p>
          <p className="text-muted-foreground mt-1 max-w-[70ch] text-[13px] leading-[1.6] text-pretty">
            {hasConsent ? t('activeText') : t('text')}
          </p>
        </div>
      </div>

      {hasConsent ? (
        <p className="text-brand-700 inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold">
          <Check className="size-4" aria-hidden="true" />
          {t('activeBadge')}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => storeConsentChoice('all')}
          className="bg-brand-700 hover:bg-brand-800 focus-visible:ring-brand-500 inline-flex min-h-11 shrink-0 items-center justify-center px-5 text-[13px] font-semibold text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          {t('button')}
        </button>
      )}
    </div>
  )
}
