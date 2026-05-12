'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useHeat } from '@/components/effects/useHeat';
import { useSound } from '@/contexts/sound';

function Clock({ label, timeZone, compact }: { label: string; timeZone: string; compact?: boolean }) {
  const [time, setTime] = useState('--:--');
  useEffect(() => {
    function tick() {
      setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <span className="font-mono text-[11px] text-[var(--color-muted)]">{time}</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--color-primary)]">{label}</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] min-w-[2rem]">{label}</span>
      <span className="font-mono text-sm text-[var(--color-text-main)]">{time}</span>
    </div>
  );
}

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tc = useTranslations('clocks');
  const { heat, setHeat } = useHeat();
  const watermarkOpacity = Math.min(0.12, heat / 600);
  const { soundOn, setSoundOn } = useSound();

  return (
    <footer
      className="relative z-10 border-t border-[var(--color-border)] px-6 pt-20 pb-6 mt-auto"
      style={{
        background: 'var(--footer-bg, var(--color-bg-base))',
        filter: 'var(--heat-haze, none)',
      }}
    >
      <style>{`@keyframes heatPulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.4; transform: scale(0.85); } }`}</style>
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.03]">
        <filter id="heatHaze">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="6" xChannelSelector="R" yChannelSelector="B" />
        </filter>
        <rect width="100%" height="100%" filter="url(#heatHaze)" fill="transparent" />
      </svg>
      <div className="max-w-[1400px] mx-auto relative z-[2]">
        {/* Heat slider */}
        <div
          className="mb-10 p-8 rounded-2xl border transition-all duration-300"
          style={{
            borderColor: `rgba(255,${Math.round(255 - (heat / 100) * 189)},${Math.round(255 - (heat / 100) * 228)},${0.06 + (heat / 100) * 0.19})`,
            background: `rgba(${Math.round(50 + (heat / 100) * 190)},${Math.round(80 - (heat / 100) * 14)},${Math.round(120 - (heat / 100) * 93)},0.08)`,
          }}
        >
          <div className="flex justify-between items-center mb-5">
            <span className="font-mono text-sm uppercase tracking-[0.1em] text-[rgba(255,255,255,0.4)] font-semibold">
              {t('heat')}
            </span>
            <span className="flex items-center gap-3">
              <span
                className="font-mono text-2xl font-extrabold leading-none transition-colors duration-300"
                style={{
                  color: `rgb(${Math.round(255 - (heat / 100) * 15)},${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)})`,
                }}
              >
                {heat}%
              </span>
              <button
                onClick={() => setSoundOn(!soundOn)}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-[rgba(255,255,255,0.1)] hover:border-[var(--color-primary)] transition-colors text-[var(--color-muted)] hover:text-[var(--color-primary)]"
                aria-label="Toggle bubble pop sound"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  {soundOn ? (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  ) : (
                    <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  )}
                </svg>
              </button>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-[rgba(255,255,255,0.2)] flex-shrink-0">
              COLD
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={heat}
              onChange={(e) => setHeat(parseInt(e.target.value, 10))}
              aria-label={t('heat')}
              className="heat-slider flex-1 h-[6px] rounded-full outline-none cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, rgb(${Math.round(255 - (heat / 100) * 15)},${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)}) 0%, rgb(${Math.round(255 - (heat / 100) * 15)},${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)}) ${heat}%, rgba(255,255,255,0.1) ${heat}%, rgba(255,255,255,0.1) 100%)`,
                '--thumb-color': `rgb(${Math.round(255 - (heat / 100) * 15)},${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)})`,
              } as React.CSSProperties}
            />
            <span
              className="font-mono text-xs uppercase tracking-[0.08em] flex-shrink-0 transition-colors duration-300"
              style={{
                color: `rgb(${Math.round(255 - (heat / 100) * 15)},${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)})`,
              }}
            >
              HOT
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <img src="/images/logo-dark.svg" alt="TS Aromatics" className="h-8 w-auto mb-4" />
            <p className="text-sm text-[var(--color-muted)] mb-6">{t('tagline')}</p>
            <div className="flex flex-col gap-2 mb-5">
              <Link href="/products" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                {tn('products')}
              </Link>
              <Link href="/academy" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                {tn('academy')}
              </Link>
              <Link href="/contact" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                {tn('contact')}
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/academy" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                {t('docs')}
              </Link>
              <Link href="/products" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
                {t('batch')}
              </Link>
            </div>
            <div className="flex gap-4 mt-5">
              <Link href="/privacy" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-muted)] transition-colors">
                {tn('privacy')}
              </Link>
              <Link href="/terms" className="text-xs text-[var(--color-muted)] hover:text-[var(--color-muted)] transition-colors">
                {tn('terms')}
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-muted)] mb-4">
              {t('technical')}
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/academy" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('docs')}</Link>
              <Link href="/products" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('batch')}</Link>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('sds')}</a>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('ifra')}</a>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('api')}</a>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('partner')}</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-muted)] mb-4">
              {t('logistics')}
            </h4>
            <div className="flex flex-col gap-2 mb-5">
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('shipping')}</a>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('incoterms')}</a>
              <a href="#" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">{t('lead')}</a>
            </div>
            <div className="flex flex-col gap-1.5">
              <Clock label={tc('delhi')} timeZone="Asia/Kolkata" />
              <Clock label={tc('london')} timeZone="Europe/London" />
              <Clock label={tc('nyc')} timeZone="America/New_York" />
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-muted)] mb-4">
              {t('status')}
            </h4>
            <div
              className="flex items-center gap-2 px-3 py-2 border rounded-lg mb-3 transition-all duration-300"
              style={{
                borderColor: heat > 70 ? `rgba(255,${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)},0.35)` : 'rgba(76,175,80,0.25)',
                background: heat > 70 ? `rgba(255,${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)},0.1)` : 'rgba(76,175,80,0.06)',
              }}
            >
              <span
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: heat > 70 ? `rgb(255,${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)})` : '#4caf50',
                  animation: `heatPulse ${Math.max(0.4, 2.6 - (heat / 100) * 2.2)}s ease-in-out infinite`,
                }}
              />
              <span
                className="text-sm font-semibold transition-colors duration-300"
                style={{
                  color: heat > 70 ? `rgb(255,${Math.round(184 - (heat / 100) * 118)},${Math.round(115 - (heat / 100) * 88)})` : '#4caf50',
                }}
              >
                {heat > 70 ? `${t('online')} • ${heat}%` : t('online')}
              </span>
            </div>
            <p className="text-xs text-[var(--color-muted)]">
              {t('copy')}
            </p>
            <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
              <h5 className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-muted)] mb-3">
                {t('newsletter')}
              </h5>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('email_placeholder')}
                  className="flex-1 bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
                />
                <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer whitespace-nowrap">
                  {t('subscribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.06)]">
          {[
            { label: 'ISO 9001', verify: 'ISO-9001-2026-0042' },
            { label: 'GMP Certified', verify: 'GMP-CERT-2026-0891' },
            { label: 'IFRA 2026', verify: 'IFRA-2026-0337' },
            { label: 'USDA Organic', verify: 'USDA-ORG-2026-0567' },
          ].map((cert) => (
            <div key={cert.verify} className="flex items-center gap-2 text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors cursor-default" data-verify={cert.verify}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--color-primary)]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
              <span className="text-sm font-medium">{cert.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <Clock label={tc('delhi')} timeZone="Asia/Kolkata" compact />
            <span className="w-px h-3 bg-[rgba(255,255,255,0.08)]" />
            <Clock label={tc('london')} timeZone="Europe/London" compact />
            <span className="w-px h-3 bg-[rgba(255,255,255,0.08)]" />
            <Clock label={tc('nyc')} timeZone="America/New_York" compact />
          </div>
          <div className="flex items-center gap-3 text-[11px] text-[var(--color-muted)]">
            <span>{t('copy')}</span>
            <Link href="/privacy" className="hover:text-[var(--color-muted)] transition-colors">
              {tn('privacy')}
            </Link>
            <Link href="/terms" className="hover:text-[var(--color-muted)] transition-colors">
              {tn('terms')}
            </Link>
          </div>
        </div>
      </div>

      <span
        className="absolute bottom-[-0.12em] left-1/2 -translate-x-1/2 font-[family-name:var(--font-playfair)] text-[clamp(6rem,18vw,16rem)] font-black pointer-events-none select-none tracking-[-0.04em] whitespace-nowrap"
        style={{
          color: `rgba(255,255,255,${watermarkOpacity})`,
          textShadow: 'var(--watermark-glow, none)',
        }}
      >
        TS Aromatics
      </span>
    </footer>
  );
}
