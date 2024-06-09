console.info('TEST Array.prototype.map')

console.info('CASE map in array')

var numeros = [1, 4, 9, 16]

var map1 = numeros.map((x) => x * 2)

console.assert(map1[0] === 2, 'map1 at 0 is equal to 2')
console.assert(map1[1] === 8, 'map1 at 1 is equal to 8')
console.assert(map1[2] === 18, 'map1 at 2 is equal to 18')
console.assert(map1[3] === 32, 'map1 at 3 is equal to 32')
console.assert(map1.length === 4, 'map1 length is 4')