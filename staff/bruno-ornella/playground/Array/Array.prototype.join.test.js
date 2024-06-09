console.info('TEST Array.prototype.join')

console.info('CASE join in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.join()
var animals22 = 'Dodo,Tiger,Penguin,Dodo,Elephant'

console.assert(animals2 === animals22, 'animals2 is equal to animals22')

var animals3 = animals.join(" + ")
var animals33 = 'Dodo + Tiger + Penguin + Dodo + Elephant'

console.assert(animals3 === animals33, 'animals3 ie equal to animals33')

var animals4 = animals.join("/")
var animals44 = 'Dodo/Tiger/Penguin/Dodo/Elephant'

console.assert(animals4 === animals44, 'animals4 is equal to animals44')


console.info('CASE join elements with separator $')

var things = [true, 'hello world', 100, { name: 'Oswald' }, [10, 20, 30], function () { }]

var joined = things.join(' $ ')
var joined1 = 'true $ hello world $ 100 $ [object Object] $ 10,20,30 $ function () { }'

console.assert(joined === joined1, 'joined is equal to joined1')