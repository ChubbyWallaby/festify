import type { Metadata } from 'next'
import Link from 'next/link'
import styles from './page.module.css'
import { getDictionary, Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'One Minute Event — Wedding Planning in Minutes',
  description:
    'Plan your dream wedding in minutes, not months. Instant budget estimates, trusted suppliers, and a full suite of personalized planning tools.',
}

export default async function HomePage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang as Locale)

  const FEATURES = [
    {
      icon: '⏱',
      title: dict.home.feature1_title,
      description: dict.home.feature1_desc,
    },
    {
      icon: '💐',
      title: dict.home.feature2_title,
      description: dict.home.feature2_desc,
    },
    {
      icon: '📋',
      title: dict.home.feature3_title,
      description: dict.home.feature3_desc,
    },
    {
      icon: '🔒',
      title: dict.home.feature4_title,
      description: dict.home.feature4_desc,
    },
  ]

  const STEPS = [
    { number: '01', title: dict.home.step1_title, body: dict.home.step1_desc },
    { number: '02', title: dict.home.step2_title, body: dict.home.step2_desc },
    { number: '03', title: dict.home.step3_title, body: dict.home.step3_desc },
  ]

  return (
    <>
      {/* Hero */}
      <section className={`bg-gradient-hero ${styles.hero}`} aria-labelledby="hero-heading">
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroBadge}>
            <span className="badge badge-gold">{dict.home.badge}</span>
          </div>
          <h1 id="hero-heading" className={styles.heroHeading}>
            {dict.home.title1}<br />
            <em>{dict.home.title2}</em>
          </h1>
          <p className={styles.heroSub}>
            {dict.home.subtitle}
          </p>
          <div className={styles.heroCtas}>
            <Link href={`/${lang}/calculator`} className="btn btn-primary btn-lg" id="hero-cta-start">
              {dict.home.cta1}
            </Link>
            <Link href={`/${lang}/about`} className="btn btn-outline btn-lg" id="hero-cta-learn">
              {dict.home.cta2}
            </Link>
          </div>
          <p className={styles.heroNote}>{dict.home.note}</p>
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
            <h2 id="features-heading">{dict.home.features_title}</h2>
            <p style={{ marginTop: 'var(--space-4)', maxWidth: 560, margin: 'var(--space-4) auto 0' }}>
              {dict.home.features_subtitle}
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
            <h2 id="how-heading">{dict.home.how_title}</h2>
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
              {dict.home.banner_title}
            </h2>
            <p className={styles.ctaSub}>
              {dict.home.banner_subtitle}
            </p>
            <Link href={`/${lang}/calculator`} className="btn btn-primary btn-lg" id="cta-banner-btn">
              {dict.home.banner_cta}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
