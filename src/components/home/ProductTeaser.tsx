'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEnquiry } from '@/contexts/enquiry';
import { ShoppingCart, CheckCheck } from 'lucide-react';
import { getAllProducts } from '@/data/products';

const teaserIds = [
  'extra-virgin-coconut-oil',
  'avocado-oil',
  'sweet-almond-oil',
  'jojoba-oil-carrier',
];

export function ProductTeaser({ locale }: { locale: string }) {
  const t = useTranslations('teaser');
  const { addItem, removeItem, isInCart } = useEnquiry();
  const products = getAllProducts().filter((p) => teaserIds.includes(p.id));

  return (
    <section className="py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-between items-end gap-6 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-[var(--color-primary)] mb-3">
              {t('kicker')}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,2.8rem)] leading-[1.12]">
              {t('title')}
            </h2>
            <p className="text-sm text-[var(--color-muted)] max-w-[660px] mt-2">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="hidden sm:inline-flex items-center gap-1 text-[var(--color-primary)] font-extrabold text-sm hover:brightness-110 transition-all"
          >
            {t('cta')} &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const inCart = isInCart(product.id);
            return (
            <div
              key={product.id}
              className="group bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] will-change-transform"
            >
              <Link href={`/${locale}/products/${product.id}`}>
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-[450ms] group-hover:scale-106"
                    loading="lazy"
                  />
                  {product.badge && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgba(25,18,11,0.78)] text-[var(--color-primary)] backdrop-blur-sm z-[5]">
                      {product.badge}
                    </span>
                  )}
                </div>
              </Link>
              <div className="p-5">
                <Link href={`/${locale}/products/${product.id}`}>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-bold mb-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed line-clamp-2 mb-3">
                  {product.desc}
                </p>
                <button
                  onClick={() => inCart ? removeItem(product.id) : addItem({ id: product.id, name: product.name })}
                  className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all active:scale-[0.97] ${
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
          })}
        </div>
      </div>
    </section>
  );
}
