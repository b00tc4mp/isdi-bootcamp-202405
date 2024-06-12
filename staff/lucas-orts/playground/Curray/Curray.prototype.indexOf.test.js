var Curray = require('./Curray')
require('./Curray.prototype.indexOf')


console.info('TEST Curray.prototype.indexOf')

console.info('CASE indexOf in Curray')

var animals = new Curray

animals[0] = 'ant'
animals[1] = 'bison'
animals[2] = 'camel'
animals[3] = 'duck'
animals[4] = 'bison'
animals.length = 5

var animals1 = animals.indexOf('ant')
var animals2 = animals.indexOf('bison')
var animals3 = animals.indexOf('camel', 1)
var animals4 = animals.indexOf('giraffa')
var animals5 = animals.indexOf('ant', -5)
var animals6 = animals.indexOf('bison', 2)

console.assert(animals1 === 0, 'animals1 is 0')
console.assert(animals2 === 1, 'animals2 is 1')
console.assert(animals3 === 2, 'animals3 is 2')
console.assert(animals4 === -1, 'animals4 is -1')
console.assert(animals5 === 0, 'animals5 is 0')
console.assert(animals6 === 4, 'animals6 is 4')