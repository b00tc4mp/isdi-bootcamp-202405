var Curray = require('./Curray')
require('./Curray.prototype.at')

console.info('Test Curray.prototype.at')

console.info('CASE element a positive index')

var nums = new Curray(5, 12, 8, 130, 44)
var num = nums.at(3)

console.assert(num === 130, 'num is 130')


console.info('CASE element at index 0')

var nums = new Curray(5, 12, 8, 130, 44)
var num = nums.at(0)

console.assert(num === 5, 'num is 5')


console.info('CASE element a negative index')

var nums = new Curray(5, 12, 8, 130, 44)
var num = nums.at(-3)

console.assert(num === 8, 'num is 8')


console.info('CASE element a positive index greater than length')

var num = new Curray(5, 12, 8, 130, 44)
var num = nums.at(100)

console.assert(num === undefined, 'num is undefined')


console.info('CASE element a negative index greater than -length')

var num = new Curray(5, 12, 8, 130, 44)
var num = nums.at(-100)

console.assert(num === undefined, 'num is undefined')