'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { skillsData } from '@/data/skills'
import { SkillCategory } from '@/types'
import { useState } from 'react'

interface RadialChartProps {
  skill: { name: string; level: number; icon: React.ComponentType<any> }
  index: number
}

function RadialChart({ skill, index }: RadialChartProps) {
  const Icon = skill.icon
  const [isHovered, setIsHovered] = useState(false)

  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (skill.level / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center space-y-3 group"
    >
      {/* Radial progress circle */}
      <div className="relative">
        <svg width="100" height="100" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
            opacity="0.2"
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Icon in center */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={isHovered ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </motion.div>

        {/* Percentage badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-accent text-background text-xs font-bold flex items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 1 }}
          viewport={{ once: true }}
        >
          {skill.level}
        </motion.div>

        {/* Pulse effect on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-accent"
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        )}
      </div>

      {/* Skill name */}
      <motion.span
        className="text-sm font-medium text-center text-muted-foreground group-hover:text-accent transition-colors"
        animate={isHovered ? { y: -5 } : { y: 0 }}
      >
        {skill.name}
      </motion.span>
    </motion.div>
  )
}

interface SkillCategoryCardProps {
  category: SkillCategory
  skills: { name: string; level: number; icon: React.ComponentType<any> }[]
  index: number
}

function SkillCategoryCard({ category, skills, index }: SkillCategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const categoryIcons: Record<SkillCategory, string> = {
    frontend: '⚡',
    backend: '🔧',
    devops: '☁️',
    ai: '🤖',
    tools: '🛠️',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass rounded-3xl p-8 relative overflow-hidden holographic-glow"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-8">
          <motion.div
            className="text-4xl"
            animate={isHovered ? { rotate: [0, -10, 10, -10, 0], scale: 1.1 } : { rotate: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {categoryIcons[category]}
          </motion.div>
          <h3 className="text-2xl font-heading font-bold capitalize bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {category}
          </h3>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-2 gap-6">
          {skills.map((skill, idx) => (
            <RadialChart key={skill.name} skill={skill} index={idx} />
          ))}
        </div>
      </div>

      {/* Neural activation nodes */}
      {isHovered && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-accent rounded-full"
              style={{
                top: `${20 + i * 30}%`,
                right: `${10 + i * 5}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-32 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-[#0f172a] to-background opacity-50" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
                Technical Mastery
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Neural network-powered expertise across the full AI engineering stack
            </p>
          </div>

          {/* Skills grid */}
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