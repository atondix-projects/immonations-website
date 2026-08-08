'use client'

import { useTranslations } from 'next-intl'
import { storeConsentChoice } from '@/lib/consent/store'
import { useConsentChoice, useIsHydrated } from '@/components/site/consent/use-consent'

export function CookieNotice() {
  const t = useTranslations('CookieConsent')
  const choice = useConsentChoice()
  const isHydrated = useIsHydrated()

  // Vor der Hydration ist die gespeicherte Auswahl unbekannt — erst danach
  // entscheidet sich, ob der Hinweis überhaupt nötig ist.
  if (!isHydrated || choice !== null) return null

  return (
    <aside
      className="border-border bg-neutral-0 fixed right-4 bottom-4 z-40 w-[min(390px,calc(100vw-2rem))] border p-5 shadow-[0_20px_55px_-35px_rgba(38,36,34,0.65)]"
      aria-label={t('label')}
    >
      <p className="font-serif text-xl font-medium">{t('title')}</p>
      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{t('text')}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => storeConsentChoice('all')}
          className="bg-brand-700 hover:bg-brand-800 min-h-10 flex-1 px-4 text-xs font-semibold text-white"
        >
          {t('accept')}
        </button>
        <button
          type="button"
          onClick={() => storeConsentChoice('necessary')}
          className="border-border min-h-10 flex-1 border px-4 text-xs font-semibold hover:border-neutral-600"
        >
          {t('necessary')}
        </button>
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-neutral-500">{t('note')}</p>
    </aside>
  )
}
