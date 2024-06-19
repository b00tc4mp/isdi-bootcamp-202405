var Curray = require('./Curray')
require('./Curray.prototype.slice')


console.info('TEST Array.prototype.slice')

console.info('CASE slice in array')

var animals = new Curray('ant', 'bison', 'camel', 'duck', 'elephant')

var animals1 = animals.slice(0, 3)
var animals2 = animals.slice(4)
var animals3 = animals.slice(2, -1)

console.assert(animals1[0] === 'ant', 'animals1 at 0 is ant')
console.assert(animals1[1] === 'bison', 'animals1 at 1 is bison')
console.assert(animals1[2] === 'camel', 'animals1 at 2 is camel')
console.assert(animals2[0] === 'elephant', 'animals2 at 0 is elephant')
console.assert(animals3[0] === 'camel', 'animals3 at 0 is camel')
console.assert(animals3[1] === 'duck', 'animals3 at 0 is duck')