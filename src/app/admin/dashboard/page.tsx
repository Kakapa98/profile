'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  LogOut,
  BookOpen,
  Download,
  Upload,
  Search,
  Filter
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import BlogEditor from '@/components/BlogEditor'
import AdminHelp from '@/components/AdminHelp'
import { BlogPost } from '@/types/blog'
import { blogCategories } from '@/data/blog-posts'
import { exportPosts } from '@/lib/blog-utils'
import {
  getAllPosts,
  createPost,
  updatePost,
  deletePost as deletePostFromDB,
  togglePublish as togglePublishInDB
} from '@/lib/supabase-blog'
import {
  migrateLocalStorageToSupabase,
  needsMigration
} from '@/lib/migrate-to-supabase'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showUnpublished, setShowUnpublished] = useState(true)
  const [showMigrationPrompt, setShowMigrationPrompt] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if logged in
    const isLoggedIn = sessionStorage.getItem('admin_logged_in')
    if (isLoggedIn !== 'true') {
      router.push('/admin')
      return
    }

    // Load posts from localStorage
    loadPosts()
  }, [router])

  useEffect(() => {
    // Filter posts based on search and category
    let filtered = posts

    if (!showUnpublished) {
      filtered = filtered.filter(post => post.published)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    setFilteredPosts(filtered)
  }, [posts, showUnpublished, selectedCategory, searchQuery])

  const loadPosts = async () => {
    const { data, error } = await getAllPosts(true) // Include unpublished
    if (error) {
      console.error('Error loading posts:', error)
      return
    }
    if (data) {
      setPosts(data)
    }
  }

  const handleCreatePost = async (postData: Omit<BlogPost, 'id'>) => {
    const { data: newPost, error } = await createPost(postData)
    if (error) {
      alert('Error creating post. Please try again.')
      console.error('Error creating post:', error)
      return
    }
    if (newPost) {
      setPosts([newPost, ...posts])
      setShowEditor(false)
    }
  }

  const handleUpdatePost = async (postData: Omit<BlogPost, 'id'>) => {
    if (!editingPost) return

    const { data: updatedPost, error } = await updatePost(editingPost.id, postData)
    if (error) {
      alert('Error updating post. Please try again.')
      console.error('Error updating post:', error)
      return
    }
    if (updatedPost) {
      setPosts(posts.map(post =>
        post.id === editingPost.id ? updatedPost : post
      ))
      setShowEditor(false)
      setEditingPost(undefined)
    }
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const { success, error } = await deletePostFromDB(id)
    if (error || !success) {
      alert('Error deleting post. Please try again.')
      console.error('Error deleting post:', error)
      return
    }
    setPosts(posts.filter(post => post.id !== id))
  }

  const handleTogglePublish = async (id: string) => {
    const { data: updatedPost, error } = await togglePublishInDB(id)
    if (error) {
      alert('Error toggling publish status. Please try again.')
      console.error('Error toggling publish:', error)
      return
    }
    if (updatedPost) {
      setPosts(posts.map(post =>
        post.id === id ? updatedPost : post
      ))
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_logged_in')
    router.push('/admin')
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowEditor(true)
  }

  const handleCancelEdit = () => {
    setShowEditor(false)
    setEditingPost(undefined)
  }

  const handleExport = () => {
    exportPosts()
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      try {
        const importedPosts = JSON.parse(event.target?.result as string)
        if (Array.isArray(importedPosts)) {
          const confirmed = confirm(
            `Import ${importedPosts.length} posts? This will add them to your existing posts.`
          )
          if (confirmed) {
            // Import each post to Supabase
            for (const post of importedPosts) {
              const { id, ...postData } = post // Remove id to let Supabase generate new ones
              await createPost(postData)
            }
            // Reload posts
            await loadPosts()
            alert('Posts imported successfully!')
          }
        }
      } catch (error) {
        alert('Error importing posts. Please check the file format.')
        console.error('Import error:', error)
      }
    }
    reader.readAsText(file)
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Blog Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Manage your blog posts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Posts</div>
            <div className="text-3xl font-bold text-slate-900 dark:text-white">{posts.length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Published</div>
            <div className="text-3xl font-bold text-green-600">{posts.filter(p => p.published).length}</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Drafts</div>
            <div className="text-3xl font-bold text-orange-600">{posts.filter(p => !p.published).length}</div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowEditor(true)}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create New Post
            </button>
            <button
              onClick={handleExport}
              className="px-4 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-5 h-5" />
              Export
            </button>
            <label className="px-4 py-3 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 cursor-pointer">
              <Upload className="w-5 h-5" />
              Import
              <input
                type="file"
                accept=".json"
                onChange={handleImport}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-slate-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 text-slate-900 dark:text-white"
              >
                <option value="all">All Categories</option>
                {blogCategories.map(cat => (
                  <option key={cat.slug} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Show Unpublished Toggle */}
            <label className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={showUnpublished}
                onChange={(e) => setShowUnpublished(e.target.checked)}
                className="w-4 h-4 text-primary-600 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 rounded focus:ring-2 focus:ring-primary-600"
              />
              <span className="text-sm text-slate-700 dark:text-slate-300">Show Drafts</span>
            </label>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          {filteredPosts.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {posts.length === 0 ? 'No blog posts yet' : 'No posts match your filters'}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {posts.length === 0
                  ? 'Create your first blog post to get started'
                  : 'Try adjusting your search or filter criteria'
                }
              </p>
              {posts.length === 0 ? (
                <button
                  onClick={() => setShowEditor(true)}
                  className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Post
                </button>
              ) : (
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setShowUnpublished(true)
                  }}
                  className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {post.title}
                        </h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          post.published
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{post.read_time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(post.id)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                        title={post.published ? 'Unpublish' : 'Publish'}
                      >
                        {post.published ? (
                          <EyeOff className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        ) : (
                          <Eye className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <BlogEditor
          post={editingPost}
          onSave={editingPost ? handleUpdatePost : handleCreatePost}
          onCancel={handleCancelEdit}
        />
      )}

      {/* Help Button */}
      <AdminHelp />
    </main>
  )
}

