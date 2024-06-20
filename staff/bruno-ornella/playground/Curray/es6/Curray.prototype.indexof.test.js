const Curray = require('./Curray')

console.info('CASE indexOf animal in array')

const animals = new Curray('ant', 'bison', 'camel', 'duck', 'bison');

const indexOfAnimals = animals.indexOf('bison')

const indexOfAnimals1 = animals.indexOf('bison', 2)

console.assert(indexOfAnimals === 1, 'indexOf animals is equal to 1')
console.assert(indexOfAnimals1 === 4, 'indexOf animals is equal to 4')