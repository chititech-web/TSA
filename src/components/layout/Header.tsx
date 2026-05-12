'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [logo, setLogo] = useState('/images/logo-dark.svg');
  const [mounted, setMounted] = useState(false);

  const isActive = (href: string) => {
    const hrefPath = href.split('#')[0];
    if (hrefPath === `/${locale}`) return pathname === hrefPath;
    return pathname.startsWith(hrefPath);
  };

  useEffect(() => {
    const stored = localStorage.getItem('tsa-theme');
    const initial: 'dark' | 'light' = stored === 'light' || stored === 'dark'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0a0806' : '#F9F7F1');
    localStorage.setItem('tsa-theme', theme);
    setLogo(theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const toggleLang = () => {
    const newLocale = locale === 'en' ? 'hi' : 'en';
    const parts = window.location.pathname.split('/').filter(Boolean);
    if (parts.length > 0 && ['en', 'hi'].includes(parts[0])) parts[0] = newLocale;
    else parts.unshift(newLocale);
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    window.location.href = '/' + parts.join('/');
  };

  const handleLogoEnter = () => setLogo('/images/logo2.svg');
  const handleLogoLeave = () => setLogo(theme === 'dark' ? '/images/logo-dark.svg' : '/images/logo.svg');

  const links = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/academy`, label: t('academy') },
    { href: `/${locale}/why-us`, label: t('why_us') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <nav className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          className="relative flex items-center gap-3 group"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
          onFocus={handleLogoEnter}
          onBlur={handleLogoLeave}
        >
          <img
            key={logo}
            src={logo}
            alt="TS Aromatics"
            className="h-8 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(240,66,27,0.35)]"
            fetchPriority="high"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-semibold transition-colors ${
                  active
                    ? 'text-[var(--color-brand-red)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-brand-red)]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-[0.35rem] h-[2px] rounded-sm bg-[var(--color-brand-red)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full grid place-items-center bg-[var(--color-surface-1)] text-[var(--color-text-main)] hover:scale-105 transition-transform"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          )}

          <button
            onClick={toggleLang}
            className="w-9 h-9 rounded-full grid place-items-center bg-[var(--color-surface-1)] text-[var(--color-text-main)] text-xs font-black hover:scale-105 transition-transform"
            aria-label="Switch language"
          >
            {locale === 'en' ? 'EN' : 'हि'}
          </button>

          <Link
            href={`/${locale}/contact`}
            className="hidden lg:inline-flex items-center px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold hover:scale-105 transition-transform"
          >
            {t('enquiry')}
          </Link>

          <button
            className="lg:hidden w-9 h-9 rounded-full grid place-items-center bg-[var(--color-surface-1)] text-[var(--color-text-main)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden glass border-t border-[var(--color-border)] animate-[fadeSlide_0.3s_ease]">
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  active
                    ? 'text-[var(--color-brand-red)]'
                    : 'text-[var(--color-muted)] hover:text-[var(--color-brand-red)]'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-4 py-3 rounded-full bg-[var(--color-primary)] text-white text-sm font-bold"
              onClick={() => setOpen(false)}
            >
              {t('enquiry')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
