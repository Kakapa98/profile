'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, Code, Sparkles, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import AnimatedBackground from '@/components/AnimatedBackground'
import TypewriterText from '@/components/TypewriterText'
import FloatingElements from '@/components/FloatingElements'
import ParticleSystem from '@/components/ParticleSystem'
import MobileMenu from '@/components/MobileMenu'
import BlogCard from '@/components/BlogCard'
import { getRecentPosts } from '@/data/blog-posts'

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
                Mpho (Alphios) Mofokeng
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden md:flex space-x-8"
            >
              {['About', 'Skills', 'Projects', 'Blog', 'Contact'].map((item, index) => (
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
                <span className="text-slate-700 dark:text-slate-300 font-medium">Johannesburg, South Africa</span>
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
                  Hi, I&apos;m{' '}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.0 }}
                  className="relative inline-block"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-purple-600 to-secondary-600 animate-pulse">
                    Kahuna
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
                  "Student Performance Manager & QA Elective Lead",
                  "Blockchain Enthusiast & Mentor",
                  "WeThinkCode_ Educator",
                  "Quality-Driven Technologist"
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
                A passionate technologist, mentor, and quality-driven software professional committed to building{' '}
                <motion.span
                  className="font-semibold text-primary-600 relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  innovative solutions
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                  />
                </motion.span>
                {' '}and empowering the next generation through{' '}
                <motion.span
                  className="font-semibold text-secondary-600 relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  education & blockchain
                  <motion.span
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary-600"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                  />
                </motion.span>
                .<br />
                Leading QA excellence at WeThinkCode_ while exploring decentralized innovation.
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
                { icon: Linkedin, href: "https://linkedin.com/in/mpho-mofokeng-9b3346237", label: "LinkedIn" },
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

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Mpho Alphios Mofokeng
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-4">
                Affectionately known as <span className="font-semibold text-primary-600">Kahuna</span> or <span className="font-semibold text-primary-600">Kakapa</span>
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                I&apos;m a passionate technologist, mentor, and quality-driven software professional based in South Africa.
                With a solid foundation in software engineering, testing, and education, I&apos;m committed to building
                innovative, reliable, and community-oriented technology solutions while empowering others to do the same.
              </p>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                I currently serve as a <span className="font-semibold text-primary-600">Student Performance Manager</span> and{' '}
                <span className="font-semibold text-primary-600">QA-Elective Lead</span> at WeThinkCode_, where I guide
                students through rigorous technical training programs and help shape the next generation of software developers and testers.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                My work focuses on fostering excellence through structured mentorship, agile methodologies, and real-world
                testing practices that bridge the gap between education and industry standards.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">💼 Professional Focus</h4>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Oversee student progress across cohorts</li>
                  <li>• Design and lead Quality Assurance Elective</li>
                  <li>• Mentor on manual testing, automation, and API validation</li>
                  <li>• Advocate for scalable testing systems and modern QA pipelines</li>
                </ul>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-3">🔗 Blockchain & Innovation</h4>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  As part of the Africa Blockchain Club (ABC) community, I contribute to initiatives that promote
                  blockchain literacy and technical experimentation.
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                  <li>• Developing smart contract prototypes and DApps</li>
                  <li>• Exploring tokenization and digital identity</li>
                  <li>• Supporting knowledge-sharing through workshops</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-6 rounded-xl text-white">
                <h4 className="text-xl font-bold mb-2">🌟 Philosophy</h4>
                <p className="italic">
                  &quot;Technology should not only solve problems — it should elevate people.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Core Strengths & Skills
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Programming & Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Programming & Development</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'JavaScript', 'SQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Testing & Automation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">🧪</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Testing & Automation</h3>
              <div className="flex flex-wrap gap-2">
                {['Selenium', 'Pytest', 'Postman', 'JUnit'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* DevOps & CI/CD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">DevOps & CI/CD</h3>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'GitHub Actions', 'Jenkins'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Databases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">🗄️</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['SQLite', 'MySQL'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Web & API Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Web & API Design</h3>
              <div className="flex flex-wrap gap-2">
                {['RESTful API', 'Flask', 'Express.js'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Blockchain */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-3xl mb-4">⛓️</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Blockchain</h3>
              <div className="flex flex-wrap gap-2">
                {['Ethereum', 'Solidity', 'Smart Contracts'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Professional Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-primary-600 to-secondary-600 p-8 rounded-xl text-white"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">Professional Skills</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Agile Practices', 'Leadership', 'Mentorship', 'Curriculum Design', 'Community Development'].map((skill) => (
                <span key={skill} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Current Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Library System ORM */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">📚</div>
                <Sparkles className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Library System ORM
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Custom-built ORM framework to manage library operations with persistent data modeling in SQLite3.
                Demonstrates advanced database design, object-relational mapping, and software architecture principles.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Python', 'SQLite3', 'ORM', 'Database Design'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Code className="w-4 h-4 mr-2" />
                <span>Active Development</span>
              </div>
            </motion.div>

            {/* Blockchain Initiatives */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">⛓️</div>
                <Sparkles className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Blockchain Initiatives (ABC)
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                Contributing to smart contract prototypes and educational blockchain sessions across African developer
                communities. Focus on promoting blockchain literacy, tokenization, and decentralized application development.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {['Ethereum', 'Solidity', 'Smart Contracts', 'DApps', 'Web3'].map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-xs font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Code className="w-4 h-4 mr-2" />
                <span>Community Initiative</span>
              </div>
            </motion.div>
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              My mission is to lead by example, build scalable systems, and help others discover the power of code,
              curiosity, and continuous improvement. Whether debugging a test suite, mentoring a future engineer,
              or designing a new DApp, I aim to create meaningful impact through code and collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-8 h-8 text-primary-600" />
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Latest Blog Posts
              </h2>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Insights on quality assurance, blockchain technology, mentorship, and software development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {getRecentPosts(3).map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 group"
            >
              <span>View All Posts</span>
              <ArrowDown className="w-5 h-5 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Connect With Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-600 mx-auto mb-6"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Let&apos;s collaborate on innovative projects, discuss technology, or explore opportunities to work together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Email - Personal */}
            <motion.a
              href="mailto:alphios988@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Personal Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 break-all px-2">alphios988@gmail.com</p>
            </motion.a>

            {/* Email - Work */}
            <motion.a
              href="mailto:mphomofokeng@wethinkcode.co.za"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary-200 dark:group-hover:bg-secondary-900/50 transition-colors">
                <Mail className="w-6 h-6 text-secondary-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Work Email</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 break-all px-2">mphomofokeng@wethinkcode.co.za</p>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/Kakapa98"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50 transition-colors">
                <Github className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">GitHub</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">@Kakapa98</p>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              href="https://linkedin.com/in/mpho-mofokeng-9b3346237"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-center group"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <Linkedin className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">LinkedIn</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Mpho Mofokeng</p>
            </motion.a>
          </div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-white dark:bg-slate-900 rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-primary-600 mr-2" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">Johannesburg, South Africa</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} Mpho Alphios Mofokeng (Kahuna). All rights reserved.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">
            Built with Next.js, TypeScript, and Tailwind CSS
          </p>
        </div>
      </footer>
    </main>
  )
}
