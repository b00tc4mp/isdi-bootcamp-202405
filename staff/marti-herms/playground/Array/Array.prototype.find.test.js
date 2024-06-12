console.info('TEST Array.prototype.find')

console.info('CASE find in array')

var numbers = [5, 12, 8, 130, 44]

var found = numbers.find((element) => element > 10)

console.assert(found === 12, 'found is 12')