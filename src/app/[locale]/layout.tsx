import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Toaster } from 'sonner';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeatProvider } from '@/components/effects/HeatProvider';
import { SoundProvider } from '@/contexts/sound';
import { EnquiryProvider } from '@/contexts/enquiry';
import { CartFloat } from '@/components/effects/CartFloat';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { ChatBot } from '@/components/effects/ChatBot';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <HeatProvider>
        <SoundProvider>
        <EnquiryProvider>
          <div className="min-h-dvh flex flex-col bg-[var(--color-bg-base)]">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ScrollProgress />
          <CartFloat />
          <ChatBot />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--color-surface-1)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-main)',
              },
            }}
          />
        </EnquiryProvider>
        </SoundProvider>
      </HeatProvider>
    </NextIntlClientProvider>
  );
}
