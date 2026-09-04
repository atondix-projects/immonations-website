/**
 * Sponsoring der Leichtathletikabteilung des TSV Zirndorf — Quellen-, Bild- und
 * Videoregister.
 *
 * Quelle für jede Sachaussage ist die Bekanntgabe der Leichtathletikabteilung
 * des TSV Zirndorf vom 14. Dezember 2025. Der Umfang der Unterstützung steht
 * dort ausdrücklich **nicht**: Beide Seiten haben Stillschweigen über die
 * formalen Details und die Höhe vereinbart. Diese Aussage wird hier als Fakt
 * geführt — sie ist etwas anderes als „die Zahl ist nicht veröffentlicht".
 *
 * Das Bild- und Videomaterial stammt aus dem Sponsoring selbst. Die
 * Autogrammkarten tragen die Immonation-Marke und sind damit erkennbar von
 * Immonation produziert; bei den Erfolgskarten steht das nicht auf dem Motiv,
 * weshalb hier nirgends eine Urheberschaft behauptet wird. Die Fotos der Quelle
 * werden bewusst **nicht** gespiegelt — sie gehören dem Verein bzw. dem
 * Fotografen.
 */

import type { VideoCaptionTrack } from '@/components/site/video-dialog'

export const TSV_SOURCE_URL =
  'https://www.la-zirndorf.de/index.php/848-immonation-gmbh-wird-neuer-starker-partner'

export const TSV_SOURCE_PUBLISHER = 'Leichtathletikabteilung des TSV Zirndorf'

/** Veröffentlichungsdatum der Bekanntgabe. */
export const TSV_SOURCE_DATE = '2025-12-14'

/** Stand der Erfolgskarten — steht als Fußnote auf den Karten selbst. */
export const TSV_RECORDS_AS_OF = { de: 'Juli 2026', en: 'July 2026' } as const

/**
 * Wörtliche Zitate aus der Bekanntgabe. Deutsch ist der Originalwortlaut und
 * wird nie umformuliert; `en` ist eine gekennzeichnete Übersetzung, weshalb die
 * englische Fassung des Artikels den Originalsatz zusätzlich mitführt.
 */
export const TSV_QUOTES = {
  karabacak: {
    speaker: 'Erman Karabacak',
    role: {
      de: 'Geschäftsführer der Immonation GmbH',
      en: 'Managing Director, Immonation GmbH',
    },
    de: 'Ich habe selbst früher leistungsorientiert Sport betrieben und weiß genau, wie wichtig die finanzielle Unterstützung für junge, engagierte Sportlerinnen auf ihrem Weg ist. Deshalb war es mir eine Herzensangelegenheit, nicht nur die beiden Top-Talente Amelie Giese und Eni Kuske, sondern auch die gesamte Nachwuchsarbeit des TSV Zirndorf zu fördern.',
    en: 'I competed seriously myself, so I know exactly how much financial support matters to young, committed athletes on their way. That is why it was a personal concern of mine to back not only the two top talents Amelie Giese and Eni Kuske, but the entire youth programme of TSV Zirndorf.',
  },
  grun: {
    speaker: 'Marcus Grun',
    role: {
      de: 'Abteilungsleiter der Leichtathletik beim TSV Zirndorf',
      en: 'Head of the athletics division at TSV Zirndorf',
    },
    de: 'Wir sind überglücklich und dankbar für das regionale Engagement der Immonation GmbH. Die gesamte Atmosphäre war von Tag eins an freundlich, vertrauensvoll und auf Augenhöhe.',
    en: 'We are overjoyed and grateful for the regional commitment of Immonation GmbH. From day one the whole atmosphere was friendly, trusting, and on equal footing.',
  },
} as const

export type TsvAthlete = {
  name: string
  /** Jahrgang laut Erfolgskarte. */
  birthYear: number
  discipline: { de: string; en: string }
}

/**
 * Beide Athletinnen werden in der Quelle als Bundeskaderathletinnen geführt.
 * Die Disziplin steht auf den Erfolgskarten; sie wird hier geführt, damit
 * Bildunterschriften sie nicht frei erfinden.
 */
