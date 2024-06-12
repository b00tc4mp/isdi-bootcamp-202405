console.log("CASE lasIndexOF from array")
var pets = ['dog', 'cat', 'bird', 'turtle', 'snake', 'bird']

var lastIndex = pets.lastIndexOf('bird')
console.log(lastIndex)
//5

var lastIndex = pets.lastIndexOf('elephant')
console.log(lastIndex)
//-1

var lastIndex = pets.lastIndexOf('bird', 3)
console.log(lastIndex)
//2

var lastIndex = pets.lastIndexOf('bird', -3)
console.log(lastIndex)
//2