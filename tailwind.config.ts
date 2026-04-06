import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        indigo: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        emerald: {
          DEFAULT: '#10b981',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.15), transparent)',
      },
      boxShadow: {
        'glow-indigo': '0 4px 24px rgba(99,102,241,0.35)',
        'glow-indigo-lg': '0 8px 40px rgba(99,102,241,0.45)',
        'glow-violet': '0 4px 24px rgba(139,92,246,0.35)',
        'glow-emerald': '0 4px 24px rgba(16,185,129,0.3)',
        'card': '0 2px 20px rgba(0,0,0,0.055), 0 1px 3px rgba(0,0,0,0.04)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'glass': '0 4px 24px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.04)',
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'blob-drift': 'blob-drift 12s ease-in-out infinite',
        'marquee': 'marquee 22s linear infinite',
        'shimmer': 'shimmer 1.5s infinite',
        'spotlight': 'spotlight 4s ease infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1deg)' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -15px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 10px) scale(0.97)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        spotlight: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}

export default config