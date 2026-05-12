'use client';

import { useState, useEffect, useRef } from 'react';

const datasets = [
  { id: 'TSA-24-001', purity: '99.8%', c1: '1,8-Cineole 72.3%', c2: 'Limonene 12.1%', c3: 'α-Pinene 8.4%', c4: 'Camphor 4.2%', c5: 'Bornyl Acetate 1.9%' },
  { id: 'TSA-24-042', purity: '100%', c1: 'Linalool 35.2%', c2: 'Linalyl Acetate 40.1%', c3: 'β-Caryophyllene 5.8%', c4: 'Lavandulol 3.2%', c5: 'Terpinen-4-ol 2.1%' },
  { id: 'TSA-24-088', purity: '99.5%', c1: 'Menthol 45.0%', c2: 'Menthone 20.3%', c3: 'Menthofuran 6.7%', c4: '1,8-Cineole 5.4%', c5: 'Pulegone 2.8%' },
  { id: 'TSA-24-103', purity: '99.9%', c1: 'Terpinen-4-ol 42.1%', c2: 'γ-Terpinene 21.5%', c3: 'α-Terpinene 10.2%', c4: 'Terpinolene 4.8%', c5: 'α-Pinene 3.6%' },
  { id: 'TSA-24-056', purity: '99.7%', c1: 'α-Pinene 58.3%', c2: 'Camphene 12.1%', c3: 'β-Pinene 8.7%', c4: 'Limonene 5.4%', c5: 'Bornyl Acetate 4.1%' },
];

const lines = [
  (d: typeof datasets[0]) => `batch --spec ${d.id}`,
  (d: typeof datasets[0]) => `GC/MS ${d.purity} · ${d.c1}`,
  (d: typeof datasets[0]) => d.c2,
  (d: typeof datasets[0]) => d.c3,
  (d: typeof datasets[0]) => d.c4,
];

export function TypewriterBatch() {
  const [idx, setIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = datasets[idx];
    const currentLine = lines[lineIdx](data);
    const maxChars = currentLine.length;

    const timer = setTimeout(() => {
      if (direction === 1) {
        if (charCount < maxChars) {
          setCharCount((c) => c + 1);
        } else {
          setTimeout(() => setDirection(-1), 1500);
        }
      } else {
        if (charCount > 0) {
          setCharCount((c) => c - 1);
        } else {
          if (lineIdx < lines.length - 1) {
            setLineIdx((l) => l + 1);
            setDirection(1);
          } else {
            setLineIdx(0);
            setIdx((i) => (i + 1) % datasets.length);
            setDirection(1);
          }
        }
      }
    }, direction === 1 ? 35 : 18);

    return () => clearTimeout(timer);
  }, [idx, lineIdx, charCount, direction]);

  const data = datasets[idx];

  return (
    <div ref={elRef} className="text-[0.75rem] text-[var(--color-muted)] font-mono leading-relaxed min-h-[6rem]">
      <span style={{ color: 'var(--color-primary)' }}>$</span>{' '}
      {lines.map((fn, li) => {
        if (li < lineIdx) {
          return <span key={li} className="block"><span style={{ color: 'var(--color-primary)' }}>$</span> {fn(data)}</span>;
        }
        if (li === lineIdx) {
          const text = fn(data);
          const visible = text.slice(0, charCount);
          const cursor = direction === 1 || charCount > 0;
          return (
            <span key={li} className="block">
              <span style={{ color: 'var(--color-primary)' }}>$</span> {visible}
              {cursor && <span className="inline-block w-[2px] h-[0.85em] bg-[var(--color-primary)] ml-0.5 animate-pulse align-middle" />}
            </span>
          );
        }
        return null;
      })}
    </div>
  );
}
