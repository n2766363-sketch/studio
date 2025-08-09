import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Nexus Learn',
  description: 'The central hub for modern learning.',
};

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
