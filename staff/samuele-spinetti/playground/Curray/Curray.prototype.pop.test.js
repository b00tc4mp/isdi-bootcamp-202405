var Curray = require('./Curray')
require('./Curray.prototype.pop')

console.log('TEST Curray.prototype.test')

console.log('CASE pop the last element from Curray')

var cars = new Curray

cars[0] = { brand: 'ferrari', model: 'gto', year: 1990 }
cars[1] = { brand: 'lamborghini', model: 'murcielago', year: 2010 }
cars[2] = { brand: 'fiat', model: '500', year: 2017 }
cars.length = 3

var car1 = cars[0]
var car2 = cars[1]
var car3 = cars[2]

var last = cars.pop()

console.assert(cars.length === 2, 'cars length is 2')
console.assert(car1 === cars[0], 'car1 is { brand: ferrari, model: gto, year: 1990 }')
console.assert(car2 === cars[1], 'car2 is { brand: lamborghini, model: murcielago, year: 2010 }')
console.assert(car3 === last, 'car3 is { brand: fiat, model: 500, year: 2017 }')