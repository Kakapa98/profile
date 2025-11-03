'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BlogPost } from '@/types/blog'

interface BlogContextType {
  posts: BlogPost[]
  addPost: (post: Omit<BlogPost, 'id'>) => void
  updatePost: (id: string, post: Partial<BlogPost>) => void
  deletePost: (id: string) => void
  getPostById: (id: string) => BlogPost | undefined
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load posts from localStorage on mount
  useEffect(() => {
    const storedPosts = localStorage.getItem('blog_posts')
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts))
      } catch (error) {
        console.error('Error loading posts:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('blog_posts', JSON.stringify(posts))
    }
  }, [posts, isLoaded])

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    }
    setPosts(prev => [newPost, ...prev])
  }

  const updatePost = (id: string, updatedData: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(post => (post.id === id ? { ...post, ...updatedData } : post))
    )
  }

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id))
  }

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id)
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        addPost,
        updatePost,
        deletePost,
        getPostById
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider')
  }
  return context
}

