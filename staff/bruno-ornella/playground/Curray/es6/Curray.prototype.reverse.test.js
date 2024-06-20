const Curray = require("./Curray")



console.info('CASE reverse from arrays')

const array1 = new Curray('one', 'two', 'three', 'four', 'five')



const turnAround = array1.reverse()

console.assert(array1 instanceof Curray, 'array1 is an Array')
console.assert(turnAround.length === 5, 'array1 length is 5')
console.assert(array1[0] === 'five', 'turnAround at 0 is equal to five')
console.assert(array1[1] === 'four', 'turnAround at 1 is equal to four')
console.assert(array1[2] === 'three', 'turnAround at 2 is equal to three')
console.assert(array1[3] === 'two', 'turnAround at 3 is equal to two')
console.assert(array1[4] === 'one', 'turnAround at 4 is equal to one')



