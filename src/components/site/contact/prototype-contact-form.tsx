'use client'

import { useState } from 'react'
import { AlertCircle, Check, Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

export function PrototypeContactForm() {
  const t = useTranslations('ContactForm')
  const locale = useLocale()
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  function resetStatus() {
    if (status !== 'submitting') setStatus('idle')
  }

  return (
    <form
      className="border-border bg-neutral-0 border p-6 sm:p-8"
      onSubmit={async (event) => {
        event.preventDefault()
        if (status === 'submitting') return
        setStatus('submitting')
        const form = event.currentTarget
        const fields = new FormData(form)
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            locale,
            name: fields.get('name'),
            email: fields.get('email'),
            phone: fields.get('phone'),
            topic: fields.get('topic'),
            message: fields.get('message'),
            privacy: fields.get('privacy') === 'yes',
            website: fields.get('website'),
          }),
        }).catch(() => null)
        if (response?.ok) {
          form.reset()
          setStatus('success')
        } else {
          setStatus('error')
        }
      }}
    >
      <p className="text-brand-700 text-[10px] font-semibold tracking-[0.2em] uppercase">
        {t('eyebrow')}
      </p>
      <h2 className="mt-3 font-serif text-3xl leading-tight font-medium">{t('title')}</h2>
      <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{t('text')}</p>
      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t('name')}
          <input
            name="name"
            required
            onChange={resetStatus}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold">
          {t('email')}
          <input
            name="email"
            required
            type="email"
            onChange={resetStatus}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
          {t('phone')}
          <input
            name="phone"
            type="tel"
            onChange={resetStatus}
            className="border-input focus:border-brand-700 min-h-12 border bg-white px-4 text-base outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2">
          {t('topic')}
          <select
            name="topic"
            onChange={resetStatus}
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
            name="message"
            required
            minLength={5}
            rows={5}
            onChange={resetStatus}
            className="border-input focus:border-brand-700 resize-y border bg-white p-4 text-base outline-none"
          />
        </label>
      </div>
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
      <label className="mt-5 flex items-start gap-3 text-sm leading-relaxed">
        <input
          name="privacy"
          value="yes"
          type="checkbox"
          required
          onChange={resetStatus}
          className="border-input text-brand-700 mt-1 size-4 shrink-0"
        />
        <span>{t('privacy')}</span>
      </label>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="bg-brand-700 hover:bg-brand-800 mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-70"
      >
        <Send className="size-4" aria-hidden="true" />
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
      {status === 'success' ? (
        <p className="text-success mt-5 flex items-start gap-2 text-sm font-semibold" role="status">
          <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('success')}
        </p>
      ) : null}
      {status === 'error' ? (
        <p
          className="text-destructive mt-5 flex items-start gap-2 text-sm font-semibold"
          role="alert"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {t('error')}
        </p>
      ) : null}
      <p className="text-muted-foreground mt-4 text-xs leading-relaxed">{t('privacyNote')}</p>
    </form>
  )
}
