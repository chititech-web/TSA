'use client';

import { useMemo } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { getAllGcmsData } from '@/data/gcms';
import {
  moleculeData,
  compoundToMolTag,
} from './MoleculeData';

const gcmsDb = getAllGcmsData();

function getConc(molTag: string, productSlug: string, gcmsBatchIds: Record<string, string>): number | null {
  const batchId = gcmsBatchIds[productSlug];
  if (!batchId) return null;
  const entry = gcmsDb[batchId];
  if (!entry) return null;
  for (const comp of entry.compounds) {
    if (compoundToMolTag[comp.name] === molTag) return comp.percentage;
  }
  return null;
}

export function MolComparePanel({
  compareMols,
  products,
  gcmsBatchIds,
  onRemove,
  onClose,
}: {
  compareMols: string[];
  products: Product[];
  gcmsBatchIds: Record<string, string>;
  onRemove: (tag: string) => void;
  onClose: () => void;
}) {
  const allProducts = useMemo(() => {
    const map = new Map<string, Product>();
    for (const p of products) map.set(p.id, p);
    return map;
  }, [products]);

  const maxConcs = useMemo(() => {
    const max: Record<string, number> = {};
    for (const tag of compareMols) {
      let m = 0;
      for (const p of products) {
        if (!p.molecules.includes(tag)) continue;
        const c = getConc(tag, p.id, gcmsBatchIds);
        if (c != null && c > m) m = c;
      }
      max[tag] = m || 1;
    }
    return max;
  }, [compareMols, products, gcmsBatchIds]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-[900px] max-h-[85vh] bg-[var(--color-bg-base)] rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-y-auto animate-[fadeSlide_0.25s_ease-out]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <h2 className="font-[family-name:var(--font-heading)] text-base font-bold">
            Compare Molecules
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-1)] text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div
          className="grid gap-4 p-5"
          style={{ gridTemplateColumns: `repeat(${Math.min(compareMols.length, 3)}, 1fr)` }}
        >
          {compareMols.map((tag) => {
            const mol = moleculeData[tag];
            if (!mol) return null;
            const entries = products
              .filter((p) => p.molecules.includes(tag))
              .map((p) => ({
                product: p,
                conc: getConc(tag, p.id, gcmsBatchIds),
              }))
              .sort((a, b) => (b.conc ?? 0) - (a.conc ?? 0));
            const maxC = maxConcs[tag] || 1;

            return (
              <div
                key={tag}
                className="rounded-xl border border-[var(--color-border)] p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: mol.color }}
                    />
                    <h3 className="text-sm font-bold">{mol.name}</h3>
                  </div>
                  <button
                    onClick={() => onRemove(tag)}
                    className="p-1 rounded hover:bg-[var(--color-surface-1)] text-[var(--color-muted)] hover:text-[var(--color-brand-red)] transition-colors"
                  >
                    <X size={12} />
                  </button>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {mol.therapeutic.split(', ').map((t) => (
                    <span
                      key={t}
                      className="px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider bg-[rgba(191,111,0,0.08)] text-[var(--color-primary-light)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[10px] text-[var(--color-muted)] mb-2 font-bold uppercase tracking-wider">
                  Found in {entries.length} product{entries.length !== 1 ? 's' : ''}
                </p>

                <div className="space-y-1.5 max-h-[300px] overflow-y-auto">
                  {entries.slice(0, 8).map(({ product: p, conc }) => (
                    <a
                      key={p.id}
                      href={`/en/products/${p.id}`}
                      className="flex items-center gap-2 rounded-lg p-2 hover:bg-[var(--color-surface-1)] transition-colors group"
                    >
                      <span className="text-[11px] flex-1 truncate">{p.name}</span>
                      {conc != null && (
                        <div className="flex items-center gap-1.5">
                          <div className="w-12 h-1.5 rounded-full bg-[var(--color-surface-1)] overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${(conc / maxC) * 100}%`,
                                background: mol.color,
                              }}
                            />
                          </div>
                          <span
                            className="text-[10px] font-bold shrink-0"
                            style={{ color: mol.color }}
                          >
                            {conc.toFixed(1)}%
                          </span>
                        </div>
                      )}
                      <ArrowUpRight size={10} className="text-[var(--color-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </a>
                  ))}
                  {entries.length > 8 && (
                    <p className="text-[10px] text-[var(--color-muted)] text-center pt-1">
                      +{entries.length - 8} more
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
