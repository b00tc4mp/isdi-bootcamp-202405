console.info('TEST Array.prototype.flat')

console.log('CASE flat in Array')

var nums = [0, 1, 2, [3, 4]]

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

var nums2 = [0, 1, [2, [3, [4, 5]]]]

var nums3 = nums.flat()

console.assert(nums3[0] === 0, 'nums3 at 0 is 0')
console.assert(nums3[1] === 1, 'nums3 at 1 is 1')
console.assert(nums3[2] === 2, 'nums3 at 2 is 2')
console.assert(nums3[3][0] === 3, 'nums3 at 2-1-0 is 3')
console.assert(nums3[3][1][0] === 4, 'nums3 at 2-1-1-0 is 4')
console.assert(nums3[3][1][1] === 5, 'nums3 at 2-1-1-1 is 5')