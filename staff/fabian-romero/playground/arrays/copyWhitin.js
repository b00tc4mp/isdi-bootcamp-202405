console.log('TEST copyWithin in Arrays')


console.log('CASE copyWithin')

//copia parte del array en otra ubicación en la misma array y devuelve esta array sin modificar su longitud.

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach']

barcelona.copyWithin(2, 0) // indico como primer numero la posicion de la propiedad que quiero cambiar, seguido por la posicion de la propidad que cambio

console.log(barcelona) // [ [0]'sagrada', 'montjuic', [2]'sagrada', 'montjuic' ]


var myName = ['f', 'a', 'b', 'i', 't', 'o', 'i', 't', 'o']

myName.copyWithin(6, 5) // cambie la "i" por la "o"
myName.copyWithin(7, 5) // cambie la "t" por la "o"
console.log(myName.join("")) // aqui join para ver el resultado unido, sin separacion
// como hacer para en una misma accion cambiar más ??

// fabitoooo