const Curray = require('./Curray')


console.info('CASE toString in Curray')

console.info('TEST Curray.prototype.toString')

const string = new Curray(1, 2, 'a', '1a')

const arrayString = string.toString()

console.assert(string instanceof Curray, 'string is an Array')
console.assert(arrayString === '1,2,a,1a', 'arrayString is a "1,2,a,1a"')


