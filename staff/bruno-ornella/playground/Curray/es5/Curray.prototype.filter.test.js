var Curray = require('./Curray')
require('./Curray.prototype.filter')

console.info('TEST filter ind arrays')

console.info('CASE filter')


const words = new Curray('spray', 'elite', 'exuberant', 'destruction', 'present')

const result = words.filter((word) => word.length > 6);

console.assert(words instanceof Curray, 'words is an Array')
console.assert(result.length === 3, 'result is length 3')
console.assert(result[0] === 'exuberant', 'result at 0 is exuberant')
console.assert(result[1] === 'destruction', 'result at 1 is destruction')
console.assert(result[2] === 'present', 'result at 2 is present')

