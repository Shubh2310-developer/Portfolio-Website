'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';

const projects = [
  {
    title: 'HC-P1-AI-based-Early-Disease-Detection-System',
    description: 'AI-powered platform for early disease detection combining modern diagnostics with Ayurvedic insights.',
    image: '/projects/AI POWERED HEALTHCARE.jpeg',
    technologies: ['Python', 'Javascript', 'TensorFlow', 'Phi-2 LLM Model'],
    github: 'https://github.com/Shubh2310-developer/HC-P1-AI-based-Early-Disease-Detection-System'
  },
  {
    title: 'Text-to-2D Image Generation using Stable Diffusion and CLIP',
    description: 'Text-to-image generator using Stable Diffusion and CLIP for semantically accurate and high-quality 2D visuals from natural language prompts.',
    image: '/projects/ST+CLIP.jpeg',
    technologies: ['Python', 'Computer Vision', 'Pytorch', 'Hugging Face'],
    github: 'https://github.com/Shubh2310-developer/Stable-Diffusion'
  },
  {
    title: 'Employee Performance Prediction',
    description: 'Employee performance prediction system using machine learning to analyze HR data and forecast performance based on role, experience, and satisfaction metrics.',
    image: '/projects/eMPLOYEE.jpeg',
    technologies: ['Python', 'Javascript', 'Statsmodel', 'Random Forest'],
    github: 'https://github.com/Shubh2310-developer/employee-perofrmance-prediction'
  },
  {
    title: 'AI-Based Disease Prediction System (Heart, Diabetes & Parkinson',
    description: 'AI-powered system that predicts Heart Disease, Diabetes, and Parkinson\'s using logistic regression based on patient data.',
    image: '/projects/HEART.jpeg',
    technologies: ['Python', 'Machine Learning', 'Logistic Regression' ],
    github: 'https://github.com/Shubh2310-developer/health-care-website'
  },
  
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePosition({ x, y });
  };

  const rotateX = useTransform(useSpring(mousePosition.y), [-1, 1], [10, -10]);
  const rotateY = useTransform(useSpring(mousePosition.x), [-1, 1], [-10, 10]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      {/* Animated gradient border */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm animate-border-flow bg-[length:200%_auto]" />

      {/* Card content */}
      <div className="relative glass rounded-2xl overflow-hidden h-full">
        {/* Project image */}
        <div className="relative h-56 overflow-hidden">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Sparkle effect on hover */}
          {isHovered && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-6 h-6 text-accent" />
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <h3 className="text-xl font-heading font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2">
            {project.title}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                viewport={{ once: true }}
                className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/30 rounded-full"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-2">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors group/link"
            >
              <Github className="w-5 h-5 group-hover/link:rotate-12 transition-transform" />
              <span className="text-sm font-medium">View Code</span>
            </motion.a>
          </div>
        </div>

        {/* Bottom glow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-accent rounded-full pointer-events-none"
              style={{
                top: `${20 + i * 15}%`,
                left: `${10 + i * 20}%`,
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: [-20, -40],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-32 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

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
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building intelligent systems that push the boundaries of AI innovation
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
