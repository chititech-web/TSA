'use client';

import { useTranslations } from 'next-intl';

const tiles = [
  { src: '/images/sections/social-botanical.svg', alt: 'Botanical leaves close up' },
  { src: '/images/sections/social-amber-bottle.svg', alt: 'Amber glass bottle' },
  { src: '/images/sections/social-lab.svg', alt: 'Lab testing setup' },
  { src: '/images/sections/social-lavender.svg', alt: 'Lavender oil post' },
  { src: '/images/sections/social-carrier.svg', alt: 'Carrier oil post' },
  { src: '/images/sections/social-farm.svg', alt: 'Sourcing farm placeholder' },
];

export function SocialFeed() {
  const t = useTranslations('social');

  return (
    <section className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] mb-3">
              {t('kicker')}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,2.8rem)] leading-[1.08]">
              {t('title')}
            </h2>
            <p className="text-sm text-[var(--color-muted)] mt-3 max-w-[480px]">
              {t('desc')}
            </p>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[rgba(245,239,232,0.15)] text-sm font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all active:scale-95 flex-shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
            {t('cta')}
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {tiles.map((tile) => (
            <div key={tile.src} className="aspect-square rounded-xl overflow-hidden border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]">
              <img src={tile.src} alt={tile.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
