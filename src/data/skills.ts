import { 
  Code2, 
  Database, 
  Server, 
  Cpu, 
  Wrench, 
  Globe, 
  Layers, 
  Terminal 
} from 'lucide-react'
import { Skill, SkillCategory } from '@/types'

export const skillsData: Record<SkillCategory, Skill[]> = {
  frontend: [
    { name: 'HTML/CSS', level: 90, icon: Code2, category: 'frontend' },
    { name: 'JavaScript', level: 70, icon: Code2, category: 'frontend' },
    { name: 'React', level: 65, icon: Layers, category: 'frontend' },
    { name: 'TypeScript', level: 70, icon: Code2, category: 'frontend' },
    { name: 'Next.js', level: 65, icon: Globe, category: 'frontend' },
  ],
  backend: [
    { name: 'Node.js', level: 80, icon: Server, category: 'backend' },
    { name: 'Python', level: 85, icon: Terminal, category: 'backend' },
    { name: 'Express.js', level: 75, icon: Server, category: 'backend' },
    { name: 'REST APIs', level: 75, icon: Server, category: 'backend' },
  ],
  devops: [
    { name: 'Docker', level: 75, icon: Wrench, category: 'devops' },
    { name: 'Git', level: 90, icon: Terminal, category: 'devops' },
    { name: 'CI/CD', level: 80, icon: Wrench, category: 'devops' },
    { name: 'AWS', level: 70, icon: Server, category: 'devops' },
  ],
  ai: [
    { name: 'Machine Learning', level: 90, icon: Cpu, category: 'ai' },
    { name: 'Deep Learning', level: 75, icon: Cpu, category: 'ai' },
    { name: 'NLP', level: 65, icon: Cpu, category: 'ai' },
    { name: 'Computer Vision', level: 60, icon: Cpu, category: 'ai' },
    { name: 'Generative AI', level: 75, icon: Cpu, category: 'ai' },
  ],
  tools: [
    { name: 'VS Code', level: 95, icon: Wrench, category: 'tools' },
    { name: 'Postman', level: 75, icon: Wrench, category: 'tools' },
    { name: 'MongoDB', level: 80, icon: Database, category: 'tools' },
    { name: 'PostgreSQL', level: 60, icon: Database, category: 'tools' },
  ],
}
