'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Award, Users, Coffee } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import FadeIn from '@/components/animations/FadeIn'
import Link from 'next/link'

const stats = [
  { icon: Award, label: 'Years Experience', value: '5+' },
  { icon: Users, label: 'Projects Completed', value: '50+' },
  { icon: Coffee, label: 'Cups of Coffee', value: '∞' },
]

export function About() {
  return (
    <section
      id="about"
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            About Me
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-64 h-64 mx-auto md:mx-0">
              <Image
                src="/Shubh-Avatar.jpeg"
                alt="Shubh's profile picture"
                fill
                className="rounded-full object-cover"
                priority
              />
            </div>
            
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                I'm a passionate software engineer with a strong focus on AI and web development.
                With several years of experience in building scalable applications and
                implementing cutting-edge AI solutions, I strive to create impactful
                technology that makes a difference.
              </p>
              
              <p className="text-lg text-muted-foreground">
                My journey in tech has led me through various roles, from full-stack
                development to AI research. I'm particularly interested in the
                intersection of AI and web technologies, and how they can be used to
                create more intelligent and user-friendly applications.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/resume/ShubhShahResume.pdf">
                    Download Resume
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}