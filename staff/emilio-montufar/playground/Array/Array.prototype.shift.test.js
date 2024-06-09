console.log('TEST array.prototype shift')
console.log('CASE shift in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Ddo', 'Elephant']

console.assert(aniamals[0] === 'Dodo', 'animals at 0 is Dodo')
console.assert(aniamals[1] === 'Tiger', 'animals at 1 is Tiger')
console.assert(aniamals[2] === 'Penguin', 'animals at 2 is Penguin')
console.assert(aniamals[3] === 'Dodo', 'animals at 3 is Dodo')
console.assert(aniamals[4] === 'Elephant', 'animals at 4 is Elephant')

var animals2 = animals.shift()

console.assert(aniamals2 === 'Dodo', 'animals2 is Dodo')
console.assert(aniamals[0] === 'Tiger', 'animals at 1 is Tiger')
console.assert(aniamals[1] === 'Penguin', 'animals at 2 is Penguin')
console.assert(aniamals[2] === 'Dodo', 'animals at 3 is Dodo')
console.assert(aniamals[3] === 'Elephant', 'animals at 4 is Elephant')