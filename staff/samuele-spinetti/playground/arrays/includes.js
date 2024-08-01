console.log('TEST INCLUDES')

console.log('CASE includes in array')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(numeros)
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var numeros1 = numeros.includes(6)
console.log(numeros1)
// true

var numeros2 = numeros.includes(50)
console.log(numeros2)
// false


console.log('TEST array  includes color from index')

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
