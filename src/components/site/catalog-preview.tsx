'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function CatalogPreview({
  kind,
  locale,
  embedded = false,
  className,
}: {
  kind: 'atlas' | 'assistant' | 'appointment'
  locale: 'de' | 'en'
  embedded?: boolean
  className?: string
}) {
  const [value, setValue] = useState('')
  const [result, setResult] = useState('')
  const isGerman = locale === 'de'

  const copy = {
    atlas: {
      title: isGerman ? 'Preisatlas-Vorschau' : 'Price atlas preview',
      placeholder: isGerman ? 'Stadtteil eingeben' : 'Enter a district',
      action: isGerman ? 'Vorschau anzeigen' : 'Show preview',
      result: isGerman
        ? 'Eine belastbare Spanne erhalten Sie nach Objekt- und Mikrolagenprüfung.'
        : 'A reliable range requires a review of the property and its micro-location.',
    },
    assistant: {
      title: isGerman ? 'Immonation-Assistent – Vorschau' : 'Immonation assistant — preview',
      placeholder: isGerman ? 'Ihre Frage zum Immobilienverkauf' : 'Your property-sale question',
      action: isGerman ? 'Frage testen' : 'Try question',
      result: isGerman
        ? 'Diese Vorschau speichert oder übermittelt keine Eingaben. Für eine verbindliche Einordnung sprechen Sie mit unserem Team.'
        : 'This preview does not store or transmit input. Speak with our team for a reliable assessment.',
    },
    appointment: {
      title: isGerman ? 'Terminbuchung – Vorschau' : 'Appointment booking — preview',
      placeholder: isGerman ? 'Gewünschter Wochentag' : 'Preferred weekday',
      action: isGerman ? 'Ablauf ansehen' : 'Preview process',
      result: isGerman
        ? 'Die Vorschau reserviert keinen Termin. Rufen Sie uns an oder nutzen Sie das Kontaktformular.'
        : 'This preview does not reserve an appointment. Call us or use the contact form.',
    },
  }[kind]

  const preview = (
    <div
      className={cn('bg-surface-dark p-7 text-white md:p-10', !embedded && 'max-w-3xl', className)}
    >
      <p className="text-brand-300 text-xs font-semibold tracking-[0.16em] uppercase">
        {copy.title}
      </p>
      <form
        className="mt-6 flex flex-col gap-3 sm:flex-row"
        onSubmit={(event) => {
          event.preventDefault()
          setResult(copy.result)
        }}
      >
        <label className="sr-only" htmlFor={`${kind}-preview-input`}>
          {copy.placeholder}
        </label>
        <input
          id={`${kind}-preview-input`}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={copy.placeholder}
          className="min-h-12 flex-1 border border-white/25 bg-white/10 px-4 text-white placeholder:text-neutral-300"
        />
        <button
          type="submit"
          className="bg-brand-600 hover:bg-brand-500 min-h-12 px-6 font-semibold transition-colors"
        >
          {copy.action}
        </button>
      </form>
      {result ? (
        <p role="status" className="mt-5 text-sm leading-relaxed text-neutral-200">
          {result}
        </p>
      ) : null}
    </div>
  )

  if (embedded) return preview

  return (
    <section className="border-border border-b py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10">{preview}</div>
    </section>
  )
}
