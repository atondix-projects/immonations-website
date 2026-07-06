import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * next-intl middleware with the full routing config: `pathnames` drives the
 * localized-URL rewrites (/de/immobilie-kaufen -> /buy, /de/impressum -> /imprint, ...) and
 * redirects internal paths to their canonical localized form per locale.
 */
const proxy = createMiddleware(routing)

export default proxy

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
