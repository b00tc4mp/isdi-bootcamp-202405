var Curray = require("./Curray");
require("./Curray.prototype.fill");

console.info("TEST Curray.prototype.fill");

console.info("CASE fill with 1 parameter in Curray");

var numbers = new Curray(1, 2, 3, 4);

var filled = numbers.fill(6);

console.assert(
  filled.length === numbers.length,
  "filled length equal numbers length"
);
console.assert(filled[0] === 6, "filled at 0 is 6");
console.assert(filled[1] === 6, "filled at 1 is 6");
console.assert(filled[2] === 6, "filled at 2 is 6");
console.assert(filled[3] === 6, "filled at 3 is 6");

console.info("CASE fill with 2 parameters in Curray");

var filled = numbers.fill(5, 1);

console.assert(
  filled.length === numbers.length,
  "filled length equal numbers length"
);
console.assert(filled[0] === 6, "filled at 0 is 6");
console.assert(filled[1] === 5, "filled at 1 is 5");
console.assert(filled[2] === 5, "filled at 2 is 5");
console.assert(filled[3] === 5, "filled at 3 is 5");

console.info("CASE fill with 3 parameters in Curray");

var filled = numbers.fill(0, 2, 4);

console.assert(
  filled.length === numbers.length,
  "filled length equal numbers length"
);
console.assert(filled[0] === 6, "filled at 0 is 6");
console.assert(filled[1] === 5, "filled at 1 is 5");
console.assert(filled[2] === 0, "filled at 2 is 0");
console.assert(filled[3] === 0, "filled at 3 is 0");
