var Curray = require('./Curray')
require('./Curray.prototype.map')


console.info('TEST Curray.prototype.map')

console.info('CASE map in curray')

var nums = new Curray(1, 4, 9, 16)

var numsBy2 = nums.map(function (num) { return num * 2 })

console.assert(numsBy2 instanceof Curray, 'numsBy2 is an Array')
console.assert(numsBy2[0] === 2, 'map1 at 0 is 2')
console.assert(numsBy2[1] === 8, 'map1 at 1 is 8')
console.assert(numsBy2[2] === 18, 'map1 at 2 is 18')
console.assert(numsBy2[3] === 32, 'map1 at 3 is 32')
console.assert(numsBy2.length === nums.length, 'map1 length is 4')

console.info("CASE maps cart items to string with stats")

