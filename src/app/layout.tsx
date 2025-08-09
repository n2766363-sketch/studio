import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Nexus Learn',
  description: 'The central hub for modern learning.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const mainFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const headlineFont = DM_Sans({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '500', '700'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${mainFont.variable} ${headlineFont.variable} font-body antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
