var Curray = require('./Curray')
require('./Curray.prototype.some')

console.info('TEST Array.prototype.some')

console.info('CASE includes in array')

var numeros = new Curray(1, 2, 3, 4, 5)

var even = (element) => element % 2 === 0;

var someEven = numeros.some(even)
console.assert(someEven === true, 'someEven is True')

var someCallback = numeros.some(function (number) {
    return number > 3
})

console.assert(someCallback === true, 'someCallback is True')