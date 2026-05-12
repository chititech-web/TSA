import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getRelatedProducts } from '@/data/productMeta';
import type { Product } from '@/data/products';

export function ProductRelatedGrid({
  product,
  allProducts,
  locale,
}: {
  product: Product;
  allProducts: Product[];
  locale: string;
}) {
  const related = getRelatedProducts(product, allProducts);
  if (related.length === 0) return null;

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
        Related Products
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {related.map((p) => (
          <Link
            key={p.id}
            href={`/${locale}/products/${p.id}`}
            className="group flex flex-col items-center gap-2 p-3 rounded-xl bg-[var(--color-surface-1)]/50 border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-all"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[11px] text-[var(--color-text-main)] text-center leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
              {p.name}
            </span>
            <ArrowRight size={12} className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
