var Curray = require('./Curray')

console.info('TEST Curray.prototype.shift')

console.info('CASE shift in Curray')

const names = new Curray

names[0] = 'laura'
names[1] = 'juan'
names[2] = 'nuria'
names[3] = 'jose'
names[4] = 'jesus'
names.length = 5


console.assert(names.length === 5, 'names length is 5')

const shiftName = names.shift()

console.assert(shiftName === 'laura', 'laura is deleted of Array')
console.assert(names.length === 4, 'animals length is 4')
console.assert(names[0] === 'juan', 'juan is first name of array')
console.assert(names[1] === 'nuria', 'nuria is second name of array')
console.assert(names[2] === 'jose', 'jose is third name of array')
console.assert(names[3] === 'jesus', 'jesus is fourth name of array')

