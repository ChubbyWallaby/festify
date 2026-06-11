'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from './SiteNav.module.css'

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <div className={styles.inner}>

        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="One Minute Event — Home">
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>One Minute Event</span>
        </Link>

        {/* Desktop links */}
        <nav className={styles.links} aria-label="Main navigation">
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/calculator" className={styles.link}>Get Budget</Link>
          <Link href="/about" className={styles.link}>About</Link>
        </nav>

        {/* Desktop CTAs */}
        <div className={styles.actions}>
          <Link href="/login" className="btn btn-outline btn-sm">Log in</Link>
          <Link href="/calculator" className="btn btn-primary btn-sm">Start Planning</Link>
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
          <Link href="/"           className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/calculator" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Get Budget</Link>
          <Link href="/about"      className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/login"      className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Log in</Link>
          <Link href="/calculator" className={`btn btn-primary w-full ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>
            Start Planning →
          </Link>
        </nav>
      )}
    </header>
  )
}
