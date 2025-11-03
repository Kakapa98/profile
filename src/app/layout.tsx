import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mpho Mofokeng (Kahuna) - Student Performance Manager & QA Lead | WeThinkCode_',
  description: 'Passionate technologist, mentor, and QA-Elective Lead at WeThinkCode_. Specializing in software testing, blockchain innovation, and empowering the next generation of developers in South Africa.',
  keywords: [
    'Mpho Mofokeng',
    'Kahuna',
    'Kakapa',
    'Student Performance Manager',
    'QA Lead',
    'WeThinkCode',
    'South Africa',
    'Blockchain',
    'Quality Assurance',
    'Software Testing',
    'Mentor',
    'Python',
    'Java',
    'Selenium',
    'Smart Contracts',
    'Africa Blockchain Club'
  ],
  authors: [{ name: 'Mpho Alphios Mofokeng' }],
  creator: 'Mpho Alphios Mofokeng',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://profile-kakapa98.vercel.app',
    title: 'Mpho Mofokeng (Kahuna) - Student Performance Manager & QA Lead',
    description: 'Passionate technologist, mentor, and QA-Elective Lead at WeThinkCode_. Specializing in software testing, blockchain innovation, and empowering the next generation of developers.',
    siteName: 'Mpho Mofokeng Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mpho Mofokeng (Kahuna) - Student Performance Manager & QA Lead',
    description: 'Passionate technologist, mentor, and QA-Elective Lead at WeThinkCode_. Specializing in software testing, blockchain innovation, and empowering developers.',
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
