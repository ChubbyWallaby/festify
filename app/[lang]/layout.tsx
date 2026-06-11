import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import '../globals.css'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'
import { getDictionary, Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: {
    default: 'One Minute Event — Wedding Planning in Minutes',
    template: '%s | One Minute Event',
  },
  description:
    'Plan your dream wedding in minutes, not months. Instant budgeting, personalized event management, and trusted supplier network.',
  openGraph: {
    type: 'website',
    siteName: 'One Minute Event',
  },
}

export default async function RootLayout(props: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang as Locale)

  return (
    <html lang={lang || 'pt'}>
      <body>
        <SiteNav lang={lang} dict={dict.nav} />
        <main style={{ minHeight: 'calc(100dvh - var(--nav-height))' }}>
          {props.children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
