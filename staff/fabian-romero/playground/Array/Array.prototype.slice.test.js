console.log('TEST slice in Arrays')

console.log('CASE slice')

// devuelve una copia superficial de una parte de una matriz en un nuevo objeto de matriz seleccionado

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'agbar']

console.log(barcelona.slice(2)) // es desde donde comienza "el nuevo array" // [ 'wella', 'beach', 'agbar' ]

console.log(barcelona.slice(0)) // ['sagrada', 'montjuic', 'wella', 'beach', 'agbar'] toda porque comienza desde la posicion cero

console.log(barcelona.slice(2, -1)) //['wella', 'beach'] // comienza desde la posicion 2 y luego de atras hacia adelante porque está un negativo.




console.info('CASE slice in array')

var animals = ['ant', 'bison', 'camel', 'duck', 'elephant']

var animals1 = animals.slice(0, 3)
var animals2 = animals.slice(4)
var animals3 = animals.slice(2, -1)

console.assert(animals1[0] === 'ant', 'animals1 at 0 is ant')
console.assert(animals1[1] === 'bison', 'animals1 at 1 is bison')
console.assert(animals1[2] === 'camel', 'animals1 at 2 is camel')
console.assert(animals2[0] === 'elephant', 'animals2 at 0 is elephant')
console.assert(animals3[0] === 'camel', 'animals3 at 0 is camel')
console.assert(animals3[1] === 'duck', 'animals3 at 0 is duck')