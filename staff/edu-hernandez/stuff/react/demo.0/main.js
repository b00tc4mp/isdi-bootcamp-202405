const title = document.createElement('h1')
title.innerText = 'Hello, World!'

const query = document.createElement('input')
query.type = 'text'
query.name = 'q'

const form = document.createElement('form')
form.action = 'https://www.google.com/search'
form.appendChild(query)

const samu = document.createElement('li')
samu.innerText = 'Samu'

const edu = document.createElement('li')
edu.innerText = 'Edu'

const marti = document.createElement('li')
marti.innerText = 'Marti'

const people = document.createElement('ul')
people.appendChild(samu)
people.appendChild(edu)
people.appendChild(marti)

const root = document.getElementById('root')
root.appendChild(title)
root.appendChild(form)
root.appendChild(people)