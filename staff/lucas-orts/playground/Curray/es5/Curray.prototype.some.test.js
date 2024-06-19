var Curray = require('./Curray')
require('./Curray.prototype.some')


console.info('TEST Curray.prototype.some')

console.info('CASE some in curray')

var numeros = new Curray(1, 2, 3, 4, 5)

var even = function (element) {

    return element % 2 === 0;
    // lo mismo que decir si hay algun elemento par

}

var num = numeros.some(even)
console.assert(num === true, 'num is true')

var even1 = function (number) {

    return number > 3

}

var num1 = numeros.some(even1)
console.assert(num1 === true, 'num1 is true')