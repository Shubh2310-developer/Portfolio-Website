'use client'

import { motion } from 'framer-motion'
import { useTypewriter } from '@/hooks/useTypewriter'

interface TypeWriterProps {
  words: string[]
  loop?: boolean
  delay?: number
  className?: string
}

export default function TypeWriter({
  words,
  loop = true,
  delay = 2000,
  className = '',
}: TypeWriterProps) {
  const { text } = useTypewriter({
    words,
    loop,
    delay,
  })

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="inline-block ml-1"
      >
        |
      </motion.span>
    </motion.span>
  )
}
