/**
 * Kurze, tonlose Verkaufs-Clips ("Verkauft"-Videos inkl. Ortschaft).
 * Alle Dateien liegen im 9:16-Hochformat, dauern 4–5 s und haben keine Tonspur.
 * Die tatsächlichen Pixelmaße unterscheiden sich (576×1024 bzw. 1080×1920) —
 * sie werden pro Eintrag geführt, damit das <video>-Element korrekt reserviert.
 */

type SoldPropertyType = 'etw' | 'efh' | 'dhh' | 'rmh' | 'townhouse' | 'commercialLand'

export type SoldVideo = {
  id: string
  /** Ortsname wie in der Bildmarke des Clips. */
  town: string
  /** Slug einer Standortseite unter /locations/[slug], falls vorhanden. */
  locationSlug?: string
  type: SoldPropertyType
  video: string
  poster: string
  width: number
  height: number
}

const SOLD_VIDEOS: readonly SoldVideo[] = [
  {
    id: 'nuernberg-efh',
    town: 'Nürnberg',
    locationSlug: 'nuernberg',
    type: 'efh',
    video: '/videos/sold/nuernberg-efh.mp4',
    poster: '/images/sold/nuernberg-efh.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'erlangen-etw',
    town: 'Erlangen',
    locationSlug: 'erlangen',
    type: 'etw',
    video: '/videos/sold/erlangen-etw.mp4',
    poster: '/images/sold/erlangen-etw.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'fuerth-etw',
    town: 'Fürth',
    locationSlug: 'fuerth',
    type: 'etw',
    video: '/videos/sold/fuerth-etw.mp4',
    poster: '/images/sold/fuerth-etw.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'zirndorf-etw',
    town: 'Zirndorf',
    locationSlug: 'zirndorf',
    type: 'etw',
    video: '/videos/sold/zirndorf-etw.mp4',
    poster: '/images/sold/zirndorf-etw.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'nuernberg-dhh',
    town: 'Nürnberg',
    locationSlug: 'nuernberg',
    type: 'dhh',
    video: '/videos/sold/nuernberg-dhh.mp4',
    poster: '/images/sold/nuernberg-dhh.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'hagenbuechach-efh',
    town: 'Hagenbüchach',
    type: 'efh',
    video: '/videos/sold/hagenbuechach-efh.mp4',
    poster: '/images/sold/hagenbuechach-efh.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'herzogenaurach-etw',
    town: 'Herzogenaurach',
    type: 'etw',
    video: '/videos/sold/herzogenaurach-etw.mp4',
    poster: '/images/sold/herzogenaurach-etw.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'schwabach-etw',
    town: 'Schwabach',
    type: 'etw',
    video: '/videos/sold/schwabach-etw.mp4',
    poster: '/images/sold/schwabach-etw.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'forchheim-townhouse',
    town: 'Forchheim',
    type: 'townhouse',
    video: '/videos/sold/forchheim-townhouse.mp4',
    poster: '/images/sold/forchheim-townhouse.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'oberasbach-efh',
    town: 'Oberasbach',
    type: 'efh',
    video: '/videos/sold/oberasbach-efh.mp4',
    poster: '/images/sold/oberasbach-efh.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'adelsdorf-rmh',
    town: 'Adelsdorf',
    type: 'rmh',
    video: '/videos/sold/adelsdorf-rmh.mp4',
    poster: '/images/sold/adelsdorf-rmh.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'nuernberg-etw',
    town: 'Nürnberg',
    locationSlug: 'nuernberg',
    type: 'etw',
    video: '/videos/sold/nuernberg-etw.mp4',
    poster: '/images/sold/nuernberg-etw.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'erlangen-etw-2',
    town: 'Erlangen',
    locationSlug: 'erlangen',
    type: 'etw',
    video: '/videos/sold/erlangen-etw-2.mp4',
    poster: '/images/sold/erlangen-etw-2.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'fuerth-etw-2',
    town: 'Fürth',
    locationSlug: 'fuerth',
    type: 'etw',
    video: '/videos/sold/fuerth-etw-2.mp4',
    poster: '/images/sold/fuerth-etw-2.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'zirndorf-gewerbegrundstueck',
    town: 'Zirndorf',
    locationSlug: 'zirndorf',
    type: 'commercialLand',
    video: '/videos/sold/zirndorf-gewerbegrundstueck.mp4',
    poster: '/images/sold/zirndorf-gewerbegrundstueck.webp',
    width: 1080,
    height: 1920,
  },
  {
    id: 'forchheim-etw',
    town: 'Forchheim',
    type: 'etw',
    video: '/videos/sold/forchheim-etw.mp4',
    poster: '/images/sold/forchheim-etw.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'schwabach-etw-2',
    town: 'Schwabach',
    type: 'etw',
    video: '/videos/sold/schwabach-etw-2.mp4',
    poster: '/images/sold/schwabach-etw-2.webp',
    width: 576,
    height: 1024,
  },
  {
    id: 'deining-etw',
    town: 'Deining',
    type: 'etw',
    video: '/videos/sold/deining-etw.mp4',
    poster: '/images/sold/deining-etw.webp',
    width: 576,
    height: 1024,
  },
] as const

export function listSoldVideos(): SoldVideo[] {
  return [...SOLD_VIDEOS]
}

export function getSoldVideo(id: string): SoldVideo | undefined {
  return SOLD_VIDEOS.find((item) => item.id === id)
}

export function listSoldVideosByLocation(locationSlug: string): SoldVideo[] {
  return SOLD_VIDEOS.filter((item) => item.locationSlug === locationSlug)
}
