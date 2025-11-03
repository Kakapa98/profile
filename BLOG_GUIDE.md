# Blog Management Guide

This guide will help you add, edit, and manage blog posts on your portfolio website.

## 📝 How to Add a New Blog Post

### Step 1: Open the Blog Data File

Navigate to: `src/data/blog-posts.ts`

### Step 2: Add Your New Post

Add a new blog post object to the `blogPosts` array. Here's the template:

```typescript
{
  id: '4', // Increment this number for each new post
  title: 'Your Blog Post Title',
  slug: 'your-blog-post-url', // URL-friendly version (lowercase, hyphens)
  excerpt: 'A brief summary of your post (2-3 sentences)',
  content: `
# Your Blog Post Title

Your full blog post content goes here. You can use markdown formatting:

## Subheadings

Use ## for subheadings

### Smaller Headings

Use ### for smaller headings

## Lists

- Bullet point 1
- Bullet point 2
- Bullet point 3

## Numbered Lists

1. First item
2. Second item
3. Third item

## Code Blocks

\`\`\`javascript
const example = "code goes here"
\`\`\`

## Bold and Italic

**Bold text** and *italic text*

## Links

[Link text](https://example.com)

---

*Closing thoughts or call to action*
  `,
  author: 'Mpho Mofokeng',
  date: '2025-01-20', // Format: YYYY-MM-DD
  readTime: '5 min read', // Estimate based on content length
  category: 'Quality Assurance', // Choose from: Quality Assurance, Blockchain, Education, Technology
  tags: ['Tag1', 'Tag2', 'Tag3'], // Relevant tags for your post
  published: true // Set to false to save as draft
}
```

### Step 3: Save the File

After adding your post, save the file. The new post will automatically appear on your blog!

## 📂 File Structure

```
src/
├── data/
│   └── blog-posts.ts          # All your blog posts are here
├── types/
│   └── blog.ts                # Blog post type definitions
├── components/
│   └── BlogCard.tsx           # Blog post card component
└── app/
    └── blog/
        ├── page.tsx           # Blog listing page
        └── [slug]/
            └── page.tsx       # Individual blog post page
```

## 🎨 Categories

You can use these categories for your posts:

1. **Quality Assurance** - Testing, QA practices, automation
2. **Blockchain** - Web3, smart contracts, DApps
3. **Education** - Teaching, mentorship, learning
4. **Technology** - General software development, tools

## 🏷️ Tags

Add relevant tags to help readers find related content. Examples:
- QA, Testing, Automation, Selenium, Pytest
- Blockchain, Smart Contracts, Solidity, Web3, Ethereum
- Mentorship, Education, WeThinkCode, Career
- Python, Java, JavaScript, DevOps, CI/CD

## ✏️ Editing Existing Posts

1. Open `src/data/blog-posts.ts`
2. Find the post you want to edit (search by title or slug)
3. Make your changes
4. Save the file

## 🗑️ Deleting Posts

To remove a post from public view without deleting it:
- Set `published: false`

To permanently delete:
- Remove the entire post object from the `blogPosts` array

## 📊 Draft Posts

To save a post as a draft (not visible on the website):
- Set `published: false`

When ready to publish:
- Change to `published: true`

## 💡 Tips for Great Blog Posts

### Title
- Keep it clear and descriptive
- 60 characters or less for SEO
- Make it engaging and specific

### Excerpt
- 2-3 sentences summarizing the post
- Should entice readers to click
- Include key points or benefits

### Content
- Start with a strong introduction
- Use headings to organize content
- Include examples and practical tips
- End with a conclusion or call to action
- Aim for 500-1500 words for good engagement

### Slug
- Use lowercase letters
- Replace spaces with hyphens
- Keep it short and descriptive
- Example: "intro-to-smart-contracts"

### Read Time
- Estimate: ~200 words per minute
- 500 words = "3 min read"
- 1000 words = "5 min read"
- 1500 words = "7 min read"

## 🚀 Publishing Workflow

1. **Write** - Create your post in `blog-posts.ts`
2. **Preview** - Set `published: true` and check locally
3. **Review** - Read through for typos and formatting
4. **Publish** - Deploy your changes to production
5. **Share** - Share your post on social media!

## 📱 Responsive Design

Your blog is fully responsive and looks great on:
- Desktop computers
- Tablets
- Mobile phones

## 🎯 SEO Best Practices

- Use descriptive titles
- Write compelling excerpts
- Add relevant tags
- Include keywords naturally in content
- Keep URLs (slugs) clean and descriptive

## 🔄 Future Enhancements

Consider adding:
- Comments section
- Related posts
- Author profiles
- Newsletter signup
- Social sharing buttons
- Reading progress indicator
- Table of contents for long posts

## 📞 Need Help?

If you encounter any issues:
1. Check the existing posts for examples
2. Ensure all required fields are filled
3. Verify the date format (YYYY-MM-DD)
4. Make sure the slug is unique
5. Check that the category matches exactly

---

Happy blogging! 🎉

