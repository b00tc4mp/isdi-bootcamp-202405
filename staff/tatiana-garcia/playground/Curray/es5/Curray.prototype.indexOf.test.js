var Curray = require('./Curray')
require('./Curray.prototype.indexOf')

console.info('TEST indexOf')

console.info('CASE index of animal in Curray')

var beasts = new Curray('ant', 'bison', 'camel', 'duck', 'bison')

console.assert(beasts[0] === 'ant', 'besats[0] is equal to ant')
console.assert(beasts[1] === 'bison', 'besats[1] is equal to bison')
console.assert(beasts[2] === 'camel', 'besats[2] is equal to camel')
console.assert(beasts[3] === 'duck', 'besats[3] is equal to duck')
console.assert(beasts[4] === 'bison', 'besats[4] is equal to bison')
console.assert(beasts.length === 5, 'beasts length is 5')

var index = beasts.indexOf('camel')

console.assert(index === 2, 'index is 2')

var index = beasts.indexOf('bison')

console.assert(index === 1, 'index is 1')

var index = beasts.indexOf('elephant')

console.assert(index === -1, 'index is -1')

console.info('CASE index of animal in array from index')

var beasts = ['ant', 'bison', 'camel', 'duck', 'bison']

console.assert(beasts[0] === 'ant', 'besats[0] is equal to ant')
console.assert(beasts[1] === 'bison', 'besats[1] is equal to bison')
console.assert(beasts[2] === 'camel', 'besats[2] is equal to camel')
console.assert(beasts[3] === 'duck', 'besats[3] is equal to duck')
console.assert(beasts[4] === 'bison', 'besats[4] is equal to bison')
console.assert(beasts.length === 5, 'beasts length is 5')

var index = beasts.indexOf('bison', 3)
console.assert(index === 4, 'index is 4')

var index = beasts.indexOf('duck', -4)
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('duck', -1)
console.assert(index === -1, 'index is -1')

var index = beasts.indexOf('duck', -100)
console.assert(index === 3, 'index is 3')

var index = beasts.indexOf('bison')
console.assert(index === 1, 'index is 1')