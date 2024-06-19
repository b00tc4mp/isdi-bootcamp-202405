const Curray = require('./Curray')

console.info('TEST Curray.prototype.shift')

console.info('CASE shift in Curray')

const animals = new Curray

animals[0] = 'Dodo'
animals[1] = 'Tiger'
animals[2] = 'Penguin'
animals[3] = 'Dodo'
animals[4] = 'Elephant'
animals.length = 5

console.assert(animals[0] === 'Dodo', 'animals at 0 is Dodo')
console.assert(animals[1] === 'Tiger', 'animals at 1 is Tiger')
console.assert(animals[2] === 'Penguin', 'animals at 2 is Penguin')
console.assert(animals[3] === 'Dodo', 'animals at 3 is Dodo')
console.assert(animals[4] === 'Elephant', 'animals at 4 is Elephant')
console.assert(animals.length === 5, 'animals length is 5')

const animals2 = animals.shift()

console.assert(animals2 === 'Dodo', 'animals2 is Dodo')
console.assert(animals[0] === 'Tiger', 'animals at 0 is Tiger')
console.assert(animals[1] === 'Penguin', 'animals at 1 is Penguin')
console.assert(animals[2] === 'Dodo', 'animals at 2 is Dodo')
console.assert(animals[3] === 'Elephant', 'animals at 3 is Elephant')
console.assert(animals.length === 4, 'animals length is 4')
