/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './view/**/*.jsx'],
  theme: {
    extend: {
      fontFamily: {
        teko: ['Teko', ...defaultTheme.fontFamily.sans],
        coda: ['Coda', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}

