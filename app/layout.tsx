import type { Metadata } from 'next'
import './globals.css'
import SiteNav from '@/components/layout/SiteNav'
import SiteFooter from '@/components/layout/SiteFooter'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main style={{ minHeight: 'calc(100dvh - var(--nav-height))' }}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}
