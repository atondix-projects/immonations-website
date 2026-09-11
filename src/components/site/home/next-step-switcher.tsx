'use client'

import {
  useCallback,
  useLayoutEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'
import { CONTAINER } from './section-shell'

export type NextStepPane = 'valuation' | 'contact'

const HASH: Record<NextStepPane, string> = {
  valuation: '#bewertung',
  contact: '#kontakt',
}

const PANES: NextStepPane[] = ['valuation', 'contact']

function paneFromHash(hash: string): NextStepPane {
  return hash === HASH.contact ? 'contact' : 'valuation'
}

export function NextStepSwitcher({
  valuation,
  contact,
  labels,
}: {
  valuation: ReactNode
  contact: ReactNode
  labels: {
    tabList: string
    valuation: string
    contact: string
  }
}) {
  const valuationTabId = useId()
  const contactTabId = useId()
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [pane, setPane] = useState<NextStepPane>('valuation')

  const selectPane = useCallback((next: NextStepPane, syncHash = true) => {
    setPane(next)
    if (!syncHash || typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.hash = HASH[next].slice(1)
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }, [])

  useLayoutEffect(() => {
    const applyHash = () => setPane(paneFromHash(window.location.hash))
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [])

  const tabs = [
    {
      pane: 'valuation' as const,
      label: labels.valuation,
      tabId: valuationTabId,
      panelId: 'bewertung',
    },
    { pane: 'contact' as const, label: labels.contact, tabId: contactTabId, panelId: 'kontakt' },
  ]

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = tabs.length - 1
    const nextIndex =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? (index - 1 + tabs.length) % tabs.length
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : undefined

    if (nextIndex === undefined) return
    const next = PANES[nextIndex]
    if (!next) return
    event.preventDefault()
    selectPane(next)
    tabRefs.current[nextIndex]?.focus()
  }

  return (
    <section className="bg-background scroll-mt-24 py-16 md:py-24">
      <div className={CONTAINER}>
        <div
          role="tablist"
          aria-label={labels.tabList}
          aria-orientation="horizontal"
          className="border-border mb-10 grid w-full grid-cols-2 border sm:mb-12 sm:w-fit"
        >
          {tabs.map((tab, index) => {
            const selected = pane === tab.pane
            return (
              <button
                key={tab.pane}
                ref={(node) => {
                  tabRefs.current[index] = node
                }}
                id={tab.tabId}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={tab.panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectPane(tab.pane)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  'min-h-12 px-6 text-sm font-semibold transition-colors outline-none active:translate-y-px',
                  'focus-visible:ring-brand-500 focus-visible:ring-2 focus-visible:ring-offset-2',
                  selected
                    ? 'bg-surface-dark text-white'
                    : 'text-muted-foreground hover:bg-muted/55 hover:text-foreground bg-background',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {tabs.map((tab) => {
          const selected = pane === tab.pane
          return (
            <div
              key={tab.pane}
              id={tab.panelId}
              role="tabpanel"
              aria-labelledby={tab.tabId}
              hidden={!selected}
              className="scroll-mt-24"
            >
              {tab.pane === 'valuation' ? valuation : contact}
            </div>
          )
        })}
      </div>
    </section>
  )
}
