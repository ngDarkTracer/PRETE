import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Notification from '@/components/ui/Notification';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PRETE — Plateforme Nationale de Transparence et de Gestion',
  description:
    "Plateforme centrale au service de la transparence, de l'information publique et de la gestion opérationnelle du mécanisme de financement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
          <Notification />
        </Providers>
      </body>
    </html>
  );
}
