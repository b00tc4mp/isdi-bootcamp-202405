var Curray = require('./Curray')
require('./Curray.prototype.every')


console.info('TEST Curray.prototype.every')

console.info('CASE every in Curray')

var numeros = new Curray(1, 30, 39, 29, 10, 13)

var isBelowThreshold = function (currentValue) {

    return currentValue < 40

}

var numeros1 = numeros.every(isBelowThreshold)


var isBelowThreshold1 = function (currentValue) {

    return currentValue < 30

}

var numeros2 = numeros.every(isBelowThreshold1)

console.assert(numeros1 === true, 'isBelowThreshold is true')
console.assert(numeros2 === false, 'isBelowThreshold1 is false')
