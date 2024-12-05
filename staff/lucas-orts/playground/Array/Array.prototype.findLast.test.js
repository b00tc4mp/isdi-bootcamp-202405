console.info('TEST Array.prototype.findLast')

console.info('CASE findLast in array')

var numbers = [5, 12, 8, 130, 44]

var found = numbers.findLast((element) => element > 10)

console.assert(found === 44, 'found is 44')


var found = numbers.findLast((element) => element > 100)
console.assert(found === 130, 'found is 130')

var found = numbers.findLast((element) => element > 130)
console.assert(found === undefined, 'found is undefined')