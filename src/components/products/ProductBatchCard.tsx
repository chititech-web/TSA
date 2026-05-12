'use client';

import { Shield, Calendar, Fingerprint, CheckCircle, Droplets, Globe } from 'lucide-react';
import { getProcurementInfo } from '@/data/productMeta';
import type { Product } from '@/data/products';
import type { GcmsEntry } from '@/data/gcms';

export function ProductBatchCard({
  product,
  gcms,
}: {
  product: Product;
  gcms: GcmsEntry | null;
}) {
  const meta = getProcurementInfo(product);
  const isExpired = gcms && !gcms.analysis_date.endsWith('2026');

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
        <Shield size={14} />
        Batch Traceability
      </h3>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
        {/* Batch ID */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <Fingerprint size={11} />
          Batch ID
        </span>
        <span className="font-mono text-[var(--color-text-main)]">
          {product.gcmsBatchId || '—'}
        </span>

        {/* Origin */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <Globe size={11} />
          Origin
        </span>
        <span>{meta.origin}</span>

        {/* Analysis Date */}
        {gcms && (
          <>
            <span className="text-[var(--color-muted)] flex items-center gap-1.5">
              <Calendar size={11} />
              Analysis Date
            </span>
            <span className={isExpired ? 'text-[var(--color-brand-red)]' : ''}>
              {gcms.analysis_date}
              {isExpired && ' (expired)'}
            </span>
          </>
        )}

        {/* Purity */}
        {gcms && (
          <>
            <span className="text-[var(--color-muted)] flex items-center gap-1.5">
              <Droplets size={11} />
              Purity Score
            </span>
            <span className="text-[var(--color-accent-green)] font-bold">
              {gcms.purity_score}
            </span>
          </>
        )}

        {/* Compounds Count */}
        {gcms && (
          <>
            <span className="text-[var(--color-muted)] flex items-center gap-1.5">
              <CheckCircle size={11} />
              Identified Compounds
            </span>
            <span>{gcms.compounds.length}</span>
          </>
        )}

        {/* Shelf Life */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <Calendar size={11} />
          Shelf Life
        </span>
        <span>{meta.shelfLife}</span>
      </div>
    </div>
  );
}
