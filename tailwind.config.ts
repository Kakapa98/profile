import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#28443F', // Deep teal - main background color
          50: '#e8f0ee',
          100: '#d1e1dd',
          200: '#a3c3bb',
          300: '#75a599',
          400: '#478777',
          500: '#28443F',
          600: '#203632',
          700: '#182826',
          800: '#101a19',
          900: '#080d0c',
        },
        secondary: {
          DEFAULT: '#F2FD7D', // Lemon yellow - accent/text color
          50: '#fefef0',
          100: '#fdfde1',
          200: '#fbfbc3',
          300: '#f9f9a5',
          400: '#f7fb87',
          500: '#F2FD7D',
          600: '#e8f364',
          700: '#dde94b',
          800: '#d3df32',
          900: '#c8d519',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
