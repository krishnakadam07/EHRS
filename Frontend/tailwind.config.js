/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#2563EB', // Blue 600
          dark: '#1D4ED8',
          light: '#DBEAFE',
        },
        secondary: {
          DEFAULT: '#0EA5E9', // Sky 500
          dark: '#0284C7',
          light: '#E0F2FE',
        },
        success: {
          DEFAULT: '#10B981', // Emerald 500
          dark: '#059669',
          light: '#D1FAE5',
        },
        warning: {
          DEFAULT: '#F59E0B', // Amber 500
          dark: '#D97706',
          light: '#FEF3C7',
        },
        danger: {
          DEFAULT: '#EF4444', // Red 500
          dark: '#DC2626',
          light: '#FEE2E2',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#F8FAFC',
        },
        background: {
          DEFAULT: '#F8FAFC', // Slate 50
        },
        text: {
          primary: '#0F172A', // Slate 900
          secondary: '#64748B', // Slate 500
        },
        border: {
          DEFAULT: '#E2E8F0', // Slate 200
        }
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 30px -5px rgba(0, 0, 0, 0.08), 0 4px 10px -5px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
