import { ContactForm } from '@/components/contact/ContactForm';

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return (
    <section className="py-20 px-6">
      <div className="max-w-[600px] mx-auto text-center mb-10">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] mb-4">
          Contact
        </h1>
        <p className="text-sm text-[var(--color-muted)]">
          Tell us about your formulation needs and our technical team will respond within 24 hours.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
