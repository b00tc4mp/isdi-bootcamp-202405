console.info('TEST Array.prototype.filter')

console.info('CASE filter word.length > 6 in Array')

var words = new Curray['spray', 'elite', 'exuberant', 'destruction', 'present']

var result = words.filter((word) => word.length > 6)

console.assert(result[0] === 'exuberant', 'rsult at 0 is exuberant')
console.assert(result[1] === 'destruction', 'rsult at 1 is destruction')
console.assert(result[2] === 'present', 'rsult at 2 is present')
console.assert(result.length === 3, 'result length is 3')