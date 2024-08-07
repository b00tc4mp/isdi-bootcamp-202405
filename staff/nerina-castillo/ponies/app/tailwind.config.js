/** @type {import('tailwindcss').Config} */

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './view/**/*.jsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        advent: ['Advent Pro', ...defaultTheme.fontFamily.sans],
        over: ['Over the Rainbow', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}


