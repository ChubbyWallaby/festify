'use client';

import { useMemo, useEffect, useState } from 'react';

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

export default function ReviewChart({ data }: DonutChartProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const total = useMemo(() => data.reduce((acc, curr) => acc + curr.value, 0), [data]);

  const segments = useMemo(() => {
    let currentAngle = -90; // Start at top
    return data.map((item) => {
      if (item.value === 0) return null;
      const percentage = (item.value / total) * 100;
      const angle = (percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const r = 40;
      const cx = 50;
      const cy = 50;

      // if almost 100%, draw full circle to avoid SVG arc bugs
      if (percentage >= 99.9) {
        return (
          <circle key={item.label} cx={cx} cy={cy} r={r} fill="none" stroke={item.color} strokeWidth="12" 
             style={{
               strokeDasharray: '252',
               strokeDashoffset: mounted ? '0' : '252',
               transition: 'stroke-dashoffset 1s ease-out'
             }}
          />
        );
      }

      const start = polarToCartesian(cx, cy, r, startAngle);
      const end = polarToCartesian(cx, cy, r, endAngle);
      const largeArcFlag = angle > 180 ? 1 : 0;

      const d = [
        'M', start.x, start.y,
        'A', r, r, 0, largeArcFlag, 1, end.x, end.y
      ].join(' ');

      // Approximate path length
      const pathLength = (percentage / 100) * (2 * Math.PI * r);

      return (
        <path
          key={item.label}
          d={d}
          fill="none"
          stroke={item.color}
          strokeWidth="12"
          style={{
             strokeDasharray: `${pathLength} 300`,
             strokeDashoffset: mounted ? '0' : `${pathLength}`,
             transition: 'stroke-dashoffset 1s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />
      );
    }).filter(Boolean);
  }, [data, total, mounted]);

  if (total === 0) return <p className="text-muted">No cost generated. Please make selections.</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)' }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', maxWidth: '240px', overflow: 'visible' }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border-soft)" strokeWidth="12" />
        {segments}
        <text x="50" y="50" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '0.9rem', fontFamily: 'var(--font-sans)', fontWeight: 600, fill: 'var(--color-dark)' }}>
          €{total.toLocaleString()}
        </text>
      </svg>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-3)', width: '100%' }}>
        {data.filter(d => d.value > 0).map(d => (
          <div key={d.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-2)', fontSize: 'var(--text-xs)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: d.color, display: 'inline-block' }} />
              <span style={{ color: 'var(--color-muted)' }}>{d.label}</span>
            </div>
            <span style={{ fontWeight: 600 }}>€{d.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
