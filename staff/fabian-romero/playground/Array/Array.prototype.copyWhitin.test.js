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

var animals = ['Dodo', 'Tiger', 'Pengui', 'Leo', 'Elephant']

var animals2 = animals.copyWithin(3, 1, 2)

console.assert(animals2[0] === 'Dodo', 'animals2 at 0 is Dodo')
console.assert(animals2[1] === 'Tiger', 'animals2 at 1 is Tiger')
console.assert(animals2[2] === 'Pengui', 'animals2 at 2 is Pengui')
console.assert(animals2[3] === 'Tiger', 'animals2 at 3 is Tiger')
console.assert(animals2[4] === 'Elephant', 'animals2 at 4 is Elephant')
console.assert(animals2.length === 5, 'animals2 length is 5')

var animals3 = ['Dodo', 'Tiger', 'Pengui', 'Leo', 'Elephant']

var animals4 = animals3.copyWithin(0, 1, 4)

console.assert(animals4[0] === 'Tiger', 'animals4 at 0 is Tiger')
console.assert(animals4[1] === 'Pengui', 'animals4 at 1 is Pengui')
console.assert(animals4[2] === 'Leo', 'animals4 at 2 is Dodo')
console.assert(animals4[3] === 'Leo', 'animals4 at 3 is Dodo')
console.assert(animals4[4] === 'Elephant', 'animals4 at 4 is Elephant')
console.assert(animals4.length === 5, 'animals4 length is 5')