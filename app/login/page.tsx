import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Access your One Minute Event wedding planning dashboard.',
}

export default function LoginPage() {
  return (
    <div
      className="bg-gradient-hero"
      style={{
        paddingTop: 'calc(var(--nav-height) + var(--space-16))',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: 440 }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-8)' }}>
          <h1>Welcome back</h1>
          <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-3)' }}>
            Log in to your planning dashboard.
          </p>
        </div>

        {/* Auth form will be wired in Phase 3 */}
        <div className="glass-card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
          <p className="text-muted" style={{ fontStyle: 'italic' }}>
            ✦ Firebase Auth — coming in Phase 3
          </p>
        </div>
      </div>
    </div>
  )
}
