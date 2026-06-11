import Link from 'next/link'
import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo} aria-label="One Minute Event home">
            <span className={styles.logoMark}>✦</span>
            <span>One Minute Event</span>
          </Link>
          <p className={styles.tagline}>
            Your dream wedding, planned in minutes.
          </p>
        </div>

        {/* Links */}
        <nav className={styles.linksGrid} aria-label="Footer navigation">
          <div>
            <h6 className={styles.heading}>Platform</h6>
            <ul className={styles.list}>
              <li><Link href="/calculator">Budget Calculator</Link></li>
              <li><Link href="/dashboard">My Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h6 className={styles.heading}>Company</h6>
            <ul className={styles.list}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/disclaimer">Legal Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h6 className={styles.heading}>Account</h6>
            <ul className={styles.list}>
              <li><Link href="/login">Log in</Link></li>
              <li><Link href="/calculator">Get Started</Link></li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className="container">
          <p>© {new Date().getFullYear()} One Minute Event. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
