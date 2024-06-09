console.log('TEST Array.prototype.includes')

console.log('CASE array includes pokemonNames')

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

var numeros1 = numeros.includes(6)
var numeros1 = numeros.includes(50)

console.assert(numeros1 === true, 'numero 6 esta incluido')
console.assert(numeros1 === false, 'numero 50 no esta incluido')

console.log('CASE array includes colors')

var colors = ['red', 'pink', 'yellow', 'green', 'black']


var included = colors.includes('pink', 2)

console.assert(included === true, 'includes pink')

var included = colors.includes('red', 4)

console.assert(included === true, 'includes red')



