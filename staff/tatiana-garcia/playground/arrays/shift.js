console.info('TEST shift')
console.info('CASE shift first element from array')

var names = ['laura', 'juan', 'nuria', 'jose', 'jesus']

var shiftName = names.shift()
console.assert(names instanceof Array, 'names is an array')
console.assert(shiftName === 'laura', 'Laura is deleted of array')
console.assert(names.length === 4, 'names length is 4')
console.assert(names[0] === 'juan', 'first name of array is juan')
