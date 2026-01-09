import { BlogPost } from '@/types/blog'

/**
 * Blog utility functions for managing blog posts
 */

// Storage key for blog posts
const STORAGE_KEY = 'blog_posts'

/**
 * Get all blog posts from localStorage
 */
export const getAllPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const storedPosts = localStorage.getItem(STORAGE_KEY)
    if (storedPosts) {
      return JSON.parse(storedPosts)
    }
  } catch (error) {
    console.error('Error loading posts:', error)
  }
  
  return []
}

/**
 * Save all blog posts to localStorage
 */
export const savePosts = (posts: BlogPost[]): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch (error) {
    console.error('Error saving posts:', error)
  }
}

/**
 * Get a single post by ID
 */
export const getPostById = (id: string): BlogPost | undefined => {
  const posts = getAllPosts()
  return posts.find(post => post.id === id)
}

/**
 * Get a single post by slug
 */
export const getPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug)
}

/**
 * Create a new blog post
 */
export const createPost = (postData: Omit<BlogPost, 'id'>): BlogPost => {
  const posts = getAllPosts()
  
  const newPost: BlogPost = {
    ...postData,
    id: Date.now().toString()
  }
  
  const updatedPosts = [newPost, ...posts]
  savePosts(updatedPosts)
  
  return newPost
}

/**
 * Update an existing blog post
 */
export const updatePost = (id: string, postData: Partial<BlogPost>): BlogPost | null => {
  const posts = getAllPosts()
  const postIndex = posts.findIndex(post => post.id === id)
  
  if (postIndex === -1) {
    return null
  }
  
  const updatedPost = {
    ...posts[postIndex],
    ...postData,
    id // Ensure ID doesn't change
  }
  
  posts[postIndex] = updatedPost
  savePosts(posts)
  
  return updatedPost
}

/**
 * Delete a blog post
 */
export const deletePost = (id: string): boolean => {
  const posts = getAllPosts()
  const filteredPosts = posts.filter(post => post.id !== id)
  
  if (filteredPosts.length === posts.length) {
    return false // Post not found
  }
  
  savePosts(filteredPosts)
  return true
}

/**
 * Toggle publish status of a post
 */
export const togglePublish = (id: string): BlogPost | null => {
  const posts = getAllPosts()
  const post = posts.find(p => p.id === id)
  
  if (!post) {
    return null
  }
  
  return updatePost(id, { published: !post.published })
}

/**
 * Generate a URL-friendly slug from a title
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Calculate read time based on content
 */
export const calculateReadTime = (content: string): string => {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Export posts as JSON file
 */
export const exportPosts = (): void => {
  const posts = getAllPosts()
  const dataStr = JSON.stringify(posts, null, 2)
  const dataBlob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(dataBlob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `blog-posts-${new Date().toISOString().split('T')[0]}.json`
  link.click()
  
  URL.revokeObjectURL(url)
}

