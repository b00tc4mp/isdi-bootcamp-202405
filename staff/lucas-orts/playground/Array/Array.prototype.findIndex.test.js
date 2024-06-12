console.info('TEST Array.prototype.findIndex')

console.info('CASE findIndex in array')

var numbers = [5, 12, 8, 130, 44]

var found = numbers.findIndex((element) => element > 10)
console.assert(found === 1, 'found is 1')

var found = numbers.findIndex((element) => element > 100)
console.assert(found === 3, 'found is 3')

var found = numbers.findIndex((element) => element > 130)
console.assert(found === -1, 'found is -1')