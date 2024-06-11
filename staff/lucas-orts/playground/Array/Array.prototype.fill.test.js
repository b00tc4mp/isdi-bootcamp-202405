console.info('TEST Array.prototype.fill')

console.info('CASE fill with 1 parameter in Array')
var array1 = [1, 2, 3, 4];
var array2 = array1.fill(6)

console.assert(array2.length === array1.length, "array2 length is 4");
console.assert(array2[0] === 6, "array2[0] is 6");
console.assert(array2[1] === 6, "array2[1] is 6");
console.assert(array2[2] === 6, "array2[2] is 6");
console.assert(array2[3] === 6, "array2[3] is 6");

// Expected output: Array [6, 6, 6, 6]


console.info('CASE fill with 2 parameter in Array')
var array1 = [1, 2, 3, 4];


var array2 = array1.fill(5, 1);
console.assert(array2.length === array1.length, "array2 length is 4");
console.assert(array2[0] === 1, "array2[0] is 1");
console.assert(array2[1] === 5, "array2[1] is 5");
console.assert(array2[2] === 5, "array2[2] is 5");
console.assert(array2[3] === 5, "array2[3] is 5");



console.info('CASE fill with 3 parameter in Array')
var array1 = [1, 2, 3, 4];
// Fill with 0 from position 2 until position 4
var array2 = array1.fill(0, 2, 3);
console.assert(array2.length === array1.length, "array2 length is 4");
console.assert(array2[0] === 1, "array2[0] is 1");
console.assert(array2[1] === 2, "array2[1] is 2");
console.assert(array2[2] === 0, "array2[2] is 0");
console.assert(array2[3] === 4, "array2[3] is 4");

// Expected output: Array [1, 2, 0, 0]




