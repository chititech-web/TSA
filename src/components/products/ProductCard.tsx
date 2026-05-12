'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEnquiry } from '@/contexts/enquiry';
import { ShoppingCart, CheckCheck } from 'lucide-react';
import type { Product } from '@/data/products';

export function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations('products');
  const { addItem, removeItem, isInCart } = useEnquiry();
  const inCart = isInCart(product.id);

  return (
    <div className="glass rounded-2xl overflow-hidden group hover:border-[rgba(255,255,255,0.15)] transition-all duration-500 flex flex-col">
      {/* Image area */}
      <Link href={`/${locale}/products/${product.id}`}>
        <div className="relative h-48 bg-[var(--color-surface-1)] flex items-center justify-center p-6">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--color-primary)] text-white">
              {product.badge}
            </span>
          )}
        </div>
      </Link>
      
      {/* Content area */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <Link href={`/${locale}/products/${product.id}`}>
          <h3 className="font-[family-name:var(--font-heading)] text-base font-bold leading-tight">
            {product.name}
          </h3>
        </Link>
        {product.botanicalName && (
          <p className="text-[11px] italic text-[var(--color-muted)]">
            {product.botanicalName}
          </p>
        )}
        <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2">
          {product.desc}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[rgba(191,111,0,0.1)] text-[var(--color-primary-light)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Enquiry button */}
        <button
          onClick={() => inCart ? removeItem(product.id) : addItem({ id: product.id, name: product.name })}
          className={`w-full mt-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
            inCart
              ? 'bg-[var(--color-brand-red)] text-white'
              : 'border border-[var(--color-border)] text-[var(--color-text-main)] hover:border-[var(--color-primary)]'
          }`}
        >
          {inCart ? <CheckCheck size={14} /> : <ShoppingCart size={14} />}
          {inCart ? 'Added to Enquiry' : 'Add to Enquiry'}
        </button>
      </div>
    </div>
  );
}
