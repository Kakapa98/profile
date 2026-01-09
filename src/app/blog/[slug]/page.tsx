import { getPostBySlug } from '@/lib/supabase-blog'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const { data: post, error } = await getPostBySlug(slug)

  if (error || !post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}

