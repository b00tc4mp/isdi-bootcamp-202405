console.info('TEST fill numbers with three parameters in Array')

var nums = [1, 2, 3, 4];

var fillNums = nums.fill(0, 1, 4)

console.assert(fillNums instanceof Array, 'fillNums is an array')
console.assert(fillNums.length === nums.length, 'fillNums length is 4')
console.assert(fillNums[0] === 1, 'fillNums[0] is 1')
console.assert(fillNums[1] === 0, 'fillNums[1] is 0')
console.assert(fillNums[2] === 0, 'fillNums[2] is 0')
console.assert(fillNums[3] === 0, 'fillNums[3] is 0')

console.info('TEST fill numbers with two parameters in Array')

var nums = [1, 2, 3, 4];

var fillNums = nums.fill(5, 1)

console.assert(fillNums.length === nums.length, 'fillNums length is 4')
console.assert(fillNums[0] === 1, 'fillNums[0] is 1')
console.assert(fillNums[1] === 5, 'fillNums[1] is 5')
console.assert(fillNums[2] === 5, 'fillNums[2] is 5')
console.assert(fillNums[3] === 5, 'fillNums[3] is 5')

console.info('TEST fill numbers one parameter in Array')

var nums = [1, 2, 3, 4];

var fillNums = nums.fill(6)

console.assert(fillNums.length === nums.length, 'fillNums length is 4')
console.assert(fillNums[0] === 6, 'fillNums[0] is 6')
console.assert(fillNums[1] === 6, 'fillNums[1] is 6')
console.assert(fillNums[2] === 6, 'fillNums[2] is 6')
console.assert(fillNums[3] === 6, 'fillNums[3] is 6')