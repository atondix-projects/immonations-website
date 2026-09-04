/**
 * Bildungsspende Uganda (April 2026) — Bild- und Quellenregister.
 *
 * Quelle für jede Sachaussage ist der Beitrag der Partnerorganisation Pateka.
 * Dort ist die Spende als Beitrag zu **Schulgebühren** beschrieben. Das
 * vorliegende Bildmaterial zeigt **Schulmaterial und Hygieneartikel aus der
 * Projektarbeit vor Ort** — beides ist nicht dasselbe. Bildunterschriften
 * beschreiben deshalb den Projektkontext und nie "das, was die Spende gekauft
 * hat".
 *
 * Die Motive reichen von Hochformat 901×1600 bis Querformat 1600×1200. Die
 * Galerie auf `/engagement` rendert deshalb ohne festes Seitenverhältnis — ein
 * erzwungener Zuschnitt würde bei den Gruppenaufnahmen Köpfe abschneiden.
 */

export const UGANDA_SOURCE_URL =
  'https://pateka.de/de/2026/04/28/we-are-grateful-to-share-an-important-moment-for-our-community/'

export const UGANDA_PARTNER = 'Pateka'

/** Monat der im Quellbeitrag dokumentierten Spende. */
export const UGANDA_DONATION_DATE = '2026-04'

/** Veröffentlichungsdatum des Quellbeitrags. */
export const UGANDA_SOURCE_DATE = '2026-04-28'

export type UgandaImage = {
  src: string
  width: number
  height: number
  /** Bildunterschrift je Locale. */
  caption: { de: string; en: string }
  alt: { de: string; en: string }
  /**
   * Sperrt ein Motiv, solange die Veröffentlichungsfreigabe für Person, Motiv
   * und Kanal fehlt. Aktuell trägt kein Eintrag das Flag: Die Abbildung der
   * Kinder wurde am 2026-09-03 durch die Auftraggeberin freigegeben (siehe
   * TODO.md). Das Flag bleibt bestehen, damit künftiges Material ohne Freigabe
   * eingepflegt, aber nicht ausgespielt werden kann.
   */
  requiresRelease?: true
}

/**
 * Reihenfolge folgt dem Erzählbogen der Projektarbeit: erst das Material, dann
 * die Schule, dann die Ausgabe. Ein Ausgleich nach Seitenverhältnis ist nicht
 * mehr nötig — die Galerie auf `/engagement` läuft im Spaltensatz (`columns`),
 * in dem jedes Bild seine eigene Höhe behält und keine Zeile sich nach ihrem
 * höchsten Motiv richtet.
 */
const IMAGES: readonly UgandaImage[] = [
  {
    src: '/images/engagement/uganda-schulmaterialien.webp',
    width: 1200,
    height: 1600,
    caption: {
      de: 'Schulhefte mit Maß- und Rechentafeln sowie Hygieneartikel aus der Projektarbeit vor Ort.',
      en: 'Exercise books with metric and multiplication tables alongside hygiene supplies from the project work on site.',
    },
    alt: {
      de: 'Stapel Schulhefte mit aufgedruckten Rechentafeln neben verpackten Hygieneartikeln',
      en: 'Stack of exercise books printed with arithmetic tables next to packaged hygiene supplies',
    },
  },
  {
    src: '/images/engagement/uganda-schulmaterial-ausgabe.webp',
    width: 1200,
    height: 1600,
    caption: {
      de: 'Vorbereitete Ausgabe: Hefte, Zeichenpapier und ein Mathematik-Set stehen zur Verteilung bereit.',
      en: 'Prepared distribution: exercise books, drawing paper, and a mathematical set ready to hand out.',
    },
    alt: {
      de: 'Zur Ausgabe gestapelte Schulhefte, Zeichenpapier und ein Mathematik-Set',
      en: 'Exercise books, drawing paper, and a mathematical set stacked for distribution',
    },
  },
  {
    src: '/images/engagement/uganda-schulklasse-1.webp',
    width: 901,
    height: 1600,
    caption: {
      de: 'Schülerinnen und Schüler in Schuluniform auf dem Schulgelände.',
      en: 'Students in school uniform on the school grounds.',
    },
    alt: {
      de: 'Gruppe von Schulkindern in Uniform auf dem Schulhof',
      en: 'Group of school children in uniform in the schoolyard',
    },
  },
  {
    src: '/images/engagement/uganda-schulklasse-2.webp',
    width: 901,
    height: 1600,
    caption: {
      de: 'Schülerinnen und Schüler vor dem Schulgebäude.',
      en: 'Students in front of the school building.',
    },
    alt: {
      de: 'Vier Schulkinder in Uniform vor einem Schulgebäude',
      en: 'Four school children in uniform in front of a school building',
    },
  },
  {
    src: '/images/engagement/uganda-schulklasse-3.webp',
    width: 901,
    height: 1600,
    caption: {
      de: 'Schülerinnen und Schüler mit einer Lehrkraft auf dem Schulgelände.',
      en: 'Students with a member of staff on the school grounds.',
    },
    alt: {
      de: 'Schulkinder in Uniform mit einer erwachsenen Begleitperson',
      en: 'School children in uniform with an adult member of staff',
    },
  },
  {
    src: '/images/engagement/uganda-heftausgabe.webp',
    width: 1200,
    height: 1600,
    caption: {
      de: 'Ausgabe der Schulhefte an Schülerinnen vor Ort.',
      en: 'Handing out exercise books to students on site.',
    },
    alt: {
      de: 'Schülerinnen nehmen Schulhefte entgegen',
      en: 'Students receiving exercise books',
    },
  },
  {
    src: '/images/engagement/uganda-verteilung.webp',
    width: 1600,
    height: 1200,
    caption: {
      de: 'Verteilung von Schulmaterial und Hygieneartikeln an eine Schülergruppe.',
      en: 'Distributing school supplies and hygiene articles to a group of students.',
    },
    alt: {
      de: 'Gruppe von Kindern mit Schulheften und Hygieneartikeln',
      en: 'Group of children holding exercise books and hygiene supplies',
    },
  },
]

/** Nur Motive ohne offene Rechtefrage — das ist, was gerendert werden darf. */
export const UGANDA_PUBLISHABLE_IMAGES = IMAGES.filter((image) => !image.requiresRelease)

/** Vollständiges Register inklusive gesperrter Motive (Audit, Freigabelauf). */
export const UGANDA_ALL_IMAGES = IMAGES
