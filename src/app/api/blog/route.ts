import { NextRequest, NextResponse } from 'next/server'
import { BlogPost } from '@/types/blog'
import { getAllPosts } from '@/lib/supabase-blog'

// GET - Get all blog posts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const includeUnpublished = searchParams.get('includeUnpublished') === 'true'

    const { data: posts, error } = await getAllPosts(includeUnpublished)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: 500 }
      )
    }

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Error in GET /api/blog:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

// POST - Create a new blog post
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const authHeader = request.headers.get('authorization')
    if (!authHeader || authHeader !== 'Bearer admin_session') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()

    // Validate required fields
    const requiredFields = ['title', 'excerpt', 'content', 'category', 'author']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate slug from title
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Calculate read time
    const read_time = body.read_time || calculateReadTime(body.content)

    // Create new post data
    const postData: Omit<BlogPost, 'id'> = {
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      date: body.date || new Date().toISOString(),
      read_time,
      category: body.category,
      tags: body.tags || [],
      image: body.image || '',
      published: body.published || false
    }

    const { createPost } = await import('@/lib/supabase-blog')
    const { data: post, error } = await createPost(postData)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create post' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      post,
      message: 'Post created successfully'
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}

// Helper function to calculate read time
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

