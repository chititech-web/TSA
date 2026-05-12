'use client';

import { PackageSearch, Truck, Scale, DollarSign, FlaskConical, Check } from 'lucide-react';
import { getProcurementInfo } from '@/data/productMeta';
import type { Product } from '@/data/products';

export function ProductProcurementCard({ product }: { product: Product }) {
  const meta = getProcurementInfo(product);

  return (
    <div className="glass rounded-xl p-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
        <PackageSearch size={14} />
        Procurement Info
      </h3>

      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
        {/* MOQ */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <Scale size={11} />
          MOQ
        </span>
        <span className="text-[var(--color-text-main)] font-bold">{meta.moq}</span>

        {/* Lead Time */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <Truck size={11} />
          Lead Time
        </span>
        <span className="text-[var(--color-accent-green)]">{meta.leadTime}</span>

        {/* Payment Terms */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <DollarSign size={11} />
          Payment Terms
        </span>
        <span>{meta.paymentTerms}</span>

        {/* Storage */}
        <span className="text-[var(--color-muted)] flex items-center gap-1.5">
          <FlaskConical size={11} />
          Storage
        </span>
        <span>{meta.storage}</span>
      </div>

      {/* Packaging Options */}
      <div className="mt-3 pt-3 border-t border-[var(--color-border)]">
        <span className="text-[10px] text-[var(--color-muted)] font-semibold uppercase tracking-wider">
          Available Packaging
        </span>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {meta.packaging.map((pkg) => (
            <span
              key={pkg}
              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[rgba(191,111,0,0.1)] text-[var(--color-primary-light)] border border-[rgba(191,111,0,0.15)]"
            >
              {pkg}
            </span>
          ))}
        </div>
      </div>

      {/* Sample Badge */}
      {meta.samplesAvailable && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center gap-2 text-xs text-[var(--color-accent-green)]">
          <Check size={14} />
          Samples available
        </div>
      )}
    </div>
  );
}
