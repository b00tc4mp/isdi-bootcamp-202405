var Curray = require('./Curray')
require('./Curray.prototype.includes')

console.log('TEST Array.prototype.includes')

console.log('CASE array includes pokemonNames')

var numeros = new Curray  

numeros[0] = 1
numeros[1] = 2
numeros[2] = 3
numeros[3] = 4
numeros[4] = 5
numeros[5] = 6
numeros[6] = 7
numeros[7] = 8
numeros[8] = 9
numeros[9] = 10
numeros.length = 10


var numeros1 = numeros.includes(6)
var numeros1 = numeros.includes(50)

console.assert(numeros1 === true, 'numero 6 esta incluido')
console.assert(numeros1 === false, 'numero 50 no esta incluido')



console.log('CASE array includes colors')

var colors = new Curray

colors[0] = 'red'
colors[1] = 'green'
colors[2] = 'blue'
colors[3] = 'yellow'
colors[4] = 'orange'
colors[5] = 'pink'
colors[6] = 'skyblue'
colors[7] = 'red'
colors[8] = 'white'
colors[9] = 'black'
colors[10] = 'grey'
colors.length = 11


var included = colors.includes('pink', 2)

console.assert(included === true, 'includes pink')

var included = colors.includes('red', 4)

console.assert(included === true, 'includes red')