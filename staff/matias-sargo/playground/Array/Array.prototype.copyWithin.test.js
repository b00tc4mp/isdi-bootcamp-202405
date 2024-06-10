console.info('TEST Array.prototype.copyWithin')

console.info('CASE copyWithin in array')

var animals = ['Dodo', 'Tiger', 'Pengui', 'Leo', 'Elephant']

var animals2 = animals.copyWithin(3, 1, 2)

console.assert(animals2[0] === 'Dodo', 'animals2 at 0 is Dodo')
console.assert(animals2[1] === 'Tiger', 'animals2 at 1 is Tiger')
console.assert(animals2[2] === 'Pengui', 'animals2 at 2 is Pengui')
console.assert(animals2[3] === 'Tiger', 'animals2 at 3 is Tiger')
console.assert(animals2[4] === 'Elephant', 'animals2 at 4 is Elephant')
console.assert(animals2.length === 5, 'animals2 length is 5')

var animals3 = ['Dodo', 'Tiger', 'Pengui', 'Leo', 'Elephant']

var animals4 = animals3.copyWithin(0, 1, 4)

console.assert(animals4[0] === 'Tiger', 'animals4 at 0 is Tiger')
console.assert(animals4[1] === 'Pengui', 'animals4 at 1 is Pengui')
console.assert(animals4[2] === 'Leo', 'animals4 at 2 is Dodo')
console.assert(animals4[3] === 'Leo', 'animals4 at 3 is Dodo')
console.assert(animals4[4] === 'Elephant', 'animals4 at 4 is Elephant')
console.assert(animals4.length === 5, 'animals4 length is 5')