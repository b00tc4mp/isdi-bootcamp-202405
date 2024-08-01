var Curray = require('./Curray')

console.info('TEST constructor')

console.info('CASE build a new instance of Curray')

var c = new Curray // new Curray()

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c instanceof Object, 'c is a Object')

console.info('CASE builds a new Curray with values')

var c = new Curray(10, 20, 30)

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c[0] === 10, 'c at 0 is 10')
console.assert(c[1] === 20, 'c at 1 is 20')
console.assert(c[2] === 30, 'c at 2 is 30')
console.assert(c.length === 3, 'c length is 3')

console.info('CASE builds a new Curray with only one numeric argument')

var c = new Curray(10)

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c.length === 10, 'c length is 10')

console.info('CASE builds a new Curray with only one non-numeric argument')

var c = new Curray('hola mundo')

console.assert(c instanceof Curray, 'c ia a Curray')
console.assert(c[0] === 'hola munndo', 'c at 0 is hola mundo')
console.assert(c.length === 1, 'c length is 1')



