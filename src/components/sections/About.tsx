'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Download, Brain, Code2, Rocket } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState, useRef } from 'react'

export function About() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    setMousePosition({ x, y })
  }

  const rotateX = useTransform(useSpring(mousePosition.y), [-1, 1], [5, -5])
  const rotateY = useTransform(useSpring(mousePosition.x), [-1, 1], [-5, 5])

  return (
    <section
      id="about"
      className="py-32 relative overflow-hidden"
    >
      {/* Aurora wave background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-transparent"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          style={{
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
              Who I Am
            </span>
          </h2>

          <p className="text-center text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
            Engineering the convergence of intelligence and creativity
          </p>

          {/* Glass morphism card with 3D tilt */}
          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
            className="glass rounded-3xl p-8 sm:p-12 relative"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Holographic glow on hover */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/0 via-accent/10 to-primary/0 opacity-0 hover:opacity-100 transition-opacity duration-500" />

            <div className="relative space-y-8">
              {/* Philosophy sections */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-primary/10 border border-primary/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Brain className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">What Drives Me</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I'm a passionate software engineer with a strong focus on AI and web development.
                      With several years of experience in building scalable applications and
                      implementing cutting-edge AI solutions, I strive to create impactful
                      technology that makes a difference.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-accent/10 border border-accent/30"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <Code2 className="w-6 h-6 text-accent" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">My Journey</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      My journey in tech has led me through various roles, from full-stack
                      development to AI research. I'm particularly interested in the
                      intersection of AI and web technologies, and how they can be used to
                      create more intelligent and user-friendly applications.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-xl bg-primary/10 border border-primary/30"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Rocket className="w-6 h-6 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">Vision</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      I am a results-driven Data Analyst with a Bachelor's degree in Artificial Intelligence and Data Science, complemented by hands-on internships and certifications in Machine Learning, Python, and Data Structures. With strong skills in Python, SQL, data visualization, and AI automation, I specialize in transforming raw data into actionable insights and intelligent solutions. My academic foundation is enriched by real-world experience in AI/ML through projects like AI-based Early Disease Detection and Employee Performance Prediction, demonstrating my ability to integrate machine learning with domain-specific problems. Passionate about continuous learning and innovation, I aim to contribute meaningfully to data-driven decision-making and AI-powered transformation in organizations.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center pt-4"
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 py-6 text-lg font-heading glow-on-hover group"
                  >
                    <Link href="/resume/ShubhShahResume (1).pdf" className="flex items-center gap-2">
                      <Download className="w-5 h-5 group-hover:animate-bounce" />
                      Download Resume
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}