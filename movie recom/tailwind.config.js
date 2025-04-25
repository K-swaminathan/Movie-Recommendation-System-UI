/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDE9F7',
          100: '#D3C6EC',
          200: '#B8A3E1',
          300: '#9D80D6',
          400: '#825DCB',
          500: '#673AB7', // Primary purple
          600: '#5A189A',
          700: '#4C1284',
          800: '#3F0C6E',
          900: '#320658',
        },
        secondary: {
          50: '#E6EFFD',
          100: '#C4D7FB',
          200: '#A3C0F8',
          300: '#81A8F5',
          400: '#6090F3',
          500: '#3E78F0',
          600: '#03045E', // Deep blue
          700: '#162969',
          800: '#0F1A4A',
          900: '#070C2B',
        },
        accent: {
          50: '#FFF1E6',
          100: '#FFDBC3',
          200: '#FFC59F',
          300: '#FFAF7B',
          400: '#FF9957',
          500: '#FF8333',
          600: '#FF5400', // Accent orange
          700: '#CC4300',
          800: '#993300',
          900: '#662200',
        },
        success: {
          50: '#E7F7EF',
          100: '#C6ECD7',
          200: '#A5E1BF',
          300: '#83D6A7',
          400: '#62CB8F',
          500: '#41C077',
          600: '#34A165',
          700: '#267D4C',
          800: '#195934',
          900: '#0D351D',
        },
        warning: {
          50: '#FFF9E6',
          100: '#FFEFC2',
          200: '#FFE59F',
          300: '#FFDB7C',
          400: '#FFD159',
          500: '#FFC736',
          600: '#FFBD13',
          700: '#CC9500',
          800: '#996F00',
          900: '#664A00',
        },
        error: {
          50: '#FDE7E7',
          100: '#FBC5C5',
          200: '#F9A2A2',
          300: '#F77F7F',
          400: '#F55C5C',
          500: '#F33939',
          600: '#E11313',
          700: '#B20F0F',
          800: '#840B0B',
          900: '#550808',
        },
        dark: {
          50: '#EAEAEC',
          100: '#CACBCF',
          200: '#ABACB3',
          300: '#8B8D97',
          400: '#6C6E7B',
          500: '#4C4F5F',
          600: '#2C2E3A', // Background dark
          700: '#1F2028', // Darker background
          800: '#13141A', // Darkest background
          900: '#060708',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};