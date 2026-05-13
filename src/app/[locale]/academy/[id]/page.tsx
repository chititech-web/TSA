import { notFound } from 'next/navigation';
import { getAllArticles, getArticleById, getArticleContent } from '@/data/academy';
import { ArticleDetail } from '@/components/academy/ArticleDetail';

export const dynamic = 'force-dynamic';

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const article = getArticleById(id);
  const content = getArticleContent(id);
  if (!article || !content) notFound();

  return <ArticleDetail article={article} content={content} locale={locale} />;
}
