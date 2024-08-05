const Curray = require('./Curray')

console.info('TEST Array.prototype.slice')

console.info('CASE element at slice')

const animals2 = ['ant', 'bison', 'camel', 'duck', 'elephant']

const animals2Slice = animals2.slice(2)
//["camel", "duck", "elephant"]
console.assert(animals2Slice[0] === 'camel', ' animals2Slice at 0 is equal to camel')
console.assert(animals2Slice[1] === 'duck', ' animals3Slice at 1 is equal to duck')
console.assert(animals2Slice[2] === 'elephant', ' animals2Slice at 2 is equal to elephant')
console.assert(animals2Slice.length === 3, ' animals2Slice length is 3')

const animals3Slice = animals2.slice(2, 4)
//["camel", "duck"]
console.assert(animals3Slice[0] === 'camel', ' animals3Slice at 0 is equal to camel')
console.assert(animals3Slice[1] === 'duck', ' animals3Slice at 1 is equal to duck')
console.assert(animals3Slice.length === 2, ' animals3Slice length is 2')

const animals4Slice = animals2.slice(-2)
//["duck", "elephant"]
console.assert(animals4Slice[0] === 'duck', ' animals4Slice at 0 is equal to duck')
console.assert(animals4Slice[1] === 'elephant', ' animals4Slice at 1 is equal to elephant')
console.assert(animals4Slice.length === 2, ' animals4Slice length is 2')

const animals5Slice = animals2.slice(2, -1)
//["camel", "duck"]
console.assert(animals5Slice[0] === 'camel', ' animals5Slice at 0 is equal to camel')
console.assert(animals5Slice[1] === 'duck', ' animals5Slice at 1 is equal to duck')
console.assert(animals5Slice.length === 2, ' animals5Slice length is 2')
