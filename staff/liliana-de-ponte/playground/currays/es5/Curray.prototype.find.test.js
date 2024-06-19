var Curray = require('./Curray')
require('./Curray.prototype.find')

console.info('TEST Array.prototype.find')

console.info('CASE find')

var numbers = new Curray(5, 12, 8, 130, 44)

var found = numbers.find((element) => element > 10)
console.assert(found === 12, 'found is equal to 12')

var found = numbers.find((element) => element > 100)
console.assert(found === 130, 'found is 130')

var found = numbers.find((element) => element > 130)
console.assert(found === undefined, 'found is undefined')