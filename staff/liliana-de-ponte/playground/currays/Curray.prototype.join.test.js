var Curray = require('./Curray')
require('./Curray.prototype.join')

console.log('TEST Curray.prototype.join')

console.log('CASE join in Curray')

var animals = new Curray

animals[0] = 'Dodo'
animals[1] = 'Tiger'
animals[2] = 'Penguin'
animals[3] = 'Dodo'
animals[4] = 'Elephant'
animals.length = 5

var animals2 = animals.join()
var animals22 = 'Dodo,Tiger,Penguin,Dodo,Elephant'

console.assert(animals2 === animals22, 'animals2 is equal to animals22')

var animals3 = animals.join(" + ")
var animals33 = 'Dodo + Tiger + Penguin + Dodo + Elephant'

console.assert(animals3 === animals33, 'animals3 ie equal to animals33')

var animals4 = animals.join("/")
var animals44 = 'Dodo/Tiger/Penguin/Dodo/Elephant'

console.assert(animals4 === animals44, 'animals4 is equal to animals44')

console.log('CASE join elements with separator $')

var things = new Curray

things[0] = true
things[1] = 'hello world'
things[2] = 100
things[3] = { name: 'Oswald' }
things[4] = [10, 20, 30]
things[5] = function () { }
things.length = 6

var joined = things.join(' $ ')
var joined1 = 'true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }'

console.assert(joined === joined1, 'joined is equal to joined1')