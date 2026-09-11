import { PUBLIC_TESTIMONIALS } from './public-testimonials'

/**
 * Öffentliches Google-Profil der Immonation GmbH (Zirndorf).
 * CID 3199252424447906498 — dieselbe Quelle wie auf der Startseite.
 */
export const GOOGLE_PROFILE = 'https://www.google.com/maps?cid=3199252424447906498'

/**
 * Redaktionell freigegebene Google-Kennzahl. Der Review-Feed liefert einzelne
 * Stimmen, aber keine belastbare Gesamtzahl.
 */
export const PUBLISHED_GOOGLE_RATING = 4.9
export const PUBLISHED_GOOGLE_REVIEW_COUNT = 230

const REVIEW_SOURCE_ID = 'ChIJcaa2LZBXn0cRwlIGMiEHZiw'
const REVIEW_FEED_URL = new URL('https://service-reviews-ultimate.elfsight.com/data/reviews')
REVIEW_FEED_URL.searchParams.append('uris[]', REVIEW_SOURCE_ID)
REVIEW_FEED_URL.searchParams.set('filter_content', 'text_required')
REVIEW_FEED_URL.searchParams.set('min_rating', '4')
REVIEW_FEED_URL.searchParams.set('page_length', '100')
REVIEW_FEED_URL.searchParams.set('order', 'date')

export type ReviewSource = 'google' | 'golocal'
export type DatePrecision = 'day' | 'month'

export type DisplayReview = {
  id: string
  author: string
  quote: string
  rating: 4 | 5
  source: ReviewSource
  sourceUrl: string
  publishedOn: string
  datePrecision: DatePrecision
  authorUrl?: string
  authorPhotoUrl?: string
  relativePublished?: string
  isLiveGoogle?: boolean
}

export type TestimonialReviews = {
  reviews: DisplayReview[]
  live: boolean
  rating: number
  reviewCount: number
}

type ReviewFeedEntry = {
  id?: string
  supplier?: string
  reviewer_name?: string
  reviewer_picture_url?: string
  rating?: number
  text?: string
  url?: string
  published_at?: number
}

/**
 * Transkribierte Original-Google-Bewertungen aus den Referenz-Screenshots
 * (`docs/source-material/customer-files/visual-content-transcriptions.json`).
 * Relative Angaben dort beziehen sich auf den Transkriptionsstand 2026-07-22.
 */
