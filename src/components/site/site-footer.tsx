import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

export async function SiteFooter() {
  const t = await getTranslations('Footer')
  const tSite = await getTranslations('Site')
  const year = new Date().getFullYear()

  return (
    <footer className="border-border/60 mt-24 border-t">
      <div className="container mx-auto flex flex-col gap-4 px-6 py-10 text-sm md:flex-row md:items-center md:justify-between">
        <p className="text-muted-foreground">
          © {year} {tSite('name')}. {t('rights')}
        </p>
        <nav className="flex gap-6">
          <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('imprint')}
          </Link>
          <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            {t('privacy')}
          </Link>
        </nav>
      </div>
    </footer>
  )
}
