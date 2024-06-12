console.info('TEST Array.prototype.reverse')

console.info('CASE reverse in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.reverse()

console.assert(animals2[0] === 'Elephant', 'animals2 at 0 is Elephant')
console.assert(animals2[1] === 'Dodo', 'animals2 at 1 is Dodo')
console.assert(animals2[2] === 'Penguin', 'animals2 at 2 is Penguin')
console.assert(animals2[3] === 'Tiger', 'animals2 at 3 is Tiger')
console.assert(animals2[4] === 'Dodo', 'animals2 at 4 is Dodo')