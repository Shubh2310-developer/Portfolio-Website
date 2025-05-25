export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'AI-Powered Chat Application',
    description: 'A real-time chat application with AI-powered responses and sentiment analysis. Features include natural language processing, real-time message delivery, and user authentication.',
    image: '/projects/ai-chat.jpg',
    technologies: ['React', 'Node.js', 'TensorFlow', 'WebSocket', 'MongoDB'],
    github: 'https://github.com/shubh/ai-chat',
    demo: 'https://ai-chat.vercel.app',
    featured: true
  },
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management, secure payment processing, and an intuitive admin dashboard.',
    image: '/projects/ecommerce.jpg',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma'],
    github: 'https://github.com/shubh/ecommerce',
    demo: 'https://ecommerce.vercel.app',
    featured: true
  },
  {
    title: 'Machine Learning Dashboard',
    description: 'Interactive dashboard for visualizing and analyzing machine learning models. Includes real-time data processing and custom visualization tools.',
    image: '/projects/ml-dashboard.jpg',
    technologies: ['Python', 'React', 'D3.js', 'FastAPI', 'TensorFlow'],
    github: 'https://github.com/shubh/ml-dashboard',
    demo: 'https://ml-dashboard.vercel.app',
    featured: true
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management system with real-time updates, team features, and project analytics.',
    image: '/projects/task-manager.jpg',
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux', 'TypeScript'],
    github: 'https://github.com/shubh/task-manager',
    demo: 'https://task-manager.vercel.app',
    featured: true
  },
  {
    title: 'Weather Forecast App',
    description: 'Real-time weather forecasting application with location-based services and interactive maps.',
    image: '/projects/weather-app.jpg',
    technologies: ['React', 'OpenWeather API', 'Leaflet', 'TypeScript'],
    github: 'https://github.com/shubh/weather-app',
    demo: 'https://weather-app.vercel.app'
  },
  {
    title: 'Portfolio Website',
    description: 'Personal portfolio website showcasing projects and skills with modern design and animations.',
    image: '/projects/portfolio.jpg',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    github: 'https://github.com/shubh/portfolio',
    demo: 'https://shubh-portfolio.vercel.app'
  }
]
