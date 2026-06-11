import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'One Minute Event — Wedding Planning in Minutes',
  description:
    'Plan your dream wedding in minutes, not months. Instant budget estimates, trusted suppliers, and a full suite of personalized planning tools.',
}

const FEATURES = [
  {
    icon: '⏱',
    title: 'Budget in 60 Seconds',
    description: 'Answer a few simple questions and receive a detailed, itemised cost estimate instantly.',
  },
  {
    icon: '💐',
    title: 'Curated Supplier Network',
    description: 'Access pre-vetted venues, caterers, florists, and entertainment all in one place.',
  },
  {
    icon: '📋',
    title: 'Full Planning Suite',
    description: 'Guest lists, seating charts, day-of timeline, shared photo albums — everything you need.',
  },
  {
    icon: '🔒',
    title: 'Privacy First',
    description: 'Your data stays yours. We never sell personal information to third parties.',
  },
]

const STEPS = [
  { number: '01', title: 'Tell us about your vision', body: 'Share your location, guest count, and dream style preferences.' },
  { number: '02', title: 'Receive your instant estimate', body: 'See a full cost breakdown and supplier recommendations in seconds.' },
  { number: '03', title: 'Personalise your planning space', body: 'Use your private dashboard to manage every detail from RSVP to seating.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className={`bg-gradient-hero ${styles.hero}`} aria-labelledby="hero-heading">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className="badge badge-gold">✦ Wedding Planning, Reimagined</span>
          </div>
          <h1 id="hero-heading" className={styles.heroHeading}>
            Your perfect wedding,<br />
            <em>planned in minutes</em>
          </h1>
          <p className={styles.heroSub}>
            Stop drowning in spreadsheets. Get an instant budget estimate, connect with trusted suppliers,
            and manage every detail from one beautiful dashboard.
          </p>
          <div className={styles.heroCtas}>
            <Link href="/calculator" className="btn btn-primary btn-lg" id="hero-cta-start">
              Start Planning Free →
            </Link>
            <Link href="/about" className="btn btn-outline btn-lg" id="hero-cta-learn">
              Learn More
            </Link>
          </div>
          <p className={styles.heroNote}>No credit card required · Free forever for couples</p>
        </div>
        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.decorCircle1} />
          <div className={styles.decorCircle2} />
        </div>
      </section>

      {/* Features */}
      <section className={`section ${styles.features}`} aria-labelledby="features-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="gold-line" style={{ margin: '0 auto var(--space-4)' }} />
            <h2 id="features-heading">Everything you need, nothing you don&apos;t</h2>
            <p style={{ marginTop: 'var(--space-4)', maxWidth: 560, margin: 'var(--space-4) auto 0' }}>
              A modern platform built specifically for today&apos;s couples who value efficiency, transparency, and beauty.
            </p>
          </div>

          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <article key={f.title} className={`glass-card ${styles.featureCard}`}>
                <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className={`section ${styles.howItWorks}`} aria-labelledby="how-heading">
        <div className="container">
          <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
            <div className="gold-line" style={{ margin: '0 auto var(--space-4)' }} />
            <h2 id="how-heading">How it works</h2>
          </div>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div key={s.number} className={styles.step}>
                <div className={styles.stepNumber} aria-hidden="true">{s.number}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{s.title}</h3>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
                {i < STEPS.length - 1 && <div className={styles.stepConnector} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className={`section ${styles.ctaBanner}`} aria-labelledby="cta-heading">
        <div className="container">
          <div className={`bg-gradient-dark ${styles.ctaInner}`}>
            <h2 id="cta-heading" className={styles.ctaHeading}>
              Ready to start planning?
            </h2>
            <p className={styles.ctaSub}>
              Join hundreds of couples who planned their perfect day with One Minute Event.
            </p>
            <Link href="/calculator" className="btn btn-primary btn-lg" id="cta-banner-btn">
              Get My Free Budget →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
