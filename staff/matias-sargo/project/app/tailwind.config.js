/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', './view/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        tiffany: {
          500: '#81D8D0',  // Tiffany blue
          600: '#72C5C0',  // Slightly darker variant
        },
      },
    },
  },
  plugins: [],
}

