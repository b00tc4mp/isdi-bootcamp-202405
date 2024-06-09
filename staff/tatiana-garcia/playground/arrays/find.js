console.info('TEST find')
console.info('CASE find from Array')

var numbers = [5, 12, 8, 130, 44]

var found = numbers.find((element) => element > 10);

console.assert(numbers instanceof Array, 'nubers is an Array')
console.assert(numbers.length === 5, 'numbers length is 5')
console.assert(found === 12, 'the result of the variable "found" is 12')