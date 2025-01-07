/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './index.html',
    './view/**/*.jsx'
  ],
  theme: {
    extend: {
      colors: {
        background_grey: '#262626',
        background_light_grey: '#343434',
        title: '#4A4A4A',
        dark_white: '#D0D0D0',
        grey: '#343434',
        light_grey: '#5B5B5B',
        sea: '#4285F4',
        grass: '#5EB53F',
        ore: '#EBC351',
        laranja: '#D15933',
        shadowColor: '#D15933'
      },
      boxShadow: {
        'custom': '0 4px 30px rgba(211, 89, 51, 0.5)'
      },
      fontFamily: {
        moderustic: ['Moderustic', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        bevan: ['Bevan', ...defaultTheme.fontFamily.sans],
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      backgroundImage: {
        'cities-gradient': 'linear-gradient(to bottom right, #FF9B21, #CE23DD)',
      },
      backgroundClip: {
        text: 'text',
      },
      textFillColor: {
        transparent: 'transparent',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-cities': {
          'background-image': 'linear-gradient(to bottom right, #FF9B21, #CE23DD)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.border-cities': {
          'border-image': 'linear-gradient(to bottom right, #FF9B21, #CE23DD)',
          '-webkit-border-clip': 'border',
          '-webkit-border-fill-color': 'cities',
        },
      })
    }
  ],
  darkMode: 'selector',
}