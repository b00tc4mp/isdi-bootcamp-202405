console.info('TEST reverse')
console.info('CASE reverse items from the array')

var flowers = ['rose', 'geranium', 'lily', 'tulyp']
console.assert(flowers instanceof Array, 'flowers is an array')

console.assert(flowers[0] === 'rose', 'flower[0] is a rose')
console.assert(flowers[1] === 'geranium', 'flower[1] is a geranium')
console.assert(flowers[2] === 'lily', 'flower[2] is a lily')
console.assert(flowers[3] === 'tulyp', 'flower[3] is a tulyp')
console.assert(flowers.length === 4, 'flowers length is 4')

var reverseFlowers = (flowers.reverse())

console.assert(reverseFlowers[0] === 'tulyp', 'reversrFlowers[0] is a tulyp')
console.assert(reverseFlowers[1] === 'lily', 'reversrFlowers[1] is a lily')
console.assert(reverseFlowers[2] === 'geranium', 'reversrFlowers[2] is a geranium')
console.assert(reverseFlowers[3] === 'rose', 'reversrFlowers[3] is a rose')
console.assert(reverseFlowers.length === 4, 'flowers length is 4')