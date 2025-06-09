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
          
          <div className="grid grid-cols-1 gap-12 items-center">
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
              
              <p className="text-lg text-muted-foreground">
                I am a results-driven Data Analyst with a Bachelor’s degree in Artificial Intelligence and Data Science, complemented by hands-on internships and certifications in Machine Learning, Python, and Data Structures. With strong skills in Python, SQL, data visualization, and AI automation, I specialize in transforming raw data into actionable insights and intelligent solutions. My academic foundation is enriched by real-world experience in AI/ML through projects like AI-based Early Disease Detection and Employee Performance Prediction, demonstrating my ability to integrate machine learning with domain-specific problems. Passionate about continuous learning and innovation, I aim to contribute meaningfully to data-driven decision-making and AI-powered transformation in organizations.


              </p>
              
              <motion.div
                className="flex justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg">
                  <Link href="/resume/ShubhShahResume-2.pdf">
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