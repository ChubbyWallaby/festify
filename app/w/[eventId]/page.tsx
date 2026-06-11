import type { Metadata } from 'next'

type Props = {
  params: Promise<{ eventId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params
  return {
    title: `Wedding Event — ${eventId}`,
    description: 'Join us to celebrate our special day. RSVP, view our love story, and explore event details.',
  }
}

export default async function GuestPortalPage({ params }: Props) {
  const { eventId } = await params

  return (
    <>
      {/* Public hero — SSR for fast LCP & SEO */}
      <section
        className="bg-gradient-hero"
        style={{
          minHeight: '80dvh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: 'calc(var(--nav-height) + var(--space-16))',
          paddingBottom: 'var(--space-20)',
        }}
      >
        <div className="container text-center">
          <div className="gold-line" style={{ margin: '0 auto var(--space-5)' }} />
          <h1>We&apos;re Getting Married!</h1>
          <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-4)', fontSize: 'var(--text-lg)' }}>
            Event ID: <code style={{ fontFamily: 'monospace' }}>{eventId}</code>
          </p>
          <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-4)' }}>
            RSVP form, love story, and event details will live here.
          </p>
        </div>
      </section>

      {/* Sections: Love Story, Details, Gallery, RSVP — Phase 4 */}
      <section className="section">
        <div className="container">
          <div
            className="glass-card"
            style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-muted)' }}
          >
            ✦ Guest portal sections (Love Story, RSVP, Gallery) — coming in Phase 4
          </div>
        </div>
      </section>
    </>
  )
}
