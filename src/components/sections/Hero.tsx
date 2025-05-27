'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const roles = [
  'Software Engineer',
  'AI Developer',
  'Problem Solver',
  'Web Developer',
  'Tech Innovator'
]

export function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [isWaiting, setIsWaiting] = useState(false)

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

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden"
    >
      {/* Removed animated background effect */}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground"
            >
              Hi, I'm <span className="text-primary">Shubh</span>
            </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-foreground min-h-[3rem]"
          >
              <span className="inline-block">I'm a </span>
              <motion.span
                className="inline-block text-primary ml-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {currentText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, ease: "easeOut" }}
                  className="inline-block w-[2px] h-[1em] bg-primary ml-[2px] align-middle"
                />
              </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl md:max-w-none"
          >
              A passionate software engineer specializing in AI and web development.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 md:justify-start justify-center"
            >
              <Button asChild size="lg" className="rounded-full px-8 py-3">
                <Link href="#projects">View My Work</Link>
              </Button>
              <Button variant="outline" size="lg" onClick={scrollToContact} className="rounded-full px-8 py-3">
                Contact Me
            </Button>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="relative w-full max-w-sm mx-auto md:max-w-none aspect-square"
          >
            {/* 
              Replace the src with the actual path to your image.
              Ensure your image is in the public directory (e.g., public/images/your-image.png)
            */}
            <Image
              src="/ShubhCyber.jpeg" 
              alt="Shubh - Hero Image" 
              fill
              priority
              className="object-cover rounded-full"
            />
            {/* Add some subtle animation to the image */} 
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, 1, -1, 0] 
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="animate-bounce"
          aria-label="Scroll Down"
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </motion.div>
    </section>
  )
}