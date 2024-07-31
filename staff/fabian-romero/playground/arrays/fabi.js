onsole.log('TEST arrays')

console.log('CASE add elements to array')
//agregar elementos a la array//

var ro = new Array // [] es la nueva array SIN MAS

ro[0] = 'fa' // siempre tiene que llevar las comillas, puedo agregar cuantos valores yo quiera.
ro[2] = bi // cada posicion, tiene una propiedad que tiene su valor.
ro[1] = to

console.log(ro) // Ejecuta la array y este es el resultado ( [ 'fa', 'bi', 'to' ] )
// solo para que se ejecute la accion


console.log('CASE delete elements to array')

var ro = new Array

ro[0] = 'fa'
ro[1] = 'bi'
ro[2] = 'to'

ro.length-- // esto es para restar un elento
console.log(ro) // cuando ejecuto me va a enseñar ( ['fa', 'bi'] )
console.log(ro.length) // se ejecuta la accion y se le da una orden, en este caso de, elimnar uno.
// solo me enseña el numero final
// este array tiene 3 posiciones y al ejecutar solo me dira 2



console.log('CASE remove last 2 elements from array')
var ro = new Array

ro[0] = 'fa'
ro[1] = 'bi'
ro[2] = 'to'

ro.lenght -= 2 // misma operacion que antes, pero pidiendole completar más numeros y todos los que quiera más de 1
console.log(ro) // si ejecuto, me enseña solo 'fa'
console.log(ro.length) // si ejecuto me enseña el resulta en numero, en este caso 1.


