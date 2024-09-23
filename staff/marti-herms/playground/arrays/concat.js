console.log('TEST concat')

console.log('CASE concat two arrays');

var char1 = ['a', 'b', 'c'];
var char2 = ['d', 'f', 'g'];

console.log(char1);
//['a', 'b', 'c']
console.log(char2);
//['d', 'f', 'g']

var char3 = char1.concat(char2);

console.log(char3);
//['a', 'b', 'c', 'd', 'f', 'g']



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