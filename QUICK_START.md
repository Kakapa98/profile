# 🚀 Quick Start Guide - Supabase Blog Backend

## ⚡ 3-Step Setup

### Step 1: Run the Database Schema (2 minutes)

1. Open Supabase SQL Editor:
   ```
   https://app.supabase.com/project/kdqdvsiipxxofeohnvbu/sql
   ```

2. Copy the contents of `supabase-schema.sql`

3. Paste into SQL Editor and click "Run"

4. ✅ You should see: "Blog posts table created successfully!"

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Test It Out

1. Go to: http://localhost:3000/admin
2. Login with: `KakapaM@2026`
3. Create a test blog post
4. Check Supabase Table Editor to see your post!

## ✅ That's It!

Your blog is now powered by Supabase!

---

## 📋 Quick Reference

### Admin Dashboard
- **URL:** http://localhost:3000/admin/dashboard
- **Password:** `KakapaM@2026`

### Supabase Project
- **URL:** https://kdqdvsiipxxofeohnvbu.supabase.co
- **Dashboard:** https://app.supabase.com/project/kdqdvsiipxxofeohnvbu

### Key Files
- **Schema:** `supabase-schema.sql`
- **Config:** `.env.local`
- **API:** `src/lib/supabase-blog.ts`

### Documentation
- 📖 **Full Setup:** `SUPABASE_SETUP_GUIDE.md`
- 📖 **Integration Details:** `SUPABASE_INTEGRATION_SUMMARY.md`
- 📖 **Admin Guide:** `BLOG_ADMIN_GUIDE.md`

---

## 🆘 Troubleshooting

### Posts not showing?
1. Check if you ran the SQL schema
2. Restart dev server: `npm run dev`
3. Check browser console for errors

### Can't connect to Supabase?
1. Verify `.env.local` has correct credentials
2. Check Supabase project is active
3. Restart dev server

### Need help?
- Check `SUPABASE_INTEGRATION_SUMMARY.md`
- Supabase Docs: https://supabase.com/docs

---

**Happy Blogging! 🎉**

