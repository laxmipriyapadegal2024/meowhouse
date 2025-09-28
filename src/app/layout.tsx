import type { Metadata } from 'next';
import { Inter, Dancing_Script, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  variable: '--font-dancing-script',
});

const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'Dishcovery',
  description: 'Your personal recipe finder, generator, and forum',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dancingScript.variable} ${playfairDisplay.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
