import { BlogPost, BlogCategory } from '@/types/blog'

export const blogCategories: BlogCategory[] = [
  {
    name: 'Quality Assurance',
    slug: 'qa',
    description: 'Testing strategies, automation, and QA best practices',
    color: 'primary'
  },
  {
    name: 'Blockchain',
    slug: 'blockchain',
    description: 'Web3, smart contracts, and decentralized technologies',
    color: 'secondary'
  },
  {
    name: 'Education',
    slug: 'education',
    description: 'Teaching, mentorship, and learning experiences',
    color: 'purple'
  },
  {
    name: 'Technology',
    slug: 'technology',
    description: 'Software development, tools, and industry insights',
    color: 'blue'
  },
  {
    name: 'Personal',
    slug: 'personal',
    description: 'Personal stories, experiences, and reflections',
    color: 'green'
  }
]

// Helper functions to get posts from localStorage
export const getBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return []
  const storedPosts = localStorage.getItem('blog_posts')
  if (storedPosts) {
    try {
      return JSON.parse(storedPosts)
    } catch (error) {
      console.error('Error loading posts:', error)
      return []
    }
  }
  return []
}

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  const posts = getBlogPosts()
  return posts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase() && post.published
  )
}

// Helper function to get recent posts
export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  const posts = getBlogPosts()
  return posts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getBlogPosts()
  return posts.find(post => post.slug === slug && post.published)
}

// For static generation, we need to export an empty array initially
export const blogPosts: BlogPost[] = []