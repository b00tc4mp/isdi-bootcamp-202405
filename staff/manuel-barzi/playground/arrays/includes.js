console.log('TEST includes')

console.log('CASE array includes pet')

var pets = ['cat', 'dog', 'bat']

console.log(pets)

var included = pets.includes('dog')

console.log(included)
// true

var included = pets.includes('horse')

console.log(included)
// false

console.log('CASE array includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)

console.log(included)
// true

var included = colors.includes('red', 4)

console.log(included)
// true

var included = colors.includes('red', 8)

console.log(included)
// false

var included = colors.includes('orange')

console.log(included)
// true

var included = colors.includes('pink', undefined)

console.log(included)
// true

var included = colors.includes('lime', undefined)

console.log(included)
// false

var included = colors.includes('black', -4)

console.log(included)
// true

var included = colors.includes('black', -1)

console.log(included)
// false

var included = colors.includes('black', 15)

console.log(included)
// false

var included = colors.includes('black', -15)

console.log(included)
// true