const CURATED_GOOGLE_REVIEWS: readonly DisplayReview[] = [
  review(
    'oana-leonte',
    'Oana Leonte',
    5,
    '2026-07-22',
    'day',
    'Beste Erfahrung überhaupt, stets geduldig, professionell und direkt. Absolut empfehlenswert!',
  ),
  review(
    'ella-stoss',
    'Ella Stoss',
    5,
    '2026-07-08',
    'month',
    'Wir haben mit Immonation unser Haus in Fischbach innerhalb kürzester Zeit verkauft. Der Service war von Beginn an erstklassig, wir wurden zu jeder Zeit informiert und unterstützt. Besonders gut war das Exposé mit dem virtuellen Rundgang und der reinfliegenden Möblierung - so konnte jeder Interessent die leeren Räume und danach eine mögliche Einrichtung ansehen. Wir würden Immonation jederzeit weiter empfehlen und werden selbst bei zukünftigen Immobilienverkäufen wieder mit Immonation zusammenarbeiten.',
  ),
  review(
    'thomas-hermann',
    'Thomas Hermann',
    5,
    '2026-07-08',
    'month',
    'Wir wurden von Herrn Davis und Frau Pistil beim Verkauf unserer kleinen Wohnung sehr professionell und freundlich begleitet. Das Exposé war sehr ansprechend gestaltet, die Besichtigungstermine wurden zügig und kompetent geführt. Auch von der Begleitung beim Notar bis zur Schlüsselübergabe wurden wir freundlich und engagiert begleitet. Vielen Dank dir.',
  ),
  review(
    'waweina',
    'Waweina',
    5,
    '2026-06-22',
    'month',
    'Ich wurde beim Verkauf meiner Wohnung über mehrere Monate hinweg von der Immonation GmbH begleitet und war insgesamt wirklich sehr zufrieden. Besonders hervorheben möchte ich die sehr strukturierte und koordinierte Arbeitsweise. Die Kommunikation – sowohl telefonisch als auch per E-Mail – war jederzeit freundlich, zuverlässig und professionell. Ein großes Lob geht dabei insbesondere an Frau Pistil, die den gesamten Prozess engagiert begleitet hat. Herr Karabacak hat mit seinem Team ein modernes und gut organisiertes Maklerbüro aufgebaut. Besonders positiv fand ich die hochwertige Erstellung des Exposés inklusive Video- und Social-Media-Präsentation. Dadurch wurde die Wohnung optimal präsentiert und tatsächlich konnte bereits innerhalb eines Monats ein Käufer gefunden werden. Auch die weitere Verkaufsabwicklung verlief reibungslos und professionell. Insgesamt habe ich mich während des gesamten Prozesses sehr gut betreut gefühlt.',
  ),
  review(
    'angela-nikolasch',
    'Angela Nikolasch',
    5,
    '2026-04-22',
    'month',
    'Wir waren mit Betreuung und Beratung höchst zufrieden. Ein nettes und sehr kompetentes Team.Nur zu empfehlen!',
  ),
  review(
    'markus-burkhardt',
    'Markus Burkhardt',
    5,
    '2025-12-22',
    'month',
    'Vielen Dank für die hervorragende Unterstützung beim Verkauf meiner Eigentumswohnung. Herr Karabacak, Frau Pistil und das ganze Team haben meine Erwartungen mehr als übertroffen. Hier sind echte Profis am Werk. Der Verkaufsprozess ging sehr schnell und reibungslos. Ich wurde stets zeitnah über alle Schritte informiert. Große Expertise, exzellenter und überaus freundlicher Service sowie eine erstklassige Betreuung wurden mir stets entgegengebracht. Ich kann dieses Team mit allerbestem Gewissen nur weiterempfehlen.',
  ),
  review(
    'ursula-troeger',
    'Ursula Tröger',
    5,
    '2025-11-22',
    'month',
    'Zwecks Verkauf meiner Eigentumswohnung habe ich mich an Herrn Davis gewandt und wurde nicht enttäuscht. Alles lief nett und zielgerichtet ab, ich wurde über jeden Schritt informiert und hatte kürzlich meinen Notartermin. Alles zu meiner Zufriedenheit erledigt, kann die Firma nur weiterempfehlen.',
  ),
  review(
    'hube-hube',
    'Hube Hube',
    5,
    '2025-11-22',
    'month',
    'Ein engagierter Makler, der moderne Wege wie Social Media nutzt und mit kompetenter Beratung stets beste Ergebnisse für seine Kunden erzielt.',
  ),
  review(
    'ralf-henkel',
    'Ralf Henkel',
    5,
    '2025-10-22',
    'month',
    'Sehr freundlich und professionell. Kann ich nur weiterempfehlen',
  ),
  review(
    'christian-rock',
    'Christian Rock',
    5,
    '2025-10-22',
    'month',
    'Erstklassige Betreuung, ab dem ersten Tag, perfekte Korrespondenz. Professionelles Auftreten, sehr freundlich, hilfsbereit, und fast immer jemand zu erreichen. Auch wenn der anvisierte Betrag nicht ganz erreicht wurde, aber das ist dem Markt geschuldet. Vielen Dank für die tolle Zusammenarbeit.',
  ),
  review(
    'cyber-86',
    'Cyber 86',
    5,
    '2025-07-22',
    'month',
    'Ich bin rundum begeistert von der Betreuung und dem Ablauf meines Hausverkaufs. Vom ersten Beratungsgespräch an fühlte ich mich bestens aufgehoben. Die professionelle Einschätzung des Marktwerts, die hochwertige Präsentation meiner Immobilie sowie die durchdachte Verkaufsstrategie haben mich absolut überzeugt. Innerhalb kürzester Zeit gab es zahlreiche Besichtigungen – alles perfekt organisiert – und schon bald fand sich der passende Käufer. Der gesamte Verkaufsprozess verlief schnell, transparent und völlig stressfrei für mich. Auch bei rechtlichen und organisatorischen Fragen wurde ich jederzeit kompetent unterstützt. Ich kann den Service nur wärmstens weiterempfehlen. Vielen Dank für die großartige Arbeit – ich hätte mir keinen besseren Partner für den Verkauf meines Hauses wünschen können! Einen besonderen Dank möchte ich noch an Herr Davis und Herr Karabacak aussprechen.',
  ),
  review(
    'nina-clark',
    'Nina Clark',
    5,
    '2025-07-22',
    'month',
    'Sehr nette und professionelle Beratung. Wir fühlten uns bei unserem Wohnungsverkauf bestens betreut und können das Team der Immonation GmbH nur weiterempfehlen.',
  ),
  review(
    'markus-biegel',
    'Markus Biegel',
    5,
    '2025-07-22',
    'month',
    'Hervorragende Betreuung und professionelle Abwicklung! Der Verkauf meines Mehrfamilienhauses in Fürth wurde von der Immonation GmbH von Anfang bis Ende professionell begleitet. Das starke Vertriebsteam im Außendienst hat sich engagiert um die Vermarktung gekümmert und die passenden Käufer gefunden. Gleichzeitig war der Innendienst jederzeit erreichbar, sodass offene Fragen schnell und unkompliziert geklärt werden konnten. Besonders positiv fand ich die regelmäßigen Updates zum aktuellen Stand, wodurch ich immer bestens informiert war. Herr Karabacak ist mit seinem Team ein sehr guter Ansprechpartner, der mit Fachwissen, Engagement und Verlässlichkeit überzeugt. Vielen Dank für die großartige Unterstützung!',
  ),
  review(
    'hermann-meier',
    'Hermann Meier',
    5,
    '2025-07-22',
    'month',
    'Es war einfach wohltuend mit richtigen PROFIS zusammenzuarbeiten. Der Verkauf unserer Wohnung wurde vom Immonation Team kompetent durchgeführt. Von der Marktanalyse über die Anzeigenerstellung und Besichtigungen bis zum Notartermin wurden wir stets auf dem laufenden gehalten. Von uns gibt es eine 100% Empfehlung. Danke Hr. Karabacak, weiter so !!!',
  ),
  review(
    'viktor-emter',
    'Viktor Emter',
    5,
    '2025-07-22',
    'month',
    'Wir möchten unsere äußerst positive Erfahrung mit der Immonation GmbH sowie deren Mitarbeiter*innen teilen. Als Eigentümer einer Wohnung, die zum Verkauf stand, war es uns besonders wichtig, einen Partner zu finden, der uns professionell und kompetent durch den gesamten Verkaufsprozess begleitet. Die Immonation GmbH hat all unsere Erwartungen in jeder Hinsicht übertroffen. Bereits beim ersten Kontakt war die Kommunikation hervorragend. Der Geschäftsinhaber als auch seine Mitarbeiter*innen, die uns betreuten, waren zu jeder Zeit sehr gut vorbereitet, freundlich und zeigten eine tiefgehende Expertise am Immobilienmarkt. Besonders beeindruckt hat uns die umfassende Marktanalyse und die professionelle Präsentation der Wohnung – mit hochwertigen Fotos, einer ansprechenden Beschreibung sowie einem virtuellen 360-Grad-Modell. Die Zusammenarbeit war stets transparent und von Vertrauen geprägt. Wir können die Immonation GmbH daher uneingeschränkt empfehlen.',
  ),
  review(
    'christian-hummel',
    'Christian Hummel',
    5,
    '2024-07-22',
    'month',
    'Wir sind absolut zufrieden! Trotz der angespannten Marktlage wurde das Objekt innerhalb unseres relativ kurzen Zeitrahmens und innerhalb der Wunschvorstellung verkauft. Herr Karabacak und sein Team sind absolut professionell aufstellt, schicken pro aktiv Reports, Updates und haben eine angenehme lockere Kommunikation. Auch die Exposé Erstellung und das Vermarkten war auf Top Niveau! Wir hatten 3-4 Maklergespräche und haben uns sofort für Immonation entschieden und würden es wieder tun. Der Erfolg spricht für sich',
  ),
  review(
    'klaus-zoepfel',
    'Klaus Zöpfel',
    4,
    '2024-07-22',
    'month',
    'Das war eine rundum gelungene Sache, alle Zusagen wurden eingehalten. Meine Immobilie wurde in schwierigen Umfeld zu einem zufrieden stellendem Preis verkauft. Die gesamte Kommunikation und Bearbeitung äußerst professionell. Ich kann das Unternehmen nur weiterempfehlen! Klaus W. Zöpfel',
  ),
  review(
    'pamela-gruenbeck',
    'pamela gruenbeck',
    5,
    '2024-07-22',
    'month',
    'Sehr professionelle Abwicklung und gute Betreuung im gesamten Kaufprozess. Vielen Dank an das komplette Team',
  ),
  review(
    'patric-mago',
    'Patric Mago',
    5,
    '2023-07-22',
    'month',
    'Herr Karabacak und sein Team haben uns den Großteil der Arbeit abgenommen. Top Abwicklung und super Kommunikation. So sollte es sein.',
  ),
  review(
    'andrea-streilein',
    'Andrea Streilein',
    5,
    '2023-07-22',
    'month',
    'Top Leistung: schnell, verbindlich, strukturiert und super professionell. Ob Vertrieb oder Backoffice- die Leistung war überdurchschnittlich. In jedem Fall weiterzuempfehlen!',
  ),
  review(
    'marcel-mago',
    'Marcel Mago',
    5,
    '2023-07-22',
    'month',
    'Super Kontaktaufnahmen und perfekter Service. Herr Karabacak hat uns mit seiner kompetenten Beratung sehr geholfen. Hier ist man nicht nur eine Nummer, sondern wird auch sehr persönlich und freundlich behandelt. Jederzeit wieder. 10 von 5 Sternen.',
  ),
]

