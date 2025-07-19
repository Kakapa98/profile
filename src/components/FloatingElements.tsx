'use client'

import { motion } from 'framer-motion'
import { Code, Database, Smartphone, Shield, Zap, Cpu } from 'lucide-react'

const floatingIcons = [
  { Icon: Code, delay: 0, x: '10%', y: '20%' },
  { Icon: Database, delay: 0.5, x: '85%', y: '15%' },
  { Icon: Smartphone, delay: 1, x: '15%', y: '70%' },
  { Icon: Shield, delay: 1.5, x: '80%', y: '75%' },
  { Icon: Zap, delay: 2, x: '50%', y: '10%' },
  { Icon: Cpu, delay: 2.5, x: '90%', y: '45%' },
]

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ 
            opacity: [0, 0.1, 0.2, 0.1, 0],
            scale: [0, 1, 1.2, 1, 0],
            rotate: [0, 360],
            y: [0, -20, 0, 20, 0]
          }}
          transition={{
            duration: 8,
            delay: delay + 3,
            repeat: Infinity,
            repeatDelay: 5,
            ease: "easeInOut"
          }}
        >
          <div className="p-3 bg-white/5 dark:bg-slate-800/5 backdrop-blur-sm rounded-xl border border-white/10 dark:border-slate-700/10">
            <Icon className="w-6 h-6 text-primary-500/30 dark:text-primary-400/30" />
          </div>
        </motion.div>
      ))}

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 left-1/6 w-4 h-4 border border-secondary-400/20 rotate-45"
        animate={{
          rotate: [45, 405],
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-2/3 right-1/4 w-6 h-6 border-2 border-primary-400/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-3/4 w-3 h-8 bg-gradient-to-b from-purple-400/20 to-transparent"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}
