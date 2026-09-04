import { GOOGLE_PROFILE } from './google-reviews'

export { GOOGLE_PROFILE }

export type ReviewPortalKind = 'direct' | 'aggregate'

export type ReviewPortalProfile = {
  href: string
  /**
   * Local copy of the portal's own mark. Omitted where no logo file is
   * available — the tile then falls back to a plain wordmark.
   */
  logo?: string
  /** Icon-only marks carry no name, so the tile spells it out beside them. */
  markOnly?: boolean
}

/**
 * Public review profiles, in display order. Ratings and review counts live in
 * `Home.reviews.portals` so editors can update the published figures without
 * touching this module.
 */
export const REVIEW_PORTAL_PROFILES = {
  google: {
    href: GOOGLE_PROFILE,
    logo: '/images/reviews/portals/google.svg',
    markOnly: true,
  },
  trustpilot: {
    href: 'https://de.trustpilot.com/review/immonationgmbh.de',
    logo: '/images/reviews/portals/trustpilot.svg',
  },
  immowelt: {
    href: 'https://www.immowelt.de/profil/aa4a4a5bc6a949b2981f3a050371ce96',
  },
  provenexpert: {
    href: 'https://www.provenexpert.com/de-de/immonation-gmbh-zirndorf/',
    logo: '/images/reviews/portals/provenexpert.svg',
    markOnly: true,
  },
  jacasa: {
    href: 'https://www.jacasa.de/immobilienmakler/immonation-zirndorf',
    logo: '/images/reviews/portals/jacasa.svg',
  },
  werkenntdenbesten: {
    href: 'https://www.werkenntdenbesten.de/e/108894981/immobilienmakler/zirndorf-mittelfranken/immonation-gmbh-bewertungen.html',
    logo: '/images/reviews/portals/werkenntdenbesten.png',
    markOnly: true,
  },
  trustlocal: {
    href: 'https://trustlocal.de/bayern/zirndorf/immobilienmakler/immonation-gmbh/',
    logo: '/images/reviews/portals/trustlocal.svg',
  },
  kennstdueinen: {
    href: 'https://www.kennstdueinen.de/immobilienmakler-zirndorf-immonation-gmbh-d2392865.html',
    logo: '/images/reviews/portals/kennstdueinen.png',
    markOnly: true,
  },
  elf880: {
    href: 'https://www.11880.com/branchenbuch/zirndorf-mittelfranken/131072469B108894981/immonation-gmbh.html',
    logo: '/images/reviews/portals/11880.svg',
  },
  golocal: {
    href: 'https://www.golocal.de/zirndorf/immobilien/immonation-gmbh-MJm4N/',
    logo: '/images/reviews/portals/golocal.svg',
    markOnly: true,
  },
} as const satisfies Record<string, ReviewPortalProfile>

export type ReviewPortalId = keyof typeof REVIEW_PORTAL_PROFILES

export const REVIEW_PORTAL_IDS = Object.keys(REVIEW_PORTAL_PROFILES) as ReviewPortalId[]

export function reviewPortalProfile(id: string): ReviewPortalProfile | undefined {
  return id in REVIEW_PORTAL_PROFILES ? REVIEW_PORTAL_PROFILES[id as ReviewPortalId] : undefined
}

export function listReviewPortalUrls() {
  return REVIEW_PORTAL_IDS.map((id) => REVIEW_PORTAL_PROFILES[id].href)
}

export const MAKLER_SIEGER_PROFILE = 'https://maklersieger.de/makler/immonation-gmbh'
export const MAKLER_SIEGEL_HOME = 'https://makler-siegel.de/'
export const PROVENEXPERT_PROFILE = REVIEW_PORTAL_PROFILES.provenexpert.href
