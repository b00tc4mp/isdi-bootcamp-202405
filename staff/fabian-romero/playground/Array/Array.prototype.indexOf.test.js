console.info('TEST Arrays.prototype.indexOf.test.js')

console.info('CASE IndexOF')

// Devuelve el primer índice en el que se puede encontrar un elemento determinado en el array o -1 si no está presente.

var myName = ['f', 'a', 'b', 'i', 't', 'o', 'i', 't', 'o'] // una variabale normal
console.log(myName.indexOf('b')) // busca si dentro del array existi y si existe me dice la posicion y si no existe me da -1

var index = myName.indexOf(f) // esta es otra forma de llamar a la funcion. 
console.log(myName.indexOf('B')) // no existe porque es mayuscula.
console.log(myName.indexOf('i')) // si en la 3
console.log(myName.indexOf('i', 4)) // si en la posicion 6 // si quiero saber si vuelve aparecer el valor que busco escribo ", desde la posicion X" y me dice si existe o no.
console.log(myName.indexOf('i', -3))


var animals = ['ant', 'bison', 'camel', 'duck', 'bison']

var animals1 = animals.indexOf('ant')
var animals2 = animals.indexOf('bison')
var animals3 = animals.indexOf('camel', 1)
var animals4 = animals.indexOf('giraffa')
var animals5 = animals.indexOf('ant', -5)
var animals6 = animals.indexOf('bison', 2)

console.assert(animals1 === 0, 'animals1 is 0')
console.assert(animals2 === 1, 'animals2 is 1')
console.assert(animals3 === 2, 'animals3 is 2')
console.assert(animals4 === -1, 'animals4 is -1')
console.assert(animals5 === 0, 'animals5 is 0')
console.assert(animals6 === 4, 'animals6 is 4')