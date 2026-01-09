'use client'

import { useState } from 'react'
import { HelpCircle, X, BookOpen, Edit, Eye, Trash2, Download, Upload } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const shortcuts = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Create Post',
      description: 'Click "Create New Post" to start writing a new blog post'
    },
    {
      icon: <Edit className="w-5 h-5" />,
      title: 'Edit Post',
      description: 'Click the pencil icon to edit an existing post'
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: 'Publish/Unpublish',
      description: 'Click the eye icon to toggle between published and draft status'
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: 'Delete Post',
      description: 'Click the trash icon to permanently delete a post'
    },
    {
      icon: <Download className="w-5 h-5" />,
      title: 'Export Posts',
      description: 'Download all posts as a JSON file for backup'
    },
    {
      icon: <Upload className="w-5 h-5" />,
      title: 'Import Posts',
      description: 'Upload a JSON file to restore or import posts'
    }
  ]

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        title="Help"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Help Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Admin Dashboard Help
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                <div className="space-y-6">
                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                      Quick Actions
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {shortcuts.map((shortcut, index) => (
                        <div
                          key={index}
                          className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400">
                            {shortcut.icon}
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">
                              {shortcut.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {shortcut.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Markdown Tips */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                      Markdown Formatting
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 font-mono text-sm space-y-2">
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400"># Heading 1</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400">## Heading 2</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400">**bold text**</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400">*italic text*</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400">- List item</span>
                      </div>
                      <div className="text-slate-600 dark:text-slate-400">
                        <span className="text-primary-600 dark:text-primary-400">[Link](url)</span>
                      </div>
                    </div>
                  </div>

                  {/* Tips */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                      Pro Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span>Leave the slug empty to auto-generate from the title</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span>Read time is automatically calculated from content length</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span>Use the search bar to quickly find posts by title, excerpt, or tags</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                        <span>Export your posts regularly as a backup</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