export const TSV_ATHLETES: readonly TsvAthlete[] = [
  {
    name: 'Eni Kuske',
    birthYear: 2007,
    discipline: { de: '400 Meter', en: '400 metres' },
  },
  {
    name: 'Amelie Giese',
    birthYear: 2010,
    discipline: { de: 'Weitsprung und Hürden', en: 'long jump and hurdles' },
  },
]

export type TsvImage = {
  src: string
  width: number
  height: number
  caption: { de: string; en: string }
  alt: { de: string; en: string }
  /**
   * Gleiche Mechanik wie in `uganda-donation.ts`: Motive mit erkennbaren
   * Minderjährigen bleiben ungerendert, sobald die Freigabelage unklar ist.
   *
   * Stand 3. September 2026 ist kein Motiv gesperrt — der Auftraggeber hat
   * bestätigt, dass für die Autogramm- und Erfolgskarten sowie für beide Filme
   * Veröffentlichungsfreigaben vorliegen. Das Flag bleibt bestehen, damit eine
   * Sperre eine Zeile kostet und keinen Umbau: `requiresRelease: true` setzen
   * genügt, dann verschwindet das Motiv aus `TSV_PUBLISHABLE_IMAGES` und damit
   * aus der Sektion auf `/engagement`.
   */
  requiresRelease?: true
}

/**
 * Reihenfolge ist bewusst je Athletin gepaart — Autogrammkarte, dann
 * Erfolgskarte, dann dasselbe für die zweite Athletin. So steht in der
 * zweispaltigen Galerie jede Athletin in ihrer eigenen Zeile und in der
 * vierspaltigen bleibt das Muster Gesicht / Bilanz / Gesicht / Bilanz.
 *
 * Die Erfolgskarten tragen — anders als die Autogrammkarten — keine
 * Immonation-Marke. Bildunterschrift und Fließtext behaupten deshalb nicht,
 * wer sie erstellt hat.
 */
const IMAGES: readonly TsvImage[] = [
  {
    src: '/images/engagement/tsv-autogrammkarte-eni-kuske.webp',
    width: 1200,
    height: 1683,
    caption: {
      de: 'Autogrammkarte Eni Kuske, 400 Meter — von Immonation für den Verein produziert.',
      en: 'Autograph card for Eni Kuske, 400 metres — produced by Immonation for the club.',
    },
    alt: {
      de: 'Eni Kuske im Startlauf bei einem Hallenwettkampf mit Startnummer 300, darunter das Logo der Immonation GmbH',
      en: 'Eni Kuske accelerating out of the start at an indoor meeting wearing bib 300, with the Immonation GmbH logo below',
    },
  },
  {
    src: '/images/engagement/tsv-erfolge-eni-kuske.webp',
    width: 1200,
    height: 1683,
    caption: {
      de: 'Erfolgskarte Eni Kuske, Jahrgang 2007, TSV Zirndorf — Stand Juli 2026.',
      en: 'Results card for Eni Kuske, born 2007, TSV Zirndorf — as of July 2026.',
    },
    alt: {
      de: 'Erfolgskarte mit den Platzierungen von Eni Kuske über 400 Meter in den Jahren 2024 bis 2026',
      en: 'Results card listing Eni Kuske’s 400 metre placings from 2024 to 2026',
    },
  },
  {
    src: '/images/engagement/tsv-autogrammkarte-amelie-giese.webp',
    width: 1200,
    height: 1683,
    caption: {
      de: 'Autogrammkarte Amelie Giese — aufgenommen bei der Bayerischen Meisterschaft in Ingolstadt.',
      en: 'Autograph card for Amelie Giese — photographed at the Bavarian championships in Ingolstadt.',
    },
    alt: {
      de: 'Amelie Giese jubelt mit beiden Daumen nach oben im Wettkampfdress mit Startnummer 176',
      en: 'Amelie Giese celebrating with both thumbs up in competition kit wearing bib 176',
    },
  },
  {
    src: '/images/engagement/tsv-erfolge-amelie-giese.webp',
    width: 1200,
    height: 1683,
    caption: {
      de: 'Erfolgskarte Amelie Giese, Jahrgang 2010, TSV Zirndorf — Stand Juli 2026.',
      en: 'Results card for Amelie Giese, born 2010, TSV Zirndorf — as of July 2026.',
    },
    alt: {
      de: 'Erfolgskarte mit den Platzierungen von Amelie Giese in Weitsprung, Hürden und Siebenkampf von 2024 bis 2026',
      en: 'Results card listing Amelie Giese’s placings in long jump, hurdles, and heptathlon from 2024 to 2026',
    },
  },
]

