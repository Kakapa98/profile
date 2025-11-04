# Mpho Alphios Mofokeng - Portfolio 2025

> **Kahuna | Kakapa**
> Student Performance Manager & QA-Elective Lead at WeThinkCode_
> Blockchain Enthusiast | Mentor | Quality-Driven Technologist

A modern, animated portfolio website showcasing my professional journey, technical skills, projects, and blog posts. Built with cutting-edge web technologies and designed for performance, accessibility, and user experience.

---

## 🚀 Features

- **🎨 Modern Design**: Clean, professional interface with smooth animations and transitions
- **📱 Fully Responsive**: Mobile-first approach, optimized for all screen sizes
- **⚡ High Performance**: Optimized for speed with Next.js 15 and static generation
- **🌓 Dark Mode**: Seamless light/dark theme switching with system preference detection
- **♿ Accessible**: WCAG compliant with semantic HTML and ARIA labels
- **✨ Interactive Animations**: Powered by Framer Motion for engaging user experience
- **📝 Blog System**: Dynamic blog with categories, tags, search, and filtering
- **📄 CV Download**: Direct download of professional resume
- **🔍 SEO Optimized**: Meta tags, Open Graph, and structured data for better discoverability

---

## 🛠 Tech Stack

### Core Technologies
- **Framework**: [Next.js 15.4.2](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 11](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Development Tools
- **Package Manager**: npm
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode
- **Deployment**: Vercel (recommended)

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kakapa98/portfolio-2025.git
   cd portfolio-2025
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
profile/
├── public/                      # Static assets
│   ├── Mpho-Mofokeng-CV.pdf    # Resume/CV file
│   ├── manifest.json            # PWA manifest
│   └── robots.txt               # SEO robots file
├── src/
│   ├── app/                     # Next.js App Router
│   │   ├── admin/              # Admin panel (protected)
│   │   ├── blog/               # Blog pages
│   │   │   ├── [slug]/        # Individual blog post pages
│   │   │   └── page.tsx       # Blog listing page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Homepage
│   ├── components/             # Reusable React components
│   │   ├── AnimatedBackground.tsx
│   │   ├── BlogCard.tsx
│   │   ├── BlogEditor.tsx
│   │   ├── FloatingElements.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ParticleSystem.tsx
│   │   └── TypewriterText.tsx
│   ├── contexts/               # React Context providers
│   │   └── BlogContext.tsx
│   ├── data/                   # Data and content
│   │   └── blog-posts.ts       # Blog posts data
│   ├── types/                  # TypeScript type definitions
│   │   └── blog.ts
│   └── lib/                    # Utility functions (if any)
├── .eslintrc.json              # ESLint configuration
├── .gitignore                  # Git ignore rules
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies and scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

---

## 📝 Blog System

The portfolio includes a fully functional blog system with:

- **Categories**: Quality Assurance, Blockchain, Education, Technology, Personal
- **Features**: Search, category filtering, tags, read time estimation
- **Dynamic Routing**: Individual pages for each blog post
- **Responsive Cards**: Beautiful blog post previews with animations
- **Data Storage**: Browser localStorage for client-side persistence

### Blog Data Structure

Blog posts are stored in `src/data/blog-posts.ts` with the following structure:

```typescript
{
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: BlogCategory
  date: string
  readTime: string
  tags: string[]
  published: boolean
}
```

---

## 🎨 Customization

### Color Scheme

The color palette is defined in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    50: '#eff6ff',
    // ... blue shades
    900: '#1e3a8a',
  },
  secondary: {
    50: '#f0fdf4',
    // ... green shades
    900: '#14532d',
  }
}
```

### Personal Information

Update your details in the following files:

1. **Homepage** (`src/app/page.tsx`):
   - Hero section (name, title, description)
   - About section (bio, professional focus)
   - Skills section (technologies, tools)
   - Projects section (current work)
   - Contact section (email, social links)

2. **Metadata** (`src/app/layout.tsx`):
   - SEO meta tags
   - Open Graph data
   - Site title and description

3. **CV/Resume** (`public/Mpho-Mofokeng-CV.pdf`):
   - Replace with your own PDF resume

---

## 📈 Performance Metrics

Optimized for excellent performance scores:

- ⚡ **Lighthouse Score**: 95+ across all categories
- 🎯 **First Contentful Paint**: <1.5s
- 🖼️ **Largest Contentful Paint**: <2.5s
- 📊 **Cumulative Layout Shift**: <0.1
- 🚀 **Time to Interactive**: <3s

### Performance Features
- Static page generation where possible
- Optimized images and assets
- Code splitting and lazy loading
- Minimal JavaScript bundle size
- Efficient CSS with Tailwind's purge

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

This project is optimized for [Vercel](https://vercel.com):

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Deploy**:
   - Click "Deploy"
   - Your site will be live in minutes
   - Automatic deployments on every push

### Deploy to Other Platforms

The project can also be deployed to:
- **Netlify**: Use the Next.js plugin
- **AWS Amplify**: Connect your repository
- **Railway**: One-click deployment
- **Self-hosted**: Use `npm run build` and `npm start`

---

## 🌐 Environment Variables

No environment variables are required for basic functionality. The blog system uses browser localStorage for data persistence.

For production deployments, consider adding:

```env
# Optional: Analytics
NEXT_PUBLIC_GA_ID=your-google-analytics-id

# Optional: Contact form backend
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
```

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

---

## 📞 Contact

**Mpho Alphios Mofokeng (Kahuna)**

- 📧 Personal: [alphios988@gmail.com](mailto:alphios988@gmail.com)
- 📧 Work: [mphomofokeng@wethinkcode.co.za](mailto:mphomofokeng@wethinkcode.co.za)
- 💼 LinkedIn: [linkedin.com/in/mpho-mofokeng-9b3346237](https://linkedin.com/in/mpho-mofokeng-9b3346237)
- 🐙 GitHub: [@Kakapa98](https://github.com/Kakapa98)
- 📍 Location: Johannesburg, South Africa

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

---

<div align="center">

**Built with ❤️ by Mpho Alphios Mofokeng (Kahuna)**

*Empowering the next generation through technology, mentorship, and innovation*

</div>
