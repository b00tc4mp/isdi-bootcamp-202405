var Curray = require("./Curray");
require("./Curray.prototype.some");

console.info("TEST Curray.prototype.some.test");

console.info("CASE some");

var numbers = new Curray(1, 2, 3, 4, 5);

var nums = numbers.some(function (number) {
  return number % 2 === 0;
});

console.assert(nums === true, "nums is true");
