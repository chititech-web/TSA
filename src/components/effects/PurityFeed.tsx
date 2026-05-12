'use client';

import { useState, useEffect, useRef } from 'react';
import { getAllProducts } from '@/data/products';

const oilNames = getAllProducts().map((p) => p.name);
const purities = ['99.8%', '100%', '99.5%', '99.9%', '99.7%', '99.6%'];

interface FeedEntry {
  batchId: string;
  oil: string;
  purity: string;
  time: string;
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
}

export function PurityFeed() {
  const [entries, setEntries] = useState<FeedEntry[]>([]);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial: FeedEntry[] = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const t = new Date(now);
      t.setMinutes(t.getMinutes() - (5 - i) * 3);
      initial.push({
        batchId: 'TSA-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
        oil: oilNames[Math.floor(Math.random() * oilNames.length)],
        purity: purities[Math.floor(Math.random() * purities.length)],
        time: formatTime(t),
      });
    }
    setEntries(initial);
  }, []);

  useEffect(() => {
    if (entries.length === 0) return;
    const id = setInterval(() => {
      setEntries((prev) => {
        const next: FeedEntry = {
          batchId: 'TSA-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
          oil: oilNames[Math.floor(Math.random() * oilNames.length)],
          purity: purities[Math.floor(Math.random() * purities.length)],
          time: formatTime(new Date()),
        };
        const updated = [next, ...prev].slice(0, 10);
        return updated;
      });
      tickerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10000);
    return () => clearInterval(id);
  }, [entries.length]);

  if (entries.length === 0) return null;

  return (
    <div className="mx-auto mt-6 max-w-[480px] w-full glass rounded-2xl py-4 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="flex items-center gap-1.5 text-[0.625rem] font-bold uppercase tracking-[0.06em] text-[var(--color-accent-green)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
          LIVE PURITY FEED
        </span>
      </div>
      <div ref={tickerRef} className="max-h-[180px] overflow-y-auto scrollbar-thin">
        <div className="flex flex-col gap-1">
          {entries.map((e, i) => (
            <div
              key={e.batchId + i}
              className="flex items-center justify-between gap-3 text-xs animate-[fadeSlide_0.3s_ease-out]"
            >
              <span className="font-mono text-[var(--color-text-main)] font-semibold truncate min-w-0 flex-1">
                {e.oil}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-muted)] shrink-0">
                {e.batchId}
              </span>
              <span className="text-[10px] font-bold text-[var(--color-accent-green)] shrink-0">
                GC/MS {e.purity}
              </span>
              <span className="font-mono text-[10px] text-[var(--color-muted)] shrink-0">
                {e.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
