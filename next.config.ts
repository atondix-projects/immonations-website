import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  // 'mdx' is reserved for any future inline `.mdx` route files under src/app/.
  // Today MDX is rendered from content/ via next-mdx-remote, so this is
  // forward-looking only and adds no runtime cost.
  pageExtensions: ['ts', 'tsx', 'mdx'],
}

export default withNextIntl(nextConfig)
