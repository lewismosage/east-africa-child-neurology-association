/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4A148C', // deep purple
          dark: '#311B92',
          light: '#7C4DFF',
        },
        secondary: {
          DEFAULT: '#8E24AA', // blue-violet
          dark: '#6A1B9A',
          light: '#AB47BC',
        }
      }
    },
  },
  plugins: [],
};