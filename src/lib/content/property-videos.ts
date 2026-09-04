import { getReference, type ReferenceRecord } from './references'

/**
 * Vollständige Objektvideos aus der Vermarktung — der geschnittene Rundgang durch
 * eine Immobilie, wie er auf den Social-Kanälen läuft.
 *
 * Abgrenzung zu den benachbarten Registern:
 * - `sold-videos.ts` führt die 4–5 s kurzen, tonlosen „Verkauft“-Clips.
 * - `bell-videos.ts` führt die Glocken-Clips zum Verkaufsabschluss.
 * - Dieses Register führt die langen Objektfilme (hier: 38 s, mit Musikspur).
 *
 * Jeder Eintrag verweist über `referenceId` auf den Referenzfall in `references.ts`.
 * Objektart, Ort und Titel werden von dort gelesen statt hier erneut getippt —
 * so kann die Beschriftung des Videos nicht von der Referenzakte abweichen.
 */
export type PropertyVideo = {
  id: string
  /** Referenzfall in `references.ts`; liefert Objektart, Ort und Fallseite. */
  referenceId: string
  /** Pfad zur MP4-Datei unterhalb von `public/`. */
  src: string
  /** Standbild, zugleich `poster` des Videos. */
  poster: string
  /** Echte Pixelmaße — ohne sie kennt der Browser das Seitenverhältnis erst nach dem Laden. */
  width: number
  height: number
  /** Laufzeit in Sekunden, für die Anzeige und `duration` in strukturierten Daten. */
  durationSeconds: number
  /**
   * `false` heißt: Die Tonspur ist eine reine Musikunterlegung ohne gesprochenes Wort.
   * Erst ein Clip mit Sprache braucht eine WebVTT-Spur (WCAG 1.2.2) — dieser nicht.
   */
  hasSpeech: boolean
}

const PROPERTY_VIDEOS: readonly PropertyVideo[] = [
  {
    id: 'nuernberg-woernitzstrasse',
    referenceId: 'nuernberg-woernitzstrasse',
    src: '/videos/property-tours/nuernberg-woernitzstrasse.mp4',
    poster: '/videos/property-tours/nuernberg-woernitzstrasse-poster.webp',
    width: 1080,
    height: 1920,
    durationSeconds: 38,
    hasSpeech: false,
  },
]

export type PropertyVideoWithReference = PropertyVideo & { reference: ReferenceRecord }

/** Hängt den Referenzfall an. Einträge ohne auflösbare Referenz fallen heraus. */
function withReference(video: PropertyVideo): PropertyVideoWithReference | null {
  const reference = getReference(video.referenceId)
  return reference ? { ...video, reference } : null
}

export function listPropertyVideos(): readonly PropertyVideoWithReference[] {
  return PROPERTY_VIDEOS.map(withReference).filter((video) => video !== null)
}

export function getPropertyVideo(id: string): PropertyVideoWithReference | null {
  const video = PROPERTY_VIDEOS.find((entry) => entry.id === id)
  return video ? withReference(video) : null
}

/** `38` → `0:38`. */
export function formatVideoDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const rest = seconds % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}
