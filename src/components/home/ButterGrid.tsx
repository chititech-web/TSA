'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const butters = [
  { key: 'shea', title: 'Shea Butter', img: '/images/products/carrier.svg' },
  { key: 'cocoa', title: 'Cocoa Butter', img: '/images/products/carrier.svg' },
  { key: 'mango', title: 'Mango Butter', img: '/images/products/carrier.svg' },
];

export function ButterGrid({ locale }: { locale: string }) {
  const t = useTranslations('butter');

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-primary)] mb-3">
              {t('kicker')}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.8rem)] leading-[1.12]">
              {t('title')}
            </h2>
            <p className="text-sm text-[var(--color-muted)] max-w-[660px] mt-2">
              {t('desc')}
            </p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden sm:inline-flex items-center gap-1 text-[var(--color-primary)] font-extrabold text-sm hover:brightness-110 transition-all"
          >
            {t('cta')} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {butters.map((b) => (
            <Link
              key={b.key}
              href={`/${locale}/products`}
              className="group bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] will-change-transform"
            >
              <div className="aspect-square overflow-hidden relative bg-[var(--color-surface-1)] flex items-center justify-center p-8">
                <img
                  src={b.img}
                  alt=""
                  className="w-3/4 h-3/4 object-contain transition-transform duration-[450ms] group-hover:scale-106 opacity-60"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-[family-name:var(--font-heading)] text-base font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                  {b.title}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {t(b.key)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
