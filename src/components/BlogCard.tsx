'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Quality Assurance': 'primary',
      'Blockchain': 'secondary',
      'Education': 'purple',
      'Technology': 'blue'
    }
    return colors[category] || 'primary'
  }

  const colorClass = getCategoryColor(post.category)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6">
          {/* Category Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${colorClass}-100 dark:bg-${colorClass}-900/30 text-${colorClass}-700 dark:text-${colorClass}-300`}>
              <Tag className="w-3 h-3 mr-1" />
              {post.category}
            </span>
            <motion.div
              className="text-slate-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
              whileHover={{ x: 5 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="h-1 bg-gradient-to-r from-primary-600 to-secondary-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Link>
    </motion.article>
  )
}

