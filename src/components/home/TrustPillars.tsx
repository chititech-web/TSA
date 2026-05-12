'use client';

import { useTranslations } from 'next-intl';
import { Shield, FlaskConical, Factory } from 'lucide-react';

const pillars = [
  {
    key: '1', icon: Shield,
    iconBg: 'bg-[rgba(255,184,115,0.14)]',
    iconColor: 'text-[var(--color-primary)]',
    titleColor: 'text-[var(--color-primary)]',
    hoverBg: 'group-hover:bg-[#BF6F00]',
  },
  {
    key: '2', icon: FlaskConical,
    iconBg: 'bg-[rgba(156,213,150,0.14)]',
    iconColor: 'text-[var(--color-secondary)]',
    titleColor: 'text-[var(--color-secondary)]',
    hoverBg: 'group-hover:bg-[#2C5F2D]',
  },
  {
    key: '3', icon: Factory,
    iconBg: 'bg-[rgba(193,122,96,0.14)]',
    iconColor: 'text-[#C17A60]',
    titleColor: 'text-[#C17A60]',
    hoverBg: 'group-hover:bg-[#C17A60]',
  },
];

export function TrustPillars() {
  const t = useTranslations('pillars');

  return (
    <section className="py-20 px-6 bg-[rgba(245,239,232,0.02)]">
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-6">
        {pillars.map(({ key, icon: Icon, iconBg, iconColor, titleColor, hoverBg }) => (
          <article
            key={key}
            className="group glass rounded-2xl p-8 flex flex-col gap-4 transition-all duration-500"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:text-white ${iconBg} ${iconColor} ${hoverBg}`}
            >
              <Icon size={24} />
            </div>
            <h2 className={`font-[family-name:var(--font-display)] text-xl ${titleColor}`}>
              {t(`${key}_title`)}
            </h2>
            <p className="text-sm text-[var(--color-muted)]">{t(`${key}_desc`)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
