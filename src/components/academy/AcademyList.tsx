'use client';

import { useTranslations } from 'next-intl';
import { ArticleCard } from './ArticleCard';
import type { AcademyArticle } from '@/data/academy';

export function AcademyList({
  articles,
  locale,
}: {
  articles: AcademyArticle[];
  locale: string;
}) {
  const t = useTranslations('academy');

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] mb-4">
            {t('title')}
          </h1>
          <p className="text-sm text-[var(--color-muted)] max-w-[560px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <ArticleCard key={a.id} article={a} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
