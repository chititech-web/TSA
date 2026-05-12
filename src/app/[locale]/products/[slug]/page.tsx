import { notFound } from 'next/navigation';
import { getAllProducts, getProductBySlug } from '@/data/products';
import { getGcmsData } from '@/data/gcms';
import { ProductDetail } from '@/components/products/ProductDetail';

export function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({ slug: p.id }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const allProducts = getAllProducts();
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const gcms = product.gcmsBatchId ? getGcmsData(product.gcmsBatchId) : undefined;

  return (
    <ProductDetail
      product={product}
      gcms={gcms ?? null}
      allProducts={allProducts}
      locale={locale}
    />
  );
}
