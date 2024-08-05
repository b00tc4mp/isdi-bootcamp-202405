console.info('TEST Array.prototype.shift')

console.info('CASE shift in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.assert(animals[0] === 'Dodo', 'animals at 0 is Dodo')
console.assert(animals[1] === 'Tiger', 'animals at 1 is Tiger')
console.assert(animals[2] === 'Penguin', 'animals at 2 is Penguin')
console.assert(animals[3] === 'Dodo', 'animals at 3 is Dodo')
console.assert(animals[4] === 'Elephant', 'animals at 4 is Elephant')

var animals2 = animals.shift()

console.assert(animals2 === 'Dodo', 'animals2 is Dodo')
console.assert(animals[0] === 'Tiger', 'animals at 0 is Tiger')
console.assert(animals[1] === 'Penguin', 'animals at 1 is Penguin')
console.assert(animals[2] === 'Dodo', 'animals at 2 is Dodo')
console.assert(animals[3] === 'Elephant', 'animals at 3 is Elephant')