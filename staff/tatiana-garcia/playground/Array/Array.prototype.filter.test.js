console.info('TEST filter')

console.info('CASE filter in Array')

const words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter((word) => word.length > 6);

console.assert(words.length === 5, 'words length is 5')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'exuberant', 'result position 0 is exuberant')
console.assert(result[1] === 'destruction', 'result position 1 is destruction')
console.assert(result[2] === 'present', 'result position 2 is present')
console.assert(result instanceof Array, 'result is an Array')
console.assert(words instanceof Array, 'words is an Array')

