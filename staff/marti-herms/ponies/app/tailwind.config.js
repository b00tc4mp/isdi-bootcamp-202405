/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './view/**/*.jsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'selector'
}

