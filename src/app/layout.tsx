import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, Great_Vibes } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: '10 Meses de Nós',
  description: 'Uma celebração do nosso amor — 10 meses de história, sorrisos e cumplicidade.',
  openGraph: {
    title: '10 Meses de Nós',
    description: 'Uma celebração do nosso amor — 10 meses de história, sorrisos e cumplicidade.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0c0a09',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-script',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${dmSans.variable} ${greatVibes.variable} grain`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/img/jean8.jpeg" />
        <link rel="preload" as="image" href="/img/jean3.jpeg" />
        <link rel="preload" as="image" href="/img/jean2.jpeg" />
      </head>
      <body className="font-body">
        {children}
      </body>
    </html>
  )
}