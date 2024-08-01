console.info('TEST at')

console.info('CASE element at index')

var nums = [5, 12, 8, 130, 44]

console.assert(nums[0] === 5, 'nums[0] is equal to 5')
console.assert(nums[1] === 12, 'nums[1] is equal to 12')
console.assert(nums[2] === 8, 'nums[2] is equal to 8')
console.assert(nums[3] === 130, 'nums[3] is equal to 130')
console.assert(nums[4] === 44, 'nums[4] is equal to 44')
console.assert(nums.length === 5, 'nums length is 5')

console.info('CASE element a positive index')
var nums = [5, 12, 8, 130, 44]

var num = nums.at(3)

console.assert(num === 130, 'num is 130')

console.info('CASE element at index 0')

var nums = [5, 12, 8, 130, 44]

var num = nums.at(0)

console.assert(num === 5, 'num is 5')

console.info('CASE element a negative index')

var nums = [5, 12, 8, 130, 44]

var num = nums.at(-3)

console.assert(num === 8, 'num is 8')

console.info('CASE element a positive index greater than length')

var nums = [5, 12, 8, 130, 44]

var num = nums.at(100)

console.assert(num === undefined, ' num is undefined')

console.info('CASE element a negative index greater than -length')

var nums = [5, 12, 8, 130, 44]

var num = nums.at(-100)

console.assert(num === undefined, 'num is undefined')