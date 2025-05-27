export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  pdf?: string // Optional link to PDF certificate
  tags: string[]
  description?: string
} 