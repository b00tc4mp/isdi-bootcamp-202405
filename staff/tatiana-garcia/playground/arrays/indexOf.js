console.log('TEST indexOf')

console.log('CASE index of animal in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

var beasts = animals.indexOf('ant')
console.log(beasts)
// 0
console.assert(beasts === 0, 'beasts is 0')
console.log(animals.indexOf('duck'))
// 3
console.log(animals.indexOf('dog'))
// -1

//-------------------------------------------------------

console.log('CASE index of animal in array from index')

console.log(animals.indexOf('ant', 3))
//-1
console.log(animals.indexOf('camel', 2))
// 2
