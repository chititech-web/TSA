'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import type { AcademyArticle } from '@/data/academy';

export function ArticleCard({
  article,
  locale,
}: {
  article: AcademyArticle;
  locale: string;
}) {
  const t = useTranslations('academy');

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-[rgba(76,175,80,0.15)] text-[var(--color-accent-green)]',
    intermediate: 'bg-[rgba(191,111,0,0.15)] text-[var(--color-primary)]',
    advanced: 'bg-[rgba(240,66,27,0.15)] text-[var(--color-brand-red)]',
  };

  return (
    <Link
      href={`/${locale}/academy/${article.id}`}
      className="glass rounded-2xl overflow-hidden group hover:border-[var(--color-border)] transition-all duration-500 flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)] to-transparent opacity-80" />
        <span
          className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${difficultyColors[article.difficulty]}`}
        >
          {article.difficulty}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <p className="text-[10px] uppercase tracking-wider font-semibold text-[var(--color-primary)]">
          {article.tag}
        </p>
        <h3 className="font-[family-name:var(--font-heading)] text-sm font-bold leading-snug">
          {article.title}
        </h3>
        <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
          {article.desc}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
          {t('read_more')}
          <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
