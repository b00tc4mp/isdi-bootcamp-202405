var Curray = require('./Curray')
require('./Curray.prototype.findIndex')


console.info('TEST Curray.prototype.findIndex')

console.info('CASE findIndex in curray')

var numbers = new Curray(5, 12, 8, 130, 44)

var found = numbers.findIndex((element) => element > 10)
console.assert(found === 1, 'found is 1')

var found = numbers.findIndex((element) => element > 100)
console.assert(found === 3, 'found is 3')

var found = numbers.findIndex((element) => element > 130)
console.assert(found === -1, 'found is -1')