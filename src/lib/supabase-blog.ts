import { supabase } from './supabase'
import { BlogPost } from '@/types/blog'

/**
 * Supabase Blog Service
 * All database operations for blog posts
 */

/**
 * Get all blog posts
 * @param includeUnpublished - Whether to include unpublished posts
 */
export async function getAllPosts(includeUnpublished = false) {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .order('date', { ascending: false })

    if (!includeUnpublished) {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) throw error
    return { data: data as BlogPost[], error: null }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { data: null, error }
  }
}

/**
 * Get a single post by ID
 */
export async function getPostById(id: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { data: null, error }
  }
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) throw error
    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return { data: null, error }
  }
}

/**
 * Create a new blog post
 */
export async function createPost(postData: Omit<BlogPost, 'id'>) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([postData])
      .select()
      .single()

    if (error) throw error
    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error creating post:', error)
    return { data: null, error }
  }
}

/**
 * Update an existing blog post
 */
export async function updatePost(id: string, postData: Partial<BlogPost>) {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .update(postData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error updating post:', error)
    return { data: null, error }
  }
}

/**
 * Delete a blog post
 */
export async function deletePost(id: string) {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) throw error
    return { success: true, error: null }
  } catch (error) {
    console.error('Error deleting post:', error)
    return { success: false, error }
  }
}

/**
 * Toggle publish status
 */
export async function togglePublish(id: string) {
  try {
    // First get the current post
    const { data: post, error: fetchError } = await getPostById(id)
    if (fetchError || !post) throw fetchError

    // Toggle the published status
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ published: !post.published })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return { data: data as BlogPost, error: null }
  } catch (error) {
    console.error('Error toggling publish status:', error)
    return { data: null, error }
  }
}

/**
 * Get posts by category
 */
export async function getPostsByCategory(category: string, publishedOnly = true) {
  try {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .order('date', { ascending: false })

    if (publishedOnly) {
      query = query.eq('published', true)
    }

    const { data, error } = await query

    if (error) throw error
    return { data: data as BlogPost[], error: null }
  } catch (error) {
    console.error('Error fetching posts by category:', error)
    return { data: null, error }
  }
}

