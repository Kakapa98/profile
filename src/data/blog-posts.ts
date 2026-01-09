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

// Legacy helper functions for localStorage (kept for backward compatibility)
// Note: The app now uses Supabase, but these are kept for migration purposes

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

// Helper to migrate localStorage posts to Supabase
export const getLocalStoragePosts = (): BlogPost[] => {
  return getBlogPosts()
}

// For static generation, we need to export an empty array initially
export const blogPosts: BlogPost[] = []