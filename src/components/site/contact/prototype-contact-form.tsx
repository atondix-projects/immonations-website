'use client'

import { useState } from 'react'
import { Check, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function PrototypeContactForm() {
  const t = useTranslations('ContactForm')
  const [complete, setComplete] = useState(false)

  return (
    <form
      className="border-border bg-neutral-0 border p-6 sm:p-8"
      onSubmit={(event) => {
        event.preventDefault()
        setComplete(true)
      }}
    >
      <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
        {t('prototypeLabel')}
      </p>
      <h2 className="mt-3 font-serif text-3xl leading-tight font-medium">{t('title')}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t('text')}</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t('name')}
          <input
            required
            onChange={() => setComplete(false)}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t('email')}
          <input
            required
            type="email"
            onChange={() => setComplete(false)}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
          {t('topic')}
          <select
            onChange={() => setComplete(false)}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          >
            {(t.raw('topics') as string[]).map((topic) => (
              <option key={topic}>{topic}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
          {t('message')}
          <textarea
            required
            rows={5}
            onChange={() => setComplete(false)}
            className="border-input focus:border-brand-700 resize-y border bg-white p-4 text-base outline-none"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-brand-700 hover:bg-brand-800 mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold text-white"
      >
        <Send className="size-4" aria-hidden="true" />
        {t('submit')}
      </button>
      {complete ? (
        <p className="text-success mt-5 flex items-start gap-2 text-sm font-semibold" role="status">
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('success')}
        </p>
      ) : null}
      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{t('localOnly')}</p>
    </form>
  )
}
