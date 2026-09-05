import type { Locale } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'
import type { ReferenceId } from './references'
import thumbnailManifest from './social-thumbnails.generated.json'

/**
 * Die tatsächlich betriebenen Social-Kanäle und die reichweitenstärksten
 * Objektvideos daraus.
 *
 * Drei Regeln, die diese Datei zusammenhalten:
 *
 * 1. **Nur Objektinhalte.** Die absolut reichweitenstärksten Beiträge sind auf
 *    Instagram das Sponsoring-Reel und der Partnerbeitrag, auf TikTok eine
 *    Foto-Karussell-Anzeige. Sie stehen hier nicht: Die Seite behauptet, dass
 *    Objekte über Social Media verkauft werden — dafür zählt, was ein Objekt
 *    zeigt. Die Rangfolge gilt also innerhalb der Objektvideos.
 * 2. **Kein Straßenname.** Die Titel der YouTube-Clips nennen die Adresse; die
 *    Beschriftung hier folgt wie überall dem Referenzdatensatz (Ort + Objektart).
 *    Siehe Kopfkommentar in `references.ts`.
 * 3. **Aufrufe sind ein Stichtagswert.** Plattformen runden (TikTok zeigt
 *    „44.9K"). `SOCIAL_METRICS_CAPTURED_ON` gehört sichtbar an jede Zahl.
 * 4. **Gezeigt wird der echte Beitrag, nicht ein Ersatz dafür.** Das Vorschaubild
 *    ist das Standbild der Plattform (`social-thumbnails.generated.json`, erzeugt
 *    von `scripts/fetch-social-thumbnails.mjs`), und der Klick startet den echten
 *    Player von TikTok, Instagram oder YouTube.
 *
 *    Zwei Dinge dabei sind Absicht, nicht Umständlichkeit:
 *    - Das Standbild liegt **lokal**. Direkt eingebunden würde es die IP jedes
 *      Besuchers vor jeder Einwilligung an die Plattform senden, und die
 *      signierten CDN-Links laufen ab (TikTok `x-expires`, Instagram `oe=`).
 *    - Der Player lädt **erst nach Klick** (Zwei-Klick-Lösung, § 25 TDDDG).
 *
 *    Eigene Nachschnitte aus `sold-videos.ts` stehen hier bewusst nicht mehr: Sie
 *    zeigten zwar dasselbe Objekt, aber nicht den Beitrag, über den die Aufrufzahl
 *    daneben etwas aussagt.
 */

export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'facebook'

type LocalizedText = Record<Locale, string>

/** Erhebung der Aufrufzahlen direkt aus den öffentlichen Kanalprofilen. */
export const SOCIAL_METRICS_CAPTURED_ON = '2026-09-04'

export type SocialChannel = {
  platform: SocialPlatform
  /** Anzeigename der Plattform. */
  name: string
  /** Öffentliches Handle, wie es auf der Plattform steht. */
  handle: string
  url: string
  /** Wofür der Kanal im Vermarktungssystem steht. */
  purpose: LocalizedText
}

export type SocialPost = {
  id: string
  platform: SocialPlatform
  url: string
  /** Aufrufe zum Erhebungsstichtag, so wie die Plattform sie ausweist. */
  views: number
  /** Objektart — Beschriftung ohne Adresse. */
  type: LocalizedText
  /** Ort beziehungsweise Ortsteil. */
  place: LocalizedText
  /** Referenzfall, falls der Verkauf öffentlich dokumentiert ist. */
  referenceId?: ReferenceId
}

function text(de: string, en: string = de): LocalizedText {
  return { de, en }
}

const CHANNELS: readonly SocialChannel[] = [
  {
    platform: 'tiktok',
    name: 'TikTok',
    handle: '@immonationgmbh',
    url: SITE.socials.tiktok,
    purpose: text(
      'Die größte Reichweite: Objektclips laufen hier weit über den Followerkreis hinaus.',
      'The widest reach: property clips travel far beyond the follower base here.',
    ),
  },
  {
    platform: 'instagram',
    name: 'Instagram',
    handle: '@immonationgmbh',
    url: SITE.socials.instagram,
    purpose: text(
      'Reels und Einblicke für die Region — inklusive Visualisierung und Home Staging.',
      'Reels and behind-the-scenes for the region — including visualisation and home staging.',
    ),
  },
  {
    platform: 'youtube',
    name: 'YouTube',
    handle: '@immonationgmbh4352',
    url: SITE.socials.youtube,
    purpose: text(
      'Die vollständigen Objektfilme, dauerhaft abrufbar und suchbar.',
      'The full property films, permanently available and searchable.',
    ),
  },
  {
    platform: 'facebook',
    name: 'Facebook',
    handle: '/immonationgmbh',
    url: SITE.socials.facebook,
    purpose: text(
      'Reichweite in der Region, vor allem bei Eigentümern über 45.',
      'Regional reach, particularly with owners over 45.',
    ),
  },
]

