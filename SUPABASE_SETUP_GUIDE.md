# Supabase Setup Guide for Blog Backend

## Overview

Your blog backend now uses **Supabase** as the database instead of localStorage. This provides:
- ✅ Persistent cloud storage
- ✅ Real-time capabilities
- ✅ Better scalability
- ✅ Automatic backups
- ✅ Multi-device access

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in the details:
   - **Name:** Your project name (e.g., "portfolio-blog")
   - **Database Password:** Choose a strong password (save this!)
   - **Region:** Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be set up (~2 minutes)

## Step 2: Create the Database Table

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste this SQL:

```sql
-- Create blog_posts table
CREATE TABLE blog_posts (
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

-- Create index on slug for faster lookups
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- Create index on published for filtering
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

-- Create index on category for filtering
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- Create index on date for sorting
CREATE INDEX idx_blog_posts_date ON blog_posts(date DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to published posts
CREATE POLICY "Public can view published posts"
  ON blog_posts
  FOR SELECT
  USING (published = true);

-- Create policy to allow all operations for authenticated users (admin)
CREATE POLICY "Authenticated users can do everything"
  ON blog_posts
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Note: For now, we're allowing all operations without authentication
-- In production, you should implement proper authentication
-- For development, you can disable RLS:
-- ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;
```

4. Click "Run" to execute the SQL
5. You should see "Success. No rows returned"

## Step 3: Get Your API Credentials

1. In your Supabase project, go to **Settings** → **API**
2. Find these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

3. Replace the values with your actual credentials from Step 3

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

## Step 5: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/admin` and login
3. Try creating a test blog post
4. Check your Supabase dashboard → **Table Editor** → **blog_posts**
5. You should see your new post!

## Step 6: Migrate Existing Posts (Optional)

If you have posts in localStorage that you want to migrate to Supabase:

1. Go to `/admin/dashboard`
2. Click "Export" to download your posts as JSON
3. Open the Supabase dashboard → **Table Editor** → **blog_posts**
4. Click "Insert" → "Insert row"
5. Or use the import feature in the admin dashboard

Alternatively, you can use the SQL Editor to bulk import:

```sql
INSERT INTO blog_posts (title, slug, excerpt, content, author, date, read_time, category, tags, published)
VALUES
  ('Your Title', 'your-slug', 'Excerpt...', 'Content...', 'Author', '2025-01-09', '5 min read', 'Technology', ARRAY['tag1', 'tag2'], true);
```

## Database Schema

### blog_posts Table

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| title | TEXT | Post title |
| slug | TEXT | URL-friendly slug (unique) |
| excerpt | TEXT | Short summary |
| content | TEXT | Full post content (Markdown) |
| author | TEXT | Author name |
| date | TIMESTAMPTZ | Publication date |
| read_time | TEXT | Estimated read time |
| category | TEXT | Post category |
| tags | TEXT[] | Array of tags |
| image | TEXT | Featured image URL (optional) |
| published | BOOLEAN | Published status |
| created_at | TIMESTAMPTZ | Record creation time |
| updated_at | TIMESTAMPTZ | Last update time |

## Security Notes

### Current Setup (Development)
- RLS is enabled but allows all operations
- Suitable for personal portfolios
- No authentication required for admin operations

### Production Recommendations
1. **Enable proper authentication:**
   - Use Supabase Auth
   - Implement JWT tokens
   - Add user roles

2. **Update RLS policies:**
```sql
-- Only allow authenticated admin users to modify posts
CREATE POLICY "Only admins can modify posts"
  ON blog_posts
  FOR ALL
  USING (auth.uid() = 'your-admin-user-id')
  WITH CHECK (auth.uid() = 'your-admin-user-id');
```

3. **Use environment variables for sensitive data**
4. **Enable HTTPS only**
5. **Add rate limiting**

## Troubleshooting

### "Failed to fetch posts"
- Check your `.env.local` file has correct credentials
- Verify the Supabase project is active
- Check browser console for errors
- Ensure RLS policies allow access

### "Insert failed"
- Check all required fields are provided
- Verify slug is unique
- Check RLS policies

### "Connection refused"
- Restart your development server
- Clear browser cache
- Check Supabase project status

## Features Enabled

✅ **CRUD Operations** - Create, Read, Update, Delete posts
✅ **Real-time Updates** - Changes sync across devices
✅ **Search & Filter** - Fast database queries
✅ **Automatic Backups** - Supabase handles backups
✅ **Scalability** - Handles thousands of posts
✅ **Security** - Row Level Security policies

## Next Steps

1. ✅ Set up Supabase project
2. ✅ Create database table
3. ✅ Configure environment variables
4. ✅ Test creating posts
5. 🔄 Migrate existing posts (if any)
6. 🔄 Deploy to production
7. 🔄 Set up proper authentication (optional)

## Support

- **Supabase Docs:** https://supabase.com/docs
- **Supabase Discord:** https://discord.supabase.com
- **GitHub Issues:** Report bugs in your repo

---

**You're all set!** Your blog now uses Supabase for persistent, scalable storage. 🎉

