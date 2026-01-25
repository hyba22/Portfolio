/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',
        secondary: '#ff18ba77',
      },
      animation:{
        'spin-slow':'spin 5s linear infinite', //slow spin animation 
      },
      keyframes:{
        spin:{
          '0%':{transform:'rotate(0deg)'},
          '100%':{transform:'rotate(360deg)'},
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        }
      }
    },
  },
  plugins: [],
}