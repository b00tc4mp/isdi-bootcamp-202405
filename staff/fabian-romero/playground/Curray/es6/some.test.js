const Curray = require('./Curray')


console.info('TEST Curray.prototype.some')

console.info('CASE some in curray')

{
    const numeros = new Curray(1, 2, 3, 4, 5)

    const even = function (element) {

        return element % 2 === 0;
        // lo mismo que decir si hay algun elemento par

    }

    const num = numeros.some(even)
    console.assert(num === true, 'num is true')

    const even1 = function (number) {

        return number > 3

    }

    const num1 = numeros.some(even1)
    console.assert(num1 === true, 'num1 is true')
}