const Curray = require("./Curray");

console.info("TEST Curray.prototype.some.test");

console.info("CASE some");

const numbers = new Curray(1, 2, 3, 4, 5);

const nums = numbers.some(function (number) {
  return number % 2 === 0;
});

console.assert(nums === true, "nums is true");
