'use client';

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { getCoA } from '@/data/productMeta';
import type { Product } from '@/data/products';

export function ProductCoAPreview({ product }: { product: Product }) {
  const [expanded, setExpanded] = useState(false);
  const coa = getCoA(product);

  return (
    <div className="glass rounded-xl p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]"
      >
        <span className="flex items-center gap-2">
          <FileText size={14} />
          Certificate of Analysis (COA)
        </span>
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <div className="mt-2 text-[10px] text-[var(--color-muted)] flex items-center gap-2">
        <span>14 tests</span>
        <span className="w-px h-3 bg-[var(--color-border)]" />
        <span>Compliant per USP/EP</span>
        <span className="w-px h-3 bg-[var(--color-border)]" />
        <span>Method: GC/FID, HPLC, ICP-MS</span>
      </div>

      {expanded && (
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-[11px] border-collapse">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left py-2 pr-3 text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider whitespace-nowrap">
                  Parameter
                </th>
                <th className="text-left py-2 pr-3 text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider whitespace-nowrap">
                  Specification
                </th>
                <th className="text-left py-2 pr-3 text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider whitespace-nowrap">
                  Result
                </th>
                <th className="text-left py-2 text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider whitespace-nowrap">
                  Method
                </th>
              </tr>
            </thead>
            <tbody>
              {coa.map((row) => (
                <tr key={row.parameter} className="border-b border-[var(--color-border)]/50">
                  <td className="py-1.5 pr-3 text-[var(--color-text-main)] whitespace-nowrap">
                    {row.parameter}
                  </td>
                  <td className="py-1.5 pr-3 text-[var(--color-muted)] whitespace-nowrap">
                    {row.spec}
                  </td>
                  <td className="py-1.5 pr-3">
                    <span
                      className={
                        row.result === 'Conforms' || row.result === 'Compliant' || row.result === 'Not detected' || row.result.startsWith('<')
                          ? 'text-[var(--color-accent-green)]'
                          : 'text-[var(--color-text-main)]'
                      }
                    >
                      {row.result}
                    </span>
                  </td>
                  <td className="py-1.5 text-[var(--color-muted)] whitespace-nowrap">
                    {row.method}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
