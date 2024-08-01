var Curray = require('./Curray')

console.info('TEST Curray.prototype.pop')

console.info('CASE pop the last element from Curray')

const cars = new Curray

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

const car1 = cars[0]
const car2 = cars[1]
const car3 = cars[2]


const last = cars.pop()

console.assert(car3 === last, 'car3 is { brand: fiat, model: 500, year: 2017 }')
console.assert(cars.length === 2, 'cars length is 2')
console.assert(car1.brand === 'ferrari', 'cars at 0 brand is ferrari')