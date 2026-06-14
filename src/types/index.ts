export interface Profile {
  name: string
  title: { zh: string; en: string }
  avatar: string
  bio: { zh: string; en: string }
  email: string
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

export interface Project {
  id: string
  title: string
  description: { zh: string; en: string }
  thumbnail: string
  techTags: string[]
  sourceUrl?: string
  demoUrl?: string
  detail?: {
    background: { zh: string; en: string }
    approach: { zh: string; en: string }
    result: { zh: string; en: string }
  }
}

export interface Skill {
  name: string
  category: 'backend' | 'frontend' | 'tools'
}
