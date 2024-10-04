/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './view/**/*.jsx'

  ],
  theme: {
    extend: {
      colors: {
        lightGreen: '#AFEF6F',
      },
      height: {
        '20vh': '20vh', // Clase para el 20% de la altura de la pantalla
      },
      maxHeight: {
        '20%': '20%', // Clase personalizada para el 20% de altura máxima
      },
    },
  },
  plugins: [],
}

