'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const roles = [
  'AI Engineer',
  'Architect',
  'Innovator',
  'Creator'
]

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const typingSpeed = 100
    const deletingSpeed = 50
    const waitTime = 2000

    if (isWaiting) {
      const timeout = setTimeout(() => {
        setIsWaiting(false)
        setIsDeleting(true)
      }, waitTime)
      return () => clearTimeout(timeout)
    }

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
        return
      }
      const timeout = setTimeout(() => {
        setCurrentText(currentText.slice(0, -1))
      }, deletingSpeed)
      return () => clearTimeout(timeout)
    }

    if (currentText === currentRole) {
      setIsWaiting(true)
      return
    }

    const timeout = setTimeout(() => {
      setCurrentText(currentRole.slice(0, currentText.length + 1))
    }, typingSpeed)
    return () => clearTimeout(timeout)
  }, [currentText, currentRoleIndex, isDeleting, isWaiting])

  // Parallax mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Gradient background with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0a0f1c] opacity-50"
        style={{
          x: mousePosition.x * 20,
          y: mousePosition.y * 20,
        }}
      />

      {/* Ambient light orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          x: mousePosition.x * 30,
          y: mousePosition.y * 30,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Image Content - Holographic effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative w-full max-w-xl mx-auto aspect-square order-first md:order-none"
            style={{
              x: mousePosition.x * 15,
              y: mousePosition.y * 15,
            }}
          >
            {/* Holographic ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent/30"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-2 border-primary/30"
              animate={{
                scale: [1, 1.05, 1],
                rotate: [360, 180, 0],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Image with glow */}
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 animate-pulse-glow" />
              <Image
                src="/ShubhCyber.jpeg"
                alt="Ghost - AI Engineer"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Floating particles around image */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-accent rounded-full"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${10 + (i % 2) * 80}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold text-foreground"
            >
              Hi, I'm <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">Ghost</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl md:text-3xl font-heading font-medium text-muted-foreground"
            >
              I Engineer Intelligence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-3 justify-center md:justify-start"
            >
              <span className="text-lg text-muted-foreground">I'm an</span>
              <motion.span
                className="text-2xl sm:text-3xl font-heading font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
                key={currentText}
              >
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-[3px] h-[1em] bg-accent ml-1 align-middle"
                />
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed"
            >
              Merging technical mastery with digital artistry to build the future of AI.
              Engineering intelligent systems that blur the line between code and creativity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center pt-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="relative rounded-full px-8 py-6 text-lg font-heading glow-on-hover">
                  <Link href="#projects">View Projects</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToContact}
                  className="rounded-full px-8 py-6 text-lg font-heading border-primary/30 hover:border-accent hover:bg-accent/10"
                >
                  Contact Me
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator with glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="rounded-full hover:bg-accent/10 hover:text-accent"
            aria-label="Scroll Down"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}