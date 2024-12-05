console.log('TEST EVERY')

console.log('CASE every in array')


var numeros = [1, 30, 39, 29, 10, 13]

var isBelowThreshold = function (currentValue) {

    return currentValue < 40

}

console.log(numeros.every(isBelowThreshold));