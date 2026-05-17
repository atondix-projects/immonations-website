import { hasLocale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
import { routing } from '@/i18n/routing'
import { Link } from '@/i18n/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BlurFade } from '@/components/ui/blur-fade'
import { Marquee } from '@/components/ui/marquee'
import { NumberTicker } from '@/components/ui/number-ticker'
import { ShimmerButton } from '@/components/ui/shimmer-button'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

type FeatureCopy = { title: string; body: string }
type StatCopy = { value: number; label: string }

const PARTNERS = [
  'Handelsblatt',
  'Immobilienzeitung',
  'Süddeutsche',
  'WirtschaftsWoche',
  'Bloomberg',
  'JLL Research',
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)

  const t = await getTranslations('Home')
  const features = t.raw('features.items') as FeatureCopy[]
  const stats = t.raw('stats.items') as StatCopy[]

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="bg-foreground/[0.02] pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div className="container mx-auto px-6 py-24 md:py-32">
          <BlurFade delay={0.05}>
            <p className="text-muted-foreground text-xs uppercase tracking-[0.25em]">
              {t('hero.eyebrow')}
            </p>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight md:text-6xl lg:text-7xl">
              {t('hero.title')}
            </h1>
          </BlurFade>
          <BlurFade delay={0.25}>
            <p className="text-muted-foreground mt-6 max-w-2xl text-balance text-lg leading-relaxed md:text-xl">
              {t('hero.subtitle')}
            </p>
          </BlurFade>
          <BlurFade delay={0.35}>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/contact">
                <ShimmerButton className="px-6 py-3 text-sm font-medium">
                  {t('hero.ctaPrimary')}
                </ShimmerButton>
              </Link>
              <Link
                href="/services"
                className="border-border hover:bg-foreground/[0.04] inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              >
                {t('hero.ctaSecondary')}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-border/60 border-y bg-muted/30">
        <div className="container mx-auto px-6 py-10">
          <p className="text-muted-foreground mb-4 text-center text-xs uppercase tracking-[0.25em]">
            {t('trust.title')}
          </p>
          <Marquee pauseOnHover className="[--duration:30s]">
            {PARTNERS.map((p) => (
              <span
                key={p}
                className="text-muted-foreground/70 px-8 text-xl font-semibold tracking-tight"
              >
                {p}
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-24">
        <BlurFade>
          <header className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground mt-3 text-lg">{t('features.subtitle')}</p>
          </header>
        </BlurFade>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <BlurFade key={feature.title} delay={0.1 + idx * 0.08}>
              <Card className="h-full">
                <CardHeader>
                  <p className="text-muted-foreground text-xs font-medium tabular-nums">
                    0{idx + 1}
                  </p>
                  <CardTitle className="mt-2 text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{feature.body}</p>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-border/60 border-t">
        <div className="container mx-auto px-6 py-20">
          <h2 className="text-muted-foreground mb-12 text-xs uppercase tracking-[0.25em]">
            {t('stats.title')}
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-2">
                <span className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <NumberTicker value={stat.value} />
                </span>
                <span className="text-muted-foreground text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
