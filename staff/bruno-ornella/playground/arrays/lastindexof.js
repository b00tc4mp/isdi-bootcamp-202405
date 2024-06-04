
console.log('CASE indexOf in arrays')

var animals = ['ant', 'bison', 'camel', 'duck', 'bison',]


console.log(animals)
//['ant', 'bison', 'camel', 'duck', 'bison',]



console.log(animals.indexOf('duck'))
//3
console.log(animals.indexOf('bison', 2))
//4

console.log("CASE lasIndexOF from arrays")

var pets = ['dog', 'cat', 'bird', 'turtle', 'snake', 'bird']

var lastIndex = pets.lastIndexOf('snake')
console.log(lastIndex)
//4
var lastIndex = pets.lastIndexOf('cat')
console.log(lastIndex)
//1
var lastIndex = pets.lastIndexOf('elephant')
console.log(lastIndex)
//-1
