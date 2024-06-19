var Curray = require('./Curray')
require('./Curray.prototype.shift')

console.log('TEST Curray.prototype.shift')

console.log('CASE shift in Curray')

var animals = new Curray

animals[0] = 'Dodo'
animals[1] = 'Tiger'
animals[2] = 'Penguin'
animals[3] = 'Dodo'
animals[4] = 'Elephant'
animals.length = 5

console.assert(animals.length === 5, 'animals length is 5')

var animals2 = animals.shift()

console.assert(animals2 === 'Dodo', 'animals2 is Dodo')
console.assert(animals[0] === 'Tiger', 'animals at 0 is Tiger')
console.assert(animals[1] === 'Penguin', 'animals at 1 is Penguin')
console.assert(animals[2] === 'Dodo', 'animals at 2 is Dodo')
console.assert(animals[3] === 'Elephant', 'animals at 3 is Elephant')
console.assert(animals.length === 4, 'animals length is 4')
