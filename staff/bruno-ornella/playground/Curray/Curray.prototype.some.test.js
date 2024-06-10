const Curray = require("./Curray")
require('./Curray.prototype.some')

console.info('TEST SOME')

console.info('CASE some in array')

var arrays = new Curray(2, 3, 4, 5)



var even = arrays.some(function (element) {
    return element > 1
})

console.assert(arrays instanceof Curray, 'arrays is an Array')
console.assert(even === true, 'even is true')
