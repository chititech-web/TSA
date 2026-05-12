'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const docs = [
  {
    type: 'floral herbal', icon: 'description',
    titleKey: 'doc_sds_lavender', descKey: 'doc_sds_lavender_desc',
    label: 'SDS', rev: 'Rev. 2026', status: 'LIVE VERIFIED: May 10, 2026',
  },
  {
    type: 'floral herbal', icon: 'lab_profile',
    titleKey: 'doc_coa_lavender', descKey: 'doc_coa_lavender_desc',
    label: 'COA', rev: 'Template', status: 'LIVE VERIFIED: May 10, 2026',
  },
  {
    type: 'citrus', icon: 'description',
    titleKey: 'doc_sds_lemon', descKey: 'doc_sds_lemon_desc',
    label: 'SDS', rev: 'Rev. 2026', status: 'LIVE VERIFIED: May 10, 2026',
  },
] as const;

import type { FC } from 'react';

const iconPaths: Record<string, FC<{ className?: string }>> = {
  description: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-3.06 16L7.4 14.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41L10.94 18zM13 9V3.5L18.5 9H13z"/>
    </svg>
  ),
  lab_profile: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
    </svg>
  ),
};

export function DocLibraryTeaser() {
  const t = useTranslations('doc_library');
  const locale = useLocale();

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
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-semibold hover:bg-[rgba(255,255,255,0.04)] transition-all active:scale-95 flex-shrink-0"
          >
            {t('cta')}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {docs.map((d) => {
            const Icon = iconPaths[d.icon];
            return (
              <div
                key={d.titleKey}
                className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-glass)] p-5 hover:border-[var(--color-border)] transition-all cursor-default"
              >
                <Icon className="w-8 h-8 text-[var(--color-primary)] mb-3 opacity-70" />
                <h4 className="font-[family-name:var(--font-display)] text-sm font-bold mb-1">
                  {t(d.titleKey as any)}
                </h4>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3">
                  {t(d.descKey as any)}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[0.625rem] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded-full bg-[rgba(255,255,255,0.04)] text-[rgba(245,239,232,0.5)]">
                    {d.label}
                  </span>
                  <span className="text-[0.625rem] text-[rgba(245,239,232,0.25)]">{d.rev}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4caf50] animate-pulse" />
                  <span className="text-[0.625rem] text-[#4caf50] font-semibold">{d.status}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-6 flex flex-col md:flex-row md:items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.04)] flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[var(--color-primary)]">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold">{t('consult_title')}</h3>
            <p className="text-xs text-[var(--color-muted)]">{t('consult_desc')}</p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold hover:brightness-110 transition-all active:scale-95 flex-shrink-0"
          >
            {t('consult_cta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
