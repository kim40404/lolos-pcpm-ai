import type { Metadata, Viewport } from 'next'
import './globals.css'
import { NextAuthProvider } from './Providers'
import Navbar from './components/Navbar'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A192F',
}

export const metadata: Metadata = {
  title: 'Lolos PCPM BI 41 - Platform Latihan Terbaik',
  description: 'Platform latihan dan simulasi TPD PCPM Bank Indonesia Angkatan 41.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
