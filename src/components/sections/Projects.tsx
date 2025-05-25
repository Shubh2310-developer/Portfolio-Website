'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'AI-Powered Chat Application',
    description: 'A real-time chat application with AI-powered responses and sentiment analysis.',
    image: '/projects/project1.jpg',
    technologies: ['React', 'Node.js', 'TensorFlow', 'WebSocket'],
    github: 'https://github.com/sam/ai-chat',
    demo: 'https://ai-chat-demo.vercel.app',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory and payment processing.',
    image: '/projects/project2.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    github: 'https://github.com/sam/ecommerce',
    demo: 'https://ecommerce-demo.vercel.app',
  },
  {
    title: 'Machine Learning Dashboard',
    description: 'Interactive dashboard for visualizing and analyzing machine learning models.',
    image: '/projects/project3.jpg',
    technologies: ['Python', 'React', 'D3.js', 'FastAPI'],
    github: 'https://github.com/sam/ml-dashboard',
    demo: 'https://ml-dashboard.vercel.app',
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management system with real-time updates and team features.',
    image: '/projects/project4.jpg',
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
    github: 'https://github.com/sam/task-manager',
    demo: 'https://task-manager.vercel.app',
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Featured Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
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
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Github className="w-5 h-5 mr-2" />
                      Code
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
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
