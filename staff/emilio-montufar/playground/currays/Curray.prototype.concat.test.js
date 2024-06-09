console.log('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c']
var chars2 = ['d', 'e', 'f']

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


var nums1 = new Curray
var nums2 = new Curray
var nums3 = new Curray
var nums4 = new Curray
var nums5 = new Curray
var nums6 = new Curray

nums1[0] = 10
nums1[1] = 20
nums1[2] = 30
nums1.length = 3
nums2[0] = 400
nums2[1] = 500
nums2.length = 2
nums3[0] = -60
nums3[1] = -70
nums3.length = 2
nums4[0] = 
nums4[1] = 
nums5[0] = -100

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