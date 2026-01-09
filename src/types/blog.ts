export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  date: string
  read_time: string
  category: string
  tags: string[]
  image?: string
  published: boolean
}

export interface BlogCategory {
  name: string
  slug: string
  description: string
  color: string
}

