console.info('TEST flat')

console.info('CASE flats 1 level')

var nums0 = [100, 110]
var nums1 = [60, 70, 90, nums0]
var nums2 = [40, 50, nums1]
var nums = [10, 20, 30, nums2]

console.assert(nums[0] === 10, 'nums at 0 is 10')
console.assert(nums[1] === 20, 'nums at 1 is 20')
console.assert(nums[2] === 30, 'nums at 2 is 30')
console.assert(nums[3] === nums2, 'nums at 3 is nums2')

var flatted = nums.flat()

/*
var nums0 = [100,110]
var nums1 = [60,70,90,nums0]
var flatted= [10,20,30,40,50,nums1]
*/

console.assert(flatted[0] === 10, 'flatted at 0 is 10')
console.assert(flatted[1] === 20, 'flatted at 1 is 20')
console.assert(flatted[2] === 30, 'flatted at 2 is 30')
console.assert(flatted[3] === 40, 'flatted at 3 is 40')
console.assert(flatted[4] === 50, 'flatted at 4 is 50')
console.assert(flatted[5] === nums1, 'flatted at 5 is nums1')

console.info('CASE flats 2 levels')

var nums0 = [100, 110]
var nums1 = [60, 70, 90, nums0]
var nums2 = [40, 50, nums1]
var nums = [10, 20, 30, nums2]

console.assert(nums[0] === 10, 'nums at 0 is 10')
console.assert(nums[1] === 20, 'nums at 1 is 20')
console.assert 