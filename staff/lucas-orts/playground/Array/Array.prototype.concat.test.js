console.info('TEST Array.prototype.concat')

console.info('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c']
var chars2 = ['d', 'e', 'f']

var chars3 = chars1.concat(chars2)

console.assert(chars3.length === 6, 'chars3 length is 6')

console.assert(chars3[0] === 'a', 'chars3 at 0 is a')
console.assert(chars3[1] === 'b', 'chars3 at 1 is b')
console.assert(chars3[2] === 'c', 'chars3 at 2 is c')
console.assert(chars3[3] === 'd', 'chars3 at 3 is d')
console.assert(chars3[4] === 'e', 'chars3 at 4 is e')
console.assert(chars3[5] === 'f', 'chars3 at 3 is f')


console.info('CASE concat elements from 5 arrays')


var nums1 = [10, 20, 30]
var nums2 = [400, 500]
var nums3 = [-60, -70]
var nums4 = [800, 900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.assert(nums6.length === 10, 'nums6 length is 10')

console.assert(nums6[0] === 10, 'nums6 at 0 is 10')
console.assert(nums6[1] === 20, 'nums6 at 1 is 20')
console.assert(nums6[2] === 30, 'nums6 at 2 is 30')
console.assert(nums6[3] === 400, 'nums6 at 3 is 400')
console.assert(nums6[4] === 500, 'nums6 at 4 is 500')
console.assert(nums6[5] === -60, 'nums6 at 5 is -60')
console.assert(nums6[6] === -70, 'nums6 at 6 is -70')
console.assert(nums6[7] === 800, 'nums6 at 7 is 800')
console.assert(nums6[8] === 900, 'nums6 at 8 is 900')
console.assert(nums6[9] === -1000, 'nums6 at 9 is -1000')
