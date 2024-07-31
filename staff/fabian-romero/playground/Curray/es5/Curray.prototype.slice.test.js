var Curray = require('./Curray')
require('./Curray.prototype.slice')



console.log('TEST slice in Curray')

console.log('CASE slice')

// devuelve una copia superficial de una parte de una matriz en un nuevo objeto de matriz seleccionado

var barcelona = ('sagrada', 'montjuic', 'wella', 'beach', 'agbar')

console.log(barcelona.slice(2)) // es desde donde comienza "el nuevo array" // [ 'wella', 'beach', 'agbar' ]

console.log(barcelona.slice(0)) // ['sagrada', 'montjuic', 'wella', 'beach', 'agbar'] toda porque comienza desde la posicion cero

console.log(barcelona.slice(2, -1))