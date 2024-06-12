console.log(`CASE cpoyWithin from array`)
var beasts = ['ant', 'bison', 'camel', 'duck', 'lion']

console.log(beasts.copyWithin(0, 2))
console.log(beasts.copyWithin(0, 3, 4))
console.log(beasts.copyWithin(-2, -3, -1))