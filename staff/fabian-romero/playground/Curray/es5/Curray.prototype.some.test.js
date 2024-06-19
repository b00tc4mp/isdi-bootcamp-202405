var Curray = require('./Curray')
require('./Curray.prototype.some')

console.info('TEST some in Curray.prototype.some.test')
console.info('CASE some')


var number = new Curray(1, 2, 3, 4, 5);

var even = function (elemnt) {
    return elemnt < 10
}

var numEven = number.some(even)
console.assert(numEven === true, 'even is true')


var even = function (elemnt) {
    return elemnt > 30
}

var numEven = number.some(even)
console.assert(numEven === false, 'even is false')