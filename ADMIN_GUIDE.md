# Admin Panel Guide

## Accessing the Admin Panel

1. **Navigate to the Admin Login Page**
   - Go to: `http://localhost:3000/admin` (or your deployed URL + `/admin`)
   - Or click the "Admin" link in the footer of your website

2. **Login Credentials**
   - **Default Password**: `kahuna2025`
   - You can change this password in `src/app/admin/page.tsx` (line 27)

## Managing Blog Posts

### Creating a New Post

1. Click the **"Create New Post"** button
2. Fill in the form:
   - **Title** (required): The title of your blog post
   - **URL Slug** (optional): Leave empty to auto-generate from title
   - **Excerpt** (required): A brief 2-3 sentence summary
   - **Content** (required): Your full blog post content (Markdown supported)
   - **Category** (required): Choose from Quality Assurance, Blockchain, Education, or Technology
   - **Date** (required): Publication date
   - **Tags** (optional): Comma-separated tags (e.g., "QA, Testing, Automation")
   - **Published**: Check to publish immediately, uncheck to save as draft

3. Click **"Create Post"** to save

### Editing a Post

1. Find the post in your dashboard
2. Click the **Edit** icon (pencil)
3. Make your changes
4. Click **"Update Post"** to save

### Publishing/Unpublishing

- Click the **Eye** icon to publish a draft
- Click the **Eye-Off** icon to unpublish a post

### Deleting a Post

1. Click the **Trash** icon
2. Confirm the deletion

## Markdown Support

Your blog posts support Markdown formatting:

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet point
- Another point

1. Numbered list
2. Second item

[Link text](https://example.com)

> Blockquote

\`inline code\`

\`\`\`
code block
\`\`\`
```

## Data Storage

- Blog posts are stored in your browser's **localStorage**
- Data persists across sessions on the same browser
- **Important**: If you clear browser data, your posts will be lost
- For production, consider implementing a backend database

## Tips

1. **Save Drafts**: Uncheck "Published" to save posts as drafts while you work on them
2. **Preview**: Visit your blog page to see how posts look before publishing
3. **Backup**: Periodically export your localStorage data as a backup
4. **SEO**: Write clear, descriptive titles and excerpts for better search visibility
5. **Tags**: Use relevant tags to help readers find related content

## Changing the Admin Password

1. Open `src/app/admin/page.tsx`
2. Find line 27: `const ADMIN_PASSWORD = 'kahuna2025'`
3. Change `'kahuna2025'` to your desired password
4. Save the file

## Security Note

This is a simple password-protected admin panel suitable for personal portfolios. For production sites with multiple users or sensitive data, implement proper authentication with:
- Backend authentication
- Encrypted passwords
- Session management
- HTTPS
- Database storage

## Troubleshooting

**Can't login?**
- Make sure you're using the correct password
- Check browser console for errors

**Posts not showing?**
- Make sure posts are marked as "Published"
- Check that you're viewing the correct page
- Refresh the page

**Lost posts?**
- Check if browser data was cleared
- Posts are stored in localStorage and tied to the specific browser/domain

## Future Enhancements

Consider adding:
- Image upload functionality
- Rich text editor (WYSIWYG)
- Backend database integration
- Multiple user support
- Post scheduling
- Analytics
- Comments system

