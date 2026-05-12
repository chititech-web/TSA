'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Search, X, FlaskConical } from 'lucide-react';
import type { Product } from '@/data/products';
import { moleculeData } from '@/components/molecules/MoleculeData';
import { ProductCard } from './ProductCard';

export function ProductGrid({
  products,
  categories,
  locale,
}: {
  products: Product[];
  categories: string[];
  locale: string;
}) {
  const t = useTranslations('products');
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('');
  const [activeMol, setActiveMol] = useState('');
  const [molSearch, setMolSearch] = useState('');

  const moleculeList = useMemo(() => {
    const seen = new Set<string>();
    for (const p of products) {
      for (const m of p.molecules) seen.add(m);
    }
    return Array.from(seen).sort((a, b) => {
      const na = moleculeData[a]?.name || a;
      const nb = moleculeData[b]?.name || b;
      return na.localeCompare(nb);
    });
  }, [products]);

  const filteredMolSearch = useMemo(() => {
    const q = molSearch.toLowerCase().trim();
    if (!q) return moleculeList;
    return moleculeList.filter((tag) => {
      const info = moleculeData[tag];
      const name = info?.name || tag;
      return name.toLowerCase().includes(q);
    });
  }, [molSearch, moleculeList]);

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
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] mb-4">
            {t('title')}
          </h1>
          <p className="text-sm text-[var(--color-muted)] max-w-[560px] mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-[400px] mx-auto mb-8">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('search')}
            className="w-full h-11 pl-10 pr-9 rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            onClick={() => setActiveCat('')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
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
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCat === cat
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-surface-1)] text-[var(--color-muted)] border border-[var(--color-border)] hover:border-[rgba(255,255,255,0.15)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Molecule filter row */}
        <div className="mb-8 p-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)]">
          <div className="flex items-center gap-3 mb-3">
            <FlaskConical size={14} className="text-[var(--color-primary)]" />
            <span className="text-xs font-bold uppercase tracking-[0.06em] text-[var(--color-primary)]">
              Filter by Molecule
            </span>
            <div className="relative ml-auto max-w-[180px]">
              <input
                type="text"
                value={molSearch}
                onChange={(e) => setMolSearch(e.target.value)}
                placeholder="Search molecules..."
                className="w-full h-8 pl-3 pr-7 rounded-full bg-[rgba(255,255,255,0.04)] border border-[var(--color-border)] text-xs text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
              />
              {molSearch && (
                <button
                  onClick={() => { setMolSearch(''); setActiveMol(''); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-text-main)]"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {activeMol && (
              <button
                onClick={() => setActiveMol('')}
                className="px-2.5 py-1 rounded-full text-xs font-semibold border border-[var(--color-primary)] text-[var(--color-primary)] bg-[rgba(255,184,115,0.1)] transition-all"
              >
                Clear filter
              </button>
            )}
            {filteredMolSearch.map((tag) => {
              const info = moleculeData[tag];
              const color = info?.color || '#888';
              const isActive = activeMol === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveMol(isActive ? '' : tag)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold transition-all"
                  style={{
                    borderColor: isActive ? color : 'var(--color-border)',
                    backgroundColor: isActive ? `${color}20` : 'transparent',
                    color: isActive ? color : 'var(--color-muted)',
                    borderWidth: 1,
                    borderStyle: 'solid',
                  }}
                >
                  {info?.name || tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-[var(--color-muted)] py-20">
            No products match your search. Try a different filter.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} locale={locale} />
            ))}
          </div>
        )}

        <p className="text-center text-xs text-[var(--color-muted)] mt-8">
          {filtered.length} / {products.length} products
        </p>
      </div>
    </section>
  );
}
