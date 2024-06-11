var Curray = require("./Curray")
require("./Curray.prototype.fill")
console.info('TEST Curray.prototype.fill')

console.info('CASE fill with 1 parameter in Curray')
var curray1 = new Curray(1, 2, 3, 4);
var curray2 = curray1.fill(6)

console.assert(curray2.length === curray1.length, "curray2 length is 4");
console.assert(curray2[0] === 6, "curray2[0] is 6");
console.assert(curray2[1] === 6, "curray2[1] is 6");
console.assert(curray2[2] === 6, "curray2[2] is 6");
console.assert(curray2[3] === 6, "curray2[3] is 6");

// Expected output: Array [6, 6, 6, 6]


console.info('CASE fill with 2 parameter in Array')
var curray1 = new Curray(1, 2, 3, 4);


var curray2 = curray1.fill(5, 1);
console.assert(curray2.length === curray1.length, "curray2 length is 4");
console.assert(curray2[0] === 1, "curray2[0] is 1");
console.assert(curray2[1] === 5, "curray2[1] is 5");
console.assert(curray2[2] === 5, "curray2[2] is 5");
console.assert(curray2[3] === 5, "curray2[3] is 5");



console.info('CASE fill with 3 parameter in Array')
var curray1 = new Curray(1, 2, 3, 4);
// Fill with 0 from position 2 until position 4
var curray2 = curray1.fill(0, 2, 3);
console.assert(curray2.length === curray1.length, "curray2 length is 4");
console.assert(curray2[0] === 1, "curray2[0] is 1");
console.assert(curray2[1] === 2, "curray2[1] is 2");
console.assert(curray2[2] === 0, "curray2[2] is 0");
console.assert(curray2[3] === 4, "curray2[3] is 4");

// Expected output: Array [1, 2, 0, 0]




