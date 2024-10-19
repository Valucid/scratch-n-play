/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        geist: ['Geist', 'sans-serif'],
        bangers: ['Bangers', 'sans-serif'],
        anaheim: ['Anaheim', 'sans-serif'],
      },
      colors: {
        dark: "#0A0B0A",
        gray1: "#405E80",
        gray2: "#A0AFC0",
        light: "#FAFAFA"
      },
      backgroundImage: {
        'gradient-to-b': 'linear-gradient(180deg, #D6EDFF 0%, #630A0D 4%, #CC9C02 100%)'
      }
    },
  },
  plugins: [],
}

