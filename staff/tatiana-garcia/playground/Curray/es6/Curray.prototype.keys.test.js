const Curray = require('./Curray')

console.info('TEST keys in Curray')

console.info('CASE keys in Curray')

const letters = new Curray('a', 'b', 'c');

const iterator = letters.keys()
const next1 = iterator.next()

console.assert(next1.value === 0, 'next.value  is 0')
console.assert(next1.done === false, 'next.done is false (0)')

const next2 = iterator.next()

console.assert(next2.value === 1, 'next.value  is 1')
console.assert(next2.done === false, 'next.done is false (1)')

const next3 = iterator.next()

console.assert(next3.value === 2, 'next.value  is 2')
console.assert(next3.done === false, 'next.done is false (2)')

const next = iterator.next()

console.assert(next.value === undefined, 'next.value  is undefined')
console.assert(next.done === true, 'next.done is true')