import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import CyberHeader from '@/components/layout/CyberHeader'
import CyberFooter from '@/components/layout/CyberFooter'
import MatrixRain from '@/components/background/MatrixRain'
import CommandPalette from '@/components/ui/CommandPalette'
import ScrollReset from '@/components/ScrollReset'

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3002'),
  title: 'Shubh Shah - AI Engineer | ML Specialist | Data Scientist',
  description: 'Portfolio of Shubh Shah - AI & Data Science Engineer specializing in Machine Learning, NLP, Generative AI, and Data-Driven Solutions. B.Tech in AI & DS.',
  keywords: ['AI Engineer', 'Machine Learning', 'Data Science', 'NLP', 'Generative AI', 'Python', 'Deep Learning', 'Data Analysis'],
  authors: [{ name: 'Shubh Shah' }],
  openGraph: {
    title: 'Shubh Shah - AI Engineer | ML Specialist',
    description: 'AI & Data Science Engineer | Building intelligent systems that transform data into insights',
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
        <ScrollReset />
        <ThemeProvider>
          {/* Background Effects - Subtle Only */}

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