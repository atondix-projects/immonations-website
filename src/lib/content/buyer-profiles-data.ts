import type { BuyerProfileRecord } from './buyer-profiles'
import { ERLANGEN_PROFILES, FUERTH_PROFILES } from './buyer-profile-records/fuerth-erlangen'
import { NUERNBERG_PROFILES } from './buyer-profile-records/nuernberg'
import { SCHWABACH_PROFILES, ZIRNDORF_PROFILES } from './buyer-profile-records/zirndorf-schwabach'

/**
 * Alle Suchprofile — anonymisiert und mit mindestens einem Profil für jeden Stadtteil, der
 * eine eigene Seite hat (`DISTRICTS` in `route-catalog.ts`). Forchheim fehlt bewusst: Dort
 * gibt es Atlaswerte, aber keine Stadtteilseiten.
 *
 * Als reale Suchprofile zur Veröffentlichung freigegeben am 2026-09-11 (siehe
 * `buyer-search:profiles` in `provenance.ts`). Budgets sind gegen `price-atlas-data.ts`
 * plausibilisiert: Budget ÷ Mindestfläche liegt über dem Stadtteil-Median. Abdeckung und
 * Budgets prüft `tests/contracts/buyer-profiles.test.ts`.
 */
export const BUYER_PROFILE_RECORDS: readonly BuyerProfileRecord[] = [
  ...NUERNBERG_PROFILES,
  ...FUERTH_PROFILES,
  ...ERLANGEN_PROFILES,
  ...ZIRNDORF_PROFILES,
  ...SCHWABACH_PROFILES,
]
