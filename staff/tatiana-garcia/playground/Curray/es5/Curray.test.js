var Curray = require('./Curray')

console.info('TEST constructor')

console.info('CASE builds a new instance of Curray')

var c = new Curray // = new Curray()

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c instanceof Object, 'c is a Object')

