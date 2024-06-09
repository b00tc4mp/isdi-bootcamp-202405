var Curray = require('./Curray')
require(';/Curray.prototype.concat')

console.log('Test Curray prototype concat')


var chars1 = new Curray
var chars2 = new Curray


var chars3 = chars1.concat(chars2)

console.assert(chars1[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars1[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars1[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars1.length === 3, 'chars length is 3')
console.assert(chars1[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars2[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars2[0] === 'a', 'chars 1 at 0 is a')
console.assert(chars2.length === 3, 'chars length is 3')
console.assert(chars3.length === 6, 'chars length is 6')

console.log('CASE concat elements from 5 arrays')

var nums1 = [10, 20, 30]
var nums2 = [400, 500]
var nums3 = [-60, -70]
var nums4 = [800, 900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.assert(nums1[0] === 10, 'nums1 at 0 is 10')
console.assert(nums1[1] === 20, 'nums1 at 1 is 10')
console.assert(nums1[2] === 30, 'nums1 at 2 is 10')
console.assert(nums2[3] === 400, 'nums1 at 0 is 10')
console.assert(nums2[4] === 500, 'nums1 at 1 is 10')
console.assert(nums3[5] === -60, 'nums1 at 0 is 10')
console.assert(nums3[6] === -70, 'nums1 at 1 is 10')
console.assert(nums4[7] === 800, 'nums1 at 0 is 10')
console.assert(nums4[8] === 900, 'nums1 at 1 is 10')
console.assert(nums5[9] === -1000, 'nums1 at 0 is 10')

console.assert(nums6.length === 10, 'nums6 length is 10')