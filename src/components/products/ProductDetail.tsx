'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Check, FlaskConical, Microscope, Beaker, Ruler, RotateCcw, ShoppingCart, CheckCheck } from 'lucide-react';
import { useEnquiry } from '@/contexts/enquiry';
import { GcmsViewer } from './GcmsViewer';
import { ProductBatchCard } from './ProductBatchCard';
import { ProductProcurementCard } from './ProductProcurementCard';
import { ProductCoAPreview } from './ProductCoAPreview';
import { ProductRelatedGrid } from './ProductRelatedGrid';
import type { Product } from '@/data/products';
import type { GcmsEntry } from '@/data/gcms';

export function ProductDetail({
  product,
  gcms,
  allProducts,
  locale,
}: {
  product: Product;
  gcms: GcmsEntry | null;
  allProducts: Product[];
  locale: string;
}) {
  const t = useTranslations('products');
  const { addItem, removeItem, isInCart } = useEnquiry();
  const inCart = isInCart(product.id);
  const showGcms = gcms && gcms.compounds.length > 0;

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1100px] mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <Link
            href={`/${locale}/products`}
            className="flex items-center gap-1.5 hover:text-[var(--color-primary)] transition-colors"
          >
            <ArrowLeft size={14} />
            {t('title')}
          </Link>
          <span>/</span>
          <span className="text-[var(--color-text-main)]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — Image */}
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-8 flex items-center justify-center aspect-square">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,4vw,2.8rem)] leading-[1.08]">
                  {product.name}
                </h1>
                {product.badge && (
                  <span className="shrink-0 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary)] text-white">
                    {product.badge}
                  </span>
                )}
              </div>
              {product.botanicalName && (
                <p className="text-sm italic text-[var(--color-muted)]">
                  {product.botanicalName}
                </p>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {product.desc}
            </p>

            {/* Add to Enquiry */}
            <button
              onClick={() => inCart ? removeItem(product.id) : addItem({ id: product.id, name: product.name })}
              className={`w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-bold transition-all active:scale-[0.97] ${
                inCart
                  ? 'bg-[var(--color-brand-red)] text-white'
                  : 'border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-primary)] hover:bg-[rgba(191,111,0,0.05)]'
              }`}
            >
              {inCart ? <CheckCheck size={18} /> : <ShoppingCart size={18} />}
              {inCart ? 'Added to Enquiry' : 'Add to Enquiry'}
            </button>

            {/* Benefits & Uses */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="glass rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
                  <Check size={14} /> Benefits
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.benefits.map((b) => (
                    <li key={b} className="text-xs text-[var(--color-text-main)] flex items-start gap-2">
                      <span className="mt-0.5 w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
                  <FlaskConical size={14} /> Uses
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.uses.map((u) => (
                    <li key={u} className="text-xs text-[var(--color-text-main)] flex items-start gap-2">
                      <span className="mt-0.5 w-1 h-1 rounded-full bg-[var(--color-primary)] shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Batch Traceability + Procurement side by side */}
            <div className="grid sm:grid-cols-2 gap-5">
              <ProductBatchCard product={product} gcms={gcms} />
              <ProductProcurementCard product={product} />
            </div>

            {/* Specs */}
            <div className="glass rounded-xl p-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
                <Microscope size={14} /> Specifications
              </h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <span className="text-[var(--color-muted)]">Extraction</span>
                <span>{product.specs.extraction}</span>
                <span className="text-[var(--color-muted)]">Key Constituents</span>
                <span>{product.specs.constituents}</span>
                <span className="text-[var(--color-muted)] flex items-center gap-1">
                  <Ruler size={12} /> Refractive Index
                </span>
                <span>{product.specs.refractiveIndex}</span>
                <span className="text-[var(--color-muted)] flex items-center gap-1">
                  <RotateCcw size={12} /> Optical Rotation
                </span>
                <span>{product.specs.opticalRotation}</span>
              </div>
            </div>

            {/* GC/MS — Chromatogram + Compound Table */}
            {showGcms && (
              <div className="glass rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary)] mb-3 flex items-center gap-2">
                  <Beaker size={14} /> GC/MS Analysis
                </h3>
                <div className="flex items-center gap-3 mb-3 text-[11px] text-[var(--color-muted)]">
                  <span>Batch: {product.gcmsBatchId}</span>
                  <span className="w-px h-3 bg-[var(--color-border)]" />
                  <span>{gcms!.analysis_date}</span>
                  <span className="w-px h-3 bg-[var(--color-border)]" />
                  <span className="text-[var(--color-accent-green)]">{gcms!.purity_score}</span>
                </div>

                {/* Chromatogram Viewer */}
                <GcmsViewer compounds={gcms!.compounds} />

                {/* Compound Table */}
                <div className="mt-4 grid gap-1.5">
                  {gcms!.compounds.map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center gap-3 text-xs"
                    >
                      <span className="w-32 text-[var(--color-muted)] truncate">{c.name}</span>
                      <div className="flex-1 h-2 rounded-full bg-[var(--color-surface-1)] overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[var(--color-primary)] transition-all"
                          style={{ width: `${Math.min(c.percentage, 100)}%` }}
                        />
                      </div>
                      <span className="w-12 text-right font-mono text-[var(--color-text-main)]">
                        {c.percentage}%
                      </span>
                      <span className="w-28 text-right text-[10px] text-[var(--color-muted)]">
                        {c.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificate of Analysis */}
            <ProductCoAPreview product={product} />

            {/* Badge Rule */}
            {product.badgeRule && (
              <div
                className="rounded-xl p-4 text-xs flex items-center gap-3"
                style={{
                  background: `${product.badgeRule.color}15`,
                  border: `1px solid ${product.badgeRule.color}30`,
                  color: product.badgeRule.color,
                }}
              >
                <Check size={16} />
                <span>
                  {product.badgeRule.badge} —{' '}
                  {product.badgeRule.compound} ≥ {product.badgeRule.min}%
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[rgba(191,111,0,0.1)] text-[var(--color-primary-light)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Related Products */}
            <ProductRelatedGrid product={product} allProducts={allProducts} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
