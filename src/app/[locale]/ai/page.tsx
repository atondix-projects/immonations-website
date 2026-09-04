import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { AiContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('ai')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('ai', (locale) => <AiContent locale={locale} />, false)
