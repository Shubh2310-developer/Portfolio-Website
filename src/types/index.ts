// Theme Types
export type Theme = 'light' | 'dark' | 'system'

// Navigation Types
export interface NavItem {
  name: string
  href: string
  icon?: string
}

// Social Media Types
export interface SocialLink {
  name: string
  url: string
  icon: string
}

// Project Types
export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  featured?: boolean
}

// Blog Post Types
export interface BlogPost {
  title: string
  slug: string
  description: string
  date: string
  readTime: string
  category: BlogCategory
  image: string
  featured?: boolean
  content?: string
  author?: Author
  tags?: string[]
}

export type BlogCategory = 'AI' | 'Web Development' | 'DevOps' | 'Career'

// Author Types
export interface Author {
  name: string
  image: string
  bio: string
  social?: SocialLink[]
}

// Skill Types
export interface Skill {
  name: string
  level: number
  icon: any
  category: SkillCategory
}

export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'ai' | 'tools'

// Contact Form Types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

// Animation Types
export interface AnimationProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

// Theme Styles Types
export interface ThemeStyles {
  background: string
  text: string
  border: string
  hover: string
  card: string
  input: string
}

export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  success: string
  error: string
  warning: string
}

export interface ThemeGradients {
  primary: string
  secondary: string
  accent: string
}

// Component Props Types
export interface SectionProps {
  id: string
  className?: string
  children: React.ReactNode
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface CardProps {
  title?: string
  description?: string
  image?: string
  className?: string
  children?: React.ReactNode
}

// Layout Types
export interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export interface HeaderProps {
  transparent?: boolean
  className?: string
}

export interface FooterProps {
  className?: string
}

// SEO Types
export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  author?: string
  publishedAt?: string
  modifiedAt?: string
}

// API Response Types
export interface ApiResponse<T> {
  data?: T
  error?: string
  status: number
  message: string
}

// Utility Types
export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }
export type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
