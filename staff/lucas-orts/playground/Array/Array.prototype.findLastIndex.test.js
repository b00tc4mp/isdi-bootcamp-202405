console.info('TEST Array.prototype.findLastIndex')

console.info('CASE findLastIndex in array')

var numbers = [5, 12, 8, 130, 44]

var found = numbers.findLastIndex((element) => element > 10)

console.assert(found === 4, 'found is 4')


var found = numbers.findLastIndex((element) => element > 100)
console.assert(found === 3, 'found is 3')

var found = numbers.findLastIndex((element) => element > 130)
console.assert(found === -1, 'found is -1')