'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft, Share2 } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface BlogPostClientProps {
  post: BlogPost
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <main className="relative min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <article className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center text-white font-bold">
                {post.author.charAt(0)}
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-p:text-slate-600 dark:prose-p:text-slate-400
              prose-a:text-primary-600 dark:prose-a:text-primary-400
              prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-code:text-primary-600 dark:prose-code:text-primary-400
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950
              prose-ul:text-slate-600 dark:prose-ul:text-slate-400
              prose-ol:text-slate-600 dark:prose-ol:text-slate-400
              prose-li:text-slate-600 dark:prose-li:text-slate-400"
          >
            {post.content.split('\n').map((paragraph, index) => {
              // Handle headings
              if (paragraph.startsWith('# ')) {
                return <h1 key={index}>{paragraph.substring(2)}</h1>
              }
              if (paragraph.startsWith('## ')) {
                return <h2 key={index}>{paragraph.substring(3)}</h2>
              }
              if (paragraph.startsWith('### ')) {
                return <h3 key={index}>{paragraph.substring(4)}</h3>
              }
              // Handle lists
              if (paragraph.startsWith('- ')) {
                return <li key={index}>{paragraph.substring(2)}</li>
              }
              if (paragraph.match(/^\d+\. /)) {
                return <li key={index}>{paragraph.substring(paragraph.indexOf(' ') + 1)}</li>
              }
              // Handle code blocks
              if (paragraph.startsWith('```')) {
                return null // Skip code fence markers for now
              }
              // Handle horizontal rules
              if (paragraph === '---') {
                return <hr key={index} />
              }
              // Handle bold text
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <p key={index}><strong>{paragraph.slice(2, -2)}</strong></p>
              }
              // Handle italic text
              if (paragraph.startsWith('*') && paragraph.endsWith('*') && !paragraph.startsWith('**')) {
                return <p key={index}><em>{paragraph.slice(1, -1)}</em></p>
              }
              // Regular paragraphs
              if (paragraph.trim()) {
                return <p key={index}>{paragraph}</p>
              }
              return null
            })}
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p className="text-slate-600 dark:text-slate-400">
                Found this helpful? Share it with others!
              </p>
              <button
                onClick={handleShare}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share Post
              </button>
            </div>
          </motion.div>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12 text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Posts
            </Link>
          </motion.div>
        </div>
      </article>
    </main>
  )
}

