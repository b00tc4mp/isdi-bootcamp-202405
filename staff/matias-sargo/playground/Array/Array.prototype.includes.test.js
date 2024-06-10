console.log('TEST Array.prototype.includes')

console.log('CASE includes in array')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


var numeros1 = numeros.includes(6)


var numeros2 = numeros.includes(50)

console.assert(numeros1 === true, "numeros 1 includes 6")
console.assert(numeros1 === false, "numeros 2  do not includes 50")

console.log('TEST array  includes color from index')

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey']

var included = colors.includes('pink', 2)

console.assert(included === true, "included includes pink")

var included = colors.includes('red', 4)

console.assert(included === true, "included includes red")


var included = colors.includes('red', 8)

console.assert(included === false, "included do not includes red")
