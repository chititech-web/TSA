import { getAllArticles } from '@/data/academy';
import { AcademyList } from '@/components/academy/AcademyList';

export default async function AcademyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = getAllArticles();

  return <AcademyList articles={articles} locale={locale} />;
}
