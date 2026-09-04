import { createCatalogMetadata } from '@/lib/content/catalog-page-route'
import {
  createPrototypePage,
  generatePrototypeStaticParams,
} from '@/lib/content/prototype-page-route'
import { VideoContent } from '@/components/site/prototype-page-content'

export const generateMetadata = createCatalogMetadata('video')
export const generateStaticParams = generatePrototypeStaticParams
export default createPrototypePage('video', () => <VideoContent />, false)
