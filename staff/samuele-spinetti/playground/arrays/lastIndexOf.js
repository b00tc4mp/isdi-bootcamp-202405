console.log('TEST LASTINDEXOF')

console.log('CASE lastIndexOf in array')

var animals = ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']

console.log(animals)
// ['Dodo', 'Tiger', 'Penguin', 'Dodo', 'Elephant']
console.log(animals.length)
// 5

console.log(animals.lastIndexOf('Penguin'))
// 2
console.log(animals.lastIndexOf('Dodo'))
// 3
console.log(animals.lastIndexOf('Dodo', 1))
// 0
console.log(animals.lastIndexOf('Giraffa'))
// -1
console.log(animals.lastIndexOf('Tiger', -4))
// 1