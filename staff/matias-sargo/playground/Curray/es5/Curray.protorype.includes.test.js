new curray = require("./Curray")
console.log('TEST Crray.prototype.includes')

console.log('CASE includes in Curray')

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


var numeros2 = numeros.includes(50)

console.assert(numeros1 === true, "numeros 1 includes 6")
console.assert(numeros1 === false, "numeros 2  do not includes 50")

console.log('TEST array  includes color from index')

var colors = new Curray
colors[0] = "red"
colors[1] = "red"
colors[2] = "red"
colors[3] = "red"
colors[4] = "red"
colors[5] = "red"
colors[6] = "red"
colors[7] = "red"
colors[8] = "red"
colors[8] = "red"
colors[8] = "red"
colors.length = 11


var included = colors.includes('pink', 2)

console.assert(included === true, "included includes pink")

var included = colors.includes('red', 4)

console.assert(included === true, "included includes red")


var included = colors.includes('red', 8)

console.assert(included === false, "included do not includes red")
