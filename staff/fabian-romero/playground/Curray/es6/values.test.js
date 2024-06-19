const Curray = require('./Curray')


console.info('TEST Curray.prototype.values')

console.info('CASE values in curray')

{

    const letters = new Curray('a', 'b', 'c')
    const iterator = letters.values()

    let next = iterator.next()

    console.assert(next.value === 'a', 'next value is a')
    console.assert(next.done === false, 'next done is false')

    next = iterator.next()

    console.assert(next.value === 'b', 'next value is b')
    console.assert(next.done === false, 'next done is false')

    next = iterator.next()

    console.assert(next.value === 'c', 'next value is c')
    console.assert(next.done === false, 'next done is false')

    next = iterator.next()

    console.assert(next.value === undefined, 'next value is undefined')
    console.assert(next.done === true, 'next done is true')

    next = iterator.next()

    console.assert(next.value === undefined, 'next value is undefined')
    console.assert(next.done === true, 'next done is true')
}