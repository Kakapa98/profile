'use client'

import { motion } from 'framer-motion'
import { Code, Database, Smartphone, Shield, Zap, Cpu } from 'lucide-react'
import { useMemo } from 'react'

const floatingIcons = [
  { Icon: Code, delay: 0, x: '10%', y: '20%' },
  { Icon: Database, delay: 0.5, x: '85%', y: '15%' },
  { Icon: Smartphone, delay: 1, x: '15%', y: '70%' },
  { Icon: Shield, delay: 1.5, x: '80%', y: '75%' },
  { Icon: Zap, delay: 2, x: '50%', y: '10%' },
  { Icon: Cpu, delay: 2.5, x: '90%', y: '45%' },
]

// Pre-generated particle positions to avoid hydration mismatch
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: [38.96, 24.51, 3.78, 44.00, 88.98, 70.80, 94.40, 87.29, 83.07, 90.27, 21.32, 76.30, 63.89, 28.09, 15.94, 37.76, 28.15, 27.07, 3.66, 9.75][i],
  top: [53.86, 42.84, 3.18, 7.42, 22.79, 71.07, 30.12, 80.87, 46.86, 81.30, 1.76, 7.24, 56.37, 6.45, 19.66, 44.07, 9.03, 82.80, 84.55, 4.69][i],
  duration: [4.5, 3.2, 2.8, 4.1, 3.7, 2.5, 4.8, 3.4, 2.9, 4.2, 3.1, 2.7, 4.6, 3.5, 2.6, 4.3, 3.8, 2.4, 4.7, 3.3][i],
  delay: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 0.2, 0.7, 1.2, 1.7, 2.2, 2.7, 3.2, 3.7, 4.2, 4.7][i]
}))

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
      {particlePositions.map((particle, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-primary-400/20 rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
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
