/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfcf8',
          100: '#faf7f0',
          200: '#f5efe0',
          300: '#ede3cc',
          400: '#e0d0b0',
        },
        sand: {
          100: '#f0e6d3',
          200: '#e8d5b7',
          300: '#d4b896',
          400: '#c4a07a',
          500: '#b08060',
        },
        mocha: {
          100: '#c9a882',
          200: '#a87c52',
          300: '#8b6340',
          400: '#6b4a2e',
          500: '#4a3020',
        },
        sage: {
          100: '#e8ede6',
          200: '#c8d4c4',
          300: '#a8b9a2',
          400: '#7d9875',
          500: '#5a7a52',
        },
        dusty: {
          100: '#e8e0d8',
          200: '#d4c8bc',
          300: '#b8a898',
          400: '#9c8878',
          500: '#7a6858',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Jost"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        'ultra-wide': '0.5em',
      },
    },
  },
  plugins: [],
}
