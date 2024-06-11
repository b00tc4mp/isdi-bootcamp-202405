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