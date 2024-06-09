console.info('TEST pop')

console.info('CASE pop the last element from array')

var cars = new Array

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }

var car0 = cars[0]
var car1 = cars[1]
var car2 = cars[2]

var last = cars.pop()

console.assert(cars.length === 2, 'cars length is 2')

console.assert(cars[0] === car0, 'cars at 0 is car0')
console.assert(cars[0].brand === 'ferrari', 'cars at 0 brand is ferrari')
console.assert(cars[0].model === 'gto', 'cars at 0 model is gto')
console.assert(cars[0].year === 1990, 'cars at 0 year is 1990')

console.assert(cars[1] === car1, 'cars at 1 is car1')
console.assert(cars[1].brand === 'lamborghini', 'cars at 1 brand is lamborghini')
console.assert(cars[1].model === 'murcielago', 'cars at 1 model is murcielago')
console.assert(cars[1].year === 2010, 'cars at 1 year is 2010')

console.assert(last === car2, 'last is car2')
console.assert(last.brand === 'fiat', 'last brand is fiat')
console.assert(last.model === '500', 'last model is 500')
console.assert(last.year === 2017, 'last year is 2017')
