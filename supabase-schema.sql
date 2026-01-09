-- ============================================
-- Blog Posts Table Schema for Supabase
-- ============================================
-- Run this in your Supabase SQL Editor
-- https://app.supabase.com/project/_/sql

-- Drop table if exists (CAUTION: This will delete all data!)
-- Uncomment the line below only if you want to start fresh
-- DROP TABLE IF EXISTS blog_posts CASCADE;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  image TEXT DEFAULT '',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Allow public to read published posts
DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Policy 2: Allow all operations without authentication (for development)
-- WARNING: In production, replace this with proper authentication
DROP POLICY IF EXISTS "Allow all operations for development" ON blog_posts;
CREATE POLICY "Allow all operations for development"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Optional: Insert Sample Data
-- ============================================
-- Uncomment to insert sample blog posts

/*
INSERT INTO blog_posts (title, slug, excerpt, content, author, date, read_time, category, tags, published)
VALUES
  (
    'Getting Started with Next.js 15',
    'getting-started-nextjs-15',
    'Learn the fundamentals of Next.js 15 and build modern web applications.',
    '# Getting Started with Next.js 15\n\nNext.js 15 brings exciting new features...\n\n## Key Features\n\n- App Router\n- Server Components\n- Improved Performance',
    'John Doe',
    '2025-01-09',
    '5 min read',
    'Technology',
    ARRAY['nextjs', 'react', 'web-development'],
    true
  ),
  (
    'The Future of Web Development',
    'future-of-web-development',
    'Exploring emerging trends and technologies shaping the future of web development.',
    '# The Future of Web Development\n\nThe web development landscape is constantly evolving...',
    'John Doe',
    '2025-01-08',
    '7 min read',
    'Technology',
    ARRAY['web-development', 'trends', 'future'],
    true
  ),
  (
    'Draft Post Example',
    'draft-post-example',
    'This is a draft post that is not yet published.',
    '# Draft Post\n\nThis content is still being worked on...',
    'John Doe',
    '2025-01-09',
    '3 min read',
    'Technology',
    ARRAY['draft'],
    false
  );
*/

-- ============================================
-- Verification Queries
-- ============================================
-- Run these to verify everything is set up correctly

-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public' 
  AND table_name = 'blog_posts'
) AS table_exists;

-- Check table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;

-- Check indexes
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'blog_posts';

-- Check RLS policies
SELECT policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'blog_posts';

-- Count posts
SELECT 
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE published = false) as draft_posts
FROM blog_posts;

-- ============================================
-- Success Message
-- ============================================
DO $$
BEGIN
  RAISE NOTICE '✅ Blog posts table created successfully!';
  RAISE NOTICE '✅ Indexes created for optimal performance';
  RAISE NOTICE '✅ RLS policies configured';
  RAISE NOTICE '✅ Ready to use!';
END $$;

