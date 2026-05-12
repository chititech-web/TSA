'use client';

import { useActionState } from 'react';
import { useTranslations } from 'next-intl';
import { useEnquiry } from '@/contexts/enquiry';
import { X } from 'lucide-react';
import { submitContact } from '@/app/actions/contact';

export function ContactForm() {
  const t = useTranslations('contact');
  const { items: enquiryItems, removeItem, clearAll } = useEnquiry();
  const [state, formAction, pending] = useActionState(submitContact, {});

  if (state.success) {
    return (
      <div className="glass rounded-2xl p-8 text-center max-w-[500px] mx-auto animate-[fadeSlide_0.3s_ease-out]">
        <p className="text-[var(--color-accent-green)] font-semibold text-sm">
          {t('success')}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="glass rounded-2xl p-8 max-w-[600px] mx-auto">
      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
            {t('name')} <span className="text-[var(--color-brand-red)]">*</span>
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full h-11 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          {state.fieldErrors?.name?.map((e) => (
            <p key={e} className="text-[10px] text-[var(--color-brand-red)] mt-1">{e}</p>
          ))}
        </div>
        <div>
          <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
            {t('email')} <span className="text-[var(--color-brand-red)]">*</span>
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full h-11 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
          />
          {state.fieldErrors?.email?.map((e) => (
            <p key={e} className="text-[10px] text-[var(--color-brand-red)] mt-1">{e}</p>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
            {t('company')}
          </label>
          <input
            name="company"
            type="text"
            className="w-full h-11 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
            {t('quantity')}
          </label>
          <input
            name="quantity"
            type="text"
            className="w-full h-11 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors"
          />
        </div>
      </div>

      <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
        {t('products')}
      </label>
      {enquiryItems.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {enquiryItems.map((item) => (
            <span
              key={item.id}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-[rgba(191,111,0,0.1)] text-[var(--color-primary-light)] border border-[rgba(191,111,0,0.2)]"
            >
              {item.name}
              <button type="button" onClick={() => removeItem(item.id)} className="hover:text-[var(--color-brand-red)] transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
          {enquiryItems.length > 1 && (
            <button type="button" onClick={clearAll} className="text-[10px] text-[var(--color-muted)] hover:text-[var(--color-brand-red)] transition-colors">
              Clear all
            </button>
          )}
          <input type="hidden" name="products" value={enquiryItems.map((i) => i.name).join(', ')} />
        </div>
      ) : (
        <input
          name="products"
          type="text"
          placeholder="e.g. Coconut Oil, Lavender Oil"
          className="w-full h-11 px-4 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors mb-4"
        />
      )}

      <label className="text-xs text-[var(--color-muted)] mb-1.5 block">
        {t('message')} <span className="text-[var(--color-brand-red)]">*</span>
      </label>
      <textarea
        name="message"
        required
        rows={4}
        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface-1)] border border-[var(--color-border)] text-sm text-[var(--color-text-main)] outline-none focus:border-[var(--color-primary)] transition-colors mb-6 resize-none"
      />
      {state.fieldErrors?.message?.map((e) => (
        <p key={e} className="text-[10px] text-[var(--color-brand-red)] mb-2">{e}</p>
      ))}

      {state.error && (
        <p className="text-xs text-[var(--color-brand-red)] mb-4">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full h-11 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm hover:brightness-110 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? '...' : t('submit')}
      </button>
    </form>
  );
}
