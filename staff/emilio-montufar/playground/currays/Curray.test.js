var Curray = require('./Curray')

console.log('Test constructor')

console.log('Case biulds a new instance of curray')

var c = new Curray

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c instanceof Object, 'c is a Object')

console.log('Case biulds a new Curray with values')

var c = new Curray(10, 20, 30)

console.assert(c instanceof Curray, 'c is a Curray')
console.assert(c[0] === 'hola mundo', 'c at 0 is hola mundo')
console.assert(c.length === 1, 'c length is 1')