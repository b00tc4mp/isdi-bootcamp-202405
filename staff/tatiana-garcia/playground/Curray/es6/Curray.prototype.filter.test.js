const Curray = require('./Curray')

console.info('TEST filter')

console.info('CASE filter the biggest words in Currays')

const words = new Curray('spray', 'elite', 'exuberant', 'destruction', 'present')


const result = words.filter((word) => word.length > 6)

console.assert(words.length === 5, 'words length is 5')
console.assert(result.length === 3, 'result length is 3')
console.assert(result[0] === 'exuberant', 'result position 0 is exuberant')
console.assert(result[1] === 'destruction', 'result position 1 is destruction')
console.assert(result[2] === 'present', 'result position 2 is present')

console.info('CASE filter the minor words in Currays')

const lowResult = words.filter((word) => word.length < 6)

console.assert(lowResult.length === 2, 'lowResult length is 2')
console.assert(lowResult[0] === 'spray', 'lowResult position 0 is spray')
console.assert(lowResult[1] === 'elite', 'lowResult position 1 is elite')