function review(
  id: string,
  author: string,
  rating: 4 | 5,
  publishedOn: string,
  datePrecision: DatePrecision,
  quote: string,
): DisplayReview {
  return {
    id,
    author,
    rating,
    publishedOn,
    datePrecision,
    quote: collapse(quote),
    source: 'google',
    sourceUrl: GOOGLE_PROFILE,
  }
}

function collapse(value: string) {
  return value.replace(/\s+/g, ' ').trim()
}

function fromPublicTestimonials(): DisplayReview[] {
  return PUBLIC_TESTIMONIALS.map((testimonial) => ({
    id: testimonial.slug,
    author: testimonial.name,
    quote: collapse(testimonial.quote),
    rating: testimonial.rating,
    source: 'golocal',
    sourceUrl: testimonial.sourceUrl,
    publishedOn: testimonial.date,
    datePrecision: 'day',
  }))
}

function fingerprint(reviewItem: DisplayReview) {
  return `${reviewItem.author.trim().toLocaleLowerCase('de-DE')}::${reviewItem.quote.slice(0, 96).toLocaleLowerCase('de-DE')}`
}

/** Einzelne kuratierte Stimme per ID — für Seiten, die eine bestimmte Bewertung zitieren. */
export function getCuratedReview(id: string): DisplayReview | undefined {
  return CURATED_GOOGLE_REVIEWS.find((item) => item.id === id)
}

