'use client'

import { useSyncExternalStore } from 'react'
import {
  getConsentSnapshot,
  getServerConsentSnapshot,
  subscribeToConsent,
  type ConsentChoice,
} from '@/lib/consent/store'

/** `null`, solange der Besucher nicht entschieden hat. */
export function useConsentChoice(): ConsentChoice | null {
  return useSyncExternalStore(subscribeToConsent, getConsentSnapshot, getServerConsentSnapshot)
}

const subscribeToNothing = () => () => {}
const alwaysTrue = () => true
const alwaysFalse = () => false

/**
 * `false` während des Server-Renderings und der Hydration, danach `true`.
 * Verhindert, dass der Cookie-Hinweis kurz aufblitzt, obwohl bereits eine
 * gespeicherte Auswahl vorliegt.
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToNothing, alwaysTrue, alwaysFalse)
}

/**
 * Externe Medien (360°-Rundgänge, Video-Plattformen) laufen nur nach
 * vollständiger Einwilligung.
 */
export function useExternalMediaConsent(): boolean {
  return useConsentChoice() === 'all'
}
