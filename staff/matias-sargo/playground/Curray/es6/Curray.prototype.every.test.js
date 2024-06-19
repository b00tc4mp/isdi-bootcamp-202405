const Curray = require('./Curray')

console.info('TEST Curray.prototype.every')

console.info('CASE every in Curray')

const numeros = new Curray(1, 30, 39, 29, 10, 13)

const isBelowThreshold = function (currentValue) {

    return currentValue < 40

}

const numeros1 = numeros.every(isBelowThreshold)


const isBelowThreshold1 = function (currentValue) {

    return currentValue < 30

}

const numeros2 = numeros.every(isBelowThreshold1)

console.assert(numeros1 === true, 'isBelowThreshold is true')
console.assert(numeros2 === false, 'isBelowThreshold1 is false')