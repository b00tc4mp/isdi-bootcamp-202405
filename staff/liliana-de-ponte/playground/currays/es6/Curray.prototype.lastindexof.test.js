var Curray = require('./Curray')

console.info('TEST Curray.prototype.lastIndexOf')

console.info('CASE element at lastIndexOf')

const zoo = new Curray('Giraffe', 'Tiger', 'Penguin', 'Giraffe')

const lastIndexOfZoo = zoo.lastIndexOf('Giraffe')
console.assert(lastIndexOfZoo === 3, 'lastIndexOfZoo is equal to 3')

const lastIndexOfZoo1 = (zoo.lastIndexOf('Tiger'))
console.assert(lastIndexOfZoo1 === 1, 'lastIndexOfZoo1 is equal to 1')

console.info('CASE element at lastIndexOf with 2 arguments')

const lastIndexoOfZoo2 = zoo.lastIndexOf('Giraffe', 2)
console.assert(lastIndexoOfZoo2 === 0, 'lastIndexOfZoo2 is equal to 0')

const lastIndexOfZoo3 = zoo.lastIndexOf('Giraffe', -2)
console.assert(lastIndexOfZoo3 === 0, 'lastIndexOfZoo is equal to 0')

