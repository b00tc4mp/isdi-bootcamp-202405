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
                scatters: ['Scatters', ...defaultTheme.fontFamily.sans],
                neucha: ['Neucha', ...defaultTheme.fontFamily.sans]
            },
        },
    },
    plugins: [],
    darkMode: 'selector'
}