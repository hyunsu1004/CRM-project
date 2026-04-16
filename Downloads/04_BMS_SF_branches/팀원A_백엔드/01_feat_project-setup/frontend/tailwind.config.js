/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        hyundai: {
          DEFAULT: '#1A4388',
          50: '#eef3fb',
          100: '#d6e2f3',
          200: '#a7bfe4',
          300: '#789cd5',
          400: '#4978c6',
          500: '#1A4388',
          600: '#163a76',
          700: '#123163',
          800: '#0e2850',
          900: '#091e3d',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Pretendard', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