export function mergeReviews(
  live: readonly DisplayReview[],
  curated: readonly DisplayReview[],
): DisplayReview[] {
  const seen = new Set<string>()
  const merged: DisplayReview[] = []

  for (const item of [...live, ...curated]) {
    if (item.quote.length < 24) continue
    const key = fingerprint(item)
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }

  return merged.sort((left, right) => right.publishedOn.localeCompare(left.publishedOn))
}

export function formatReviewDate(item: DisplayReview, locale: 'de' | 'en') {
  const date = new Date(`${item.publishedOn}T00:00:00`)
  if (Number.isNaN(date.getTime())) return item.publishedOn

  const language = locale === 'en' ? 'en-GB' : 'de-DE'
  if (item.datePrecision === 'month') {
    return new Intl.DateTimeFormat(language, { month: 'long', year: 'numeric' }).format(date)
  }

  return new Intl.DateTimeFormat(language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asFeedEntry(value: unknown): ReviewFeedEntry | null {
  if (!isRecord(value)) return null
  return {
    id: typeof value.id === 'string' ? value.id : undefined,
    supplier: typeof value.supplier === 'string' ? value.supplier : undefined,
    reviewer_name: typeof value.reviewer_name === 'string' ? value.reviewer_name : undefined,
    reviewer_picture_url:
      typeof value.reviewer_picture_url === 'string' ? value.reviewer_picture_url : undefined,
    rating: typeof value.rating === 'number' ? value.rating : undefined,
    text: typeof value.text === 'string' ? value.text : undefined,
    url: typeof value.url === 'string' ? value.url : undefined,
    published_at: typeof value.published_at === 'number' ? value.published_at : undefined,
  }
}

function readFeedEntries(value: unknown): ReviewFeedEntry[] {
  if (!isRecord(value)) return []
  const result = isRecord(value.result) ? value.result : null
  const entries = result && Array.isArray(result.data) ? result.data : []
  return entries.flatMap((entry) => {
    const parsed = asFeedEntry(entry)
    return parsed ? [parsed] : []
  })
}

function toLiveReview(entry: ReviewFeedEntry, index: number): DisplayReview | null {
  const rating = entry.rating === 4 || entry.rating === 5 ? entry.rating : null
  const quote = collapse(entry.text ?? '')
  const author = entry.reviewer_name?.trim()
  const publishedOn = entry.published_at
    ? new Date(entry.published_at * 1000).toISOString().slice(0, 10)
    : null
  if (!rating || !author || quote.length < 24 || !publishedOn) return null

  return {
    id: `google-feed-${entry.id ?? `${publishedOn}-${index}`}`,
    author,
    quote,
    rating,
    source: 'google',
    sourceUrl: entry.url?.startsWith('https://') ? entry.url : GOOGLE_PROFILE,
    publishedOn,
    datePrecision: 'day',
    authorPhotoUrl: entry.reviewer_picture_url?.startsWith('https://')
      ? entry.reviewer_picture_url
      : undefined,
    isLiveGoogle: true,
  }
}

async function fetchGoogleReviewFeed(): Promise<DisplayReview[] | null> {
  try {
    const response = await fetch(REVIEW_FEED_URL, {
      headers: { accept: 'application/json' },
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: 10_800 },
    })

    if (!response.ok) {
      console.error(`Review feed failed: ${response.status}`)
      return null
    }

    const reviews = readFeedEntries(await response.json()).flatMap((entry, index) => {
      if (entry.supplier !== 'google') return []
      const item = toLiveReview(entry, index)
      return item ? [item] : []
    })
    return reviews.length > 0 ? reviews : null
  } catch (error) {
    console.error('Review feed request failed', error)
    return null
  }
}

export async function listTestimonialReviews(): Promise<TestimonialReviews> {
  const live = await fetchGoogleReviewFeed()
  const reviews = mergeReviews(live ?? [], [...CURATED_GOOGLE_REVIEWS, ...fromPublicTestimonials()])

  return {
    reviews,
    live: live !== null,
    rating: PUBLISHED_GOOGLE_RATING,
    reviewCount: PUBLISHED_GOOGLE_REVIEW_COUNT,
  }
}

export const CURATED_REVIEW_COUNT = CURATED_GOOGLE_REVIEWS.length
