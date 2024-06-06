console.log('TEST SOME')

console.log('CASE some in array')

var numeros = [1, 2, 3, 4, 5];

var even = function (element) {

    return element % 2 === 0;
    // lo mismo que decir si hay algun elemento par

}

console.log(numeros.some(even));
// true

console.log(numeros.some(function (number) {

    return number > 3

}));
// true