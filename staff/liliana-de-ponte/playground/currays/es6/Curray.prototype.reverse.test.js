const Curray = require('./Curray')

console.info('TEST Array.prototype.reverse')

console.info('CASE element at Reverse')

const nums = new Curray('one', 'two', 'three')

const numsReverse = nums.reverse()

console.assert(numsReverse[0] === 'three', 'numsReverse at 0 is equal to three')
console.assert(numsReverse[1] === 'two', 'numsReverse at 1 is equal to two')
console.assert(numsReverse[2] === 'one', 'numsReverse at 2 is equal to three')
console.assert(numsReverse.length === 3, 'numsReverse legth is 3')