/**
 * Reichweitenstärkste Objektvideos je Kanal, absteigend nach Aufrufen.
 * Stand: `SOCIAL_METRICS_CAPTURED_ON`.
 */
const POSTS: readonly SocialPost[] = [
  // TikTok — @immonationgmbh
  {
    id: 'tiktok-nuernberg-gaulnhofen',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@immonationgmbh/video/7680923632528362785',
    views: 44900,
    type: text('Einfamilienhaus', 'Single-family home'),
    place: text('Nürnberg-Gaulnhofen', 'Nuremberg-Gaulnhofen'),
  },
  {
    id: 'tiktok-architektenhaus',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@immonationgmbh/video/7512191387496992022',
    views: 33100,
    type: text('Architektenhaus', 'Architect-designed house'),
    place: text('Nürnberg', 'Nuremberg'),
  },
  {
    id: 'tiktok-villa-nuernberg',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@immonationgmbh/video/7559620242305994006',
    views: 24000,
    type: text('Villa', 'Villa'),
    place: text('Nürnberg', 'Nuremberg'),
  },
  {
    id: 'tiktok-schwaig-sandstein',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@immonationgmbh/video/7677659377494445345',
    views: 20200,
    type: text('Sandsteinhaus', 'Sandstone house'),
    place: text('Schwaig bei Nürnberg', 'Schwaig near Nuremberg'),
  },
  {
    id: 'tiktok-schweinau-rmh',
    platform: 'tiktok',
    url: 'https://www.tiktok.com/@immonationgmbh/video/7617484557570280736',
    views: 12700,
    type: text('Reihenmittelhaus', 'Mid-terrace home'),
    place: text('Nürnberg-Schweinau', 'Nuremberg-Schweinau'),
  },

  // Instagram — @immonationgmbh
  {
    id: 'instagram-maisonette-loft',
    platform: 'instagram',
    url: 'https://www.instagram.com/immonationgmbh/reel/DcA4AZyNcvm/',
    views: 523,
    type: text('Maisonette-Loft', 'Maisonette loft'),
    place: text('Nürnberg', 'Nuremberg'),
  },
  {
    id: 'instagram-zirndorf-terrasse',
    platform: 'instagram',
    url: 'https://www.instagram.com/immonationgmbh/reel/DWZFCgIDbj8/',
    views: 517,
    type: text('Neubau-Terrassenwohnung', 'New-build terrace apartment'),
    place: text('Zirndorf', 'Zirndorf'),
  },
  {
    id: 'instagram-home-staging',
    platform: 'instagram',
    url: 'https://www.instagram.com/immonationgmbh/reel/DWgn_K0jaVn/',
    views: 447,
    type: text('Virtuelles Home Staging', 'Virtual home staging'),
    place: text('Metropolregion Nürnberg', 'Nuremberg metropolitan region'),
  },
  {
    id: 'instagram-oberasbach-efh',
    platform: 'instagram',
    url: 'https://www.instagram.com/immonationgmbh/reel/DctQnFaNpeC/',
    views: 426,
    type: text('Einfamilienhaus', 'Single-family home'),
    place: text('Oberasbach-Altenberg', 'Oberasbach-Altenberg'),
  },

  // YouTube — @immonationgmbh4352
  {
    id: 'youtube-deining-etw',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/9UNJbLcXrG8',
    views: 1401,
    type: text('Neubauwohnung', 'New-build apartment'),
    place: text('Deining', 'Deining'),
    referenceId: 'deining-neubauwohnung',
  },
  {
    id: 'youtube-nuernberg-efh',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/BrdtD42zvAs',
    views: 534,
    type: text('Einfamilienhaus', 'Single-family home'),
    place: text('Nürnberg', 'Nuremberg'),
    referenceId: 'nuernberg-einfamilienhaus',
  },
  {
    id: 'youtube-hagenbuechach-efh',
    platform: 'youtube',
    url: 'https://www.youtube.com/shorts/hvseytSrur0',
    views: 373,
    type: text('Einfamilienhaus', 'Single-family home'),
    place: text('Hagenbüchach', 'Hagenbüchach'),
    referenceId: 'hagenbuechach-hausaeckern',
  },
  // Die drei folgenden sind reguläre Kanalvideos (kein Short) und im Querformat.
  // Sie stehen hier, weil die Rangfolge nach Aufrufen gilt und sie die nächsten
  // Objektvideos darunter sind — Aufrufe am 2026-09-05 direkt von der Watch-Seite
  // des jeweiligen Videos abgelesen.
  {
    id: 'youtube-nuernberg-visualisierung-wohnung',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=tsQoaldeVvE',
    views: 143,
    type: text('Visualisierung: 4,5-Zimmer-Wohnung', 'Visualisation: 4.5-room apartment'),
    place: text('Nürnberg', 'Nuremberg'),
  },
  {
    id: 'youtube-burgthann-villa',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=d9jBTDH2pmY',
    views: 107,
    type: text('Visualisierung: Unternehmervilla', 'Visualisation: executive villa'),
    place: text('Burgthann', 'Burgthann'),
  },
  {
    id: 'youtube-zirndorf-winkelbungalow',
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=pInTNDB2ads',
    views: 103,
    type: text('Visualisierung: Winkelbungalow', 'Visualisation: L-shaped bungalow'),
    place: text('Zirndorf-Bronnamberg', 'Zirndorf-Bronnamberg'),
  },

  // Zurückgehalten: Der vierte YouTube-Short (`qx4Q31CrpM0`, Reihenmittelhaus
  // Nürnberg, 147 Aufrufe) gehört zum Fall Wörnitzstraße, dessen Ortsgenauigkeit
  // noch offen ist (siehe TODO.md). Sein YouTube-Titel nennt die Straße. Der
  // Eintrag kommt zurück, sobald die Freigabe vorliegt.
]

