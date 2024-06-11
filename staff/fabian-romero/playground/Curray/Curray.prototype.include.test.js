var Curray = require('./Curray')
require('./Curray.prototype.includes')

console.info('TEST Curray.prototype.includes')



console.info('CASE includes in Curray')

var numeros = new Curray('1', '2', '3', '4', '5', '6', '7', '8', '9', length: 10)

var numeros1 = numeros.includes(6)

var numeros2 = numeros.includes(50)

console.assert(numeros1 === true, 'numeros1 includes 6')
console.assert(numeros2 === false, 'numeros2 do not includes 50')




console.info('TEST Curray includes color from index')

var colors = ('red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey' length: 11)

// dudas con los elementos//

var colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey']
var included = colors.includes('pink', 2)


console.assert(included === true, 'included includes pink')
var included = colors.includes('red', 4)


console.assert(included === true, 'included includes red')
var included = colors.includes('red', 8)
console.assert(included === false, 'included does not include red')