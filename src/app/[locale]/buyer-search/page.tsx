import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { BuyerSearchContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('buyer-search')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('buyer-search', (locale) => (
  <BuyerSearchContent locale={locale} />
))