export type LocalizedSocialChannel = Omit<SocialChannel, 'purpose'> & { purpose: string }
export type LocalizedSocialPost = Omit<SocialPost, 'type' | 'place'> & {
  type: string
  place: string
  /** „Einfamilienhaus · Nürnberg" — die einzige Beschriftung, die publiziert wird. */
  label: string
  /** Echtes Standbild des Beitrags, lokal ausgeliefert. */
  thumbnail?: SocialThumbnail
  /** Einbettung der Plattform, `null` wenn keine gebildet werden kann. */
  embed: SocialEmbed | null
}

export function listSocialChannels(locale: Locale): LocalizedSocialChannel[] {
  return CHANNELS.map((channel) => ({ ...channel, purpose: channel.purpose[locale] }))
}

function localizePost(post: SocialPost, locale: Locale): LocalizedSocialPost {
  const type = post.type[locale]
  const place = post.place[locale]
  const thumbnail = getSocialThumbnail(post.id)
  return {
    ...post,
    type,
    place,
    label: `${type} · ${place}`,
    thumbnail,
    embed: socialEmbed(post, thumbnail),
  }
}

/** Alle Objektvideos, absteigend nach Aufrufen — plattformübergreifend. */
export function listSocialPosts(locale: Locale): LocalizedSocialPost[] {
  return [...POSTS].sort((a, b) => b.views - a.views).map((post) => localizePost(post, locale))
}

export function listSocialPostsByPlatform(
  platform: SocialPlatform,
  locale: Locale,
): LocalizedSocialPost[] {
  return POSTS.filter((post) => post.platform === platform)
    .sort((a, b) => b.views - a.views)
    .map((post) => localizePost(post, locale))
}

/** Der reichweitenstärkste Objektclip eines Kanals — für die Startseite. */
export function getTopSocialPost(
  platform: SocialPlatform,
  locale: Locale,
): LocalizedSocialPost | undefined {
  return listSocialPostsByPlatform(platform, locale)[0]
}

export function getSocialChannel(
  platform: SocialPlatform,
  locale: Locale,
): LocalizedSocialChannel | undefined {
  return listSocialChannels(locale).find((channel) => channel.platform === platform)
}

/** Summe der Aufrufe der hier geführten Objektvideos. */
export function totalFeaturedViews() {
  return POSTS.reduce((sum, post) => sum + post.views, 0)
}

/**
 * Das echte Standbild des Beitrags, lokal ausgeliefert.
 *
 * Erzeugt von `scripts/fetch-social-thumbnails.mjs` (`pnpm social:thumbnails`).
 * Fehlt ein Eintrag, zeigt die Kachel die Markenfläche statt eines fremden Bildes.
 */
export type SocialThumbnail = {
  src: string
  width: number
  height: number
  /** Woher das Bild stammt — für die Herkunftsdokumentation. */
  source: string
}

const THUMBNAILS = thumbnailManifest.thumbnails as Record<string, SocialThumbnail | undefined>

export function getSocialThumbnail(postId: string): SocialThumbnail | undefined {
  return THUMBNAILS[postId]
}

/** Bestimmt Kachelformat und Rahmen im Lichtkasten. */
export type SocialEmbedShape = 'portrait' | 'landscape' | 'post'

