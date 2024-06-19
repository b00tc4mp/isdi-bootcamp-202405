var Curray = require('./Curray')

console.info('TEST Curray.prototype.join')

console.info('CASE join in Curray')

const trees = new Curray

trees[0] = 'palm'
trees[1] = 'cedar'
trees[2] = 'oak'
trees.length = 3

const trees1 = trees.join('-')
const trees11 = 'palm-cedar-oak'
console.assert(trees1 === trees11, 'trees1 is equal to trees11')

const trees2 = trees.join()
const trees22 = 'palm,cedar,oak'
console.assert(trees2 === trees22, 'trees2 is equal to trees22')

const trees3 = trees.join('')
const trees33 = 'palmcedaroak'
console.assert(trees3 === trees33, 'trees3 is equal to trees33')