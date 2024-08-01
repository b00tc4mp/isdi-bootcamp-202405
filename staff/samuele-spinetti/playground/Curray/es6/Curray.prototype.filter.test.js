const Curray = require('./Curray')

console.info('TEST Curray.prototype.filter')

console.info('CASE filter in Curray')

const words = new Curray('spray', 'elite', 'exuberant', 'destruction', 'present')

const result = words.filter((word) => word.length > 6)

console.assert(result[0] === 'exuberant', 'rsult at 0 is exuberant')
console.assert(result[1] === 'destruction', 'rsult at 1 is destruction')
console.assert(result[2] === 'present', 'rsult at 2 is present')
console.assert(result.length === 3, 'result length is 3')
