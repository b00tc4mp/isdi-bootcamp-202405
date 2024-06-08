console.info('TEST Array.prototype.includes')

console.info('CASE includes in array')

var nums = [10, 20, 30, 40];

console.assert(nums === [10, 20, 30, 40], '')

console.info(nums)
//[10, 20, 30, 40]

console.info(nums.includes(10))
//true

console.info(nums.includes(20))
//true

console.info(nums.includes(15))
//false


console.info('TEST array includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)
console.info(included)
//true

var included = colors.includes('red', 4)
console.info(included)
//false

var included = colors.includes('red', 8)
console.info(included)
//false

var included = colors.includes('orange')
console.info(included)
//true

var included = colors.includes('orange', undefined)
console.info(included)
//true

var included = colors.includes('black', -4)
console.info(included)
//true

