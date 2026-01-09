import { createClient } from '@supabase/supabase-js'
import { BlogPost } from '@/types/blog'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: BlogPost
        Insert: Omit<BlogPost, 'id'>
        Update: Partial<Omit<BlogPost, 'id'>>
      }
    }
  }
}

