var Curray = require('./Curray')
require('./Curray.prototype.copywhitin')

console.info('TEST Curray.prototype.copywithin')

var letters = new Curray('a', 'b', 'c', 'd', 'e')

var letterCopy1 = letters.copyWithin(0, 3, 4)

console.assert(letters instanceof Curray, 'letters is a Curray')
console.assert(letterCopy1[0] === 'd', 'letterCopy1 at 0 is equal to d')
console.assert(letterCopy1[1] === 'b', 'letterCopy1 at 1 is equal to b')
console.assert(letterCopy1[2] === 'c', 'letterCopy1 at 2 is equal to c')
console.assert(letterCopy1[3] === 'd', 'letterCopy1 at 0 is equal to d')
console.assert(letterCopy1[4] === 'e', 'letterCopy1 at 4 is equal to e')
console.assert(letterCopy1.length === 5, 'letterCopy1 length is 5')

var letterCopy2 = letters.copyWithin(1, 3)


console.assert(letterCopy2[0] === 'd', 'letterCopy2 at 0 is equal to d')
console.assert(letterCopy2[1] === 'd', 'letterCopy2 at 1 is equal to d')
console.assert(letterCopy2[2] === 'e', 'letterCopy2 at 2 is equal to e')
console.assert(letterCopy2[3] === 'd', 'letterCopy2 at 3 is equal to d')
console.assert(letterCopy2[4] === 'e', 'letterCopy2 at 4 is equal to e')
console.assert(letterCopy2.length === 5, 'letterCopy1 length is 5')

