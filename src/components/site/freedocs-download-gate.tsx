'use client'

import { useEffect, useId, useState, type FormEvent } from 'react'
import { Download, LockKeyhole, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FreeDocCategory, FreeDocId } from '@/lib/content/freedocs'

const STORAGE_KEY = 'immonation-freedocs-unlocked'

export type FreeDocGateItem = {
  id: FreeDocId
  href: string
  category: FreeDocCategory
  title: string
  description: string
  downloadLabel: string
}

export type FreeDocGateCopy = {
  eyebrow: string
  emailLabel: string
  emailPlaceholder: string
  continueLabel: string
  invalid: string
  helper: string
  unlockedHint: string
  lockedCta: string
  fileType: string
  categories: Record<FreeDocCategory, string>
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function FreedocsDownloadGate({
  docs,
  copy,
}: {
  docs: FreeDocGateItem[]
  copy: FreeDocGateCopy
}) {
  const emailId = useId()
  const errorId = useId()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === '1') {
        setUnlocked(true)
      }
    } catch {
      // sessionStorage may be unavailable
    }
  }, [])

  function unlock() {
    setUnlocked(true)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore persistence failures
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = email.trim()
    if (!isValidEmail(value)) {
      setError(copy.invalid)
      return
    }
    setError(null)
    unlock()
  }

  const categories = (['handover', 'tenancy'] as const).filter((category) =>
    docs.some((doc) => doc.category === category),
  )

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14 lg:items-start">
      <form
        className="border-border bg-background border p-6 shadow-sm sm:p-8"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="flex items-center gap-3">
          <Mail className="text-primary size-5" aria-hidden="true" />
          <p className="text-primary text-[11px] font-semibold tracking-[0.16em] uppercase">
            {copy.eyebrow}
          </p>
        </div>

        <label className="mt-6 flex flex-col gap-2 text-sm font-semibold" htmlFor={emailId}>
          {copy.emailLabel}
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={copy.emailPlaceholder}
            value={email}
            disabled={unlocked}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
            onChange={(event) => {
              setEmail(event.target.value)
              if (error) setError(null)
            }}
            className="border-input focus:border-brand-700 focus:ring-brand-500/20 disabled:bg-muted/40 min-h-12 border bg-white px-4 text-base outline-none focus:ring-[3px] disabled:cursor-not-allowed"
          />
        </label>

        <p className="text-muted-foreground mt-3 text-xs leading-relaxed">{copy.helper}</p>

        {error ? (
          <p id={errorId} className="text-destructive mt-3 text-sm font-medium" role="alert">
            {error}
          </p>
        ) : null}

        {unlocked ? (
          <p className="text-success mt-5 text-sm font-semibold" role="status">
            {copy.unlockedHint}
          </p>
        ) : (
          <button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-brand-700 mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 px-6 text-sm font-semibold transition-colors active:translate-y-px"
          >
            {copy.continueLabel}
          </button>
        )}
      </form>

      <div className="grid gap-8">
        {categories.map((category) => {
          const categoryDocs = docs.filter((doc) => doc.category === category)
          return (
            <div key={category} className="grid gap-4">
              <p className="text-muted-foreground text-[12px] font-semibold tracking-[0.14em] uppercase">
                {copy.categories[category]}
              </p>
              <ul className="border-border divide-border divide-y border-y">
                {categoryDocs.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
                  >
                    <div className="min-w-0 max-w-[52ch]">
                      <h3 className="text-[17px] font-semibold leading-snug">{doc.title}</h3>
                      <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                        {doc.description}
                      </p>
                      <p className="text-muted-foreground mt-2 text-xs tracking-wide uppercase">
                        {copy.fileType}
                      </p>
                    </div>

                    {unlocked ? (
                      <a
                        href={doc.href}
                        download
                        className="bg-primary text-primary-foreground hover:bg-brand-700 inline-flex shrink-0 items-center justify-center gap-2 self-start px-5 py-3 text-sm font-semibold transition-colors"
                      >
                        <Download className="size-4" aria-hidden="true" />
                        {doc.downloadLabel}
                      </a>
                    ) : (
                      <span
                        className={cn(
                          'text-muted-foreground inline-flex shrink-0 items-center gap-2 self-start px-1 py-3 text-sm font-medium',
                        )}
                      >
                        <LockKeyhole className="size-4" aria-hidden="true" />
                        {copy.lockedCta}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
