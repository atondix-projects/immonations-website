/**
 * Übergabe-Polaroids: nach jeder Schlüsselübergabe entsteht ein Sofortbild mit
 * handschriftlichem Ortsnamen. Die Bilder werden aus `Assets/` heraus über
 * `scripts/curate-handover-polaroids.py` freigestellt und geradegerichtet — alle
 * Dateien liegen danach einheitlich bei 840 × 1000 px.
 *
 * `locationSlug` wird nur gesetzt, wo unter `/locations/[slug]` tatsächlich eine
 * Standortseite existiert (siehe `locations.ts`). Für Adelsdorf, Heroldsbach,
 * Schwabach und Seukendorf gibt es keine — dort bleibt der Ort reiner Text.
 */

export type HandoverPolaroid = {
  id: string
  /** Ortsname, wie er auf dem Sofortbild steht. */
  town: string
  /** Slug einer Standortseite unter `/locations/[slug]`, falls vorhanden. */
  locationSlug?: string
  image: string
  width: number
  height: number
}

const HANDOVER_POLAROIDS: readonly HandoverPolaroid[] = [
  {
    id: 'adelsdorf-1',
    town: 'Adelsdorf',
    image: '/images/handover/adelsdorf-1.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'heroldsbach',
    town: 'Heroldsbach',
    image: '/images/handover/heroldsbach.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'seukendorf',
    town: 'Seukendorf',
    image: '/images/handover/seukendorf.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'nuernberg',
    town: 'Nürnberg',
    locationSlug: 'nuernberg',
    image: '/images/handover/nuernberg.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'schwabach',
    town: 'Schwabach',
    image: '/images/handover/schwabach.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'erlangen',
    town: 'Erlangen',
    locationSlug: 'erlangen',
    image: '/images/handover/erlangen.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'zirndorf',
    town: 'Zirndorf',
    locationSlug: 'zirndorf',
    image: '/images/handover/zirndorf.webp',
    width: 840,
    height: 1000,
  },
  {
    id: 'adelsdorf-2',
    town: 'Adelsdorf',
    image: '/images/handover/adelsdorf-2.webp',
    width: 840,
    height: 1000,
  },
] as const

export function listHandoverPolaroids(): HandoverPolaroid[] {
  return [...HANDOVER_POLAROIDS]
}

export function listHandoverPolaroidsByLocation(locationSlug: string): HandoverPolaroid[] {
  return HANDOVER_POLAROIDS.filter((item) => item.locationSlug === locationSlug)
}
