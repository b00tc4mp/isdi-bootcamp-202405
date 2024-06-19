var Curray = require('./Curray')
require('./Curray.prototype.shift')

console.log('TEST Curray.prototype.shift')

console.log('CASE shift')

var barcelona = new Curray('sagrada', 'montjuic', 'wella', 'beach', 'montjuic')

var aux = barcelona[0];
//var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'montjuic'];
var barcelona2 = barcelona.shift()


console.assert(barcelona2 === aux)
console.assert(barcelona.length === 4)




// console.log('CASE shift en numeros')


// var array1 = []

// var array1 = { 0: 1, 1: 2, 2: 3, length: 3 };
// var firstElement = array1.shift()

// firstElement = array1[0]


// console.assert(array1.length === 2)

