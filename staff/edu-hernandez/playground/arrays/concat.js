console.log('TEST CONCAT')

console.log('CASE concat elements from two arrays')

var chars1 = ['a', 'b', 'c']
var chars2 = ['d', 'e', 'f']

console.log(chars1)
//['a', 'b', 'c']
console.log(chars2)
//['d', 'e', 'f']

var chars3 = chars1.concat(chars2)

console.log(chars3)
//['a', 'b', 'c', 'd', 'e', 'f']


console.log('CASE concat elements from 5 arrays')

var nums1 = [10, 20, 30]
var nums2 = [400, 500]
var nums3 = [-60, -70]
var nums4 = [800, 900]
var nums5 = [-1000]

var nums6 = nums1.concat(nums2, nums3, nums4, nums5)

console.log(nums1)
// [10, 20, 30]
console.log(nums2)
// [400, 500]
console.log(nums3)
// [-60, -70]
console.log(nums4)
// [800, 900]
console.log(nums5)
// [-1000]
console.log(nums6)
// [10, 20, 30, 400, 500, -60, -70, 800, 900, -1000]