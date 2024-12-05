const Curray = require('./Curray')

console.info('TEST Curray.prototype.indexOf')

console.info('CASE indexOf in Curray')

const animals = new Curray

animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'bison'
animals.length = 5

const animals1 = animals.indexOf('ant')
const animals2 = animals.indexOf('bison')
const animals3 = animals.indexOf('camel', 1)
const animals4 = animals.indexOf('giraffa')
const animals5 = animals.indexOf('ant', -5)
const animals6 = animals.indexOf('bison', 2)

console.assert(animals1 === 0, 'animals1 is 0')
console.assert(animals2 === 1, 'animals2 is 1')
console.assert(animals3 === 2, 'animals3 is 2')
console.assert(animals4 === -1, 'animals4 is -1')
console.assert(animals5 === 0, 'animals5 is 0')
console.assert(animals6 === 4, 'animals6 is 4')