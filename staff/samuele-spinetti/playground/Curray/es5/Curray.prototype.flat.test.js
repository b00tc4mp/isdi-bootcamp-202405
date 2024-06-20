var Curray = require('./Curray')
require('./Curray.prototype.flat')


console.info('TEST Curray.prototype.flat')

console.info('Case flat in curray')

var numeros = new Curray(0, 1, 2)

numeros[3] = new Curray(3, 4)
numeros.length += 1

console.assert(numeros[0] === 0, 'numeros at 0 is 0')
console.assert(numeros[1] === 1, 'numeros at 1 is 1')
console.assert(numeros[2] === 2, 'numeros at 2 is 2')
console.assert(numeros[3][0] === 3, 'numeros at 3-0 is 3')
console.assert(numeros[3][1] === 4, 'numeros at 3-1 is 4')

var numeros1 = numeros.flat();

console.assert(numeros1[0] === 0, 'numeros at 0 is 0')
console.assert(numeros1[1] === 1, 'numeros at 1 is 1')
console.assert(numeros1[2] === 2, 'numeros at 2 is 2')
console.assert(numeros1[3] === 3, 'numeros at 3 is 3')
console.assert(numeros1[4] === 4, 'numeros at 4 is 4')


var arr2 = [0, 1, [2, [3, [4, 5]]]];

var nums = new Curray(0, 1)

nums[2] = new Curray(2)
nums[2][1] = new Curray(3)
nums[2][1][1] = new Curray(4, 5)

console.log(nums)


var nums1 = nums.flat()
// expected output: Array [0, 1, 2, [3, [4, 5]]]
console.assert(nums1[0] === 0, 'numeros at 0 is 0')
console.assert(nums1[1] === 1, 'numeros at 1 is 1')
console.assert(nums1[2] === 2, 'numeros at 2-0 is 2')
console.assert(nums1[3][0] === 3, 'numeros at 2-1-0 is 3')
console.assert(nums1[3][1][0] === 4, 'numeros at 2-1-1-0 is 4')
console.assert(nums1[3][1][1] === 5, 'numeros at 2-1-1-1 is 5')

var nums2 = nums.flat(2)
// expected output: Array [0, 1, 2, 3, Array [4, 5]]
console.assert(nums2[0] === 0, 'numeros at 0 is 0')
console.assert(nums2[1] === 1, 'numeros at 1 is 1')
console.assert(nums2[2] === 2, 'numeros at 2 is 2')
console.assert(nums2[3] === 3, 'numeros at 3 is 3')
console.assert(nums2[4][0] === 4, 'numeros at 4-0 is 4')
console.assert(nums2[4][1] === 5, 'numeros at 4-1 is 5')

var nums3 = nums.flat(Infinity)
// expected output: Array [0, 1, 2, 3, 4, 5]
console.assert(nums3[0] === 0, 'numeros at 0 is 0')
console.assert(nums3[1] === 1, 'numeros at 1 is 1')
console.assert(nums3[2] === 2, 'numeros at 2 is 2')
console.assert(nums3[3] === 3, 'numeros at 3 is 3')
console.assert(nums3[4] === 4, 'numeros at 4 is 4')
console.assert(nums3[5] === 5, 'numeros at 4 is 4')
