import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mpho Mofokeng - Software Developer & QA Engineer | South Africa',
  description: 'South African software developer specializing in C# and blockchain technology. WeThinkCode_ graduate with expertise in quality assurance and full-stack development.',
  keywords: [
    'Mpho Mofokeng',
    'Software Developer',
    'QA Engineer',
    'South Africa',
    'WeThinkCode',
    'C#',
    'Blockchain',
    'Full Stack Developer',
    'Quality Assurance',
    'React',
    'Next.js'
  ],
  authors: [{ name: 'Mpho Mofokeng' }],
  creator: 'Mpho Mofokeng',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://profile-kakapa98.vercel.app',
    title: 'Mpho Mofokeng - Software Developer & QA Engineer',
    description: 'South African software developer specializing in C# and blockchain technology. WeThinkCode_ graduate with expertise in quality assurance and full-stack development.',
    siteName: 'Mpho Mofokeng Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mpho Mofokeng - Software Developer & QA Engineer',
    description: 'South African software developer specializing in C# and blockchain technology. WeThinkCode_ graduate with expertise in quality assurance and full-stack development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
