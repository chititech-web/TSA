'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';
import type { Product } from '@/data/products';
import { ProductCard } from './ProductCard';

export function ProductGridInner({
  products,
  categories,
  locale,
  activeMol,
  onClearMol,
  highlightMol,
}: {
  products: Product[];
  categories: string[];
  locale: string;
  activeMol: string;
  onClearMol: () => void;
  highlightMol?: string | null;
}) {
  const t = useTranslations('products');
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return products.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.botanicalName.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tags.some((tag) => tag.includes(q));
      const matchCat = !activeCat || p.category === activeCat;
      const matchMol = !activeMol || p.molecules.includes(activeMol);
      return matchSearch && matchCat && matchMol;
    });
  }, [search, activeCat, activeMol, products]);

  return (
    <section className="py-10 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Search + Category filter */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
          <div className="relative flex-1 max-w-[320px] w-full">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search')}
              className="w-full h-10 pl-9 pr-8 rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text-main)]">
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveCat('')}
              className={`px-3 py-1 rounded-full text-[0.625rem] font-semibold uppercase tracking-wider transition-all ${
                !activeCat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-1)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {t('filter_all')}
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat === activeCat ? '' : cat)}
                className={`px-3 py-1 rounded-full text-[0.625rem] font-semibold uppercase tracking-wider transition-all ${
                  activeCat === cat
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-surface-1)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[rgba(255,255,255,0.15)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-sm text-[var(--color-muted)] mb-4">
              No products match your filters.
            </p>
            <button
              onClick={() => { setSearch(''); setActiveCat(''); onClearMol(); }}
              className="text-xs text-[var(--color-primary)] underline underline-offset-2"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => {
                const isMatch = highlightMol && p.molecules.includes(highlightMol);
                const isDim = highlightMol && !isMatch;
                return (
                  <div
                    key={p.id}
                    className="transition-all duration-300"
                    style={{
                      opacity: isDim ? 0.3 : 1,
                      filter: isMatch
                        ? 'brightness(1.15) drop-shadow(0 0 8px rgba(191,111,0,0.3))'
                        : 'none',
                    }}
                  >
                    <ProductCard product={p} locale={locale} />
                  </div>
                );
              })}
            </div>
            <p className="text-center text-xs text-[var(--color-muted)] mt-8">
              {filtered.length} / {products.length} products
            </p>
          </>
        )}
      </div>
    </section>
  );
}
