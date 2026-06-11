import type { Metadata } from 'next'

type Props = {
  params: Promise<{ eventId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { eventId } = await params
  return {
    title: `Share Your Photos — Event ${eventId}`,
    description: 'Upload and share your photos from the celebration.',
  }
}

export default async function GuestPhotosPage({ params }: Props) {
  const { eventId } = await params

  return (
    <div
      style={{
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        paddingBottom: 'var(--space-20)',
        minHeight: '100dvh',
        background: 'var(--color-surface)',
      }}
    >
      <div className="container" style={{ maxWidth: 640 }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-10)' }}>
          <div className="gold-line" style={{ margin: '0 auto var(--space-5)' }} />
          <h1>Share Your Memories</h1>
          <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-4)' }}>
            Upload photos from event <strong>{eventId}</strong> and share the magic with the couple.
          </p>
        </div>

        <div
          className="glass-card"
          style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-muted)' }}
        >
          ✦ Guest photo upload interface — coming in Phase 4
        </div>
      </div>
    </div>
  )
}
