var Curray = require('./Curray')

console.info('TEST indexOf')

console.info('CASE index of animal in Curray')
{
    const beasts = new Curray('ant', 'bison', 'camel', 'duck', 'bison')

    console.assert(beasts[0] === 'ant', 'besats[0] is equal to ant')
    console.assert(beasts[1] === 'bison', 'besats[1] is equal to bison')
    console.assert(beasts[2] === 'camel', 'besats[2] is equal to camel')
    console.assert(beasts[3] === 'duck', 'besats[3] is equal to duck')
    console.assert(beasts[4] === 'bison', 'besats[4] is equal to bison')
    console.assert(beasts.length === 5, 'beasts length is 5')

    const index1 = beasts.indexOf('camel')

    console.assert(index1 === 2, 'index is 2')

    const index2 = beasts.indexOf('bison')

    console.assert(index2 === 1, 'index is 1')

    const index3 = beasts.indexOf('elephant')

    console.assert(index3 === -1, 'index is -1')
}

console.info('CASE index of animal in array from index')

const beasts = ['ant', 'bison', 'camel', 'duck', 'bison']

console.assert(beasts[0] === 'ant', 'besats[0] is equal to ant')
console.assert(beasts[1] === 'bison', 'besats[1] is equal to bison')
console.assert(beasts[2] === 'camel', 'besats[2] is equal to camel')
console.assert(beasts[3] === 'duck', 'besats[3] is equal to duck')
console.assert(beasts[4] === 'bison', 'besats[4] is equal to bison')
console.assert(beasts.length === 5, 'beasts length is 5')

const index = beasts.indexOf('bison', 3)
console.assert(index === 4, 'index is 4')

var index1 = beasts.indexOf('duck', -4)
console.assert(index1 === 3, 'index is 3')

var index2 = beasts.indexOf('duck', -1)
console.assert(index2 === -1, 'index is -1')

var index3 = beasts.indexOf('duck', -100)
console.assert(index3 === 3, 'index is 3')

var index4 = beasts.indexOf('bison')
console.assert(index4 === 1, 'index is 1')