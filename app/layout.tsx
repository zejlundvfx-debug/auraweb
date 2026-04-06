import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aura - Din AI email assistent til macOS',
  description: 'Aura er en AI-drevet email assistent til macOS der sorterer, skriver og optimerer dine emails automatisk. Gratis i beta. Ingen kreditkort.',
  metadataBase: new URL('https://auraemail.app'),
  keywords: [
    'AI email assistent', 'email app macOS', 'AI indbakke', 'email produktivitet',
    'automatisk email', 'smart indbakke', 'Aura email', 'Gmail assistent',
    'email AI dansk', 'tidsregistrering automatisk', 'skattefradrag AI',
  ],
  alternates: {
    canonical: 'https://auraemail.app',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Aura - Din AI email assistent til macOS',
    description: 'Sorterer, skriver og optimerer dine emails med AI. Gratis i beta. Ingen kreditkort.',
    url: 'https://auraemail.app',
    siteName: 'Aura',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Aura - AI email assistent' }],
    locale: 'da_DK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura - Din AI email assistent til macOS',
    description: 'Sorterer, skriver og optimerer dine emails med AI. Gratis i beta.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="da" className="scroll-smooth">
      <body className="bg-white text-slate-900 antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}