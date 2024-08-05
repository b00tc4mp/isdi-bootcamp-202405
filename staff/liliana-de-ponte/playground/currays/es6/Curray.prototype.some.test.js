const Curray = require('./Curray')

console.info('TEST Array.prototype.some')

console.info('CASE includes in array')

const numeros = new Curray(1, 2, 3, 4, 5)

const even = (element) => element % 2 === 0;

const someEven = numeros.some(even)
console.assert(someEven === true, 'someEven is True')

const someCallback = numeros.some(function (number) {
    return number > 3
})

console.assert(someCallback === true, 'someCallback is True')