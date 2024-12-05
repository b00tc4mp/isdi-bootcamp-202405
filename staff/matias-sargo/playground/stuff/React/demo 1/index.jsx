const title = React.createElement('h1', { children: 'Hello, World!' })

const query = React.createElement('input', { type: 'text', name: 'q', placeholder: 'Search' })

const form = React.createElement('form', {
    children: query,
    action: 'https://www.google.com/search'
})

const samu = React.createElement('li', { children: 'Samu' })
const edu = React.createElement('li', { children: 'Edu' })
const marti = React.createElement('li', { children: 'Martí' })

const people = React.createElement('ul', { children: [samu, edu, marti] })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render([title, form, people])