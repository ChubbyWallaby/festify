import type { Metadata } from 'next'
import CalculatorForm from '@/components/calculator/CalculatorForm'
import { getDictionary, Locale } from '@/lib/i18n'

export const metadata: Metadata = {
  title: 'Budget Calculator',
  description: 'Get your personalised wedding budget estimate in under 60 seconds.',
}

export default async function CalculatorPage(props: { params: Promise<{ lang: string }> }) {
  const params = await props.params;
  const { lang } = params;
  const dict = await getDictionary(lang as Locale)

  return (
    <div
      className="bg-gradient-hero"
      style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))', minHeight: '100dvh' }}
    >
      <div className="container" style={{ maxWidth: 760, paddingBottom: 'var(--space-20)' }}>
        <div className="text-center" style={{ marginBottom: 'var(--space-12)' }}>
          <span className="badge badge-gold">{dict.calculator.badge}</span>
          <h1 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>
            {dict.calculator.title}
          </h1>
          <p style={{ color: 'var(--color-muted)', maxWidth: 520, margin: '0 auto' }}>
            {dict.calculator.subtitle}
          </p>
        </div>

        <CalculatorForm dict={dict.calculator} />
      </div>
    </div>
  )
}
