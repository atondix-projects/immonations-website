import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { SocialContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('social')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('social', (locale) => <SocialContent locale={locale} />, false)
