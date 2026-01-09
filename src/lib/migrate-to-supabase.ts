/**
 * Migration utility to move posts from localStorage to Supabase
 * Run this once to migrate your existing posts
 */

import { createPost } from './supabase-blog'
import { getLocalStoragePosts } from '@/data/blog-posts'
import { BlogPost } from '@/types/blog'

export interface MigrationResult {
  success: boolean
  migrated: number
  failed: number
  errors: Array<{ post: string; error: any }>
}

/**
 * Migrate all posts from localStorage to Supabase
 */
export async function migrateLocalStorageToSupabase(): Promise<MigrationResult> {
  const result: MigrationResult = {
    success: true,
    migrated: 0,
    failed: 0,
    errors: []
  }

  try {
    // Get posts from localStorage
    const localPosts = getLocalStoragePosts()

    if (localPosts.length === 0) {
      console.log('No posts found in localStorage')
      return result
    }

    console.log(`Found ${localPosts.length} posts in localStorage`)

    // Migrate each post
    for (const post of localPosts) {
      try {
        // Remove the id field as Supabase will generate a new one
        const { id, ...postData } = post

        // Create post in Supabase
        const { data, error } = await createPost(postData)

        if (error) {
          throw error
        }

        result.migrated++
        console.log(`✓ Migrated: ${post.title}`)
      } catch (error) {
        result.failed++
        result.errors.push({
          post: post.title,
          error
        })
        console.error(`✗ Failed to migrate: ${post.title}`, error)
      }
    }

    result.success = result.failed === 0

    return result
  } catch (error) {
    console.error('Migration failed:', error)
    result.success = false
    return result
  }
}

/**
 * Check if migration is needed
 */
export function needsMigration(): boolean {
  if (typeof window === 'undefined') return false
  
  const localPosts = getLocalStoragePosts()
  return localPosts.length > 0
}

/**
 * Clear localStorage after successful migration
 */
export function clearLocalStorage(): void {
  if (typeof window === 'undefined') return
  
  const confirmed = confirm(
    'Are you sure you want to clear localStorage? This cannot be undone. ' +
    'Make sure you have successfully migrated to Supabase first!'
  )
  
  if (confirmed) {
    localStorage.removeItem('blog_posts')
    console.log('localStorage cleared')
  }
}

/**
 * Export posts from Supabase to JSON file
 */
export async function exportSupabasePosts(): Promise<void> {
  try {
    const { getAllPosts } = await import('./supabase-blog')
    const { data: posts, error } = await getAllPosts(true)

    if (error || !posts) {
      throw new Error('Failed to fetch posts from Supabase')
    }

    const dataStr = JSON.stringify(posts, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `blog-posts-supabase-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    console.log(`Exported ${posts.length} posts from Supabase`)
  } catch (error) {
    console.error('Export failed:', error)
    throw error
  }
}

