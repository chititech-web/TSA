'use client';

import { useState, useMemo } from 'react';
import { X, Search, ArrowUpRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { getAllGcmsData } from '@/data/gcms';
import {
  moleculeData,
  getAllMolecules,
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

export function ChemicalSignature({
  products,
  gcmsBatchIds,
  onClose,
}: {
  products: Product[];
  gcmsBatchIds: Record<string, string>;
  onClose: () => void;
}) {
  const allMols = useMemo(() => getAllMolecules(), []);
  const [selectedTag, setSelectedTag] = useState<string>(allMols[0]?.tag || '');
  const [threshold, setThreshold] = useState(10);
  const [molSearch, setMolSearch] = useState('');

  const filteredMolOptions = useMemo(() => {
    const q = molSearch.toLowerCase();
    if (!q) return allMols;
    return allMols.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.tag.toLowerCase().includes(q),
    );
  }, [allMols, molSearch]);

  const results = useMemo(() => {
    if (!selectedTag) return [];
    return products
      .map((p) => ({
        product: p,
        conc: getConc(selectedTag, p.id, gcmsBatchIds),
      }))
      .filter((e) => e.conc != null && e.conc >= threshold)
      .sort((a, b) => (b.conc ?? 0) - (a.conc ?? 0));
  }, [selectedTag, threshold, products, gcmsBatchIds]);

  const selectedMol = selectedTag ? moleculeData[selectedTag] : null;
  const maxConc = Math.max(...results.map((e) => e.conc ?? 0), 1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-[600px] max-h-[85vh] bg-[var(--color-bg-base)] rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-y-auto animate-[fadeSlide_0.25s_ease-out]">
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg-base)]">
          <h2 className="font-[family-name:var(--font-heading)] text-base font-bold">
            Chemical Signature
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-1)] text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Molecule selector */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)] block mb-2">
              Select molecule
            </label>
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
              <input
                type="text"
                value={molSearch}
                onChange={(e) => setMolSearch(e.target.value)}
                placeholder="Search molecules..."
                className="w-full h-9 pl-8 pr-3 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-xs text-[var(--color-text-main)] placeholder:text-[var(--color-muted)] outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-2 max-h-[120px] overflow-y-auto">
              {filteredMolOptions.map((m) => {
                const isActive = selectedTag === m.tag;
                return (
                  <button
                    key={m.tag}
                    onClick={() => {
                      setSelectedTag(m.tag);
                      setMolSearch('');
                    }}
                    className="px-2 py-1 rounded-full text-[11px] font-semibold transition-all"
                    style={{
                      borderColor: isActive ? m.color : 'var(--color-border)',
                      backgroundColor: isActive ? `${m.color}20` : 'transparent',
                      color: isActive ? m.color : 'var(--color-muted)',
                      borderWidth: 1,
                      borderStyle: 'solid',
                    }}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Threshold slider */}
          {selectedMol && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-muted)]">
                  Minimum concentration
                </label>
                <span
                  className="text-sm font-bold"
                  style={{ color: selectedMol.color }}
                >
                  {threshold}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-[var(--color-surface-1)] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[rgba(255,255,255,0.2)] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg"
                style={{
                  '--thumb-color': selectedMol.color,
                  accentColor: selectedMol.color,
                } as React.CSSProperties}
              />
            </div>
          )}

          {/* Results */}
          {selectedMol && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ background: selectedMol.color }}
                />
                <h3 className="text-sm font-bold">{selectedMol.name}</h3>
                <span className="text-xs text-[var(--color-muted)]">
                  — {results.length} product{results.length !== 1 ? 's' : ''} at ≥{threshold}%
                </span>
              </div>

              {results.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-xs text-[var(--color-muted)]">
                    No products found with {selectedMol.name} at ≥{threshold}% concentration.
                  </p>
                  <p className="text-[10px] text-[var(--color-muted)] mt-1">
                    Try lowering the threshold.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {results.map(({ product: p, conc }) => (
                    <a
                      key={p.id}
                      href={`/en/products/${p.id}`}
                      className="flex items-center gap-3 rounded-xl p-3 border border-[var(--color-border)] hover:border-[rgba(255,255,255,0.15)] transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold truncate">
                            {p.name}
                          </span>
                          <ArrowUpRight
                            size={12}
                            className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors shrink-0 ml-2"
                          />
                        </div>
                        {conc != null && (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 rounded-full bg-[var(--color-surface-1)] overflow-hidden">
                              <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{
                                  width: `${(conc / maxConc) * 100}%`,
                                  background: selectedMol.color,
                                }}
                              />
                            </div>
                            <span
                              className="text-[11px] font-bold shrink-0"
                              style={{ color: selectedMol.color }}
                            >
                              {conc.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
