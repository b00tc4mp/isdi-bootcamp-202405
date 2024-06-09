console.info('TEST filter ind arrays')

console.info('CASE filter')


const words = new Array('spray', 'elite', 'exuberant', 'destruction', 'present')

const result = words.filter((word) => word.length > 6);

console.assert(words instanceof Array, 'words is an Array')
console.assert(result.length === 3, 'result is length 3')
console.assert(result[0] === 'exuberant', 'result at 0 is exuberant')
console.assert(result[1] === 'destruction', 'result at 1 is destruction')
console.assert(result[2] === 'present', 'result at 2 is present')

