console.log('CASE shift in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant' ]

var animals2 = animals.shift()

console.log(animals)
// ['Tiger', 'Penguin', 'Dodo', 'Elephant' ]
console.log(animals2)
// Dodo
console.log(animals.length)
// 4