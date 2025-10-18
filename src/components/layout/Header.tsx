'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Command } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentScroll = window.scrollY
      const progress = (currentScroll / totalScroll) * 100
      setScrollProgress(progress)

      // Determine active section
      const sections = navigation.map(item => item.href.replace('#', ''))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return (
      <header className="fixed top-0 z-50 w-full">
        <div className="glass border-b border-border/50">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  GHOST
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </header>
    )
  }

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary origin-left z-[60]"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
      />

      <header className="fixed top-1 z-50 w-full">
        <div className="glass backdrop-blur-xl bg-background/60 border-b border-border/50">
          <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                className="flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/"
                  className="text-2xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift"
                >
                  GHOST
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-1">
                  {navigation.map((item) => {
                    const isActive = activeSection === item.href.replace('#', '')
                    return (
                      <Link key={item.name} href={item.href}>
                        <motion.div
                          className="relative px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span className={isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'}>
                            {item.name}
                          </span>
                          {isActive && (
                            <motion.div
                              layoutId="activeSection"
                              className="absolute inset-0 bg-accent/10 rounded-lg border border-accent/30"
                              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            />
                          )}
                        </motion.div>
                      </Link>
                    )
                  })}

                  {/* Command palette trigger */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 text-muted-foreground hover:text-accent"
                      aria-label="Open command palette"
                    >
                      <Command className="w-4 h-4 mr-2" />
                      <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                        <span className="text-xs">⌘</span>K
                      </kbd>
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label={isOpen ? 'Close menu' : 'Open menu'}
                  className="hover:bg-accent/10"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </Button>
              </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden overflow-hidden"
                >
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => {
                      const isActive = activeSection === item.href.replace('#', '')
                      return (
                        <Link key={item.name} href={item.href}>
                          <motion.div
                            className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                              isActive
                                ? 'bg-accent/10 text-accent border border-accent/30'
                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                            }`}
                            onClick={() => setIsOpen(false)}
                            whileTap={{ scale: 0.95 }}
                          >
                            {item.name}
                          </motion.div>
                        </Link>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </div>
      </header>
    </>
  )
}