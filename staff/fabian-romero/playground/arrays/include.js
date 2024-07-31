console.log('TEST include in Arrays')

console.log('CASE Include')

// Determina si un array incluye un determinado valor entre sus propiedades y retornando "trueo falses" según corresponda, busca una respuesta dentro de nuestra array.

var myName = ['f', 'a', 'b', 'i', 't', 'o']

console.log(myName.includes('f')) // true // letras palabras entre comillas, numeros no
console.log(myName.includes('h')) // false



console.log('CASE include pets')


var pets = ['cat', 'dog', 'bat'] // lo que hace "includes" es decirme true/false segun lo que hay dentro del array

console.log(pets)


var included = pets.includes('dog') // creo una nueva variable para decirle que la primera variable tendra una nueva funcion y que ese resultado se copiara en ella.
console.log(included) // luego la llamo y me da el valor (true


var included = pets.includes('horse') // el caballo no está en el array entonces me dara resultado falso

console.log(included) //(false)