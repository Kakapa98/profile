export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'blockchain' | 'qa' | 'other'
  status: 'completed' | 'in-progress' | 'planned'
  startDate: string
  endDate?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'mobile' | 'blockchain' | 'qa' | 'tools' | 'other'
  proficiency: 1 | 2 | 3 | 4 | 5
  icon?: string
  description?: string
}

export interface Experience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
  technologies: string[]
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate?: string
  description?: string
  achievements?: string[]
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
