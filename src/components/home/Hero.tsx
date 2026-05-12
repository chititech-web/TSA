'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { PurityFeed } from '@/components/effects/PurityFeed';

export function Hero() {
  const t = useTranslations('hero');
  const [videoErr, setVideoErr] = useState(false);

  return (
    <section data-hero className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {!videoErr && (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster="/images/Gradient.png"
            onError={() => setVideoErr(true)}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover"
          >
            <source src="/images/hero.mp4" type="video/mp4" />
          </video>
        )}
        {videoErr && (
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: 'url(/images/hero-fallback.svg)' }}
          />
        )}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'var(--gradient-overlay)' }}
        />
      </div>

      <div className="relative z-10 max-w-[920px] px-6 pt-28 pb-4 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] mb-4">
          {t('kicker')}
        </p>
        <h1 className="font-[family-name:var(--font-playfair)] text-[clamp(2.4rem,6vw,5rem)] leading-[1.04] mb-6">
          {t('title')}
        </h1>
        <p className="text-base text-[var(--color-muted)] max-w-[640px] mx-auto mb-8">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm hover:brightness-110 transition-all active:scale-95"
          >
            {t('primary_cta')}
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[var(--color-border)] text-sm font-semibold text-[var(--color-text-main)] hover:bg-[rgba(255,255,255,0.03)] transition-all active:scale-95"
          >
            {t('secondary_cta')}
          </Link>
        </div>
        <PurityFeed />
      </div>
    </section>
  );
}