/** Nur Motive ohne offene Rechtefrage — das ist, was gerendert werden darf. */
export const TSV_PUBLISHABLE_IMAGES = IMAGES.filter((image) => !image.requiresRelease)

/** Vollständiges Register inklusive gesperrter Motive (Audit, Freigabelauf). */
export const TSV_ALL_IMAGES = IMAGES

export type TsvVideo = {
  src: string
  poster: string
  width: number
  height: number
  /** Laufzeit in Sekunden, gemessen an der ausgelieferten Datei. */
  duration: number
  title: { de: string; en: string }
  /**
   * Beschreibt ausschließlich die Herkunft der Aufnahme — wer zu sehen ist, wo
   * gedreht wurde, wie lang der Clip läuft. Bewusst keine Aussage darüber, was
   * gesagt wird: Der Wortlaut ist nicht verschriftlicht, und eine Paraphrase
   * wäre eine unbelegte Behauptung. Das schriftliche Zitat von Marcus Grun
   * steht separat und ist der Bekanntgabe zugeordnet.
   */
  caption: { de: string; en: string }
  /**
   * Untertitelspuren. Beide Filme laufen mit Ton; die WebVTT-Dateien stehen noch
   * aus. Ein Eintrag hier genügt, sobald eine Datei vorliegt — siehe
   * `VideoCaptionTrack` in `components/site/video-dialog`.
   */
  captions?: readonly VideoCaptionTrack[]
}

export const TSV_FEEDBACK_VIDEO: TsvVideo = {
  src: '/videos/engagement/tsv-marcus-grun-feedback.mp4',
  poster: '/images/engagement/tsv-marcus-grun-still.webp',
  width: 1080,
  height: 1920,
  duration: 81,
  title: {
    de: 'Marcus Grun, TSV Zirndorf, über die Partnerschaft',
    en: 'Marcus Grun, TSV Zirndorf, on the partnership',
  },
  caption: {
    de: 'Marcus Grun, Abteilungsleiter der Leichtathletik beim TSV Zirndorf, aufgenommen im Immonation-Büro in Zirndorf. Laufzeit 1:21 Minuten, mit Ton.',
    en: 'Marcus Grun, head of the athletics division at TSV Zirndorf, recorded at the Immonation office in Zirndorf. Running time 1:21, with sound.',
  },
}

export const TSV_SPONSORING_VIDEO: TsvVideo = {
  src: '/videos/engagement/tsv-sponsoringvertrag.mp4',
  poster: '/images/engagement/tsv-sponsoringvertrag-still.webp',
  width: 1080,
  height: 1920,
  duration: 37,
  title: {
    de: 'Unterzeichnung der Sponsoringvereinbarung',
    en: 'Signing the sponsorship agreement',
  },
  caption: {
    de: 'Von Immonation produzierter Sponsoringfilm zu Eni Kuske und Amelie Giese, mit der Unterzeichnung der Vereinbarung mit dem TSV Zirndorf. Laufzeit 37 Sekunden, mit Ton.',
    en: 'Immonation-produced sponsorship film featuring Eni Kuske and Amelie Giese, including the signing of the agreement with TSV Zirndorf. Running time 37 seconds, with sound.',
  },
}

/**
 * Vollständiges Videoregister. Die Sektion auf `/engagement` greift die beiden
 * Filme einzeln ab: Das Feedback von Marcus Grun steht in einer eigenen
 * Spotlight-Sektion, der Sponsoringfilm läuft in der TSV-Sektion mit.
 */
export const TSV_VIDEOS = [TSV_SPONSORING_VIDEO, TSV_FEEDBACK_VIDEO] as const

/** Slugs des ausführlichen Beitrags je Locale. */
export const TSV_ARTICLE_SLUG = {
  de: 'sponsoring-tsv-zirndorf-leichtathletik',
  en: 'tsv-zirndorf-athletics-sponsorship',
} as const
