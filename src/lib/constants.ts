export const siteConfig = {
  name: 'Shubh',
  title: 'Shubh - Software Engineer & AI Enthusiast',
  description: 'Personal portfolio website showcasing my projects and skills.',
  url: 'https://shubh-portfolio.vercel.app',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/shubh',
    linkedin: 'https://linkedin.com/in/shubh',
    twitter: 'https://twitter.com/shubh',
    email: 'mailto:shubh@example.com',
  },
}

export const navigation = [
  { name: 'Home', href: '/', },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
]

export const socialLinks = [
  {
    name: 'GitHub',
    icon: 'github',
    url: 'https://github.com/shubh',
  },
  {
    name: 'LinkedIn',
    icon: 'linkedin',
    url: 'https://linkedin.com/in/shubh',
  },
  {
    name: 'Twitter',
    icon: 'twitter',
    url: 'https://twitter.com/shubh',
  },
  {
    name: 'Email',
    icon: 'mail',
    url: 'mailto:shubh@example.com',
  },
]

export const skillsCategories = [
  {
    name: 'Frontend',
    description: 'Modern web development technologies and frameworks',
    icon: 'code',
  },
  {
    name: 'Backend',
    description: 'Server-side technologies and databases',
    icon: 'server',
  },
  {
    name: 'AI/ML',
    description: 'Artificial Intelligence and Machine Learning',
    icon: 'cpu',
  },
  {
    name: 'DevOps',
    description: 'Deployment, infrastructure, and cloud services',
    icon: 'cloud',
  },
  {
    name: 'Tools',
    description: 'Development tools and utilities',
    icon: 'wrench',
  },
]

export const contactInfo = {
  email: 'shubh@example.com',
  location: 'Your Location',
  phone: '+1 234 567 890',
}

export const resumeUrl = '/resume/shubh-resume.pdf'

export const themeConfig = {
  defaultTheme: 'system',
  themes: ['light', 'dark', 'system'],
}

export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideIn: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.5 },
  },
  scaleIn: {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.3 },
  },
}
