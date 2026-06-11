import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Dashboard',
  description: 'Manage every detail of your wedding from one personalised planning hub.',
}

export default function DashboardPage() {
  return (
    <div style={{ paddingTop: 'var(--nav-height)', minHeight: '100dvh', display: 'flex' }}>
      {/* Sidebar placeholder */}
      <aside
        style={{
          width: 'var(--sidebar-width)',
          flexShrink: 0,
          borderRight: '1px solid var(--color-border-soft)',
          padding: 'var(--space-8) var(--space-6)',
          background: 'var(--color-white)',
        }}
      >
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 'var(--space-6)' }}>
          Dashboard
        </p>
        <nav>
          {['Overview', 'Budget', 'Guests', 'Seating', 'Timeline', 'Photos'].map((item) => (
            <div
              key={item}
              style={{
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--color-muted)',
                fontSize: 'var(--text-sm)',
                fontWeight: 500,
                cursor: 'pointer',
                marginBottom: 'var(--space-1)',
              }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 'var(--space-10)', background: 'var(--color-surface)' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
          Your Event
        </h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-10)' }}>
          Welcome to your planning hub. Widgets and tools are coming in Phase 4.
        </p>

        <div
          className="glass-card"
          style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-muted)' }}
        >
          ✦ Dashboard widgets — coming in Phase 4
        </div>
      </main>
    </div>
  )
}
