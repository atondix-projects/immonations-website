'use client'

import { useState } from 'react'
import { Check, LockKeyhole, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

export function HandbookRequestForm() {
  const t = useTranslations('HandbookRequest')
  const [isSubmitted, setIsSubmitted] = useState(false)

  function resetSubmission() {
    setIsSubmitted(false)
  }

  return (
    <form
      className="border-border bg-background border p-6 shadow-sm sm:p-8"
      onSubmit={(event) => {
        event.preventDefault()
        setIsSubmitted(true)
      }}
    >
      <div className="flex items-center gap-3">
        <LockKeyhole className="text-primary size-5" aria-hidden="true" />
        <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
          {t('eyebrow')}
        </p>
      </div>
      <h2 className="mt-4 font-serif text-3xl leading-tight font-semibold">{t('title')}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t('text')}</p>

      <div className="mt-7 grid gap-5">
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="handbook-name">
          {t('name')}
          <input
            id="handbook-name"
            name="name"
            required
            autoComplete="name"
            onChange={resetSubmission}
            className="border-input focus:border-brand-700 focus:ring-brand-500/20 min-h-12 border bg-white px-4 text-base outline-none focus:ring-[3px]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="handbook-email">
          {t('email')}
          <input
            id="handbook-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            onChange={resetSubmission}
            className="border-input focus:border-brand-700 focus:ring-brand-500/20 min-h-12 border bg-white px-4 text-base outline-none focus:ring-[3px]"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="handbook-situation">
          {t('situation')}
          <select
            id="handbook-situation"
            name="situation"
            required
            defaultValue=""
            onChange={resetSubmission}
            className="border-input focus:border-brand-700 focus:ring-brand-500/20 min-h-12 border bg-white px-4 text-base outline-none focus:ring-[3px]"
          >
            <option value="" disabled>
              {t('situationPlaceholder')}
            </option>
            {(t.raw('situations') as string[]).map((situation) => (
              <option key={situation} value={situation}>
                {situation}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label
        className="text-muted-foreground mt-6 flex items-start gap-3 text-xs leading-relaxed"
        htmlFor="handbook-consent"
      >
        <input
          id="handbook-consent"
          name="consent"
          required
          type="checkbox"
          onChange={resetSubmission}
          className="border-input text-primary focus:ring-brand-500 mt-0.5 size-4 shrink-0"
        />
        <span>
          {t('consent')}{' '}
          <Link href="/privacy" className="text-primary font-semibold underline underline-offset-2">
            {t('privacyLink')}
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-brand-700 mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold transition-colors active:translate-y-px"
      >
        <Send className="size-4" aria-hidden="true" />
        {t('submit')}
      </button>

      {isSubmitted ? (
        <p className="text-success mt-5 flex items-start gap-2 text-sm font-semibold" role="status">
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('success')}
        </p>
      ) : null}
      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{t('prototypeNote')}</p>
    </form>
  )
}
