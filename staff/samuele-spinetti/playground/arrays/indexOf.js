console.log('TEST INDEXOF')

console.log('CASE indexOf in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

console.log(animals)
// ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(animals.length)
// 5

console.log(animals.indexOf('ant'))
// 0
console.log(animals.indexOf('bison'))
// 1
console.log(animals.indexOf('camel', 1))
// 2
console.log(animals.indexOf('giraffa'))
// -1
console.log(animals.indexOf('ant', -5))
// 0
console.log(animals.indexOf('bison', 2))
//4