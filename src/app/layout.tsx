import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import CyberHeader from '@/components/layout/CyberHeader'
import CyberFooter from '@/components/layout/CyberFooter'
import MatrixRain from '@/components/background/MatrixRain'
import CommandPalette from '@/components/ui/CommandPalette'

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
      <body className="min-h-screen bg-black font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          {/* Matrix Rain Background */}
          <MatrixRain />

          {/* Cyber Header */}
          <CyberHeader />

          {/* Command Palette */}
          <CommandPalette />

          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
            <CyberFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}