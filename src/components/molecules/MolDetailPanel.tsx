'use client';

import { useMemo } from 'react';
import { X, ArrowUpRight, GitCompare } from 'lucide-react';
import type { Product } from '@/data/products';
import { getAllGcmsData } from '@/data/gcms';
import {
  moleculeData,
  type MoleculeNode,
  type IfraInfo,
  ifraLimits,
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

export function MolDetailPanel({
  molTag,
  products,
  gcmsBatchIds,
  onClose,
  onCompare,
}: {
  molTag: string;
  products: Product[];
  gcmsBatchIds: Record<string, string>;
  onClose: () => void;
  onCompare: (tag: string) => void;
}) {
  const mol: MoleculeNode | undefined = moleculeData[molTag];
  const ifra: IfraInfo | undefined = ifraLimits[molTag];

  const productEntries = useMemo(() => {
    return products
      .filter((p) => p.molecules.includes(molTag))
      .map((p) => ({
        product: p,
        conc: getConc(molTag, p.id, gcmsBatchIds),
      }))
      .sort((a, b) => (b.conc ?? 0) - (a.conc ?? 0));
  }, [molTag, products, gcmsBatchIds]);

  const maxConc = Math.max(...productEntries.map((e) => e.conc ?? 0), 1);

  if (!mol) return null;

  const restrictionColor =
    ifra?.restriction === 'strict'
      ? '#F0421B'
      : ifra?.restriction === 'moderate'
        ? '#D4AF37'
        : '#4caf50';

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-[420px] bg-[var(--color-bg-base)]/95 backdrop-blur-xl border-l border-[var(--color-border)] shadow-2xl animate-[fadeSlide_0.25s_ease-out] overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span
              className="w-4 h-4 rounded-full shrink-0"
              style={{ background: mol.color }}
            />
            <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold">
              {mol.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[var(--color-surface-1)] text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Desc + Therapeutic */}
        <p className="text-xs text-[var(--color-muted)] italic mb-3 leading-relaxed">
          {mol.desc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-5">
          {mol.therapeutic.split(', ').map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[rgba(191,111,0,0.1)] text-[var(--color-primary-light)]"
            >
              {t}
            </span>
          ))}
        </div>

        {/* IFRA Compliance */}
        {ifra && (
          <div
            className="rounded-xl p-3 mb-5 border text-xs"
            style={{
              borderColor: `${restrictionColor}30`,
              background: `${restrictionColor}08`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: restrictionColor }}
              />
              <span className="font-bold text-[11px] uppercase tracking-wider">
                IFRA Restriction:
                {ifra.restriction === 'none'
                  ? ' None'
                  : ifra.restriction === 'strict'
                    ? ' Strict'
                    : ' Moderate'}
              </span>
            </div>
            <p className="text-[11px] text-[var(--color-muted)]">
              Max allowed: {ifra.max} in finished product
            </p>
          </div>
        )}

        {/* Found in */}
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-muted)] mb-3">
          Found in {productEntries.length} product{productEntries.length !== 1 ? 's' : ''}
        </h3>

        <div className="space-y-2 mb-6">
          {productEntries.map(({ product: p, conc }) => (
            <a
              key={p.id}
              href={`/en/products/${p.id}`}
              className="block rounded-xl p-3 border border-[var(--color-border)] hover:border-[rgba(255,255,255,0.15)] transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold">{p.name}</span>
                <ArrowUpRight
                  size={12}
                  className="text-[var(--color-muted)] group-hover:text-[var(--color-primary)] transition-colors"
                />
              </div>
              {conc != null && (
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-[var(--color-surface-1)] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(conc / maxConc) * 100}%`,
                        background: mol.color,
                      }}
                    />
                  </div>
                  <span
                    className="text-[11px] font-bold shrink-0"
                    style={{ color: mol.color }}
                  >
                    {conc.toFixed(1)}%
                  </span>
                </div>
              )}
              {conc == null && (
                <p className="text-[10px] text-[var(--color-muted)]">GC/MS data pending</p>
              )}
            </a>
          ))}
        </div>

        {/* Compare button */}
        <button
          onClick={() => onCompare(molTag)}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--color-border)] text-xs font-bold hover:border-[var(--color-primary)] transition-all active:scale-[0.97]"
        >
          <GitCompare size={14} />
          Compare with another molecule
        </button>
      </div>
    </div>
  );
}
