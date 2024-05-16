/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4285F4',
        secondary: 'rgba(66, 133, 244, 0.3)',
        hover1: 'rgba(82, 82, 82, 0.3)',
        hover2: '#EAECF0',
      },
      fontFamily: {
        sans: ['Roboto', 'Alata'],
        poppins: ['Poppins', 'sans-serif'],
        alata: ['Alata', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        gilroy: ['gilroy-heavy', 'sans-serif'],
      },
    },
  },
  plugins: [],
}