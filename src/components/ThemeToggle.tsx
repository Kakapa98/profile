'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-14 rounded-full bg-secondary/20 border-2 border-secondary/30" />
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary hover:bg-secondary/90 border-2 border-secondary shadow-lg flex items-center justify-center transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-primary" />
      ) : (
        <Moon className="w-6 h-6 text-primary" />
      )}
    </motion.button>
  );
}