export type SocialEmbed = {
  url: string
  /**
   * `portrait` = 9:16-Player (TikTok, YouTube-Shorts). `landscape` = 16:9, für
   * die regulären Kanalvideos auf YouTube — ein Querformat in einen 9:16-Rahmen
   * zu zwingen, hieße es entweder zu beschneiden oder mit Balken zu umranden.
   * `post` = Instagrams Beitrags-Einbettung, die Kopf- und Fußzeile mitbringt und
   * ihre Höhe selbst bestimmt; sie bekommt einen schmalen, scrollbaren Rahmen.
   *
   * Für YouTube entscheidet das Seitenverhältnis des echten Standbilds, nicht die
   * URL-Form: Ein Short liefert ein hochformatiges `oardefault`, ein reguläres
   * Video ein 1280×720-`maxresdefault`.
   */
  shape: SocialEmbedShape
}

/**
 * Einbett-URL des Beitrags — `null`, wenn sich keine bilden lässt.
 *
 * Bewusst gewählt ist jeweils die **schlankste** Variante, die die Plattform
 * anbietet — nicht die, die die ganze Plattformseite in einen Rahmen packt:
 *
 * - **TikTok** `tiktok.com/player/v1/<id>` — der offiziell dokumentierte
 *   *Embed Player* (developers.tiktok.com/doc/embed-player). Er liefert das
 *   nackte Video mit Steuerung: rund 10 KB Dokument statt der rund 290 KB von
 *   `/embed/v2/`, das Kanalkopf, Beschreibung, Musikzeile und Folgen-Button
 *   mitbringt. `music_info=0`, `description=0` und `rel=0` schalten den Rest ab.
 * - **YouTube** `youtube-nocookie.com/embed/<id>` — der erweiterte
 *   Datenschutzmodus, ohnehin nur der Player. `rel=0` unterdrückt fremde
 *   Videovorschläge am Ende.
 * - **Instagram** `instagram.com/p/<shortcode>/embed/` — ohne `captioned`, damit
 *   der Bildunterschriften-Block wegfällt. Etwas schlanker geht es nicht:
 *   Instagram bietet keinen reinen Player an, die Beitrags-Einbettung ist die
 *   einzige unterstützte Form. Sie ist aber die dafür gebaute Einbettung und
 *   nicht die Desktop-Website.
 *
 * Zu Instagram eine Warnung für spätere Prüfungen: Ein `curl` ohne
 * `Sec-Fetch-Dest: iframe` und Nodes `fetch` bekommen `X-Frame-Options: DENY`
 * und ein leeres Dokument — Instagram erkennt automatisierte Clients. Das ist
 * **kein** Einbettungsverbot. Ein echter Browser lädt die Einbettung; geprüft
 * über die `MOUNTED`-postMessage, die der Frame an das Elternfenster schickt.
 * Wer das hier künftig „korrigiert", weil ein Header-Check DENY zeigt, entfernt
 * eine funktionierende Einbettung.
 *
 * `autoplay=1` ist vertretbar, weil der Player ausschließlich nach einem
 * ausdrücklichen Klick auf die Kachel geladen wird — er startet nie ungefragt.
 * Geladen wird er erst dann: Vorher geht keine Anfrage an die Plattform.
 */
export function socialEmbed(
  post: Pick<SocialPost, 'platform' | 'url'>,
  thumbnail?: SocialThumbnail,
): SocialEmbed | null {
  if (post.platform === 'youtube') {
    const id =
      /\/(?:shorts|embed)\/([A-Za-z0-9_-]{6,})/.exec(post.url)?.[1] ??
      /[?&]v=([A-Za-z0-9_-]{6,})/.exec(post.url)?.[1]
    if (!id) return null
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
    })
    const shape: SocialEmbedShape =
      thumbnail && thumbnail.width > thumbnail.height ? 'landscape' : 'portrait'
    return { url: `https://www.youtube-nocookie.com/embed/${id}?${params}`, shape }
  }

  if (post.platform === 'tiktok') {
    const id = /\/video\/(\d+)/.exec(post.url)?.[1]
    if (!id) return null
    const params = new URLSearchParams({
      autoplay: '1',
      controls: '1',
      progress_bar: '1',
      play_button: '1',
      volume_control: '1',
      fullscreen_button: '1',
      timestamp: '0',
      // Kanalkopf, Beschreibung, Musikzeile und Videovorschläge aus.
      music_info: '0',
      description: '0',
      rel: '0',
    })
    return { url: `https://www.tiktok.com/player/v1/${id}?${params}`, shape: 'portrait' }
  }

  if (post.platform === 'instagram') {
    const shortcode = /\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/.exec(post.url)?.[1]
    if (!shortcode) return null
    return { url: `https://www.instagram.com/p/${shortcode}/embed/`, shape: 'post' }
  }

  return null
}

export function formatSocialViews(views: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(views)
}
