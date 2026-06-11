'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import styles from './SiteNav.module.css'

export default function SiteNav({ lang, dict }: { lang: string, dict: any }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const switchLanguage = (newLang: string) => {
    if (newLang === lang) return
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`)
    router.push(newPath || `/${newLang}`)
  }

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>

        {/* Logo */}
        <Link href={`/${lang}`} className={styles.logo} aria-label="One Minute Event — Home">
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>One Minute Event</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links} aria-label="Main navigation">
          <Link href={`/${lang}`} className={styles.link}>Home</Link>
          <Link href={`/${lang}/calculator`} className={styles.link}>{dict.calculator}</Link>
          <Link href={`/${lang}/about`} className={styles.link}>About</Link>
        </nav>

        {/* Desktop CTAs & Lang Toggle */}
        <div className={styles.actions}>
          <div style={{ display: 'flex', gap: '4px', marginRight: 'var(--space-4)', fontSize: '14px', fontWeight: 500 }}>
            <button onClick={() => switchLanguage('pt')} style={{ opacity: lang === 'pt' ? 1 : 0.5, cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}>PT</button>
            <span style={{ opacity: 0.2 }}>|</span>
            <button onClick={() => switchLanguage('en')} style={{ opacity: lang === 'en' ? 1 : 0.5, cursor: 'pointer', background: 'transparent', border: 'none', color: 'inherit' }}>EN</button>
          </div>
          <Link href={`/${lang}/login`} className="btn btn-outline btn-sm">{dict.login}</Link>
          <Link href={`/${lang}/calculator`} className="btn btn-primary btn-sm">{dict.getStarted}</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile navigation">
          <div style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)', justifyContent: 'center' }}>
            <button onClick={() => switchLanguage('pt')} style={{ opacity: lang === 'pt' ? 1 : 0.5, fontWeight: 600 }}>PT</button>
            <button onClick={() => switchLanguage('en')} style={{ opacity: lang === 'en' ? 1 : 0.5, fontWeight: 600 }}>EN</button>
          </div>
          <Link href={`/${lang}`}           className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href={`/${lang}/calculator`} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{dict.calculator}</Link>
          <Link href={`/${lang}/about`}      className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href={`/${lang}/login`}      className={styles.mobileLink} onClick={() => setMobileOpen(false)}>{dict.login}</Link>
          <Link href={`/${lang}/calculator`} className={`btn btn-primary w-full ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>
            {dict.getStarted} →
          </Link>
        </nav>
      )}
    </header>
  )
}
