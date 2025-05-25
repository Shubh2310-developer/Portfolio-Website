'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideInProps {
  children: ReactNode
  delay?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function SlideIn({
  children,
  delay = 0,
  direction = 'left',
  className = '',
}: SlideInProps) {
  const xOffset = direction === 'left' ? -100 : 100

  return (
    <motion.div
      initial={{ x: xOffset, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
