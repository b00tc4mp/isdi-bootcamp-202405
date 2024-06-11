console.info('TEST shift in Array.prototype.test')

console.info('CASE Shift')

// elimina objetos como el pop, pero de la primera linea

var barcelona = new Array

var barcelona = ['sagrada', 'montjuic', 'wella', 'beach', 'montjuic'];
var extracted = barcelona.shift()

console.assert(barcelona.length === 4, 'barcelona length is 4')
console.assert(extracted === 'sagrada', 'barcelona2 is sagrada')
console.assert(barcelona[0] === 'montjuic', 'barcelona at 0 is montjuic')
console.assert(barcelona[1] === 'wella', 'barcelona at 1 is wella')
console.assert(barcelona[2] === 'beach', 'barcelona at 2 is wella')
console.assert(barcelona[3] === 'montjuic', 'barcelona at 3 is montjuic') // el valor final de cada var.