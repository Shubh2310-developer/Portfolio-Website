'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/shubh',
    ariaLabel: 'Visit my GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/in/shubh',
    ariaLabel: 'Connect with me on LinkedIn',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/shubh',
    ariaLabel: 'Follow me on Twitter',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:shubh@example.com',
    ariaLabel: 'Send me an email',
  },
]

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Blog', href: '#blog' },  
  { name: 'Contact', href: '#contact' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

export default function Footer() {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-background border-t border-border">
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="flex justify-center space-x-6 md:order-2"
          variants={itemVariants}
        >
          {socialLinks.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                aria-label={item.ariaLabel}
              >
                <Link href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.icon && <item.icon className="h-5 w-5" />}
                </Link>
              </Button>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-8 md:order-1 md:mt-0"
          variants={itemVariants}
        >
          <motion.div 
            className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-4"
            variants={containerVariants}
          >
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
          
          <motion.div 
            className="flex items-center justify-center md:justify-start text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <span>© 2024 Shubh. Made with</span>
            <motion.span
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Heart className="h-4 w-4 mx-1 text-red-500" />
            </motion.span>
            <span>and lots of coffee.</span>
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  )
}