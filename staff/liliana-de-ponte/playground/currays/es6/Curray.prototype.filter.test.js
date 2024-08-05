const Curray = require('./Curray')

console.info('TEST Curray.prototype.filter')

console.info('CASE filter in curray')

const words = new Curray('spray', 'elite', 'exuberant', 'destruction', 'present')

const result = words.filter((word) => word.length > 6)

console.assert(result[0] === 'exuberant', 'words 0 is equal to exuberant')
console.assert(result[1] === 'destruction', 'words 1 is equal to destruction')
console.assert(result[2] === 'present', 'words 2 is equal to present')
console.assert(result.length === 3, 'result length is 3')