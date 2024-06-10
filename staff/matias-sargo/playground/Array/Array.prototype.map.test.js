console.info('TEST Array.prototype.map')

console.info('CASE map numbers to each one multiplied by 2')

var nums = [1, 4, 9, 16]

var numsBy2 = nums.map(function (num) { return num * 2 })

console.assert(numsBy2 instanceof Array, 'numsBy2 is an Array')
console.assert(numsBy2[0] === 2, 'map1 at 0 is 2')
console.assert(numsBy2[1] === 8, 'map1 at 1 is 8')
console.assert(numsBy2[2] === 18, 'map1 at 2 is 18')
console.assert(numsBy2[3] === 32, 'map1 at 3 is 32')
console.assert(numsBy2.length === nums.length, 'map1 length is 4')