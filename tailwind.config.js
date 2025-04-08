/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      keyframes: {
        cardEntrance: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9) translateY(30px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        logoSpin: {
          '0%': { 
            transform: 'scale(0) rotate(-180deg)',
            opacity: '0'
          },
          '100%': { 
            transform: 'scale(1) rotate(0deg)',
            opacity: '1'
          },
        },
        slideUp: {
          '0%': { 
            transform: 'translateY(20px)',
            opacity: '0'
          },
          '100%': { 
            transform: 'translateY(0)',
            opacity: '1'
          },
        },
      },
      animation: {
        cardEntrance: 'cardEntrance 0.7s ease-out',
        fadeIn: 'fadeIn 0.5s ease-out forwards',
        logoSpin: 'logoSpin 1s ease-out',
        slideUp: 'slideUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
}

