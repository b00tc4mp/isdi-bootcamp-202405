console.log('CASE array includes nums')

var nums = [10, 20, 30, 40];

console.log(nums)
//[10, 20, 30, 40]

console.log(nums.includes(10))
//true

console.log(nums.includes(20))
//true

console.log(nums.includes(15))
//false


console.log('TEST array includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)
console.log(included)
//true

var included = colors.includes('red', 4)
console.log(included)
//false

var included = colors.includes('red', 8)
console.log(included)
//false

var included = colors.includes('orange')
console.log(included)
//true

var included = colors.includes('orange', undefined)
console.log(included)
//true

var included = colors.includes('black', -4)
console.log(included)
//true

