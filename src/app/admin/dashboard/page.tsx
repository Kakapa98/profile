'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, LogOut, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import BlogEditor from '@/components/BlogEditor'
import { BlogPost } from '@/types/blog'

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [showEditor, setShowEditor] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>()
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

  const loadPosts = () => {
    const storedPosts = localStorage.getItem('blog_posts')
    if (storedPosts) {
      try {
        setPosts(JSON.parse(storedPosts))
      } catch (error) {
        console.error('Error loading posts:', error)
      }
    }
  }

  const savePosts = (newPosts: BlogPost[]) => {
    localStorage.setItem('blog_posts', JSON.stringify(newPosts))
    setPosts(newPosts)
  }

  const handleCreatePost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString()
    }
    const newPosts = [newPost, ...posts]
    savePosts(newPosts)
    setShowEditor(false)
  }

  const handleUpdatePost = (postData: Omit<BlogPost, 'id'>) => {
    if (!editingPost) return
    const updatedPosts = posts.map(post =>
      post.id === editingPost.id ? { ...postData, id: editingPost.id } : post
    )
    savePosts(updatedPosts)
    setShowEditor(false)
    setEditingPost(undefined)
  }

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const newPosts = posts.filter(post => post.id !== id)
      savePosts(newPosts)
    }
  }

  const handleTogglePublish = (id: string) => {
    const updatedPosts = posts.map(post =>
      post.id === id ? { ...post, published: !post.published } : post
    )
    savePosts(updatedPosts)
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
              <a
                href="/"
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                View Site
              </a>
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

        {/* Create Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowEditor(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Post
          </button>
        </div>

        {/* Posts List */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No blog posts yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Create your first blog post to get started
              </p>
              <button
                onClick={() => setShowEditor(true)}
                className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Your First Post
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {posts.map((post, index) => (
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
                        <span>{post.readTime}</span>
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
    </main>
  )
}

