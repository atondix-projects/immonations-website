import type { Locale } from '@/i18n/routing'
import { SITE } from '@/lib/seo/site'
import type { ReferenceId } from './references'

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
}

export function listSocialChannels(locale: Locale): LocalizedSocialChannel[] {
  return CHANNELS.map((channel) => ({ ...channel, purpose: channel.purpose[locale] }))
}

function localizePost(post: SocialPost, locale: Locale): LocalizedSocialPost {
  const type = post.type[locale]
  const place = post.place[locale]
  return { ...post, type, place, label: `${type} · ${place}` }
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

export function formatSocialViews(views: number, locale: Locale) {
  return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB').format(views)
}
