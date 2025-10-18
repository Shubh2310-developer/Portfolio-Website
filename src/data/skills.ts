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
    { name: 'JavaScript', level: 85, icon: Code2, category: 'frontend' },
    { name: 'React', level: 80, icon: Layers, category: 'frontend' },
    { name: 'TypeScript', level: 75, icon: Code2, category: 'frontend' },
    { name: 'Next.js', level: 80, icon: Globe, category: 'frontend' },
  ],
  backend: [
    { name: 'Python', level: 95, icon: Terminal, category: 'backend' },
    { name: 'SQL', level: 90, icon: Database, category: 'backend' },
    { name: 'FastAPI', level: 85, icon: Server, category: 'backend' },
    { name: 'REST APIs', level: 85, icon: Server, category: 'backend' },
  ],
  devops: [
    { name: 'AWS (S3, EC2)', level: 85, icon: Wrench, category: 'devops' },
    { name: 'Git', level: 90, icon: Terminal, category: 'devops' },
    { name: 'Redis', level: 75, icon: Database, category: 'devops' },
    { name: 'ETL', level: 80, icon: Wrench, category: 'devops' },
  ],
  ai: [
    { name: 'Machine Learning', level: 95, icon: Cpu, category: 'ai' },
    { name: 'NLP', level: 90, icon: Cpu, category: 'ai' },
    { name: 'Generative AI', level: 85, icon: Cpu, category: 'ai' },
    { name: 'Data Visualization', level: 90, icon: Cpu, category: 'ai' },
    { name: 'AI Automation', level: 85, icon: Cpu, category: 'ai' },
  ],
  tools: [
    { name: 'R Studio', level: 80, icon: Wrench, category: 'tools' },
    { name: 'PostgreSQL', level: 85, icon: Database, category: 'tools' },
    { name: 'MongoDB', level: 85, icon: Database, category: 'tools' },
    { name: 'DSA', level: 90, icon: Code2, category: 'tools' },
  ],
}
