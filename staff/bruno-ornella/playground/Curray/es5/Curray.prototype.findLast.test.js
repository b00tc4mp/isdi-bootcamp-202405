var Curray = require('./Curray')
require('./Curray.prototype.findLast')

console.info('TEST Curray.prototype.findLast')

console.info('CASE findLast in curray')

var numbers = new Curray(5, 12, 8, 130, 44)


var found = numbers.findLast(function (element) {
    return element > 13
})
console.assert(found === 44, 'found is 44')

var found1 = numbers.findLast(function (element) {
    return element < 2
})
console.assert(found1 === undefined, 'found1 is undefined')