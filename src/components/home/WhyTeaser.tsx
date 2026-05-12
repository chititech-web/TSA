'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import { Chromatogram } from './Chromatogram';
import { GlobeGL } from './GlobeGL';
import { TypewriterBatch } from '@/components/effects/TypewriterBatch';
import { ArrowRight } from 'lucide-react';

const ports = [
  { port: 'ROTTERDAM', days: 14, eta: 'Jun 2–8' },
  { port: 'NEW YORK', days: 10, eta: 'May 28–Jun 2' },
  { port: 'SINGAPORE', days: 18, eta: 'Jun 6–12' },
  { port: 'DUBAI', days: 7, eta: 'May 25–28' },
  { port: 'SYDNEY', days: 24, eta: 'Jun 12–18' },
];

const batchData = {
  ref: 'TSA-24-001',
  purity: '99.8%',
  cineole: '72.3%',
  limonene: '12.1%',
  alphaPinene: '8.4%',
};

export function WhyTeaser() {
  const t = useTranslations('why_us');
  const sectionRef = useRef<HTMLElement>(null);
  const [leadIdx, setLeadIdx] = useState(0);
  const [leadPort, setLeadPort] = useState(ports[0]);
  const [scanned, setScanned] = useState(false);
  const [scanTop, setScanTop] = useState(45);

  useEffect(() => {
    if (!scanned) return;
    let start: number | null = null;
    const dur = 8000;
    function tick(ts: number) {
      if (!start) start = ts;
      const p = ((ts - start) % dur) / dur;
      const y = 5 + Math.sin(p * Math.PI) * 90;
      setScanTop(y);
      raf = requestAnimationFrame(tick);
    }
    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scanned]);

  useEffect(() => {
    const idx = leadIdx;
    const p = ports[idx];
    setLeadPort(p);
    const timer = setTimeout(() => setLeadIdx((idx + 1) % ports.length), 4000);
    return () => clearTimeout(timer);
  }, [leadIdx]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setScanned(true); obs.disconnect(); }
      },
      { threshold: 0.3 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative py-20 px-6 overflow-hidden"
    >
      {/* Blueprint background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 39px, var(--color-border) 39px, var(--color-border) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, var(--color-border) 39px, var(--color-border) 40px)',
        }}
      />

      {/* Laser scanner */}
      <div
        className="absolute left-[-5%] right-[-5%] z-[2] pointer-events-none h-[2px]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, var(--color-primary) 15%, var(--color-brand-red) 50%, var(--color-primary) 85%, transparent 100%)',
          boxShadow:
            '0 0 30px rgba(255,184,115,0.5), 0 0 80px rgba(240,66,27,0.25)',
          top: `${scanTop}%`,
          opacity: scanned ? 1 : 0,
          transition: 'opacity 0.6s',
        }}
      />

      <div className="max-w-[1200px] mx-auto relative z-[1]">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--color-primary)] mb-2">
            {t('kicker')}
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-[clamp(1.6rem,3vw,2.2rem)] mb-3">
            {t('title')}
          </h2>
          <p className="text-sm text-[var(--color-muted)] max-w-[640px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Compact Bento Grid — same as original 5-box */}
        <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-4 max-md:grid-cols-1">
          {/* Chromatogram */}
          <div
            className={`row-span-2 glass rounded-2xl overflow-hidden flex flex-col transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 px-4 py-1.5 border-b border-[var(--color-border)]">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('chromatogram')}
              </span>
              <span className="w-[5px] h-[5px] rounded-full bg-[#4caf50] animate-pulse" />
            </div>
            <Chromatogram />
          </div>

          {/* Batch Transparency */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('batch_transparency')}
              </span>
              <span className="w-[6px] h-[6px] rounded-full bg-[#4caf50] animate-pulse" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">REF ID</span>
                <span className="text-[0.75rem] font-mono">{batchData.ref}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">PURITY</span>
                <span className="text-[0.75rem] font-mono text-[var(--color-primary)] font-bold">{batchData.purity}</span>
              </div>
              <div className="h-[1px] bg-[var(--color-glass)] my-1" />
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">1,8-CINEOLE</span>
                <span className="text-[0.75rem] font-mono">{batchData.cineole}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">LIMONENE</span>
                <span className="text-[0.75rem] font-mono">{batchData.limonene}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">α-PINENE</span>
                <span className="text-[0.75rem] font-mono">{batchData.alphaPinene}</span>
              </div>
              <div className="h-[1px] bg-[var(--color-glass)] my-1" />
              <div className="flex items-center gap-2 text-[0.625rem] text-[var(--color-muted)]">
                <span className="w-[4px] h-[4px] rounded-full bg-[#4caf50] animate-pulse" />
                <span>GC/MS Verified · 2 mins ago</span>
              </div>
            </div>
          </div>

          {/* Lead Time */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('lead_time')}
              </span>
            </div>
            <div className="flex justify-center mb-3">
              <GlobeGL activePort={leadIdx} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--color-muted)]">{leadPort.port}</span>
                <span className="font-mono text-base font-bold text-[var(--color-primary)]">{leadPort.days} days</span>
              </div>
              <div className="h-[1px] bg-[var(--color-glass)]" />
              <div className="font-mono text-[0.625rem] text-[var(--color-muted)]">ETA <span>{leadPort.eta}</span></div>
            </div>
          </div>

          {/* Live Batch Specs */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('batch_specs')}
              </span>
            </div>
            <TypewriterBatch />
          </div>

          {/* Technical Concierge */}
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('concierge')}
              </span>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[130px] h-[130px] rounded-full overflow-hidden border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:shadow-[0_0_30px_rgba(255,184,115,0.15)] transition-all duration-300 group cursor-pointer">
                <video
                  src="https://assets.mixkit.co/videos/4719/4719-720.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[rgba(0,0,0,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[0.625rem] text-white">Technical</span>
                  <span className="font-mono text-[0.625rem] text-white">Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA to full page */}
        <div className="text-center mt-8">
          <a
            href="/en/why-us"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-main)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all group"
          >
            Full Technical Profile
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
