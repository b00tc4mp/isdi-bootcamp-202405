console.log(`CASE slice from array`)
var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']
console.log(beasts)
console.log(beasts.slice(1, 4)) // Output: {0: "bison", 1: "camel", 2: "duck", length: 3}
console.log(beasts.slice(1)) // Output: {0: "bison", 1: "camel", 2: "duck", 4: 'bison', length: 4}