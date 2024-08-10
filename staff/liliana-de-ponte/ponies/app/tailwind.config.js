/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './view/**/*.jsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
  darkMode: 'selector',
}

