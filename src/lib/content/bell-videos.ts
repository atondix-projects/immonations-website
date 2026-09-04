/**
 * „Glocken"-Videos: Nach jedem beurkundeten Verkauf läutet die Geschäftsleitung
 * im Zirndorfer Büro die Verkaufsglocke und spricht die Vermarktung kurz auf
 * Video. Anders als die stummen Verkauft-Clips (`sold-videos.ts`) leben diese
 * Aufnahmen von der gesprochenen Ansage — sie laufen deshalb nie automatisch,
 * sondern erst nach Klick im Overlay mit Ton.
 *
 * Bewusst ohne Ort- und Objektangabe: Die Quelldateien sind nach Straßennamen
 * benannt, und eine Straße plus „verkauft" zeigt auf ein konkretes Privathaus.
 * Das Projekt weist Verkäufe grundsätzlich nur mit Ort und Objektart aus (siehe
 * `sold-videos.ts`). Bis die Zuordnung Ort + Objektart je Clip vorliegt, tragen
 * die Kacheln daher nur eine neutrale Zählung, und die Sektion verzichtet auf
 * ItemList-/VideoObject-Auszeichnung — ausgewiesen wird nur, was belegt ist.
 */

import type { VideoCaptionTrack } from '@/components/site/video-dialog'

export type BellVideo = {
  id: string
  video: string
  poster: string
  /** Echte Pixelmaße — `VideoDialog` reserviert daraus das Seitenverhältnis. */
  width: number
  height: number
  /**
   * Untertitelspuren zur gesprochenen Ansage. Alle sechs Clips führen Ton; die
   * WebVTT-Dateien stehen noch aus. Ein Eintrag hier genügt — `VideoDialog`
   * rendert die Spur ohne weitere Codeänderung.
   */
  captions?: readonly VideoCaptionTrack[]
}

const WIDTH = 720
const HEIGHT = 1280

/**
 * Reihenfolge = Reihenfolge der Quelldateien. Die Zuordnung zur Originalaufnahme
 * bleibt hier dokumentiert, damit das Team die Clips wiederfindet, ohne dass die
 * Adressen im ausgelieferten Markup landen.
 */
const BELL_VIDEOS: readonly BellVideo[] = [
  // GLOCKE AM Vogelherd.mov
  {
    id: 'bell-01',
    video: '/videos/bell/bell-01.mp4',
    poster: '/images/bell/bell-01.webp',
    width: WIDTH,
    height: HEIGHT,
  },
  // GLOCKE Erlangen.mov
  {
    id: 'bell-02',
    video: '/videos/bell/bell-02.mp4',
    poster: '/images/bell/bell-02.webp',
    width: WIDTH,
    height: HEIGHT,
  },
  // Glocke Bedit.mov
  {
    id: 'bell-03',
    video: '/videos/bell/bell-03.mp4',
    poster: '/images/bell/bell-03.webp',
    width: WIDTH,
    height: HEIGHT,
  },
  // Glocke Gutenbergstr..mov
  {
    id: 'bell-04',
    video: '/videos/bell/bell-04.mp4',
    poster: '/images/bell/bell-04.webp',
    width: WIDTH,
    height: HEIGHT,
  },
  // Glocke Seidelbastweg.mov
  {
    id: 'bell-05',
    video: '/videos/bell/bell-05.mp4',
    poster: '/images/bell/bell-05.webp',
    width: WIDTH,
    height: HEIGHT,
  },
  // Glocke Willy Aben.mov
  {
    id: 'bell-06',
    video: '/videos/bell/bell-06.mp4',
    poster: '/images/bell/bell-06.webp',
    width: WIDTH,
    height: HEIGHT,
  },
] as const

export function listBellVideos(): BellVideo[] {
  return [...BELL_VIDEOS]
}
