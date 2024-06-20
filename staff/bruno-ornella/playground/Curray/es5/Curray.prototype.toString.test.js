var Curray = require('./Curray')
require('./Curray.prototype.toSting')

console.info('CASE toString in Curray')

console.info('TEST Curray.prototype.toString')

var string = new Curray(1, 2, 'a', '1a')

var arrayString = string.toString()

console.assert(string instanceof Curray, 'string is an Array')
console.assert(arrayString === '1,2,a,1a', 'arrayString is a "1,2,a,1a"')


