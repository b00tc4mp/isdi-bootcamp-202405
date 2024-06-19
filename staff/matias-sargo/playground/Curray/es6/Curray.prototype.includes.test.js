const Curray = require('./Curray')

console.info('TEST Curray.prototype.includes')

console.info('CASE includes in Curray')

const numeros = new Curray

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

const numeros1 = numeros.includes(6)

const numeros2 = numeros.includes(50)

console.assert(numeros1 === true, 'numeros1 includes 6')
console.assert(numeros2 === false, 'numeros2 do not includes 50')

console.info('TEST Curray includes color from index')

let colors = new Curray

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

colors = ['red', 'green', 'blue', 'yellow', 'orange', 'pink', 'skyblue', 'red', 'white', 'black', 'grey']

let included = colors.includes('pink', 2)

console.assert(included === true, 'included includes pink')

included = colors.includes('red', 4)

console.assert(included === true, 'included includes red')

included = colors.includes('red', 8)

console.assert(included === false, 'included does not include red')