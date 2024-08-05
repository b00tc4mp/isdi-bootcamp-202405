console.log('TEST some')

console.log('CASE some in array')

var numeros = [1, 2, 3, 4, 5];

var even = (element) => element % 2 === 0;

console.log(numeros.some(even));
// true
console.log(numeros.some(function (number) {
    return number > 3
}))