/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A', // slate-900
          card: '#1E293B', // slate-800
          border: '#334155', // slate-700
          text: '#F8FAFC', // slate-50
          muted: '#94A3B8' // slate-400
        },
        primary: {
          DEFAULT: '#6366F1', // indigo-500
          hover: '#4F46E5', // indigo-600
          glow: 'rgba(99, 102, 241, 0.5)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
