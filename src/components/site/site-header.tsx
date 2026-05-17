import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from './locale-switcher'

export async function SiteHeader() {
  const t = await getTranslations('Nav')
  const tSite = await getTranslations('Site')

  return (
    <header className="border-border/60 bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="text-base font-semibold tracking-tight">
          {tSite('name')}
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('services')}
          </Link>
          <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('blog')}
          </Link>
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('about')}
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('contact')}
          </Link>
        </nav>
        <LocaleSwitcher />
      </div>
    </header>
  )
}
