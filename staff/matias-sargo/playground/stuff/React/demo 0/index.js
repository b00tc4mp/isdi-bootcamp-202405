const title = document.createElement('h1')
title.innerText = 'Hello, Word!'

const query = document.createElement('input')
query.type = 'text'
query.name = 'q'

const form = document.createElement('form')
form.action = 'https://www.google.com/search'
form.appendChild(query)

const patri = document.createElement('li')
patri.innerText = 'patri'

const ale = document.createElement('li')
patri.innerText = 'ale'

const mat = document.createElement('li')
patri.innerText = 'mat'

const people = document.createElement('ul')
people.appendChild(patri)
people.appendChild(ale)
people.appendChild(mat)

const root = document.getElementById('root')
root.appendChild(title)
root.appendChild(form)
root.appendChild(people)