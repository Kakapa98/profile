# Blog Admin Backend Guide

## Overview

This portfolio includes a fully functional blog system with an admin dashboard for managing blog posts. The system uses localStorage for data persistence and includes features like:

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ Rich text editor with Markdown support
- ✅ Publish/Draft functionality
- ✅ Search and filtering
- ✅ Category management
- ✅ Import/Export functionality
- ✅ Authentication system

## Architecture

### File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Admin login page
│   │   └── dashboard/
│   │       └── page.tsx          # Admin dashboard
│   ├── blog/
│   │   ├── page.tsx              # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx          # Individual blog post page
│   └── api/
│       └── blog/
│           ├── route.ts          # Blog API endpoints (GET, POST)
│           └── [id]/
│               └── route.ts      # Blog API endpoints (GET, PUT, DELETE)
├── components/
│   ├── BlogCard.tsx              # Blog post card component
│   └── BlogEditor.tsx            # Blog post editor modal
├── data/
│   └── blog-posts.ts             # Blog data helpers
├── lib/
│   └── blog-utils.ts             # Blog utility functions
└── types/
    └── blog.ts                   # TypeScript types
```

## Features

### 1. Authentication

**Location:** `/admin`

- Simple password-based authentication
- Default password: `kahuna2025`
- Session-based (stored in sessionStorage)
- Can be changed in `src/app/admin/page.tsx`

**To change the password:**
```typescript
// src/app/admin/page.tsx
const ADMIN_PASSWORD = 'your-new-password'
```

### 2. Admin Dashboard

**Location:** `/admin/dashboard`

**Features:**
- View all blog posts
- Create new posts
- Edit existing posts
- Delete posts
- Toggle publish/draft status
- Search posts by title, excerpt, or tags
- Filter by category
- Show/hide draft posts
- Export posts as JSON
- Import posts from JSON

**Statistics:**
- Total posts count
- Published posts count
- Draft posts count

### 3. Blog Editor

**Features:**
- Title input
- Auto-generated URL slug (or custom)
- Excerpt textarea
- Content textarea with Markdown support
- Category selection
- Date picker
- Tags (comma-separated)
- Publish/Draft toggle
- Auto-calculated read time

**Markdown Support:**
The content field supports standard Markdown syntax:
- Headers: `# H1`, `## H2`, etc.
- Bold: `**text**`
- Italic: `*text*`
- Lists: `- item` or `1. item`
- Links: `[text](url)`
- Code: `` `code` `` or ` ```code block``` `

### 4. API Routes

#### GET /api/blog
Get all blog posts
```typescript
// Query params:
// - includeUnpublished: boolean
```

#### POST /api/blog
Create a new blog post
```typescript
// Headers:
// - Authorization: Bearer admin_session

// Body:
{
  title: string
  excerpt: string
  content: string
  category: string
  author: string
  tags?: string[]
  published?: boolean
}
```

#### GET /api/blog/[id]
Get a single blog post by ID

#### PUT /api/blog/[id]
Update a blog post
```typescript
// Headers:
// - Authorization: Bearer admin_session

// Body: Partial<BlogPost>
```

#### DELETE /api/blog/[id]
Delete a blog post
```typescript
// Headers:
// - Authorization: Bearer admin_session
```

## Data Storage

### LocalStorage Structure

Posts are stored in localStorage under the key `blog_posts`:

```json
[
  {
    "id": "1234567890",
    "title": "My First Blog Post",
    "slug": "my-first-blog-post",
    "excerpt": "A brief summary...",
    "content": "# Full content here...",
    "author": "Mpho Mofokeng",
    "date": "2025-01-09",
    "readTime": "5 min read",
    "category": "Technology",
    "tags": ["coding", "web"],
    "published": true
  }
]
```

## Usage Guide

### Creating a New Post

1. Navigate to `/admin` and login
2. Click "Create New Post" button
3. Fill in the form:
   - **Title**: Post title (required)
   - **Slug**: URL-friendly version (auto-generated if empty)
   - **Excerpt**: Brief summary (required)
   - **Content**: Full post content in Markdown (required)
   - **Category**: Select from dropdown (required)
   - **Date**: Publication date (defaults to today)
   - **Tags**: Comma-separated tags
   - **Published**: Check to publish immediately
4. Click "Create Post"

### Editing a Post

1. In the dashboard, click the Edit icon (pencil) on any post
2. Modify the fields as needed
3. Click "Update Post"

### Publishing/Unpublishing

- Click the Eye icon to publish a draft
- Click the Eye-Off icon to unpublish a post

### Deleting a Post

1. Click the Trash icon on any post
2. Confirm the deletion

### Exporting Posts

1. Click the "Export" button in the dashboard
2. A JSON file will be downloaded with all posts

### Importing Posts

1. Click the "Import" button
2. Select a JSON file with the correct format
3. Confirm to replace existing posts

## Utility Functions

Located in `src/lib/blog-utils.ts`:

- `getAllPosts()` - Get all posts from localStorage
- `savePosts(posts)` - Save posts to localStorage
- `getPostById(id)` - Get a single post by ID
- `getPostBySlug(slug)` - Get a single post by slug
- `createPost(postData)` - Create a new post
- `updatePost(id, postData)` - Update an existing post
- `deletePost(id)` - Delete a post
- `togglePublish(id)` - Toggle publish status
- `generateSlug(title)` - Generate URL slug from title
- `calculateReadTime(content)` - Calculate read time
- `exportPosts()` - Export posts as JSON file

## Security Considerations

⚠️ **Important:** This is a client-side implementation suitable for personal portfolios.

**Current limitations:**
- Password is stored in client-side code
- Authentication uses sessionStorage
- Data is stored in localStorage (client-side)

**For production use, consider:**
- Server-side authentication (JWT, OAuth)
- Database storage (PostgreSQL, MongoDB)
- API rate limiting
- Input sanitization
- HTTPS only
- Environment variables for secrets

## Future Enhancements

Potential improvements:
- [ ] Rich text WYSIWYG editor
- [ ] Image upload functionality
- [ ] Comments system
- [ ] Analytics integration
- [ ] SEO optimization
- [ ] Social media sharing
- [ ] RSS feed generation
- [ ] Email notifications
- [ ] Multi-author support
- [ ] Version history
- [ ] Scheduled publishing

## Troubleshooting

### Posts not showing up
- Check if posts are published (toggle the eye icon)
- Clear search/filter criteria
- Check browser console for errors

### Can't login
- Verify password in `src/app/admin/page.tsx`
- Clear sessionStorage: `sessionStorage.clear()`

### Lost posts
- Check localStorage: `localStorage.getItem('blog_posts')`
- Restore from export if available

### Import not working
- Verify JSON format matches the structure
- Check browser console for errors

## Support

For issues or questions, refer to the codebase or modify as needed for your use case.

