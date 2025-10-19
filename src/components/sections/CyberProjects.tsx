'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, Terminal } from 'lucide-react';
import { useState } from 'react';

const projects = [
  {
    title: 'AI-DISEASE-DETECTION.SYS',
    description: 'AI-powered early disease detection combining diagnostics with Ayurvedic insights',
    image: '/projects/AI POWERED HEALTHCARE.jpeg',
    technologies: ['Python', 'TensorFlow', 'Phi-2 LLM'],
    github: 'https://github.com/Shubh2310-developer/HC-P1-AI-based-Early-Disease-Detection-System',
    status: 'ACTIVE',
  },
  {
    title: 'TEXT-TO-IMAGE-GEN.AI',
    description: 'Stable Diffusion + CLIP for semantic 2D visual generation from natural language',
    image: '/projects/ST+CLIP.jpeg',
    technologies: ['Python', 'PyTorch', 'Hugging Face'],
    github: 'https://github.com/Shubh2310-developer/Stable-Diffusion',
    status: 'ACTIVE',
  },
  {
    title: 'EMPLOYEE-PERFORMANCE.ML',
    description: 'ML system analyzing HR data to forecast performance based on experience metrics',
    image: '/projects/eMPLOYEE.jpeg',
    technologies: ['Python', 'Random Forest', 'Statsmodel'],
    github: 'https://github.com/Shubh2310-developer/employee-perofrmance-prediction',
    status: 'OPTIMIZED',
  },
  {
    title: 'MULTI-DISEASE-PREDICT.AI',
    description: 'AI system predicting Heart Disease, Diabetes & Parkinsons using logistic regression',
    image: '/projects/HEART.jpeg',
    technologies: ['Python', 'ML', 'Logistic Regression'],
    github: 'https://github.com/Shubh2310-developer/health-care-website',
    status: 'ACTIVE',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Isometric card container */}
      <div className="relative transform perspective-1000">
        <motion.div
          animate={isHovered ? { rotateX: 5, rotateY: 5, z: 20 } : { rotateX: 0, rotateY: 0, z: 0 }}
          transition={{ duration: 0.3 }}
          className="border-2 border-[#00ff41]/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm relative"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Status indicator */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1 border border-[#00ff41]/50 rounded bg-black/80 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
            <span className="font-mono text-xs text-[#00ff41]">{project.status}</span>
          </div>

          {/* Project image */}
          <div className="relative h-56 overflow-hidden border-b-2 border-[#00ff41]/30">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Scanline effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff41]/10 to-transparent animate-scanline pointer-events-none" />
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Terminal prompt style title */}
            <div className="font-mono text-xs text-[#00ff41]/60 mb-2">
              <span className="text-[#00d9ff]">$</span> open project_{index + 1}
            </div>
            <h3 className="text-xl font-heading font-bold text-[#00ff41] mb-3 group-hover:text-[#00d9ff] transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-[#00ff41]/70 mb-4 leading-relaxed font-mono">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-mono border border-[#00ff41]/30 text-[#00ff41]/80 rounded bg-[#00ff41]/5"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-4 border-t border-[#00ff41]/20">
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, x: 3 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 border border-[#00ff41]/50 text-[#00ff41] rounded hover:bg-[#00ff41]/10 transition-colors group/link"
              >
                <Github className="w-4 h-4 group-hover/link:rotate-12 transition-transform" />
                <span className="text-xs font-mono">VIEW_CODE</span>
              </motion.a>
            </div>
          </div>

          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#00d9ff] pointer-events-none" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#00d9ff] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#00d9ff] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#00d9ff] pointer-events-none" />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function CyberProjects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block">
              <div className="font-mono text-[#00ff41]/60 text-sm mb-2">
                <span className="text-[#00d9ff]">$</span> ls -la projects/
              </div>
              <h2 className="text-5xl font-heading font-bold text-[#00ff41] mb-4">
                PROJECT_ARCHIVE
                <span className="text-[#00d9ff] ml-3">[]</span>
              </h2>
              <div className="h-px bg-gradient-to-r from-transparent via-[#00ff41] to-transparent" />
            </div>
            <p className="text-[#00ff41]/70 mt-6 font-mono">
              AI/ML systems • Web applications • Data pipelines
            </p>
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* Terminal output */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="mt-12 border-2 border-[#00ff41]/30 rounded-lg p-6 bg-black/60 backdrop-blur-sm font-mono text-sm"
          >
            <div className="text-[#00ff41]/60">
              <span className="text-[#00d9ff]">$</span> echo "Total projects: {projects.length}"
            </div>
            <div className="text-[#00ff41] mt-2">
              Total projects: {projects.length}
            </div>
            <div className="text-[#00ff41]/60 mt-4">
              <span className="text-[#00d9ff]">$</span> status --all
            </div>
            <div className="text-[#00ff41] mt-2">
              All systems operational. Ready for deployment.
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
