
console.info('TEST Array.prototype.shift')

console.info('CASE shift in array')

var names = ['laura', 'juan', 'nuria', 'jose', 'jesus']

var shiftName = names.shift()

console.assert(shiftName === 'laura', 'Laura is deleted of array')
console.assert(names.length === 4, 'names length is 4')
console.assert(names[0] === 'juan', 'first name of array is juan')