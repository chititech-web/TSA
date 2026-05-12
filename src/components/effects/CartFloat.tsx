'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEnquiry } from '@/contexts/enquiry';
import { ShoppingCart, X } from 'lucide-react';

export function CartFloat() {
  const t = useTranslations('contact');
  const { items, removeItem, clearAll, count } = useEnquiry();
  const [open, setOpen] = useState(false);

  if (count === 0 && !open) return null;

  return (
    <>
      {count > 0 && (
        <button
          onClick={() => setOpen(!open)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--color-primary)] text-white shadow-lg hover:brightness-110 transition-all active:scale-[0.96]"
          aria-label="Open enquiry cart"
        >
          <ShoppingCart size={18} />
          <span className="font-bold text-sm">{count}</span>
        </button>
      )}

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 max-[360px]:w-[calc(100vw-2rem)] max-[360px]:right-3 max-[360px]:left-3 glass rounded-2xl border border-[var(--color-border)] shadow-2xl overflow-hidden animate-[fadeSlide_0.2s_ease-out]">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
            <h3 className="text-xs font-bold uppercase tracking-[0.06em]">Enquiry Cart</h3>
            <div className="flex items-center gap-2">
              {count > 0 && (
                <button onClick={clearAll} className="text-[10px] text-[var(--color-muted)] hover:text-[var(--color-brand-red)] transition-colors">
                  Clear
                </button>
              )}
              <button onClick={() => setOpen(false)} className="text-[var(--color-muted)] hover:text-[var(--color-text-main)] transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-5 py-6 text-xs text-[var(--color-muted)] text-center">
                Your enquiry cart is empty.{' '}
                <Link href="/products" className="text-[var(--color-primary)] font-bold">
                  Browse products
                </Link>
              </div>
            ) : (
              <div className="flex flex-col">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] last:border-0">
                    <span className="text-xs text-[var(--color-text-main)]">{item.name}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[var(--color-muted)] hover:text-[var(--color-brand-red)] transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {count > 0 && (
            <div className="px-5 py-4 border-t border-[var(--color-border)]">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm hover:brightness-110 transition-all active:scale-[0.98]"
              >
                {t('submit')}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
