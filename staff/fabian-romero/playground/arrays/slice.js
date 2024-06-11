console.log('TEST slice in Arrays')

console.log('CASE slice')

// devuelve una copia superficial de una parte de una matriz en un nuevo objeto de matriz seleccionado

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'agbar']

console.log(barcelona.slice(2)) // es desde donde comienza "el nuevo array" // [ 'wella', 'beach', 'agbar' ]

console.log(barcelona.slice(0)) // ['sagrada', 'montjuic', 'wella', 'beach', 'agbar'] toda porque comienza desde la posicion cero

console.log(barcelona.slice(2, -1)) //['wella', 'beach'] // comienza desde la posicion 2 y luego de atras hacia adelante porque está un negativo.

