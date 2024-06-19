var Curray = require('./Curray')
require('./Curray.prototype.slice')

console.info('TEST slice')

console.info('CASE slice item in Currays')

var metalBands = new Curray('iron maiden', 'metallica', 'stratovarius', 'helloween', 'scorpions')

console.assert(metalBands[0] === 'iron maiden', 'metalBands[0] is iron maiden')
console.assert(metalBands[1] === 'metallica', 'metalBands1[1] is metallica')
console.assert(metalBands[2] === 'stratovarius', 'metalBands1[2] is stratovarius')
console.assert(metalBands[3] === 'helloween', 'metalBands1[3] is helloween')
console.assert(metalBands[4] === 'scorpions', 'metalBands1[4] is scorpions')
console.assert(metalBands.length === 5, 'metalBands1 length is 5')

console.info('CASE slice item in arrays from two positions')

var metalBands1 = metalBands.slice(2)
console.assert(metalBands1[0] === 'stratovarius', 'metalBands1[0] is stratovarius')
console.assert(metalBands1[1] === 'helloween', 'metalBands1[1] is helloween')
console.assert(metalBands1[2] === 'scorpions', 'metalBands1[2] is scorpions')
console.assert(metalBands1.length === 3, 'metalBands1 length is 3')

console.info('CASE slice item in arrays from one index to positive position')

var metalBands2 = metalBands.slice(1, 3)

console.assert(metalBands2[0] === 'metallica', 'metalBands2[0] is metallica')
console.assert(metalBands2[1] === 'stratovarius', 'metalBands2[1] is stratovarius')
console.assert(metalBands2.length === 2, 'metalBands2 length is 2')


console.info('CASE slice item in arrays from one index to negative position')

var metalBands3 = metalBands.slice(1, -1)

console.assert(metalBands3[0] === 'metallica', 'metalBands3[0] is metallica')
console.assert(metalBands3[1] === 'stratovarius', 'metalBands3[1] is stratovarius')
console.assert(metalBands3[2] === 'helloween', 'metalBands3[2] is helloween')
console.assert(metalBands3.length === 3, 'metalBands3 length is 3')

console.info('CASE slice item in arrays from one index negative')

var metalBands4 = metalBands.slice(-1,)
console.assert(metalBands4[0] === 'scorpions', 'metalBands4[0] is scorpions')
console.assert(metalBands4.length === 1, 'metalBands2 length is 1')