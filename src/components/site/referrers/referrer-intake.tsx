'use client'

import type { FormEvent } from 'react'
import { useState } from 'react'
import { Check, LoaderCircle, Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

type SubmissionState = 'idle' | 'pending' | 'success' | 'success-without-confirmation' | 'error'

type ApiResponse = {
  ok?: boolean
  confirmationSent?: boolean
  error?: string
}

const fieldClassName =
  'border-input focus:border-brand-700 focus:ring-brand-500/20 min-h-12 w-full border bg-white px-4 text-base outline-none focus:ring-[3px] disabled:cursor-not-allowed disabled:opacity-60'

export function ReferrerIntake() {
  const t = useTranslations('ReferrersPage.form')
  const locale = useLocale()
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle')
  const [errorCode, setErrorCode] = useState<string | null>(null)

  const isPending = submissionState === 'pending'

  function resetStatus() {
    if (submissionState !== 'idle') {
      setSubmissionState('idle')
      setErrorCode(null)
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmissionState('pending')
    setErrorCode(null)

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/referrals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, locale }),
      })
      const result = (await response.json()) as ApiResponse

      if (!response.ok || !result.ok) {
        setErrorCode(result.error ?? 'send_failed')
        setSubmissionState('error')
        return
      }

      form.reset()
      setSubmissionState(result.confirmationSent ? 'success' : 'success-without-confirmation')
    } catch {
      setErrorCode('network')
      setSubmissionState('error')
    }
  }

  const errorMessage = errorCode === 'unavailable' ? t('unavailable') : t('error')

  return (
    <form
      id="tipp-geben"
      className="border-border bg-background scroll-mt-28 border p-6 sm:p-8 lg:p-10"
      onSubmit={handleSubmit}
      onChange={resetStatus}
    >
      <p className="text-brand-700 text-[11px] font-semibold tracking-[0.18em] uppercase">
        {t('label')}
      </p>
      <h2 className="mt-4 max-w-[18ch] font-serif text-3xl leading-tight font-semibold text-balance md:text-[2.55rem]">
        {t('title')}
      </h2>
      <p className="text-muted-foreground mt-4 max-w-[65ch] leading-7 text-pretty">{t('text')}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="referrer-name">
          {t('name')}
          <input
            id="referrer-name"
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            disabled={isPending}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="referrer-email">
          {t('email')}
          <input
            id="referrer-email"
            name="email"
            required
            type="email"
            autoComplete="email"
            maxLength={254}
            disabled={isPending}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="referrer-phone">
          {t('phone')}
          <input
            id="referrer-phone"
            name="phone"
            required
            type="tel"
            autoComplete="tel"
            maxLength={40}
            disabled={isPending}
            className={fieldClassName}
          />
        </label>

        <label
          className="flex flex-col gap-2 text-sm font-semibold"
          htmlFor="referrer-property-type"
        >
          {t('propertyType')}
          <select
            id="referrer-property-type"
            name="propertyType"
            required
            defaultValue=""
            disabled={isPending}
            className={fieldClassName}
          >
            <option value="" disabled>
              {t('propertyTypePlaceholder')}
            </option>
            <option value="house">{t('propertyTypes.house')}</option>
            <option value="apartment">{t('propertyTypes.apartment')}</option>
            <option value="apartment-building">{t('propertyTypes.apartmentBuilding')}</option>
            <option value="land">{t('propertyTypes.land')}</option>
            <option value="other">{t('propertyTypes.other')}</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="referrer-location">
          {t('location')}
          <input
            id="referrer-location"
            name="location"
            required
            maxLength={120}
            placeholder={t('locationPlaceholder')}
            disabled={isPending}
            className={fieldClassName}
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold" htmlFor="referrer-timeline">
          {t('timeline')}
          <select
            id="referrer-timeline"
            name="timeline"
            required
            defaultValue=""
            disabled={isPending}
            className={fieldClassName}
          >
            <option value="" disabled>
              {t('timelinePlaceholder')}
            </option>
            <option value="now">{t('timelines.now')}</option>
            <option value="three-months">{t('timelines.threeMonths')}</option>
            <option value="six-months">{t('timelines.sixMonths')}</option>
            <option value="later">{t('timelines.later')}</option>
            <option value="unknown">{t('timelines.unknown')}</option>
          </select>
        </label>

        <label
          className="flex flex-col gap-2 text-sm font-semibold sm:col-span-2"
          htmlFor="referrer-note"
        >
          {t('note')}
          <textarea
            id="referrer-note"
            name="note"
            rows={4}
            maxLength={1000}
            placeholder={t('notePlaceholder')}
            disabled={isPending}
            className={`${fieldClassName} min-h-32 resize-y py-3`}
          />
          <span className="text-muted-foreground text-xs leading-relaxed font-normal">
            {t('noOwnerData')}
          </span>
        </label>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="referrer-company">Company</label>
        <input id="referrer-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-border mt-7 grid gap-4 border-t pt-6">
        <label
          className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
          htmlFor="referrer-owner-consent"
        >
          <input
            id="referrer-owner-consent"
            name="ownerConsent"
            required
            type="checkbox"
            value="yes"
            disabled={isPending}
            className="border-input text-primary focus:ring-brand-500 mt-1 size-4 shrink-0"
          />
          <span>{t('ownerConsent')}</span>
        </label>

        <label
          className="text-muted-foreground flex items-start gap-3 text-sm leading-relaxed"
          htmlFor="referrer-privacy"
        >
          <input
            id="referrer-privacy"
            name="privacy"
            required
            type="checkbox"
            value="yes"
            disabled={isPending}
            className="border-input text-primary focus:ring-brand-500 mt-1 size-4 shrink-0"
          />
          <span>
            {t('privacy')}{' '}
            <Link
              href="/privacy"
              className="text-primary font-semibold underline underline-offset-2"
            >
              {t('privacyLink')}
            </Link>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-primary-foreground hover:bg-brand-700 focus-visible:outline-brand-700 mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-65 sm:w-auto"
      >
        {isPending ? (
          <LoaderCircle
            className="size-4 animate-spin motion-reduce:animate-none"
            aria-hidden="true"
          />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isPending ? t('pending') : t('submit')}
      </button>

      <div className="mt-5 min-h-6" aria-live="polite">
        {submissionState === 'success' ? (
          <p className="text-success flex items-start gap-2 text-sm font-semibold" role="status">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t('success')}
          </p>
        ) : null}
        {submissionState === 'success-without-confirmation' ? (
          <p className="text-success flex items-start gap-2 text-sm font-semibold" role="status">
            <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {t('successWithoutConfirmation')}
          </p>
        ) : null}
        {submissionState === 'error' ? (
          <p className="text-destructive text-sm font-semibold" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  )
}
