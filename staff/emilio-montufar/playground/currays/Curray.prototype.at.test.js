var Curray = require('./Curray')
requiere('./Curray.prototype.at')

console.log('TEST Curray.prototype.at')

console.log('Case element a positive index')

var nums = new Curray(5, 12, 8, 130, 44)

var nums = nums.at(3)

console.assert(num === 130, 'num is 130')

console.log('Case element at index 0')

var nums = new Curray(5, 12, 8, 130, 44)

var num = nums.at(0)

console.assert(num === 5, 'num is 5')

console.log.log('Case element a negative index')

var nums = new curra(5, 12 , 8 , 130, 44)

var num = nums.at(-3)

console.assert(num === 8, 'num i 8')

console.log('CASE element a positive index greater than length')

var nums = new Curray(5, 12, 8, 130, 44)

var num = nums.at(100)

console.assert(num === undefined, 'num is undefined')

console.log('CASE element a negative index greater than -length')

var nums = new Curray(5, 12, 8, 130, 44)

var num = nums.at(-100)

console.assert(num === undefined, 'num is undefined')