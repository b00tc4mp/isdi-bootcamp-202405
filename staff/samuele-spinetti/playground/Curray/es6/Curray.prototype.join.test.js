const Curray = require('./Curray')

console.info('TEST Curray.prototype.join')

console.info('CASE join in Curray')

const animals = new Curray

animals[0] = 'Dodo'
animals[1] = 'Tiger'
animals[2] = 'Penguin'
animals[3] = 'Dodo'
animals[4] = 'Elephant'
animals.length = 5

const animals2 = animals.join()
const animals22 = 'Dodo,Tiger,Penguin,Dodo,Elephant'

console.assert(animals2 === animals22, 'animals2 is equal to animals22')

const animals3 = animals.join(" + ")
const animals33 = 'Dodo + Tiger + Penguin + Dodo + Elephant'

console.assert(animals3 === animals33, 'animals3 ie equal to animals33')

const animals4 = animals.join("/")
const animals44 = 'Dodo/Tiger/Penguin/Dodo/Elephant'

console.assert(animals4 === animals44, 'animals4 is equal to animals44')


console.info('CASE join elements with separator $')

const things = new Curray

things[0] = true
things[1] = 'hello world'
things[2] = 100
things[3] = { name: 'Oswald' }
things[4] = [10, 20, 30]
things[5] = function () { }
things.length = 6

const joined = things.join(' $ ')
const joined1 = 'true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }'

console.assert(joined === joined1, 'joined is equal to joined1')
