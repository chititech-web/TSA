'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const articles = [
  { id: 'a1', difficultyKey: 'diff_beginner' },
  { id: 'a2', difficultyKey: 'diff_beginner' },
  { id: 'a3', difficultyKey: 'diff_intermediate' },
] as const;

export function AcademyTeaser() {
  const t = useTranslations('academy');
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
            href={`/${locale}/academy`}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[var(--color-border)] text-sm font-semibold hover:bg-[var(--color-glass)] transition-all active:scale-95 flex-shrink-0"
          >
            {t('cta')}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
            </svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/${locale}/academy/${a.id}`}
              className="group rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[var(--color-glass)] hover:border-[var(--color-border)] transition-all hover:-translate-y-1"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[rgba(255,255,255,0.03)]">
                <img
                  src={
                    a.id === 'a1'
                      ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=375&fit=crop'
                      : a.id === 'a2'
                      ? 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=375&fit=crop'
                      : 'https://images.unsplash.com/photo-1581092795360-fd01ca4f0952?w=600&h=375&fit=crop'
                  }
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="inline-block text-[0.625rem] font-bold uppercase tracking-[0.06em] px-2 py-1 rounded-full bg-[rgba(255,255,255,0.04)] text-[rgba(245,239,232,0.5)] mb-3">
                  {t(a.difficultyKey)}
                </span>
                <h3 className="font-[family-name:var(--font-display)] text-base font-bold leading-snug mb-2">
                  {t(`${a.id}_title` as any)}
                </h3>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">
                  {t(`${a.id}_desc` as any)}
                </p>
                <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-[var(--color-primary)] opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  {t('read_more')}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
