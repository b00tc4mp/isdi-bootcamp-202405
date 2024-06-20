var Curray = require('./Curray')
require('./Curray.prototype.findLast.test')

console.info('TEST Curray.prototype.flat')

console.info('CASE flat.prototype.flat without element')

var nums = new Curray(0, 1, 2)
nums[3] = new Curray(3, 4)
nums.length += 1

console.assert(nums[0] === 0, 'nums at 0 is 0')
console.assert(nums[1] === 1, 'nums at 1 is 1')
console.assert(nums[2] === 2, 'nums at 2 is 2')
console.assert(nums[3][0] === 3, 'nums at 3-0 is 3')
console.assert(nums[4][1] === 4, 'nums at 3-1 is 4')

var nums1 = nums.flat()

console.assert(nums1[0] === 0, 'nums1 at 0 is 0')
console.assert(nums1[1] === 1, 'nums1 at 1 is 1')
console.assert(nums1[2] === 2, 'nums1 at 2 is 2')
console.assert(nums1[3] === 3, 'nums1 at 3 is 3')
console.assert(nums1[4] === 4, 'nums1 at 4 is 4')

var nums2 = new Curray(0, 1)
nums2[2] = new Curray(2)
nums2[2][1] = new Curray(3)
nums2[2][1][1] = new Curray(4, 5)

var nums3 = nums.flat()

console.assert(nums3[0] === 0, 'nums3 at 0 is 0')
console.assert(nums3[1] === 1, 'nums3 at 1 is 1')
console.assert(nums3[2] === 2, 'nums3 at 2 is 2')
console.assert(nums3[3][0] === 3, 'nums3 at 2-1-0 is 3')
console.assert(nums3[3][1][0] === 4, 'nums3 at 2-1-1-0 is 4')
console.assert(nums3[3][1][1] === 5, 'nums3 at 2-1-1-1 is 5')

var nums4 = nums2.flat(2)

console.assert(nums4[0] === 0, 'nums4 at 0 is 0')
console.assert(nums4[1] === 1, 'nums4 at 1 is 1')
console.assert(nums4[2] === 2, 'nums4 at 2 is 2')
console.assert(nums4[3] === 3, 'nums4 at 3 is 3')
console.assert(nums4[4][0] === 4, 'nums4 at 4-0 is 4')
console.assert(nums4[4][1] === 5, 'nums4 at 4-1 is 5')

var nums5 = nums2.flat(Infinity)

console.assert(nums5[0] === 0, 'nums5 at 0 is 0')
console.assert(nums5[1] === 1, 'nums5 at 1 is 1')
console.assert(nums5[2] === 2, 'nums5 at 2 is 2')
console.assert(nums5[3] === 3, 'nums5 at 3 is 3')
console.assert(nums5[4] === 4, 'nums5 at 4 is 4')
console.assert(nums5[5] === 5, 'nums5 at 4 is 4')