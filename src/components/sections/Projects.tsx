'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

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

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-24">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover rounded-xl"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-foreground"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
