console.log('CASE copyWithin in array')

var animals = ['Dodo', 'Tiger', 'Pengui', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

var animals2 = animals.copyWithin(3, 1, 2)

console.log(animals2)
// ['Dodo', 'Tiger', 'Penguin', 'Tiger', 'Elephant']

var animals = ['Dodo', 'Tiger', 'Pengui', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant'

var animals3 = animals.copyWithin(0, 1, 4)

console.log(animals3)
// ['Tiger', 'Pengui', 'Dodo', 'Dodo', 'Elephant']
