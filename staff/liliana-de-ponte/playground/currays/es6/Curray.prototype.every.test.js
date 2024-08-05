var Curray = require('./Curray')

console.info('TEST Array.prototype.everty')

console.info('CASE every in array')

const numbers = new Curray(1, 30, 39, 29, 10, 13)

const isBelowThreshold = function (currentValue) {
    return currentValue < 40
}

const numbersEvery = numbers.every(isBelowThreshold)

console.assert(numbersEvery === true, 'numbersEvery is true')
console.assert(numbers[0] < 40, 'numbers at 0 is less than 40')
console.assert(numbers[1] < 40, 'numbers at 1 is less than 40')
console.assert(numbers[2] < 40, 'numbers at 2 is less than 40')
console.assert(numbers[3] < 40, 'numbers at 0 is less than 40')
console.assert(numbers[4] < 40, 'numbers at 0 is less than 40')
console.assert(numbers[5] < 40, 'numbers at 0 is less than 40')

console.info('CASE not every in array')

const numbers2 = new Curray(1, 30, 39, 29, 10, 13, 45)

const isBelowThreshold2 = function (currentValue) {
    return currentValue < 40
}

const numbersNotEvery = numbers2.every(isBelowThreshold2)

console.assert(numbersNotEvery === false, 'numbersEvery is false')
console.assert(numbers2[6] > 40, 'numbers2 at 6 is not less than 40')