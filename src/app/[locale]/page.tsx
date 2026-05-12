import { Hero } from '@/components/home/Hero';
import { TrustPillars } from '@/components/home/TrustPillars';
import { ProductTeaser } from '@/components/home/ProductTeaser';
import { ButterGrid } from '@/components/home/ButterGrid';
import { WhyTeaser } from '@/components/home/WhyTeaser';
import { SocialFeed } from '@/components/home/SocialFeed';
import { AcademyTeaser } from '@/components/home/AcademyTeaser';
import { DocLibraryTeaser } from '@/components/home/DocLibraryTeaser';
import { FluidSimManager } from '@/components/effects/FluidSimManager';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <Hero />
      <TrustPillars />
      <ProductTeaser locale={locale} />
      <ButterGrid locale={locale} />
      <WhyTeaser />
      <SocialFeed />
      <AcademyTeaser />
      <DocLibraryTeaser />

      {/* Contact / CTA section */}
      <section className="py-20 px-6">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--color-primary)] mb-3">
            Start a Partnership
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] mb-4">
            Let us match the right oil to your product.
          </h2>
          <p className="text-sm text-[var(--color-muted)] mb-8">
            Share your application, quantity, and documentation needs.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold text-sm hover:brightness-110 transition-all active:scale-95"
          >
            Send Enquiry &rarr;
          </a>
        </div>
      </section>

      <FluidSimManager />
    </>
  );
}
