import { Certificate } from '@/types/certificate'

export const certificates: Certificate[] = [
  {
    id: '1',
    title: 'AWS Certified Solutions Architect',
    issuer: 'Amazon Web Services',
    date: '2024',
    url: 'https://aws.amazon.com/certification/',
    tags: ['Cloud', 'AWS', 'Architecture'],
    description: 'Professional certification for designing distributed systems on AWS'
  },
  {
    id: '2',
    title: 'Google Cloud Professional Developer',
    issuer: 'Google Cloud',
    date: '2023',
    url: 'https://cloud.google.com/certification',
    tags: ['Cloud', 'GCP', 'Development'],
    description: 'Expertise in building scalable and reliable applications using Google Cloud'
  },
  {
    id: '3',
    title: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    date: '2023',
    url: 'https://www.microsoft.com/en-us/learning/',
    tags: ['Cloud', 'Azure', 'Development'],
    description: 'Designing and building cloud solutions on Microsoft Azure'
  },
  {
    id: '4',
    title: 'Full Stack Web Development',
    issuer: 'Meta',
    date: '2023',
    url: 'https://www.meta.com/',
    tags: ['Web Development', 'React', 'Node.js'],
    description: 'Comprehensive full-stack development certification'
  },
  {
    id: '5',
    title: 'Machine Learning Specialization',
    issuer: 'Stanford Online',
    date: '2023',
    url: 'https://online.stanford.edu/',
    tags: ['AI', 'Machine Learning', 'Data Science'],
    description: 'Advanced machine learning and AI concepts'
  },
  {
    id: '6',
    title: 'DevOps Engineering',
    issuer: 'Google Cloud',
    date: '2023',
    url: 'https://cloud.google.com/',
    tags: ['DevOps', 'CI/CD', 'Cloud'],
    description: 'DevOps practices and tools certification'
  }
] 