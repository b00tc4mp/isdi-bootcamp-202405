var Curray = require("./Curray");

console.log("TEST constructor");

console.log("CASE builds a new instance of Curray");

var c = new Curray(); //Aquí sí que se podría llamar a la función sin paréntesis

console.assert(c instanceof Curray, "c is a Curray");
console.assert(c instanceof Object, "c is an Object");

console.log("CASE builds a new Curray with values");

var c = new Curray(10, 20, 30);

console.assert(c instanceof Curray, "c is a Curray");
console.assert(c[0] === 10, "c at 0 is 10");
console.assert(c[1] === 20, "c at 1 is 20");
console.assert(c[2] === 30, "c at 2 is 30");
console.assert(c.length === 3, "c length is 3");

console.log("CASE builds a new Curray with only one numeric argument");

var c = new Curray(10);

console.assert(c instanceof Curray, "c is a Curray");
console.assert(c.length === 10, "c is 10");

console.log("CASE builds a new Curray with only one non-numeric argument");

var c = new Curray("hola mundo");

console.assert(c instanceof Curray, "c is a Curray");
console.assert(c[0] === "hola mundo", "c at 0 is hola mundo");
console.assert(c.length === 1, "c length is 1");
