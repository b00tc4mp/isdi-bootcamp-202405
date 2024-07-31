console.log('TEST push an element to array')


console.log('CASE push an element to array')

//El push()método toma uno o más argumentos y los agrega al final de la matriz, en el orden en que aparecen. Devuelve la nueva longitud de la matriz.


var colors = new Array

colors[0] = { cara: 'rojo', cuerpo: 'amarillo', pies: 'verde' }
colors[1] = { cara: 'lila', cuerpo: 'rosa', pies: 'nude' }
colors[2] = { cara: 'azul', cuerpo: 'celeste', pies: 'cian' }
colors.length = 3

console.log(colors)
console.log(colors.length)

colors.push({ cara: 'negra', cuerpo: 'blanco', pies: 'grises' }) // se agrega sin más
// el nombre de la variable + . + push + () y dentro de la function () lo que quiero agregar.

console.log(colors) // luego ejecutar la funcion
console.log(colors.length) // si lo ejecuto ya me dice el numero de la longitud actual.



console.log('CASE push multiple elements to object')

//push simple, se add elementos a una array ya designada, primero se crea la nueva array con los valores que se quieren add y luego le doy el la funcion push a la array original.

var colors = ['negra', 'blanco', 'gris'] // va en corchete porque estoy trabajando en un array
// no tiene posicion porque la longitud se da automatica

console.log(colors)
console.log(colors.length)

var newColors = ('black', 'white', 'grey') // creo una nueva var, con elementos que quiero incluir en la array de arriba. Esto va solo en parentesis

newColors = colors.push('black', 'white', 'grey') // ejecucion matematica normal

console.log(colors) // array de arriba solo
console.log(colors.length) // longitud automatica de la "nueva array"
console.log(newColors) // corre la array completa
