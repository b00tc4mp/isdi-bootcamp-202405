console.log('TEST some in Arrays')

console.log('CASE some')


var number = [1, 2, 3, 4, 5];

var even = function (element) {
    return number > 4
} // esto es lo mismo que si hay algun elemento par.

console.log(number.some(even))

// me devuelve solo si es verdadero o falso
// creo una nueva variable y le digo que "even" (que es la variante) + punto + funciton (element, index, array) y que me retorne numeros y alguna operacion matematica.
// luego console.log(nombrearray.SOME(numbreVariableNueva))