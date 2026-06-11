import type { Metadata } from 'next'
import CalculatorForm from '@/components/calculator/CalculatorForm'

export const metadata: Metadata = {
  title: 'Budget Calculator',
  description: 'Get your personalised wedding budget estimate in under 60 seconds.',
}

export default function CalculatorPage() {
  return (
    <div
      className="bg-gradient-hero"
      style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))', minHeight: '100dvh' }}
    >
      <div className="container" style={{ maxWidth: 760, paddingBottom: 'var(--space-20)' }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="badge badge-gold">Interactive Calculator</span>
          <h1 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
            Let&apos;s plan your perfect wedding
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: 520, margin: '0 auto' }}>
            Answer a few quick questions and we&apos;ll generate a detailed, personalised budget instantly.
          </p>
        </div>

        <CalculatorForm />
      </div>
    </div>
  )
}
