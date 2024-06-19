var Curray = require('./Curray')
require('./Curray.prototype.keys')


console.info('TEST Curray.prototype.keys')

console.info('CASE keys in curray')

var letters = new Curray('a', 'b', 'c')
var iterator = letters.keys()

var next = iterator.next()

console.assert(next.value === 0, 'next value is 0')
console.assert(next.done === false, 'next done is false (0)')

next = iterator.next()

console.assert(next.value === 1, 'next value is 1')
console.assert(next.done === false, 'next done is false (1)')

next = iterator.next()

console.assert(next.value === 2, 'next value is 2')
console.assert(next.done === false, 'next done is false (2)')

next = iterator.next()

console.assert(next.value === undefined, 'next value is undefined')
console.assert(next.done === true, 'next done is true (3)')

next = iterator.next()

console.assert(next.value === undefined, 'next value is undefined')
console.assert(next.done === true, 'next done is true (4)')

next = iterator.next()

console.assert(next.value === undefined, 'next value is undefined')
console.assert(next.done === true, 'next done is true (5)')

next = iterator.next()

console.assert(next.value === undefined, 'next value is undefined')
console.assert(next.done === true, 'next done is true (6)')