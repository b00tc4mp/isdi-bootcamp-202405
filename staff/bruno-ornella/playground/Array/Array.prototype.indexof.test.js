console.info('CASE indexOf animal in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison'];

var indexOfAnimals = animals.indexOf('bison')

var indexOfAnimals1 = animals.indexOf('bison', 2)

console.assert(indexOfAnimals === 1, 'indexOf animals is equal to 1')
console.assert(indexOfAnimals1 === 4, 'indexOf animals is equal to 4')