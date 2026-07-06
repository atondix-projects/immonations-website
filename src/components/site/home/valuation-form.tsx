'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export function ValuationForm() {
  const t = useTranslations('Home.valuation')
  const types = t.raw('types') as string[]
  const [plz, setPlz] = useState('')
  const [objectType, setObjectType] = useState(types[0] ?? '')
  const [submitted, setSubmitted] = useState(false)

  return (
    <form
      className="flex flex-col gap-[18px] bg-white p-6 md:p-8"
      onSubmit={(event) => {
        event.preventDefault()
        setSubmitted(true)
      }}
    >
      <h3 className="font-serif text-2xl leading-tight font-semibold md:text-[26px]">
        {t('formTitle')}
      </h3>
      <div className="flex flex-col gap-2">
        <label htmlFor="hp-plz" className="text-sm font-semibold tracking-[0.02em]">
          {t('plzLabel')}
        </label>
        <input
          id="hp-plz"
          type="text"
          inputMode="numeric"
          placeholder={t('plzPlaceholder')}
          value={plz}
          onChange={(event) => {
            setPlz(event.target.value)
            setSubmitted(false)
          }}
          className="border-input focus:border-brand-500 focus:ring-brand-500/20 border bg-white px-4 py-3.5 text-base transition-shadow outline-none focus:ring-[3px]"
        />
      </div>
      <fieldset className="flex flex-col gap-2">
        <legend className="mb-2 text-sm font-semibold tracking-[0.02em]">{t('typeLabel')}</legend>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => {
            const isActive = objectType === type
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setObjectType(type)
                  setSubmitted(false)
                }}
                aria-pressed={isActive}
                className={cn(
                  'cursor-pointer border px-[18px] py-2.5 text-sm font-medium tracking-[0.04em] transition-colors',
                  isActive
                    ? 'border-foreground bg-foreground text-white'
                    : 'border-input text-foreground hover:border-foreground bg-white',
                )}
              >
                {type}
              </button>
            )
          })}
        </div>
      </fieldset>
      <button
        type="submit"
        className="bg-primary hover:bg-brand-700 mt-1 cursor-pointer px-8 py-4 text-base font-medium tracking-[0.04em] text-white transition-colors"
      >
        {t('submit')}
      </button>
      {submitted ? (
        <p className="text-success text-sm font-medium" role="status">
          {t('success')}
        </p>
      ) : null}
      <span className="text-[13px] text-neutral-600">
        {t('privacyNote')}{' '}
        <Link href="/contact" className="text-primary">
          {t('callbackLink')}
        </Link>
      </span>
    </form>
  )
}
