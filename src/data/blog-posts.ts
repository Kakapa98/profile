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
  }
]

export const blogPosts: BlogPost[] = [
  // Add your blog posts here
  // Example:
  // {
  //   id: '1',
  //   title: 'Your Blog Post Title',
  //   excerpt: 'A brief summary of your post',
  //   content: `Your full blog post content here...`,
  //   author: 'Mpho Mofokeng',
  //   date: '2025-01-20',
  //   readTime: '5 min read',
  //   category: 'Quality Assurance',
  //   tags: ['Tag1', 'Tag2'],
  //   published: true
  // }
]

// Helper function to get posts by category
export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post =>
    post.category.toLowerCase() === category.toLowerCase() && post.published
  )
}

// Helper function to get recent posts
export const getRecentPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit)
}

// Helper function to get post by slug
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.published)
}