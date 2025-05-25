'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import FadeIn from '@/components/animations/FadeIn'
import { skillsData } from '@/data/skills'
import { SkillCategory } from '@/types'

interface SkillBarProps {
  skill: { name: string; level: number; icon: React.ComponentType<any> }
  index: number
}

function SkillBar({ skill, index }: SkillBarProps) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full progress-bar"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  )
}

interface SkillCategoryCardProps {
  category: SkillCategory
  skills: { name: string; level: number; icon: React.ComponentType<any> }[]
  index: number
}

function SkillCategoryCard({ category, skills, index }: SkillCategoryCardProps) {
  return (
    <FadeIn delay={index * 0.1}>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-bold capitalize">{category}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {skills.map((skill, idx) => (
            <SkillBar key={skill.name} skill={skill} index={idx} />
          ))}
        </CardContent>
      </Card>
    </FadeIn>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Skills & Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.entries(skillsData) as [SkillCategory, typeof skillsData[SkillCategory]][]).map(
              ([category, skills], index) => (
                <SkillCategoryCard
                  key={category}
                  category={category}
                  skills={skills}
                  index={index}
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}