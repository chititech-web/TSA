'use client';

import { useTranslations } from 'next-intl';
import { useRef, useEffect, useState } from 'react';
import { Chromatogram } from './Chromatogram';
import { GlobeGL } from './GlobeGL';
import { TypewriterBatch } from '@/components/effects/TypewriterBatch';

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

export function WhyBento() {
  const t = useTranslations('why_us');
  const sectionRef = useRef<HTMLElement>(null);
  const [leadIdx, setLeadIdx] = useState(0);
  const [leadPort, setLeadPort] = useState(ports[0]);
  const [scanned, setScanned] = useState(false);
  const [scanTop, setScanTop] = useState(45);

  // Laser scanner sweep
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

  // Lead time ticker
  useEffect(() => {
    const idx = leadIdx;
    const p = ports[idx];
    setLeadPort(p);
    const timer = setTimeout(() => setLeadIdx((idx + 1) % ports.length), 4000);
    return () => clearTimeout(timer);
  }, [leadIdx]);

  // Laser scanner
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setScanned(true);
          obs.disconnect();
        }
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
        <div className="text-center mb-10 opacity-100 transition-opacity duration-500">
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

        {/* Bento Grid */}
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
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">
                  REF ID
                </span>
                <span className="text-[0.75rem] font-mono">{batchData.ref}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">
                  PURITY
                </span>
                <span className="text-[0.75rem] font-mono text-[var(--color-primary)] font-bold">
                  {batchData.purity}
                </span>
              </div>
              <div className="h-[1px] bg-[var(--color-glass)] my-1" />
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">
                  1,8-CINEOLE
                </span>
                <span className="text-[0.75rem] font-mono">{batchData.cineole}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">
                  LIMONENE
                </span>
                <span className="text-[0.75rem] font-mono">{batchData.limonene}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[0.625rem] text-[var(--color-muted)] uppercase tracking-[0.06em]">
                  α-PINENE
                </span>
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
                <span className="font-mono text-[0.6875rem] tracking-[0.08em] text-[var(--color-muted)]">
                  {leadPort.port}
                </span>
                <span className="font-mono text-base font-bold text-[var(--color-primary)]">
                  {leadPort.days} days
                </span>
              </div>
              <div className="h-[1px] bg-[var(--color-glass)]" />
              <div className="font-mono text-[0.625rem] text-[var(--color-muted)]">
                ETA <span>{leadPort.eta}</span>
              </div>
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

        {/* ─── Certifications ─────────────────────────────── */}
        <div
          className={`glass rounded-2xl p-6 mt-6 transition-all duration-500 ${
            scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
          }`}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {t('certifications')}
            </span>
            <span className="w-[6px] h-[6px] rounded-full bg-[#4caf50] animate-pulse" />
          </div>
          <p className="text-xs text-[var(--color-muted)] mb-5 text-center">
            {t('cert_subtitle')}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'ISO 9001', sub: 'Quality Mgmt' },
              { label: 'GMP', sub: 'Good Practices' },
              { label: 'USDA Organic', sub: 'Certified Organic' },
              { label: 'IFRA', sub: 'Safe Use' },
              { label: 'Kosher', sub: 'Orthodox Union' },
              { label: 'Non-GMO', sub: 'Verified' },
            ].map((cert) => (
              <div
                key={cert.label}
                className="flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 group cursor-default min-w-[100px]"
              >
                <svg viewBox="0 0 40 40" className="w-8 h-8 text-[var(--color-primary)]" fill="currentColor">
                  <path d="M20 2L4 10v10c0 8.3 6.7 15 15 15s15-6.7 15-15V10L20 2z" opacity="0.15" />
                  <path d="M20 4L6 11v9c0 7.2 5.8 13 14 13s14-5.8 14-13v-9L20 4z" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M16 20l3 3 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-xs font-bold text-[var(--color-text-main)]">{cert.label}</span>
                <span className="text-[9px] text-[var(--color-muted)]">{cert.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Sourcing + R&D ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--color-primary)]">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('sourcing')}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              {t('sourcing_desc')}
            </p>
          </div>

          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--color-primary)]">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('rd')}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed">
              {t('rd_desc')}
            </p>
          </div>
        </div>

        {/* ─── Compliance + Support ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--color-primary)]">
                <path d="M9 12l2 2 4-4" />
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
              </svg>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('compliance')}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {t('compliance_items').split(' | ').map((item) => (
                <span
                  key={item}
                  className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-[rgba(191,111,0,0.08)] text-[var(--color-primary-light)] border border-[rgba(191,111,0,0.15)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`glass rounded-2xl p-6 transition-all duration-500 ${
              scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
            }`}
          >
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-[var(--color-primary)]">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
                {t('support')}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-2">
              {t('support_desc')}
            </p>
            <span className="text-[10px] text-[var(--color-primary)] font-semibold">
              {t('response_time')}
            </span>
          </div>
        </div>

        {/* ─── Testimonials ───────────────────────────────── */}
        <div
          className={`glass rounded-2xl p-6 mt-6 transition-all duration-500 ${
            scanned ? 'opacity-100 border-[var(--color-border)]' : 'opacity-70 border-[var(--color-border)]'
          }`}
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
              {t('testimonials')}
            </span>
          </div>
          <TestimonialCarousel t={t} />
        </div>
      </div>
    </section>
  );
}

function TestimonialCarousel({ t }: { t: (key: string) => string }) {
  const [idx, setIdx] = useState(0);
  const testimonials = [
    { text: t('testimonial_1'), attr: t('testimonial_1_attr') },
    { text: t('testimonial_2'), attr: t('testimonial_2_attr') },
    { text: t('testimonial_3'), attr: t('testimonial_3_attr') },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIdx((idx + 1) % testimonials.length), 5000);
    return () => clearTimeout(timer);
  }, [idx, testimonials.length]);

  const tst = testimonials[idx];

  return (
    <div className="text-center">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-auto mb-3 text-[var(--color-primary)] opacity-40">
        <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
      </svg>
      <p className="text-sm text-[var(--color-text-main)] italic leading-relaxed max-w-[600px] mx-auto mb-3">
        &ldquo;{tst.text}&rdquo;
      </p>
      <p className="text-xs text-[var(--color-muted)] mb-4">
        — {tst.attr}
      </p>
      <div className="flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === idx ? 'bg-[var(--color-primary)] w-5' : 'bg-[var(--color-border)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
