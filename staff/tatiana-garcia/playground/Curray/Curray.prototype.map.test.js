var Curray = require('./Curray')
require('./Curray.prototype.map')

console.info('TEST map')

console.info('CASE map from Currays')

var nums = new Curray(1, 4, 9, 16);

console.assert(nums.length === 4, 'nums length is 4')
console.assert(nums[0] === 1, 'nums[0] is 1')
console.assert(nums[1] === 4, 'nums[1] is 4')
console.assert(nums[2] === 9, 'nums[2] is 9')
console.assert(nums[3] === 16, 'nums[3] is 16')

var map1 = nums.map((x) => x * 2);

console.assert(map1[0] === 2, 'map1[0] is 2')
console.assert(map1[1] === 8, 'map1[1] is 8')
console.assert(map1[2] === 18, 'map1[2] is 18')
console.assert(map1[3] === 32, 'map1[3] is 32')