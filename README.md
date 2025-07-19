# Mpho Mofokeng - Portfolio 2025

A modern, responsive portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Mobile-first approach, works on all devices
- **Performance**: Optimized for speed and SEO
- **Accessibility**: WCAG compliant with proper semantic HTML
- **Dark Mode**: Toggle between light and dark themes
- **Interactive**: Smooth animations with Framer Motion

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Deployment**: Vercel

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable components
├── lib/               # Utility functions
└── types/             # TypeScript type definitions
```

## 🎨 Customization

### Colors
The color scheme can be customized in `tailwind.config.ts`:
- Primary: Blue shades
- Secondary: Green shades
- Neutral: Gray shades

### Content
Update personal information in:
- `src/app/page.tsx` - Hero section
- `src/app/layout.tsx` - Meta tags and SEO

## 📈 Performance

- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Largest Contentful Paint: <2.5s
- Cumulative Layout Shift: <0.1

## 🚀 Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Mpho Mofokeng
