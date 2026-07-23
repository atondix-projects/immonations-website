'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function PrototypeCookieNotice() {
  const t = useTranslations('PrototypeCookie')
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <aside
      className="border-border bg-neutral-0 fixed right-4 bottom-4 z-40 w-[min(390px,calc(100vw-2rem))] border p-5 shadow-[0_20px_55px_-35px_rgba(38,36,34,0.65)]"
      aria-label={t('label')}
    >
      <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
        {t('prototype')}
      </p>
      <p className="mt-2 font-serif text-xl font-medium">{t('title')}</p>
      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{t('text')}</p>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="bg-brand-700 hover:bg-brand-800 min-h-10 flex-1 px-4 text-xs font-semibold text-white"
        >
          {t('accept')}
        </button>
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="border-border min-h-10 flex-1 border px-4 text-xs font-semibold hover:border-neutral-600"
        >
          {t('necessary')}
        </button>
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-neutral-500">{t('note')}</p>
    </aside>
  )
}
