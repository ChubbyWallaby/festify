import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'One Minute Event administrator workstation.',
}

export default function AdminPage() {
  return (
    <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-10))', minHeight: '100dvh', background: 'var(--color-surface)' }}>
      <div className="container">
        <h1 style={{ marginBottom: 'var(--space-2)' }}>Admin Workstation</h1>
        <p style={{ color: 'var(--color-muted)', marginBottom: 'var(--space-10)' }}>
          Manage submissions, clients, and suppliers.
        </p>

        <div
          className="glass-card"
          style={{ padding: 'var(--space-12)', textAlign: 'center', color: 'var(--color-muted)' }}
        >
          ✦ Admin queue and panels — coming in Phase 5
        </div>
      </div>
    </div>
  )
}
