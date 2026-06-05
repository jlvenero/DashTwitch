/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Fira Code"', '"Courier New"', 'monospace'], 
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          card: '#141414',
          border: '#262626',
          green: '#10b981',
          red: '#ef4444',
          textMuted: '#737373'
        }
      }
    },
  },
  plugins: [],
}