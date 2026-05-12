'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';
import type { AcademyArticle, ArticleContent } from '@/data/academy';

export function ArticleDetail({
  article,
  content,
  locale,
}: {
  article: AcademyArticle;
  content: ArticleContent;
  locale: string;
}) {
  const t = useTranslations('academy');

  const difficultyColors: Record<string, string> = {
    beginner: 'bg-[rgba(76,175,80,0.15)] text-[var(--color-accent-green)]',
    intermediate: 'bg-[rgba(191,111,0,0.15)] text-[var(--color-primary)]',
    advanced: 'bg-[rgba(240,66,27,0.15)] text-[var(--color-brand-red)]',
  };

  return (
    <article>
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={content.heroImg}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 max-w-[800px] mx-auto pb-10">
          <Link
            href={`/${locale}/academy`}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            {t('title')}
          </Link>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.4rem,4vw,2.6rem)] leading-[1.08] mb-3">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-[var(--color-muted)]">
            <span className="flex items-center gap-1.5">
              <User size={12} /> {content.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={12} /> {content.date} · {content.readTime}
            </span>
            <span className={difficultyColors[article.difficulty]}>
              {article.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[800px] mx-auto px-6 py-12">
        {content.sections.map((section, i) => (
          <div key={i} className="mb-10">
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold mb-3 flex items-start gap-3">
              <BookOpen
                size={16}
                className="mt-1 shrink-0 text-[var(--color-primary)]"
              />
              {section.h}
            </h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {section.b}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}
