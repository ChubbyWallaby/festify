import type { Metadata } from 'next'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about One Minute Event — the team, mission, and story behind the platform.',
}

export default function AboutPage() {
  return (
    <>
      <section
        className="bg-gradient-hero"
        style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', paddingBottom: 'var(--space-20)' }}
      >
        <div className="container text-center" style={{ maxWidth: 720 }}>
          <div className="gold-line" style={{ margin: '0 auto var(--space-5)' }} />
          <h1>Built for modern couples</h1>
          <p style={{ marginTop: 'var(--space-5)', fontSize: 'var(--text-lg)', color: 'var(--color-muted)', lineHeight: 1.75 }}>
            One Minute Event was born from a simple frustration: wedding planning is needlessly complex, opaque, and time-consuming.
            We set out to fix that — combining technology, transparency, and a curated supplier network.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Our mission</h2>
          <p>
            We believe every couple deserves a stress-free, joyful planning experience. Our platform removes
            the guesswork by providing instant, itemised cost estimates based on real supplier data — so you can
            focus on what matters most: each other.
          </p>
          <div className="divider" />
          <h2 style={{ marginBottom: 'var(--space-6)' }}>Data privacy</h2>
          <p>
            Your personal information is never sold to third parties. We use your data exclusively to power
            your planning experience and connect you with relevant suppliers.
          </p>
        </div>
      </section>
    </>
  )
}
