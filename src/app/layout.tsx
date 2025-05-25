import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3002'),
  title: 'Shubh - Software Engineer & AI Enthusiast',
  description: 'Personal portfolio website showcasing my work as a software engineer and AI enthusiast.',
  keywords: ['software engineer', 'AI developer', 'web development', 'portfolio'],
  authors: [{ name: 'Shubh' }],
  openGraph: {
    title: 'Shubh - Software Engineer & AI Enthusiast',
    description: 'Personal portfolio website showcasing my work as a software engineer and AI enthusiast.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}