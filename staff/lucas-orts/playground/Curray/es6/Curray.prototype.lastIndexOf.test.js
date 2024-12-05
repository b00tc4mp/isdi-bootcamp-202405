const Curray = require('./Curray')


console.info('TEST Curray.prototype.lastIndexOf')

console.info('CASE lastIndexOf in array')

const animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

const animals1 = animals.lastIndexOf('Penguin')
const animals2 = animals.lastIndexOf('Dodo')
const animals3 = animals.lastIndexOf('Dodo', 1)
const animals4 = animals.lastIndexOf('Giraffa')
const animals5 = animals.lastIndexOf('Tiger', -4)

console.assert(animals1 === 2, 'animals1 is 2')
console.assert(animals2 === 3, 'animals2 is 3')
console.assert(animals3 === 0, 'animals3 is 0')
console.assert(animals4 === -1, 'animals4 is -1')
console.assert(animals5 === 1, 'animals5 is 1')