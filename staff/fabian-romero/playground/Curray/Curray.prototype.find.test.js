var Curray = require('./Curray')
require('./Curray.prototype.find')

console.info('TEST FIND')

console.info('CASE find in array')

var numbers = (5, 12, 8, 130, 44)

var found = numbers.find((element) => element > 10)

console.log(found)
// 12