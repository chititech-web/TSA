import { getAllProducts, getCategories } from '@/data/products';
import { ProductsPageClient } from './ProductsPageClient';

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const products = getAllProducts();
  const categories = getCategories();

  return (
    <ProductsPageClient
      products={products}
      categories={categories}
      locale={locale}
    />
  );
}
