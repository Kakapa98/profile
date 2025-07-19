'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, Code, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from '@/components/AnimatedBackground'
import TypewriterText from '@/components/TypewriterText'
import FloatingElements from '@/components/FloatingElements'
import ParticleSystem from '@/components/ParticleSystem'
import MobileMenu from '@/components/MobileMenu'

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Particle System */}
      <ParticleSystem />

      {/* Floating Elements */}
      <FloatingElements />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 w-full bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl z-50 border-b border-white/20 dark:border-slate-700/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Mpho
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex space-x-8"
            >
              {['About', 'Skills', 'Projects', 'Contact'].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="relative text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-secondary-600 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Mobile Menu */}
            <MobileMenu />
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        style={{ y, opacity }}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center relative z-10">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm rounded-full border border-white/30 dark:border-slate-700/30"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <MapPin className="w-4 h-4 text-primary-600 mr-2" />
                </motion.div>
                <span className="text-slate-700 dark:text-slate-300 font-medium">South Africa</span>
              </motion.div>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="text-slate-900 dark:text-white"
                >
                  Hi, I'm{' '}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="relative inline-block"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 animate-pulse">
                    Mpho
                  </span>
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-lg blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="inline-block ml-4"
                >
                  👋
                </motion.span>
              </motion.h1>
            </motion.div>

            {/* Typewriter Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="mb-8"
            >
              <TypewriterText
                texts={[
                  "Software Developer & QA Engineer",
                  "C# & Blockchain Specialist",
                  "WeThinkCode_ Graduate",
                  "Quality-First Developer"
                ]}
                className="text-2xl md:text-4xl text-slate-700 dark:text-slate-300 font-semibold"
              />
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="mb-12"
            >
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed">
                Building robust applications with{' '}
                <motion.span
                  className="font-semibold text-primary-600 relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  C#
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                  />
                </motion.span>
                {' '}and{' '}
                <motion.span
                  className="font-semibold text-secondary-600 relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  blockchain technology
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                  />
                </motion.span>
                .<br />
                WeThinkCode_ Graduate with a quality-first mindset.
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.0 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="#contact"
                  className="group relative bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <motion.div
                    className="ml-2 relative z-10"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link
                  href="/backup-2022-site/assets/Resume-Mpho-Mofokeng-2.pdf"
                  className="group border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center backdrop-blur-sm"
                >
                  <span>Download Resume</span>
                  <motion.div
                    className="ml-2"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowDown className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex justify-center space-x-8"
            >
              {[
                { icon: Github, href: "https://github.com/Kakapa98", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com/in/mpho-mofokeng", label: "LinkedIn" },
                { icon: Code, href: "#projects", label: "Projects" }
              ].map(({ icon: Icon, href, label }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={href}
                    target={href.startsWith('http') ? "_blank" : undefined}
                    rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                    className="group relative p-3 bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm rounded-full border border-white/20 dark:border-slate-700/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{
            y: [0, 12, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="flex flex-col items-center text-slate-500 dark:text-slate-400"
        >
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <div className="p-2 rounded-full border border-slate-300 dark:border-slate-600">
            <ArrowDown className="w-5 h-5" />
          </div>
        </motion.div>
      </motion.div>
    </main>
  )
}
