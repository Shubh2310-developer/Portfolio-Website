import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ParticleBackground from '@/components/background/ParticleBackground'
import AICursor from '@/components/ui/AICursor'
import CommandPalette from '@/components/ui/CommandPalette'
import ThemeToggle from '@/components/ui/ThemeToggle'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3002'),
  title: 'Ghost - AI Engineer | Engineering the Future of Intelligence',
  description: 'Personal portfolio of an AI Engineer merging technical mastery with digital artistry. Showcasing innovative AI projects and cutting-edge development.',
  keywords: ['AI Engineer', 'Machine Learning', 'Artificial Intelligence', 'Full Stack Developer', 'Neural Networks', 'Deep Learning'],
  authors: [{ name: 'Ghost' }],
  openGraph: {
    title: 'Ghost - AI Engineer | Engineering the Future of Intelligence',
    description: 'Personal portfolio of an AI Engineer merging technical mastery with digital artistry.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          {/* Three.js Neural Network Background */}
          <ParticleBackground />

          {/* Custom AI Cursor */}
          <AICursor />

          {/* Command Palette */}
          <CommandPalette />

          {/* Theme Toggle */}
          <ThemeToggle />

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